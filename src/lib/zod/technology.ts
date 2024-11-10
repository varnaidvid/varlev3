import { z } from "zod";

export const createTechnologySchema = z.object({
  name: z.string().min(1, "A név megadása kötelező"),
});

export const updateTechnologySchema = z.object({
  name: z.string().min(1, "A név megadása kötelező"),
});
