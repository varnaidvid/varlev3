import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string({ required_error: "Adja meg felhasználónevét!" })
    .min(3, "Adja meg felhasználónevét!"),
  password: z
    .string({ required_error: "Adja meg a jelszavát!" })
    .min(8, "Adja meg a jelszavát!"),
});

export const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "Adja meg felhasználónevét!" })
      .min(3, "Legalább 3 karakter hosszú felhasználónév szükséges")
      .max(32, "Legfeljebb 32 karakter hosszú felhasználónév engedélyezett"),
    password: z
      .string({ required_error: "Adja meg a jelszavát!" })
      .min(1, "Adja meg a jelszavát!")
      .min(8, "Legalább 8 karakter hosszú jelszó szükséges")
      .max(48, "Legfeljebb 48 karakter hosszú jelszó engedélyezett"),
    password2: z.string(),
    name: z
      .string({ required_error: "Adja meg a nevét!" })
      .min(3, "Adja meg a teljes nevét!")
      .max(48, "Legfeljebb 48 karakter hosszú név engedélyezett")
      .regex(
        /^(?!.* {3})(?=.* )[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]{1,48}$/,
        "Teljes nevét adja meg!",
      ),
  })
  .refine((data) => data.password === data.password2, {
    message: "A jelszavak nem egyeznek",
    path: ["password2"],
  });
