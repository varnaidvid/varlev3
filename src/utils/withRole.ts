"use server";

import { auth } from "@/server/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function withRole(roles: Role[], redirectTo?: string) {
  const session = await auth();

  if (session?.user.role && roles.includes(session?.user.role)) return;
  else redirect(redirectTo || "/vezerlopult");
}
