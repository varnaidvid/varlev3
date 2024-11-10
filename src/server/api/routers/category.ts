import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany();
  }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      include: {
        competitions: true,
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.category.findUnique({
        where: { id: input.id },
        include: {
          competitions: true,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.delete({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
});

type categoryRouterOutputs = inferRouterOutputs<typeof categoryRouter>;

export type CategoryWithDetails = categoryRouterOutputs["getAllWithDetails"][0];
