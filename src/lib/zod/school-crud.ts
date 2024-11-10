import { z } from "zod";

export const schoolRegisterStepOneSchema = z.object({
  username: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adjon meg egy felhasználónevet - legalább 3 karakter",
  }),
  password: z.string({ required_error: "Kötelező mező" }).min(6, {
    message: "Adjon meg egy jelszót - legalább 6 karakter",
  }),
  password2: z.string({ required_error: "Kötelező mező" }).min(6, {
    message: "Adja meg újra a jelszót",
  }),
});

export const schoolRegisterStepTwoSchema = z.object({
  name: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg az iskola teljes nevét",
  }),
  address: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg az iskola címét",
  }),
  contactName: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg a kapcsolattartó teljes nevét",
  }),
  contactEmail: z.string({ required_error: "Kötelező mező" }).email({
    message: "Adjon meg egy érvényes email címet",
  }),
});

export const schoolRegisterType = z.object({
  stepOne: schoolRegisterStepOneSchema,
  stepTwo: schoolRegisterStepTwoSchema,
});

export const schoolUpdateSchema = z.object({
  schoolId: z.string().cuid(),
  name: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg az iskola teljes nevét",
  }),
  address: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg az iskola címét",
  }),
  contactName: z.string({ required_error: "Kötelező mező" }).min(3, {
    message: "Adja meg a kapcsolattartó teljes nevét",
  }),
  contactEmail: z.string({ required_error: "Kötelező mező" }).email({
    message: "Adjon meg egy érvényes email címet",
  }),
});
