"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTechnologySchema } from "@/lib/zod/technology";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Cpu, Folder, Check, X, Loader } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { Technology } from "@prisma/client";

export function EditTechnologyForm({ technology }: { technology: Technology }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateTechnologySchema>>({
    resolver: zodResolver(updateTechnologySchema),
    defaultValues: {
      name: technology.name,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateTechnologyMutation = api.technology.update.useMutation();

  const handleSubmit = async (data: z.infer<typeof updateTechnologySchema>) => {
    setIsSubmitting(true);
    try {
      await updateTechnologyMutation.mutateAsync({
        id: technology.id,
        ...data,
      });
      toast.success("Technológia sikeresen frissítve!");
      router.push("/vezerlopult/technologiak");
    } catch (error) {
      console.error("Error updating technology:", error);
      toast.error("Hiba történt a technológia frissítése során.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-md space-y-4"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={Cpu}
              variant="small"
              fromColor="from-indigo-500/20"
              toColor="to-sky-400/20"
            />
            Technológia Szerkesztése
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, módosítsa a technológia adatait.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technológia neve *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Technológia neve"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2 pt-6">
          <div className="flex w-full gap-2">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 animate-spin" /> Frissítés...
                </>
              ) : (
                <>
                  <Check className="mr-2" /> Technológia Frissítése
                </>
              )}
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              <X className="mr-2" /> Mégse
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
}
