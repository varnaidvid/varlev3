"use server";

import { auth } from "@/server/auth";
import { AccountType } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function withRole(
  roles: AccountType[],
  redirectTo?: string,
) {
  const session = await auth();

  if (session?.user.type && roles.includes(session?.user.type)) return;
  else redirect(redirectTo || "/vezerlopult");
}
