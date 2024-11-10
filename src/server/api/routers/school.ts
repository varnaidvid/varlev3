import {
  createTRPCRouter,
  publicProcedure,
  withOwner,
} from "@/server/api/trpc";
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

  getSchoolByAccountId: publicProcedure
    .input(
      z.object({
        accountId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await withOwner({
        ctx,
        accountId: input.accountId,
      });

      return ctx.db.school.findFirst({
        where: {
          account: {
            id: input.accountId,
          },
        },
        select: {
          account: {
            include: {
              emails: true,
            },
          },
          teams: {
            include: {
              Competition: true,
            },
          },
          coaches: {
            include: {
              Team: true,
            },
          },
          address: true,
          name: true,
          contactName: true,
        },
      });
    }),
});

// type SchoolRouter = inferRouterOutputs<typeof schoolRouter>;
