import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const organizerRouter = createTRPCRouter({
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
