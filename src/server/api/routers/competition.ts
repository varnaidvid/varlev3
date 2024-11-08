import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { Competition } from "@prisma/client";

export const competitionRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.competition.findUnique({
        where: { id: input.id },
        include: { teams: true, technologies: true },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany();
  }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany({
      include: { teams: true, technologies: true },
    });
  }),
});

export type CompetitionRouter = inferRouterOutputs<typeof competitionRouter>;

export type CompetitionWithDetails = Competition &
  CompetitionRouter["getAllWithDetails"][0];
