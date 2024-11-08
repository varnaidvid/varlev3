import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const coachRouter = createTRPCRouter({
  getAllBySchool: publicProcedure
    .input(z.object({ schoolName: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.coach.findMany({
        where: { School: { name: input.schoolName } },
      });
    }),
});
