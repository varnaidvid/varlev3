import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";
import { SubCategory } from "@prisma/client";

export const subCategoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.subCategory.findMany();
  }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.subCategory.findMany({
      include: { Competition: true, teams: true },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.subCategory.findUnique({
        where: { id: input.id },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subCategory.delete({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        competitionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subCategory.create({
        data: {
          name: input.name,
          Competition: {
            connect: { id: input.competitionId },
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subCategory.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),
});

export type SubCategoryRouter = inferRouterOutputs<typeof subCategoryRouter>;

export type SubCategoryWithDetails = SubCategory &
  SubCategoryRouter["getAllWithDetails"][0];
