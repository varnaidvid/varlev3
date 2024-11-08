import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const competitionRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.competition.findUnique({
        where: { id: input.id },
        include: { applications: true, technologies: true },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany();
  }),
});
