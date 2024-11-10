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
import { schoolRegisterStepTwoSchema } from "@/lib/zod/school-crud";
import { ArrowLeft, Loader2, PlusCircle, Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function FormTwo({
  form,
  onSubmit,
  onBack,
  pending,
}: {
  form: UseFormReturn<z.infer<typeof schoolRegisterStepTwoSchema>>;
  onSubmit: () => void;
  onBack: () => void;
  pending: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={PlusCircle}
              variant="small"
              fromColor="from-green-500/20"
              toColor="to-sky-400/20"
            />
            Iskola adatai
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Add meg az iskola információit. A csillaggal jelölt mezők kitöltése
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intézmény neve *</FormLabel>
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
                <FormLabel>Intézmény címe</FormLabel>
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
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Az intézményet értesíteni fogjuk a kapcsolatfenntartó emailen
            keresztül a regisztrációról.
          </p>

          <Button className="group w-full" type="submit" disabled={pending}>
            Létrehozás
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition-all group-hover:ml-1" />
            )}
          </Button>
          <Button
            className="w-full"
            type="button"
            onClick={onBack}
            variant="outline"
          >
            <ArrowLeft className="size-4" />
            Vissza
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
