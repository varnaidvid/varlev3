import { updateTeamSchema } from "@/lib/zod/team-crud";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withOwner,
  withRole,
} from "@/server/api/trpc";
import { api } from "@/trpc/server";
import { ApplicationStatus, Team } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { schoolRouter } from "./school";

export const teamsRouter = createTRPCRouter({
  checkIfUsernameAvailable: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const account = await ctx.db.account.findFirst({
        where: {
          username: input.username,
        },
      });

      return !account;
    }),

  checkIfTeamNameAvailable: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          name: input.name,
        },
      });

      return !team;
    }),

  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.team.findMany();
  }),

  getTeamByAccountId: protectedProcedure
    .input(
      z.object({
        accountId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.team.findFirst({
        where: {
          accountId: input.accountId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          SubCategory: true,
          account: {
            include: {
              emails: true,
            },
          },
          Competition: {
            include: {
              subCategories: true,
              technologies: true,
              categories: true,
            },
          },
        },
      });
      if (!res) throw new Error("Team not found");

      return res;
    }),

  getTeamById: protectedProcedure
    .input(
      z.object({
        teamId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findFirst({
        where: {
          id: input.teamId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          SubCategory: true,
          account: {
            include: {
              emails: true,
            },
          },
          Competition: {
            include: {
              categories: true,
              subCategories: true,
            },
          },
        },
      });
    }),

  getTeamByIdForSchool: withRole(["SCHOOL"])
    .input(
      z.object({
        teamId: z.string().cuid(),
        accountId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await withOwner({
        ctx,
        accountId: input.accountId,
      });

      return await ctx.db.team.findFirst({
        where: {
          id: input.teamId,
          accountId: input.accountId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          account: {
            include: {
              emails: true,
            },
          },
          Competition: {
            include: {
              categories: true,
              subCategories: true,
            },
          },
        },
      });
    }),

  getTeamsByCompetition: withRole(["ORGANIZER"])
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
        },
        include: {
          members: true,
          coaches: true,
          technologies: true,
          SubCategory: true,
          school: true,
        },
      });
    }),

  getTeamsBySchoolAccount: withRole(["SCHOOL", "ORGANIZER"])
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

      return await ctx.db.team.findMany({
        where: {
          school: {
            accountId: input.accountId,
          },
        },
        include: {
          members: true,
          coaches: true,
          technologies: true,
          SubCategory: true,
          school: true,
        },
      });
    }),

  updateTeam: protectedProcedure
    .input(updateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        formOne: { coaches, name, school, technologies, subCategory },
        formTwo: { members, reserveMember, emails },
        teamId,
      } = input;

      const team = await ctx.db.team.findFirst({
        where: {
          id: teamId,
        },
      });

      const schoolRecord = await ctx.db.school.findUnique({
        where: { name: school },
      });
      if (!schoolRecord) throw new Error("School not found");

      let newMembers = [
        ...members.map((member) => ({
          name: member.name,
          year: member.year!,
          isReserve: false,
        })),
      ];
      if (reserveMember?.name) {
        newMembers.push({
          name: reserveMember.name,
          year: reserveMember.year!,
          isReserve: true,
        });
      }

      const status =
        team?.status === "REJECTED_BY_ORGANIZER"
          ? "WAITING_FOR_ORGANIZER_APPROVAL"
          : team?.status;

      const res = await ctx.db.team.update({
        where: {
          id: teamId,
        },
        data: {
          name: name,
          status: status as ApplicationStatus,
          school: {
            connect: { id: schoolRecord.id },
          },
          coaches: {
            deleteMany: {},
            create: coaches.map((coachName) => ({
              name: coachName,
              School: {
                connect: { id: schoolRecord.id },
              },
            })),
          },
          account: {
            update: {
              emails: {
                deleteMany: {},
                create: emails?.map((email) => ({
                  email: email,
                })),
              },
            },
          },
          technologies: {
            set: [],
            connectOrCreate: technologies?.map((tech) => ({
              where: { id: tech.id },
              create: { name: tech.name },
            })),
          },
          SubCategory: {
            connect: { id: subCategory.id },
          },
          members: {
            deleteMany: {},
            create: [...newMembers],
          },
        },

        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
        },
      });

      console.log("RES FROM updateTeam", res);

      return res;
    }),

  getTeamsForCSV: publicProcedure
    .input(
      z.object({
        competitionId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findMany({
        where: {
          competitionId: input.competitionId,
        },
        include: {
          members: true,
          coaches: true,
          school: true,
          technologies: true,
          account: {
            include: {
              emails: true,
            },
          },
        },
      });
    }),

  updateTeamStatus: publicProcedure
    .input(
      z.object({
        teamId: z.string().cuid(),
        status: z.nativeEnum(ApplicationStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          status: input.status,
        },
      });
    }),

  updateTeamApplicationForm: protectedProcedure
    .input(
      z.object({
        teamId: z.string().cuid(),
        applicationForm: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          applicationForm: input.applicationForm,
        },
      });
    }),
});

type TeamsRouter = inferRouterOutputs<typeof teamsRouter>;

export type TeamWithDetails = Team & TeamsRouter["getTeamsByCompetition"][0];
