import { object, string } from "zod";

export const signInSchema = object({
  username: string({ required_error: "Adja meg felhasználónevét!" }),
  password: string({ required_error: "Adja meg a jelszavát!" }),
});

export const signUpSchema = object({
  username: string({ required_error: "Adja meg felhasználónevét!" })
    .min(3, "Legalább 3 karakter hosszú felhasználónév szükséges")
    .max(32, "Legfeljebb 32 karakter hosszú felhasználónév engedélyezett"),
  password: string({ required_error: "Adja meg a jelszavát!" })
    .min(1, "Adja meg a jelszavát!")
    .min(8, "Legalább 8 karakter hosszú jelszó szükséges")
    .max(32, "Legfeljebb 32 karakter hosszú jelszó engedélyezett"),
  name: string({ required_error: "Adja meg a nevét!" })
    .min(1, "Adja meg a nevét!")
    .max(32, "Legfeljebb 32 karakter hosszú név engedélyezett")
    .regex(/^(?!.* {3})(?=.* )[a-zA-Z ]{1,32}$/, "Teljes nevét adja meg!"),
});
