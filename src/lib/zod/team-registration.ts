import { z } from "zod";

export const formOneSchema = z
  .object({
    username: z.string().min(3, "Adja meg felhasználónevét!"),
    password: z.string().min(8, "Adja meg a jelszavát!"),
    password2: z.string().min(8, "Adja meg a jelszavát!"),
  })
  .refine((data) => data.password === data.password2, {
    message: "A jelszavak nem egyeznek",
    path: ["password2"],
  });
export const formTwoSchema = z.object({
  name: z.string().min(3, "Adja meg a csapat nevét!"),
  school: z.string().min(3, "Adja meg az iskola nevét!"),
  coaches: z
    .array(z.string().min(3, "Adja meg a tanár teljes nevét!"))
    .min(1, "Legalább egy felkészítő tanárt meg kell adni!"),
});
export const formThreeSchema = z.object({
  members: z
    .array(
      z.object({
        name: z.string().min(3, "Adja meg a nevét!"),
        year: z.number().int().positive("Adja meg az évfolyamát!"),
      }),
    )
    .min(1, "Legalább egy tagot meg kell adni!"),
  reserveMember: z.object({
    name: z.string().min(3, "Adja meg a nevét!"),
    year: z.number().int().positive("Adja meg az évfolyamát!"),
  }),
});
