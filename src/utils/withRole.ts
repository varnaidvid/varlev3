"use server";

import { auth } from "@/server/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function withRole(role: Role, redirectTo: string) {
  const session = await auth();

  if (session?.user.role === role) return null;
  else redirect(redirectTo);
}
