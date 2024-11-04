import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Adja meg email címét!" })
    .min(1, "Adja meg email címét!")
    .email("Nem helyes email cím formátum!"),
  password: string({ required_error: "Adja meg a jelszavát!" })
    .min(1, "Adja meg a jelszavát!")
    .min(8, "Legalább 8 karakter hosszú jelszó szükséges")
    .max(32, "Legfeljebb 32 karakter hosszú jelszó engedélyezett"),
});
