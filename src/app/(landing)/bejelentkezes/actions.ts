"use server";

import { z } from "zod";
import { signIn } from "@/server/auth";
import { signInSchema } from "@/lib/zod/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(
  values: z.infer<typeof signInSchema>,
): Promise<void> {
  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/vezerlopult", "layout");

    redirect(
      `/vezerlopult?toast=true&type=success&message=${encodeURI("Sikeres bejelentkezés!")}`,
    );
  }
}
