import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const technologyRouter = createTRPCRouter({
  getCompetitionTechnologies: publicProcedure
    .input(z.object({ competitionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.technology.findMany({
        where: {
          competitions: {
            some: {
              id: input.competitionId,
            },
          },
        },
      });
    }),
});
