import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import { Competition } from "@prisma/client";
import {
  teamRegistrationSchema,
  TeamRegistrationType,
} from "@/lib/zod/team-registration";
import { saltAndHashPassword } from "@/utils/password";
import withRole from "@/utils/withRole";
import { id } from "date-fns/locale";

export const competitionRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.competition.findUnique({
        where: { id: input.id },
        include: { technologies: true, categories: true },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany();
  }),

  registerTeam: publicProcedure
    .input(teamRegistrationSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        account: { username, password },
        members: { members, reserveMember },
        team: { name, school, coaches, technologies },
        competitionId,
      } = input;

      const competition = await ctx.db.competition.findUnique({
        where: { id: competitionId },
      });
      if (!competition) throw new Error("Nincs ilyen verseny!");

      console.log("school we're tryna find NAME:", school);

      const _school = await ctx.db.school.findUnique({
        where: { name: school },
      });
      if (!_school) throw new Error("Nincs ilyen iskola!");

      console.log("school exists", _school);

      const team = await ctx.db.team.create({
        data: {
          name,
          school: { connect: { id: _school.id } },
          coaches: {
            createMany: {
              data: coaches.map((coach) => ({
                name: coach,
                schoolId: _school.id,
              })),
            },
          },
          Competition: { connect: { id: competitionId } },
          technologies: {
            connect: technologies?.map((tech) => ({ id: tech })),
          },
          account: {
            create: {
              username,
              type: "TEAM",
              ...saltAndHashPassword(password),
            },
          },
        },
      });

      await ctx.db.member.createMany({
        data: members.map((member) => ({ ...member, teamId: team.id })),
      });
      await ctx.db.member.create({
        data: { ...reserveMember, teamId: team.id, isReserve: true },
      });

      return team;
    }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany({
      include: { teams: true, technologies: true },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        maxTeamSize: z.number(),
        deadline: z.date(),
        technologies: z.array(z.string()),
        categories: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { technologies, categories, ...competitionData } = input;

      const competition = await ctx.db.competition.create({
        data: {
          ...competitionData,
          technologies: {
            connect: technologies.map((techId) => ({ id: techId })),
          },
          categories: {
            connect: categories.map((categoryId) => ({ id: categoryId })),
          },
        },
      });

      return competition;
    }),
});

export type CompetitionRouter = inferRouterOutputs<typeof competitionRouter>;

export type CompetitionWithDetails = Competition &
  CompetitionRouter["getAllWithDetails"][0];
