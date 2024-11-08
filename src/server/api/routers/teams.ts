import { name } from ".eslintrc.cjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withRole,
} from "@/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.team.findMany();
  }),

  // Endpoint to get teams with members, coaches, and competitions they have applied to
  getTeamsWithDetails: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.team.findMany({
      include: {
        members: true,
        coaches: true,
        school: {
          select: {
            name: true,
          },
        },
        applications: {
          include: {
            Competition: true,
          },
        },
      },
    });
  }),
});
