import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const subCategoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.subCategory.findMany();
  }),
});
