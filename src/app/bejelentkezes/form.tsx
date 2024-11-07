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
import { login } from "./actions";
import { Loader2, LogIn } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import { Turnstile } from '@marsidev/react-turnstile'
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Nem megfelelő email cím" }),
  password: z.string(),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [pending, setPending] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    return;
    // if (!captchaToken) {
    //   toast.error("Captcha ellenőrzés szükséges");
    //   return;
    // }

    // setPending(true);
    // const res = await login(values.email, values.password, captchaToken);
    // setPending(false);

    // if (res.error) {
    //   toast.error(res.message);
    //   return;
    // }

    // toast.success(res.message);

    // router.push("/");
  }

  return (
    <>
      <Card className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">
                <div className="flex flex-col gap-2">
                  <h1 className="font-mono text-2xl font-extrabold tracking-tight">
                    VarleV3
                  </h1>
                  <span>Bejelentkezés</span>
                </div>
              </CardTitle>
              <CardDescription>
                Jelentkezz be a vezérlőpultod eléréséhez
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email cím</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="pelda@gmail.com"
                        {...field}
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
                        type="password"
                        placeholder="********"
                        {...field}
                      />
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
                className="border"
                siteKey="0x4AAAAAAAxl6rMTte5ycyHD"
                onSuccess={(token) => setCaptchaToken(token)}
              /> */}
            </CardContent>

            <CardFooter className="flex-col gap-2 border-t pt-6">
              <Button className="w-full" disabled={pending}>
                {pending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}{" "}
                Belépés
              </Button>
              <p className="mt-2 text-center text-sm text-slate-500">
                Ha még nincs fiókod,{" "}
                <Link href="/regisztracio" className="text-blue-500 underline">
                  kattints ide a regisztrációhoz
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
