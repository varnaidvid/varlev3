import { updateTeamSchema } from "@/lib/zod/team-registration";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { api } from "@/trpc/server";
import { ApplicationStatus, Team } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { schoolRouter } from "./school";

export const teamsRouter = createTRPCRouter({
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

  getTeamsByCompetition: publicProcedure
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
        },
      });
    }),

  updateTeam: protectedProcedure
    .input(updateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        formOne: { coaches, name, school, technologies, subCategory },
        formTwo: { members, reserveMember },
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
});

type TeamsRouter = inferRouterOutputs<typeof teamsRouter>;

export type TeamWithDetails = Team & TeamsRouter["getTeamsByCompetition"][0];
