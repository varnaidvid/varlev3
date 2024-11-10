import { signInSchema } from "@/lib/zod/auth";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withRole,
} from "@/server/api/trpc";
import { signIn, signOut } from "@/server/auth";
import { saltAndHashPassword } from "@/utils/password";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(signInSchema).query(async ({ ctx, input }) => {
    try {
      const res = await signIn("credentials", {
        username: input.username,
        password: input.password,
        redirect: false,
      });

      return { success: true, message: "Sikeres bejelentkezés!" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Hibás felhasználónév vagy jelszó!" };
    }
  }),

  checkIfEmailIsAvailable: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const email = await ctx.db.email.findFirst({
        where: {
          email: input.email,
        },
      });

      return !email;
    }),
  checkIfAnyOfTheEmailArrayIsNotAvailable: publicProcedure
    .input(
      z.object({
        emails: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const emails = await ctx.db.email.findMany({
        where: {
          email: {
            in: input.emails,
          },
        },
      });

      return emails.map((email) => email.email);
    }),

  logout: protectedProcedure.query(async ({ ctx }) => {
    await signOut({ redirectTo: "/", redirect: true });
  }),
});
