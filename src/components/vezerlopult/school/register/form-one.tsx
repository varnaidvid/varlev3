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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { schoolRegisterStepOneSchema } from "@/lib/zod/school-crud";
import { ArrowRight, Loader2, PlusCircle, Save } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function FormOne({
  form,
  onSubmit,
  pending,
}: {
  form: UseFormReturn<z.infer<typeof schoolRegisterStepOneSchema>>;
  onSubmit: () => void;
  pending: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

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
            Fiók létrehozása
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Ezzel a fiókkal fog tudni, majd az intézmény kapcsolattartói
            bejelentkezni és kezelni az iskolához tartozó adatokat.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Csapat felhasználóneve *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="gipszjakab34" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
            control={form.control}
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
          <Button className="group w-full" type="submit" disabled={pending}>
            Következő lépés
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4 transition-all group-hover:ml-1" />
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
