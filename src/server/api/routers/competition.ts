import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import { AccountType, Competition } from "@prisma/client";
import {
  teamRegistrationSchema,
  TeamRegistrationType,
} from "@/lib/zod/team-crud";
import { saltAndHashPassword } from "@/utils/password";
import withRole from "@/utils/withRole";
import { id } from "date-fns/locale";
import { connect } from "http2";

export const competitionRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.competition.findUnique({
        where: { id: input.id },
        include: {
          technologies: true,
          categories: true,
          subCategories: {
            include: {
              teams: true,
            },
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany();
  }),

  getResults: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db.result.findMany({
        where: {
          competitionId: input.id,
        },
        include: {
          Team: {
            include: {
              members: true,
              school: true,
              coaches: true,
              technologies: true,
              SubCategory: true,
            },
          },
        },
      });

      return results;
    }),

  registerTeam: publicProcedure
    .input(teamRegistrationSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        account: { username, password },
        members: { members, reserveMember },
        team: { name, school, coaches, technologies, subCategory },
        competitionId,
      } = input;

      const competition = await ctx.db.competition.findUnique({
        where: { id: competitionId },
      });
      if (!competition) throw new Error("Nincs ilyen verseny!");

      const team = await ctx.db.team.create({
        data: {
          name,
          school: { connect: { name: school } },
          coaches: {
            connectOrCreate: coaches.map((coach) => ({
              where: { name: coach },
              create: { name: coach, schoolName: school },
            })),
          },
          Competition: { connect: { id: competitionId } },
          technologies: {
            connect: technologies!.map((tech) => ({ id: tech.id })),
          },
          account: {
            create: {
              username,
              type: "TEAM" as AccountType,
              ...saltAndHashPassword(password),
            },
          },
          SubCategory: { connect: { id: subCategory.id } },
          status: "WAITING_FOR_SCHOOL_APPROVAL",
        },
        include: {
          school: true,
        },
      });

      await ctx.db.member.createMany({
        data: members.map((member) => ({ ...member, teamId: team.id })),
      });

      let _temp: any = reserveMember;
      if (reserveMember?.name)
        await ctx.db.member.create({
          data: { ..._temp, teamId: team.id },
        });

      return team;
    }),

  getAllWithDetails: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany({
      include: {
        teams: true,
        technologies: true,
        categories: true,
        subCategories: {
          include: {
            teams: true,
          },
        },
      },
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
        subCategories: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { technologies, categories, subCategories, ...competitionData } =
        input;

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

      const subCategoryPromises = subCategories.map((subCategory) =>
        ctx.db.subCategory.create({
          data: {
            name: subCategory,
            competitionId: competition.id,
          },
        }),
      );

      await Promise.all(subCategoryPromises);

      return competition;
    }),

  update: publicProcedure
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
        subCategories: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { technologies, categories, subCategories, ...competitionData } =
        input;

      const competition = await ctx.db.competition.update({
        where: { id: input.id },
        data: {
          ...competitionData,
          technologies: {
            set: technologies.map((techId) => ({ id: techId })),
          },
          categories: {
            set: categories.map((categoryId) => ({ id: categoryId })),
          },
          subCategories: {
            set: subCategories.map((subCategoryId) => ({ id: subCategoryId })),
          },
        },
      });

      return competition;
    }),
});

export type CompetitionRouter = inferRouterOutputs<typeof competitionRouter>;

export type CompetitionWithDetails = Competition &
  CompetitionRouter["getAllWithDetails"][0];
