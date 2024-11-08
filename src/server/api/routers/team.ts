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
    return ctx.db.team.findMany();
  }),

  getTeamsByCompetition: publicProcedure
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
        },
      });
    }),
});

type TeamsRouter = inferRouterOutputs<typeof teamsRouter>;

export type TeamWithDetails = Team & TeamsRouter["getTeamsByCompetition"][0];
