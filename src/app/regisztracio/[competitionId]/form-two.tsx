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
import { stepTwoSchema } from "@/lib/zod/team-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function FormTwo({
  form,
  setStep,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof stepTwoSchema>>>;
  setStep: (step: number) => void;
}) {
  function onSubmit(values: z.infer<typeof stepTwoSchema>) {
    console.log(values);
    setStep(3);
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
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Csapat neve</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="gipszjakab34" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            Létrehozás
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
