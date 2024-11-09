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

  logout: protectedProcedure.query(async ({ ctx }) => {
    await signOut({ redirectTo: "/", redirect: true });
  }),
});
