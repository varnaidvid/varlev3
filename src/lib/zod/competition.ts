import { z } from "zod";

export const createCompetitionSchema = z.object({
  name: z.string().min(1, "A verseny neve kötelező"),
  description: z.string().min(1, "A verseny leírása kötelező"),
  image: z.string().url("Érvényes URL-t kell megadni a képhez"),
  maxTeamSize: z.number().min(1, "A csapat maximális mérete kötelező"),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "A határidőnek a jövőben kell lennie",
  }),
  technologies: z
    .array(z.string())
    .nonempty("Legalább egy technológiát ki kell választani"),
  categories: z
    .array(z.string())
    .nonempty("Legalább egy kategóriát ki kell választani"),
  subCategories: z
    .array(z.string())
    .nonempty("Legalább egy alkategóriát ki kell választani"),
});
