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
import { Check, Fingerprint, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// import { Turnstile } from '@marsidev/react-turnstile'
import { signup } from "./actions";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { signUpSchema } from "@/lib/zod";
import Logo from "@/components/logo";

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      password2: "",
      name: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [pending, setPending] = useState<boolean>(false);
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setPending(true);

    const res = await signup(values);

    if (!res.success) {
      toast.error(res.message);
      setPending(false);

      return;
    }

    toast.success(res.message);
    router.push("/bejelentkezes");

    // if (!captchaToken) {
    //   toast.error("Captcha ellenőrzés szükséges");
    //   return;
    // }
  }

  return (
    <>
      <Card className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">
                <div className="flex flex-col gap-2">
                  <Logo iconBg="black" size="small" />

                  <span>Fiók létrehozása</span>
                </div>
              </CardTitle>
              <CardDescription>
                Alábbi űrlap kitöltésével hozhatsz létre fiókot:
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
                      <Input
                        type="text"
                        placeholder="gipszjakab34"
                        {...field}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teljes neve</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Gipsz Jakab"
                        {...field}
                        disabled={pending}
                      />
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
                        disabled={pending}
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
                        disabled={pending}
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
              <Button className="w-full" disabled={pending}>
                {pending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Fingerprint className="mr-2 h-4 w-4" />
                )}{" "}
                Létrehozás
              </Button>
              <p className="mt-2 text-center text-sm text-slate-500">
                Ha van már fiókja,{" "}
                <Link href="/bejelentkezes" className="text-blue-500 underline">
                  kattintson ide a bejelentkezéshez
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
