import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";

export const schoolRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.school.findMany();
  }),

  getSchoolsByCompetitionId: publicProcedure
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.school.findMany({
        where: {
          teams: {
            some: {
              competitionId: input.competitionId,
            },
          },
        },
      });
    }),
});

// type SchoolRouter = inferRouterOutputs<typeof schoolRouter>;
