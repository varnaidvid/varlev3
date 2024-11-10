import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";

export const technologyRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.technology.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.technology.findUnique({
        where: { id: input.id },
        include: {
          competitions: true,
          teams: true,
        },
      });
    }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.technology.findMany({
      include: {
        competitions: true,
        teams: true,
      },
    });
  }),

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

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.technology.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.technology.update({
        where: { id: input.id },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.technology.delete({
        where: { id: input.id },
      });
    }),
});

type TechnologyRouterOutputs = inferRouterOutputs<typeof technologyRouter>;

export type TechnologyWithDetails =
  TechnologyRouterOutputs["getAllWithDetails"][0];
