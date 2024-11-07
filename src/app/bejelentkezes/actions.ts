"use server";

import { api } from "@/trpc/server";
import { signInSchema } from "../../lib/zod";
import { z } from "zod";

export async function login(
  values: z.infer<typeof signInSchema>,
): Promise<{ success: boolean; message: string }> {
  return await api.auth.login(values);
}
