"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Megaphone, Router, Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const createNotificationSchema = z.object({
  subject: z
    .string()
    .min(1, "A tárgy megadása kötelező")
    .max(100, "A tárgy maximum 100 karakter lehet"),
  message: z
    .string()
    .min(1, "Az üzenet megadása kötelező")
    .max(1000, "Az üzenet maximum 1000 karakter lehet"),
});

type CreateNotificationInput = z.infer<typeof createNotificationSchema>;

export default function CreateNewAnnouncement({
  competitionId,
}: {
  competitionId: string;
}) {
  const session = useSession();
  const router = useRouter();

  const form = useForm<CreateNotificationInput>({
    resolver: zodResolver(createNotificationSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const createAnnouncementMutation =
    api.notification.competitionAnnouncement.useMutation();

  async function onSubmit(values: CreateNotificationInput) {
    await createAnnouncementMutation.mutateAsync({
      competitionId,
      subject: values.subject,
      message: values.message,
      organizerAccountId: session.data!.user.id,
    });

    form.reset();

    toast.success("Közlemény sikeresen létrehozva");
    router.refresh();
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Új közlemény létrehozása</CardTitle>
        <CardDescription>
          Hozzon létre új közleményt a versenyhez kapcsolódóan
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tárgy</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adja meg a közlemény tárgyát"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A közlemény rövid, tömör összefoglalása
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Üzenet</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Írja be a közlemény részletes szövegét"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormDescription>
                    A közlemény részletes tartalma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="group w-full"
              disabled={createAnnouncementMutation.status === "pending"}
            >
              {createAnnouncementMutation.status === "pending"
                ? "Létrehozás"
                : "Közlemény létrehozása"}
              {createAnnouncementMutation.status === "pending" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4 transition-all group-hover:ml-1" />
              )}
            </Button>

            <FormDescription>
              A közlemény elküldése után az összes versenyhez kapcsolódó
              versenyző értesítést kap, mind az vezérlőpultba lévő értesítési
              központjába, mind az e-mail címére.
            </FormDescription>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
