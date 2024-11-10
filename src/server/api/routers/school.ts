import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withOwner,
} from "@/server/api/trpc";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";
import { schoolUpdateSchema } from "@/lib/zod/school-crud";

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

  checkIfSchoolnameIsAvailable: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const school = await ctx.db.school.findFirst({
        where: {
          name: input.name,
        },
      });

      return !school;
    }),

  getSchoolDetails: publicProcedure
    .input(
      z.object({
        accountId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const school = await ctx.db.school.findFirst({
        where: {
          accountId: input.accountId,
        },
        select: {
          account: {
            include: {
              emails: true,
            },
          },
          address: true,
          name: true,
          contactName: true,
          id: true,
        },
      });
      if (!school) throw new Error("Nem találtuk az iskolát");

      return school;
    }),

  updateSchool: protectedProcedure
    .input(schoolUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await withOwner({
        ctx,
        schoolId: input.schoolId,
      });

      const oldSchool = await ctx.db.school.findFirst({
        where: {
          id: input.schoolId,
        },
        select: {
          account: {
            include: {
              emails: true,
            },
          },
        },
      });

      return await ctx.db.school.update({
        where: {
          id: input.schoolId,
        },
        data: {
          address: input.address,
          name: input.name,
          contactName: input.contactName,
          account: {
            update: {
              emails: {
                connectOrCreate: {
                  where: {
                    email: input.contactEmail,
                  },
                  create: {
                    email: input.contactEmail,
                  },
                },
              },
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
