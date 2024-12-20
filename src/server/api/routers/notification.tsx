import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withOwner,
  withRole,
} from "@/server/api/trpc";
import { z } from "zod";
import { Resend } from "resend";
import {
  NotificationTopic,
  NotificationType,
  PrismaClient,
} from "@prisma/client";
import {
  CompetitionAnnouncementEmail,
  TeamApprovedByOrganizerEmail,
  TeamApprovedBySchoolEmail,
  TeamRegisteredEmail,
  TeamRejectedByOrganizerEmail,
  TeamApprovedBySchoolForOrganizerEmail,
  TeamUpdatedDataEmail,
  SchoolRegistrationEmail,
} from "@/components/email-templates";
import React from "react";
import { TRPCError } from "@trpc/server";

const resend = new Resend(process.env.RESEND_KEY);

async function createNotification({
  topic,
  type,
  message,
  react,
  subject,
  senderAccountId,
  receiverAccountId,
  redirectTo,
  competitionId,
  db,
}: {
  topic: NotificationTopic;
  type: NotificationType;
  message: string;
  react: React.ReactNode;
  subject: string;
  senderAccountId: string;
  receiverAccountId: string;
  redirectTo?: string;
  competitionId?: string;
  db: PrismaClient;
}) {
  const receiver = await db.account.findUnique({
    where: { id: receiverAccountId },
    select: { emails: true },
  });
  if (!receiver) throw new Error("A fogadó felhasználó nem található");

  const not = await db.notification.create({
    data: {
      topic,
      type,
      message,
      redirectTo,
      subject,
      senderAccount: {
        connect: {
          id: senderAccountId,
        },
      },
      receiverAccount: {
        connect: {
          id: receiverAccountId,
        },
      },
    },
  });

  if (competitionId) {
    await db.competition.update({
      where: { id: competitionId },
      data: {
        notifications: {
          connect: {
            id: not.id,
          },
        },
      },
    });
  }

  if (receiver.emails.length > 0) {
    await resend.emails.send({
      from: "VarleV3 <no-reply@varlev3.hu>",
      to: receiver.emails.map((e) => e.email),
      subject: subject,
      react: react,
    });
  }
}

export const notificationRouter = createTRPCRouter({
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.notification.count({
      where: {
        receiverAccountId: ctx.session.user.id,
        status: "UNREAD",
      },
    });
    return count;
  }),

  getDenialNotification: protectedProcedure.query(async ({ ctx }) => {
    const notification = await ctx.db.notification.findFirst({
      where: {
        receiverAccountId: ctx.session.user.id,
        topic: "TEAM_REJECTED_BY_ORGANIZER",
        status: "UNREAD",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notification;
  }),

  getNotifications: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(3),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      let items: any[] = await ctx.db.notification.findMany({
        take: limit + 1,
        where: {
          receiverAccountId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
      });

      for (const item of items) {
        const sender = await ctx.db.account.findUnique({
          where: { id: item.senderAccountId },
          select: {
            school: { select: { name: true } },
            organizer: { select: { name: true } },
            team: { select: { name: true } },
          },
        });
        if (!sender) throw new Error("A feladó fiókja nem található");

        if (sender.school) {
          item.senderName = sender.school.name;
          item.senderType = "SCHOOL";
        } else if (sender.organizer) {
          item.senderName = sender.organizer.name;
          item.senderType = "ORGANIZER";
        } else if (sender.team) {
          item.senderName = sender.team.name;
          item.senderType = "TEAM";
        }
      }

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.notification.updateMany({
        where: {
          receiverAccountId: ctx.session.user.id,
          status: "UNREAD",
          id: input.notificationId,
        },
        data: {
          status: "READ",
        },
      });
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.notification.updateMany({
      where: {
        receiverAccountId: ctx.session.user.id,
        status: "UNREAD",
      },
      data: {
        status: "READ",
      },
    });
  }),

  newTeamRegistered: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        schoolId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true, account: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const school = await ctx.db.school.findUnique({
        where: { id: input.schoolId },
        select: { name: true, account: true },
      });
      if (!school) throw new Error("Az iskola nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        topic: NotificationTopic.TEAM_REGISTERED,
        type: NotificationType.INFO,
        message: `${team.name} csapat regisztrált a ${competition.name} versenyre!`,
        react: (
          <TeamRegisteredEmail
            redirectUrl={input.redirectTo}
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapat regisztráció",
        senderAccountId: team.account.id,
        receiverAccountId: school.account.id,
        redirectTo: input.redirectTo,
        db: ctx.db,
      });
    }),

  notifySchoolAboutRegistration: withRole(["ORGANIZER"])
    .input(
      z.object({
        schoolId: z.string(),
        email: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const school = await ctx.db.school.findUnique({
        where: { id: input.schoolId },
        select: { name: true },
      });
      if (!school)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Az iskola nem található",
        });

      const organizer = await ctx.db.organizer.findUnique({
        where: { accountId: ctx.session.user.id },
        select: { name: true },
      });
      if (!organizer)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "A szervező nem található",
        });

      await resend.emails.send({
        from: "VarleV3 <no-reply@varlev3.hu>",
        to: input.email,
        subject: "Iskolai regisztráció",
        react: (
          <SchoolRegistrationEmail
            organizerName={organizer.name}
            schoolName={school.name}
            username={input.username}
            password={input.password}
            redirectUrl="http://localhost:3000/bejelentkezes"
          />
        ),
      });
    }),

  teamApprovedBySchool: withRole(["SCHOOL"])
    .input(
      z.object({
        teamId: z.string(),
        schoolId: z.string(),
        competitionId: z.string(),
        redirectForOrganizer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true, account: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true, organizers: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      const school = await ctx.db.school.findUnique({
        where: { id: input.schoolId },
        select: { name: true, account: true },
      });
      if (!school) throw new Error("Az iskola nem található");

      // for the team
      await createNotification({
        topic: NotificationTopic.TEAM_APPROVED_BY_SCHOOL,
        type: NotificationType.SUCCESS,
        message: `${team.name} csapatodat elfogadta az iskolád a ${competition.name} versenyre!`,
        react: (
          <TeamApprovedBySchoolEmail
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapatod elfogadva az iskola által",
        senderAccountId: school.account.id,
        receiverAccountId: team.account.id,
        redirectTo: input.redirectForOrganizer,
        db: ctx.db,
      });

      // for organizers
      for (const organizer of competition.organizers) {
        await createNotification({
          topic: NotificationTopic.TEAM_APPROVED_BY_SCHOOL,
          type: NotificationType.SUCCESS,
          message: `${team.name} csapat jelentkezését jóváhagyta az iskolája a ${competition.name} versenyre!`,
          react: (
            <TeamApprovedBySchoolForOrganizerEmail
              redirectTo="http://localhost:3000"
              teamName={team.name}
              competitionName={competition.name}
            />
          ),
          subject: `${team.name} csapat jelentkezése várja jóváhagyásod`,
          senderAccountId: school.account.id,
          receiverAccountId: organizer.accountId,
          redirectTo: input.redirectForOrganizer,
          db: ctx.db,
        });
      }
    }),

  teamApprovedByOrganizer: withRole(["ORGANIZER"])
    .input(
      z.object({
        teamId: z.string(),
        accountId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true, account: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const organizer = await ctx.db.organizer.findUnique({
        where: { accountId: input.accountId },
        select: { name: true, account: true },
      });
      if (!organizer) throw new Error("A szervező nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        topic: NotificationTopic.TEAM_APPROVED_BY_ORGANIZER,
        type: NotificationType.SUCCESS,
        message: `${team.name} csapatodat jóváhagyta a ${competition.name} verseny szervezője!`,
        react: (
          <TeamApprovedByOrganizerEmail
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapatod jóváhagyva a szervező által",
        senderAccountId: organizer.account.id,
        receiverAccountId: team.account.id,
        redirectTo: input.redirectTo,
        db: ctx.db,
      });
    }),

  teamRejectedByOrganizer: withRole(["ORGANIZER"])
    .input(
      z.object({
        teamId: z.string(),
        accountId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true, account: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const organizer = await ctx.db.organizer.findUnique({
        where: { accountId: input.accountId },
        select: { name: true, account: true },
      });
      if (!organizer) throw new Error("A szervező nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        topic: NotificationTopic.TEAM_REJECTED_BY_ORGANIZER,
        type: NotificationType.ERROR,
        message: input.message,
        react: (
          <TeamRejectedByOrganizerEmail
            redirectUrl="http://localhost:3000"
            teamName={team.name}
            competitionName={competition.name}
            message={input.message}
          />
        ),
        subject: "Pótold a hiányosságokat csapatod jelentkezésében",
        senderAccountId: organizer.account.id,
        receiverAccountId: team.account.id,
        redirectTo: input.redirectTo,
        db: ctx.db,
      });
    }),

  teamUpdatedData: withRole(["TEAM"])
    .input(
      z.object({
        teamId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await withOwner({
        ctx,
        teamId: input.teamId,
      });

      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true, account: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true, organizers: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      // send notification to organizer that team updated data
      for (const organizer of competition.organizers) {
        await createNotification({
          topic: NotificationTopic.TEAM_UPDATE,
          type: NotificationType.INFO,
          message: `${team.name} csapat frissítette adatait!`,
          react: (
            <TeamUpdatedDataEmail
              teamName={team.name}
              redirectUrl="http://localhost:3000"
            />
          ),
          subject: `${team.name} csapat frissítette adatait`,
          senderAccountId: team.account.id,
          receiverAccountId: organizer.accountId,
          redirectTo: input.redirectTo,
          db: ctx.db,
        });
      }
    }),

  competitionAnnouncement: withRole(["ORGANIZER"])
    .input(
      z.object({
        organizerAccountId: z.string(),
        competitionId: z.string(),
        message: z.string(),
        subject: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      // send notification to all teams that organizer made an announcement
      const teams = await ctx.db.team.findMany({
        where: { competitionId: input.competitionId },
        select: { id: true, account: true, name: true },
      });

      for (const team of teams) {
        console.log("CREATING NOTIFICATION FOR TEAM", team.name);

        await createNotification({
          topic: NotificationTopic.COMPETITION_ANNOUNCEMENT,
          type: NotificationType.INFO,
          message: input.message,
          react: (
            <CompetitionAnnouncementEmail
              competitionName={competition.name}
              message={input.message}
              subject={input.subject}
            />
          ),
          subject: input.subject,
          senderAccountId: input.organizerAccountId,
          receiverAccountId: team.account.id,
          competitionId: input.competitionId,
          db: ctx.db,
        });
      }
    }),
});
