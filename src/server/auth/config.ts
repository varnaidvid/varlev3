import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import Resend from "next-auth/providers/resend";
import { Role } from "@prisma/client";
import { z } from "zod";
import { saltAndHashPassword, verifyPassword } from "@/utils/password";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: Role;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   role: Role;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: "no-reply@varlev3.hu",
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        user = await db.user.findFirst({
          where: {
            email,
          },
        });
        if (!user)
          throw new Error("Nincs felhasználó a megadott email címmel!");

        if (verifyPassword(password, user.salt, user.password)) {
          return user;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
