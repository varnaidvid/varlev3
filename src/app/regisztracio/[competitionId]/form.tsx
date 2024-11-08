"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  ChevronDown,
  ChevronUp,
  Loader2,
  LogIn,
  Plus,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
// import { Turnstile } from '@marsidev/react-turnstile'
import { api } from "@/trpc/react";
import { Competition, School } from "@prisma/client";
import { formOneSchema, formTwoSchema } from "@/lib/zod/team-registration";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TeamMember from "@/components/ui/team-member";
import SelectSchool from "../../../components/ui/select-school";
import { ExtraIcon } from "../../../components/ui/extra-icon";

export default function RegisterForm({
  competition,
  schools,
}: {
  competition: Competition;
  schools: School[];
}) {
  const router = useRouter();

  const formOne = useForm<z.infer<typeof formOneSchema>>({
    resolver: zodResolver(formOneSchema),
    defaultValues: {
      username: "",
      password: "",
      password2: "",
    },
  });
  const formTwo = useForm<z.infer<typeof formTwoSchema>>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      name: "",
      members: [{ name: "", year: 1 }],
      reserveMember: { name: "", year: 1 },
      school: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: formTwo.control,
    name: "members",
  });

  const [step, setStep] = useState(2);
  const [showPassword, setShowPassword] = useState(false);

  const [pending, startTransition] = useTransition();
  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await formOne.trigger();
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await formTwo.trigger();
      if (isValid) {
        console.log(formOne.getValues(), formTwo.getValues());
      }
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-md">
        {step === 1 && (
          <Form {...formOne}>
            <form
              onSubmit={formOne.handleSubmit(handleNextStep)}
              className="space-y-4"
            >
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ExtraIcon
                    Icon={User}
                    variant="small"
                    fromColor="from-orange-500/20"
                    toColor="to-yellow-400/20"
                  />
                  Csapat beregisztrálása
                </CardTitle>
                <CardDescription className="!mt-4 text-justify">
                  Először egy közös fiókot kell létrehoznod a csapatodnak. Ezt
                  fogjátok használni a versenyhez való részvételhez,
                  információkhoz való jutásra és a feladatok beadására.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={formOne.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Csapat felhasználóneve *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="gipszjakab34"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formOne.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jelszó *</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formOne.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jelszó megerősítése *</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-password"
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword(!showPassword)}
                  />
                  <Label htmlFor="show-password">Jelszó megjelenítése</Label>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 border-t pt-6">
                <Button className="w-full" type="submit">
                  Következő lépés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
        {step === 2 && (
          <Form {...formTwo}>
            <form
              onSubmit={formTwo.handleSubmit(handleNextStep)}
              className="space-y-4"
            >
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ExtraIcon
                    Icon={Box}
                    variant="small"
                    fromColor="from-indigo-500/20"
                    toColor="to-sky-400/20"
                  />
                  Csapatod beregisztrálása
                </CardTitle>
                <CardDescription className="!mt-4 text-justify">
                  Kérjük, töltsd ki a csapatod adatait. A csapatodnak{" "}
                  {competition.maxTeamSize} főből kell állnia, illetve egy
                  póttagból.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={formTwo.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Csapat neve *</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="VarleV3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formTwo.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Iskola neve *</FormLabel>
                      <FormControl>
                        <SelectSchool
                          schools={schools}
                          onSelect={(schoolId) =>
                            formTwo.setValue("school", schoolId)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Csapattagok *</FormLabel>
                  <FormDescription className="flex justify-between">
                    <span>Adja a csapattagok neveit és évfolyamát</span>
                    <span>
                      {fields.length} / {competition.maxTeamSize}
                    </span>
                  </FormDescription>
                  {fields.map((field, index) => (
                    <TeamMember
                      key={field.id}
                      index={index}
                      control={formTwo.control}
                      remove={
                        fields.length > 1 ? () => remove(index) : undefined
                      }
                    />
                  ))}

                  {fields.length < competition.maxTeamSize && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => append({ name: "", year: 1 })}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Új csapattag hozzáadása
                    </Button>
                  )}
                </div>

                <div>
                  <FormLabel>Pót csapattag *</FormLabel>
                  <FormDescription>
                    Adja meg a pót csapattag nevét és évfolyamát
                  </FormDescription>
                  <TeamMember
                    index={"reserved"}
                    control={formTwo.control}
                    remove={undefined}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 border-t pt-6">
                <Button className="w-full" type="submit">
                  Következő lépés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Vissza
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </>
  );
}
