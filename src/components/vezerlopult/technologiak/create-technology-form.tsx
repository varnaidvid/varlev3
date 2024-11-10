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
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTechnologySchema } from "@/lib/zod/technology";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";

export function CreateTechnologyForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createTechnologySchema>>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTechnologyMutation = api.technology.create.useMutation();

  const handleSubmit = async (data: z.infer<typeof createTechnologySchema>) => {
    setIsSubmitting(true);
    try {
      await createTechnologyMutation.mutateAsync(data);
      toast.success("Technológia sikeresen létrehozva!");
    } catch (error) {
      console.error("Error creating technology:", error);
      toast.error("Hiba történt a technológia létrehozása során.");
    } finally {
      setIsSubmitting(false);
      router.push("/vezerlopult/technologiak");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={Folder}
              variant="small"
              fromColor="from-indigo-500/20"
              toColor="to-sky-400/20"
            />
            Új technológia részletei
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, töltsd ki az új technológia adatait.
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technológia leírása *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Technológia leírása" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Létrehozás..." : "Technológia Létrehozása"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
