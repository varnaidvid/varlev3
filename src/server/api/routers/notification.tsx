import {
  createTRPCRouter,
  protectedProcedure,
  withRole,
} from "@/server/api/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { NotificationType, PrismaClient } from "@prisma/client";
import {
  CompetitionAnnouncementEmail,
  TeamApprovedByOrganizerEmail,
  TeamApprovedBySchoolEmail,
  TeamRegisteredEmail,
  TeamRejectedByOrganizerEmail,
  TeamApprovedBySchoolForOrganizerEmail,
  TeamUpdatedDataEmail,
} from "@/components/email-templates";
import React from "react";

const resend = new Resend(process.env.RESEND_KEY);

async function createNotification({
  type,
  message,
  react,
  subject,
  senderAccountId,
  receiverAccountId,
  redirectTo,
  db,
}: {
  type: NotificationType;
  message: string;
  react: React.ReactNode;
  subject: string;
  senderAccountId: string;
  receiverAccountId: string;
  redirectTo?: string;
  db: PrismaClient;
}) {
  await db.notification.create({
    data: {
      type,
      message,
      redirectTo,
      senderAccountId,
      receiverAccountId,
    },
  });

  const receiver = await db.account.findUnique({
    where: { id: receiverAccountId },
  });
  if (!receiver) throw new Error("A fogadó felhasználó nem található");

  let emails: { email: string }[] = [];
  if (receiver.type === "TEAM") {
    const teamEmails = await db.email.findMany({
      where: { teamId: receiver.id },
      select: { email: true },
    });
    emails = emails.concat(teamEmails);
  } else if (receiver.type === "SCHOOL") {
    const school = await db.school.findUnique({
      where: { accountId: receiver.id },
      select: { contactEmail: true },
    });
    if (!school) throw new Error("Az fogadó fiókja nem található");

    if (school.contactEmail) emails.push({ email: school.contactEmail });
  } else {
    const organizer = await db.organizer.findUnique({
      where: { accountId: receiver.id },
      select: { email: true },
    });
    if (!organizer) throw new Error("A fogadó fiókja nem található");

    if (organizer.email) emails.push({ email: organizer.email });
  }

  if (emails.length > 0) {
    await resend.emails.send({
      from: "VarleV3 <no-reply@varlev3.hu>",
      to: emails.map((e) => e.email),
      subject: subject,
      react: react,
    });
  }
}

export const notificationRouter = createTRPCRouter({
  getAccountNotifications: protectedProcedure
    .input(z.object({ accountId: z.string() }))
    .query(async ({ ctx, input }) => {
      await ctx.db.notification.updateMany({
        where: { receiverAccountId: input.accountId },
        data: { status: "READ" },
      });

      return ctx.db.notification.findMany({
        where: { receiverAccountId: input.accountId },
        orderBy: { createdAt: "desc" },
      });
    }),

  newTeamRegistered: protectedProcedure
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
        select: { name: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        type: NotificationType.TEAM_REGISTERED,
        message: `${team.name} csapat regisztrált a ${competition.name} versenyre!`,
        react: (
          <TeamRegisteredEmail
            redirectUrl="http://localhost:3000"
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapat regisztráció",
        senderAccountId: input.teamId,
        receiverAccountId: input.schoolId,
        redirectTo: input.redirectTo,
        db: ctx.db,
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
        select: { name: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      // for the team
      await createNotification({
        type: NotificationType.TEAM_APPROVED_BY_SCHOOL,
        message: `${team.name} csapatodat elfogadta az iskolád a ${competition.name} versenyre!`,
        react: (
          <TeamApprovedBySchoolEmail
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapatod elfogadva az iskola által",
        senderAccountId: input.schoolId,
        receiverAccountId: input.teamId,
        redirectTo: input.redirectForOrganizer,
        db: ctx.db,
      });

      // for organizer
      await createNotification({
        type: NotificationType.TEAM_APPROVED_BY_SCHOOL,
        message: `${team.name} csapat jelentkezését jóváhagyta az iskolája a ${competition.name} versenyre!`,
        react: (
          <TeamApprovedBySchoolForOrganizerEmail
            redirectTo="http://localhost:3000"
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: `${team.name} csapat jelentkezése várja jóváhagyásod`,
        senderAccountId: input.schoolId,
        receiverAccountId: input.teamId,
        redirectTo: input.redirectForOrganizer,
        db: ctx.db,
      });
    }),

  teamApprovedByOrganizer: withRole(["ORGANIZER"])
    .input(
      z.object({
        teamId: z.string(),
        organizerId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        type: NotificationType.TEAM_APPROVED_BY_ORGANIZER,
        message: `${team.name} csapatodat jóváhagyta a ${competition.name} verseny szervezője!`,
        react: (
          <TeamApprovedByOrganizerEmail
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapatod jóváhagyva a szervező által",
        senderAccountId: input.organizerId,
        receiverAccountId: input.teamId,
        redirectTo: input.redirectTo,
        db: ctx.db,
      });
    }),

  teamRejectedByOrganizer: withRole(["ORGANIZER"])
    .input(
      z.object({
        teamId: z.string(),
        organizerId: z.string(),
        competitionId: z.string(),
        redirectTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      await createNotification({
        type: NotificationType.TEAM_REJECTED_BY_ORGANIZER,
        message: `${team.name} csapatodat elutasította a ${competition.name} verseny szervezője!`,
        react: (
          <TeamRejectedByOrganizerEmail
            redirectUrl="http://localhost:3000"
            teamName={team.name}
            competitionName={competition.name}
          />
        ),
        subject: "Csapatod elutasítva a szervező által",
        senderAccountId: input.organizerId,
        receiverAccountId: input.teamId,
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
      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
        select: { name: true },
      });
      if (!team) throw new Error("A csapat nem található");

      const competition = await ctx.db.competition.findUnique({
        where: { id: input.competitionId },
        select: { name: true },
      });
      if (!competition) throw new Error("A verseny nem található");

      // send notification to organizer that team updated data
      await createNotification({
        type: NotificationType.TEAM_UPDATE,
        message: `${team.name} csapat elvégezte a kérvényezett hiánypótlást!`,
        react: (
          <TeamUpdatedDataEmail
            teamName={team.name}
            redirectUrl="http://localhost:3000"
          />
        ),
        subject: `${team.name} csapat hiánypótlása elkészült`,
        senderAccountId: input.teamId,
        receiverAccountId: input.competitionId,
        redirectTo: input.redirectTo,
        db: ctx.db,
      });
    }),

  competitionAnnouncement: withRole(["ORGANIZER"])
    .input(
      z.object({
        competitionId: z.string(),
        message: z.string(),
        redirectTo: z.string(),
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
        select: { id: true },
      });
      for (const team of teams) {
        await createNotification({
          type: NotificationType.COMPETITION_ANNOUNCEMENT,
          message: input.message,
          react: (
            <CompetitionAnnouncementEmail
              competitionName={competition.name}
              message={input.message}
            />
          ),
          subject: "Verseny bejelentés!",
          senderAccountId: input.competitionId,
          receiverAccountId: team.id,
          redirectTo: input.redirectTo,
          db: ctx.db,
        });
      }
    }),
});
