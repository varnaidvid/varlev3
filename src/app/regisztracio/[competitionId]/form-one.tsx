"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { stepOneSchema } from "@/lib/zod/team-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function FormOne({
  form,
  setStep,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof stepOneSchema>>>;
  setStep: (step: number) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof stepOneSchema>) {
    console.log(values);
    setStep(2);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">
            <div className="flex flex-col gap-2">
              <span>Csapatod beregisztrálása</span>
            </div>
          </CardTitle>
          <CardDescription>
            Először egy közös fiókot kell létrehoznod a csapatodnak. Ezt
            fogjátok használni a szintén közös
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Felhasználónév</FormLabel>
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
                <FormLabel>Jelszó</FormLabel>
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
                <FormLabel>Jelszó megerősítése</FormLabel>
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
            <Label htmlFor="airplane-mode">Jelszó megjelenítése</Label>
          </div>

          {/* <Turnstile
                options={{
                  theme: 'light',
                  size: 'flexible',
                  language: 'hu'
                }}
                className="border mt-6"
                siteKey="0x4AAAAAAAxl6rMTte5ycyHD"
                onSuccess={(token) => setCaptchaToken(token)}
              /> */}
        </CardContent>

        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full">
            Következő lépés
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
