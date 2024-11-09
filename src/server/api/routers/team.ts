import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Team } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

export const teamsRouter = createTRPCRouter({
  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.team.findMany();
  }),

  getTeamByAccountId: protectedProcedure
    .input(
      z.object({
        accountId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findFirst({
        where: {
          accountId: input.accountId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          emails: true,
          Competition: {
            include: {
              categories: true,
            },
          },
        },
      });
    }),

  getTeamsByCompetition: publicProcedure
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
        },
      });
    }),

  getTeamsForCSV: publicProcedure
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          emails: true,
        },
      });
    }),
});

type TeamsRouter = inferRouterOutputs<typeof teamsRouter>;

export type TeamWithDetails = Team & TeamsRouter["getTeamsByCompetition"][0];
