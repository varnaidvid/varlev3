import { signInSchema } from "@/lib/zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  withRole,
} from "@/server/api/trpc";
import { signIn, signOut } from "@/server/auth";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  // register: publicProcedure
  // .input(signInSchema.required())

  login: publicProcedure
    .input(signInSchema.required())
    .query(async ({ ctx, input }) => {
      try {
        // simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200));

        await signIn("credentials", input);

        return { success: true, message: "Sikeres bejelentkezés!" };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Hibás email cím vagy jelszó!" };
      }
    }),

  logout: protectedProcedure.query(async ({ ctx }) => {
    await signOut({ redirectTo: "/", redirect: true });
  }),
});
