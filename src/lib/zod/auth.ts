import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string({ required_error: "Adja meg felhasználónevét!" })
    .min(3, "Adja meg felhasználónevét!"),
  password: z
    .string({ required_error: "Adja meg a jelszavát!" })
    .min(6, "Jelszava legalább 6 karakterből áll!"),
});
