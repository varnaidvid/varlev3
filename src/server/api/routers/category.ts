import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany();
  }),
});
