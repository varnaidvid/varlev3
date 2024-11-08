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
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { Turnstile } from '@marsidev/react-turnstile'
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { signInSchema } from "@/lib/zod/auth";
import Logo from "@/components/logo";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [pending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    startTransition(() =>
      login(values)
        .then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          toast.success(res.message);
          router.push("/vezerlopult");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Hibás felhasználónév vagy jelszó!");
        }),
    );
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Felhasználónév:</FormLabel>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jelszó</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={pending}
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
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
