"use server";

import { z } from "zod";
import { signIn } from "@/server/auth";
import { signInSchema } from "@/lib/zod/auth";

export async function login(
  values: z.infer<typeof signInSchema>,
): Promise<{ success: boolean; message: string }> {
  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: true,
      redirectTo: `/vezerlopult?toast=true&type=success&message=${encodeURI("Sikeres bejelentkezés!")}`,
    });

    return { success: true, message: "Sikeres bejelentkezés!" };
  } catch (error) {
    console.error(error);

    return { success: false, message: "Hibás felhasználónév vagy jelszó!" };
  }

  // return await api.auth.login(values);
}
