"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(
  email: string,
  password: string,
  captchaToken: string,
) {
  return "anyád";
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //     options: {
  //       captchaToken: captchaToken,
  //     },
  //   });
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   if (error) {
  //     let res =
  //       error.message == "Invalid login credentials"
  //         ? "Hibás email cím vagy jelszó"
  //         : error.message == "Email not confirmed"
  //           ? "Nincs még megerősítve az email címed"
  //           : "Próbálja újra késöbb, vagy keressen fel minket a support@leoai.hu címen.";

  //     return {
  //       error: true,
  //       message: res,
  //     };
  //   }

  //   return {
  //     error: false,
  //     message: "Sikeres bejelentkezés",
  //   };
}
