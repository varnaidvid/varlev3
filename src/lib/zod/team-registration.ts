import { z } from "zod";

export const formOneSchema = z
  .object({
    username: z.string().min(3, "Adja meg felhasználónevét!"),
    password: z.string().min(6, "Legalább 6 karakter hosszúnak kell lennie!"),
    password2: z.string(),
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

export type TeamRegistrationType = {
  account: z.infer<typeof formOneSchema>;
  team: z.infer<typeof formTwoSchema>;
  members: z.infer<typeof formThreeSchema>;
  competitionId: string;
};
export const teamRegistrationSchema = z.object({
  account: formOneSchema,
  team: formTwoSchema,
  members: formThreeSchema,
  competitionId: z.string().min(1, "Adja meg a verseny azonosítóját!"),
});
