"use server";

import { signUpSchema } from "@/lib/zod";
import { api } from "@/trpc/server";
import { z } from "zod";

export async function signup(
  values: z.infer<typeof signUpSchema>,
): Promise<{ success: boolean; message: string }> {
  return await api.auth.register(values);
}
