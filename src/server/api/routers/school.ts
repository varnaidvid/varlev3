import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withOwner,
  withRole,
} from "@/server/api/trpc";
import { z } from "zod";
import { schoolUpdateSchema } from "@/lib/zod/school-crud";
import { inferRouterOutputs } from "@trpc/server";
import { School } from "@prisma/client";

export const schoolRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.school.findMany();
  }),

  getTotalRegisteredTeamCount: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.team.count({
      where: {
        school: {
          accountId: ctx.session.user.id,
        },
      },
    });
  }),

  getTeamsWaitingForApproval: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.team.findMany({
      where: {
        school: {
          accountId: ctx.session.user.id,
        },
        status: "WAITING_FOR_SCHOOL_APPROVAL",
      },
    });
  }),

  getRegisteredTeamCountByIntervalDummyData: protectedProcedure
    .input(
      z.object({
        days: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const now = new Date();
      const chartData: Record<string, number> = {};

      // Generate more registrations for recent dates, fewer for older dates
      for (let i = 0; i < input.days; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        // Generate random numbers with different ranges based on how recent the date is
        let value: number;
        if (i < 7) {
          // Last week: higher numbers
          value = getRandomNumber(5, 15);
        } else if (i < 30) {
          // Last month: medium numbers
          value = getRandomNumber(3, 10);
        } else {
          // Older: lower numbers
          value = getRandomNumber(0, 5);
        }

        // Add some zero values randomly to make it look more realistic
        if (Math.random() > 0.8) {
          value = 0;
        }

        if (date) chartData[date] = value;
      }

      // Convert to array format matching the API response
      return Object.entries(chartData)
        .map(([name, value]) => ({
          name,
          value,
        }))
        .sort(
          (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime(),
        );
    }),

  getRegisteredTeamCountByInterval: protectedProcedure
    .input(
      z.object({
        days: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const interval = new Date(
        now.getTime() - input.days * 24 * 60 * 60 * 1000,
      );
      const registeredTeams = await ctx.db.team.findMany({
        where: {
          createdAt: {
            gte: interval,
          },
          school: {
            accountId: ctx.session.user.id,
          },
        },
      });

      const chartData = registeredTeams.reduce(
        (acc, team) => {
          const date = team.createdAt.toISOString().split("T")[0];
          if (date) acc[date] = acc[date] ? acc[date] + 1 : 1;

          return acc;
        },
        {} as Record<string, number>,
      );

      const days = input.days;
      for (let i = 0; i < days; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        if (date && !chartData[date]) {
          chartData[date] = 0;
        }
      }

      return Object.entries(chartData).map(([name, value]) => ({
        name,
        value,
      }));
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

  getSchoolCoachesLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.school.findMany({
      where: {
        accountId: ctx.session.user.id,
      },
      select: {
        coaches: {
          select: {
            id: true,
            name: true,
            teams: {
              select: {
                id: true,
                name: true,
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
              teams: true,
            },
          },
          address: true,
          name: true,
          contactName: true,
        },
      });
    }),

  getSchoolsWithDetails: withRole(["ORGANIZER"]).query(async ({ ctx }) => {
    return ctx.db.school.findMany({
      include: {
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
            teams: true,
          },
        },
      },
    });
  }),
});

type SchoolRouter = inferRouterOutputs<typeof schoolRouter>;

export type SchoolsWithDetails = School &
  SchoolRouter["getSchoolsWithDetails"][0];
