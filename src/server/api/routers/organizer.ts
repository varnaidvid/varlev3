import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withRole,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export const organizerRouter = createTRPCRouter({
  getCompetitionAnnouncements: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.db.notification.findMany({
        where: {
          competitionId: input.id,
          topic: "COMPETITION_ANNOUNCEMENT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const seen = new Set<string>();
      return notifications.filter((notification) => {
        if (seen.has(notification.message)) {
          return false;
        }
        seen.add(notification.message);
        return true;
      });
    }),

  endTournament: withRole(["ORGANIZER"])
    .input(
      z.object({
        id: z.string(),
        results: z.array(
          z.object({
            teamId: z.string(),
            score: z.number(),
            competitionId: z.string(),
            place: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const competition = await ctx.db.competition.update({
        where: { id: input.id },
        data: {
          ended: true,
        },
      });

      const results = await ctx.db.result.createMany({
        data: input.results.map((result) => ({
          score: result.score,
          place: result.place,
          teamId: result.teamId,
          competitionId: result.competitionId,
        })),
      });
      console.log("RESULTS CREATED", results);

      return competition;
    }),

  getTeamsThatNeedApproval: withRole(["ORGANIZER"])
    .input(
      z.object({
        competitionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
          status: {
            not: "REGISTERED",
          },
        },
      });
    }),

  startTournament: withRole(["ORGANIZER"])
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const competition = await ctx.db.competition.update({
        where: { id: input.id },
        data: {
          deadline: new Date(),
        },
      });

      return competition;
    }),

  getCompetitionCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.count();
  }),

  getRegisteredTeamsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.team.count();
  }),

  getSchoolCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.school.count();
  }),

  getCompetitions: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;

      const competitions = await ctx.db.competition.findMany({
        take: limit + 1,
        where: {
          organizers: {
            some: {
              accountId: ctx.session.user.id,
            },
          },
        },
        orderBy: {
          deadline: "asc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          organizers: true,
          technologies: true,
          categories: true,
          teams: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (competitions.length > limit) {
        const nextItem = competitions.pop();
        nextCursor = nextItem!.id;
      }

      return {
        competitions,
        nextCursor,
      };
    }),
});
