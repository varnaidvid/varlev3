import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const schoolRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.school.findMany();
  }),
});
