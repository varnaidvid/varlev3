import { signInSchema, signUpSchema } from "@/lib/zod";
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
  register: publicProcedure
    .input(signUpSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { username, password, name } = input;

        // simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200));

        const { salt, hash } = saltAndHashPassword(password);

        await ctx.db.user.create({
          data: {
            username,
            password: hash,
            salt,
            name,
          },
        });

        return { success: true, message: "Sikeres regisztráció!" };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Sikertelen regisztráció!" };
      }
    }),

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

  logout: protectedProcedure.query(async ({ ctx }) => {
    await signOut({ redirectTo: "/", redirect: true });
  }),
});
