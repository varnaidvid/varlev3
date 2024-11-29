"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExtraIcon } from "@/components/ui/extra-icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schoolUpdateSchema } from "@/lib/zod/school-crud";
import { api, RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, School } from "lucide-react";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SchoolUpdateForm({
  initialData,
}: {
  initialData: RouterOutputs["school"]["getSchoolDetails"];
}) {
  const form = useForm({
    resolver: zodResolver(schoolUpdateSchema),
    defaultValues: {
      schoolId: initialData.id,
      name: initialData.name,
      address: initialData.address,
      contactName: initialData.contactName,
      contactEmail: initialData.account.emails[0]?.email ?? "",
    },
  });

  const updateSchoolMutation = api.school.updateSchool.useMutation();

  const { data: isSchoolnameAvailable, isFetching: fetch1 } =
    api.school.checkIfSchoolnameIsAvailable.useQuery({
      name: form.watch("name"),
    });
  const { data: isEmailAvailable, isFetching: fetch2 } =
    api.auth.checkIfEmailIsAvailable.useQuery({
      email: form.watch("contactEmail"),
    });

  useEffect(() => {
    if (
      isSchoolnameAvailable !== undefined &&
      isSchoolnameAvailable !== null &&
      !isSchoolnameAvailable
    ) {
      form.setError("name", {
        type: "manual",
        message: "Ez az iskola már regisztrálva van!",
      });
    }

    if (
      (isSchoolnameAvailable && form.formState.errors.name) ||
      form.getValues("name") === initialData.name
    )
      form.clearErrors("name");
  }, [form, isSchoolnameAvailable]);
  useEffect(() => {
    if (
      isEmailAvailable !== undefined &&
      isEmailAvailable !== null &&
      !isEmailAvailable
    ) {
      form.setError("contactEmail", {
        type: "manual",
        message: "Ez az email cím már regisztrálva van!",
      });
    }

    if (
      (isEmailAvailable && form.formState.errors.contactEmail) ||
      form.getValues("contactEmail") === initialData.account.emails[0]?.email
    )
      form.clearErrors("contactEmail");
  }, [form, isEmailAvailable]);

  const [pending, startTransition] = useTransition();
  async function updateSchool(values: z.infer<typeof schoolUpdateSchema>) {
    startTransition(async () => {
      if (
        !isSchoolnameAvailable &&
        initialData.name !== form.getValues("name")
      ) {
        form.setError("name", {
          type: "manual",
          message: "Ez az iskola már létezik rendszerünkbe.",
        });

        return;
      }

      if (
        !isEmailAvailable &&
        initialData.account.emails[0]?.email !== form.getValues("contactEmail")
      ) {
        form.setError("contactEmail", {
          type: "manual",
          message: "Ez az e-mail cím már használatban van.",
        });

        return;
      }

      const res = await updateSchoolMutation.mutateAsync(values);
      if (res) toast.success("Az iskola adatai sikeresen frissítve lettek.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateSchool)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={School}
              variant="small"
              fromColor="from-red-500/20"
              toColor="to-orange-400/20"
            />
            Iskolád adatainak frissítése
          </CardTitle>
          <CardDescription className="!mt-4 text-justify"></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Iskolád neve *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Bolyai Technikum"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cím</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Bolyai utca 1." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapcsolattartó neve</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Kovács János" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapcsolattartó e-mail címe</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="janos@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button
            className="group w-full"
            type="submit"
            disabled={pending || fetch1 || fetch2}
          >
            Mentés
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition-all group-hover:ml-1" />
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
