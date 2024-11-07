import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { Role } from "@prisma/client";
import { z } from "zod";
import { saltAndHashPassword, verifyPassword } from "@/utils/password";
import { randomUUID } from "crypto";
import { GetServerSidePropsContext } from "next";
import { DefaultSession, NextAuthConfig, Session, User } from "next-auth";
import { User as NextUser } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      username: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authConfig = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/bejelentkezes",
    signOut: "/kijelentkezes",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      id: "credentials",
      name: "Felhasználónév és jelszó",
      type: "credentials",

      credentials: {
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        const { username, password } =
          await signInSchema.parseAsync(credentials);

        user = await db.user.findFirst({
          where: {
            username,
          },
        });
        if (!user)
          throw new Error("Nem találtuk fiókját az adott felhasználónévvel!");

        if (verifyPassword(password, user.salt, user.password)) return user;
        else throw new Error("Hibás jelszó!");
      },
    }),
  ],
  callbacks: {
    session(sessionArgs: any) {
      if ("token" in sessionArgs) {
        let session = sessionArgs.session;
        if ("user" in sessionArgs.token) {
          const tokenUser = sessionArgs.token.user as User & Session["user"];

          if (tokenUser.id) {
            session.user.id = tokenUser.id;
            session.user.role = tokenUser.role;
            session.user.username = tokenUser.username;

            return session;
          }
        }
      }
      return sessionArgs.session;
    },
    jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },
  },
} satisfies NextAuthConfig;
