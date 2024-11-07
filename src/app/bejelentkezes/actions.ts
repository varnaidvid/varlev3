"use server";

import { signInSchema } from "../../lib/zod";
import { z } from "zod";
import { signIn } from "@/server/auth";

export async function login(
  values: z.infer<typeof signInSchema>,
): Promise<{ success: boolean; message: string }> {
  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    return { success: true, message: "Sikeres bejelentkezés!" };
  } catch (error) {
    console.error(error);

    return { success: false, message: "Hibás felhasználónév vagy jelszó!" };
  }

  // return await api.auth.login(values);
}
