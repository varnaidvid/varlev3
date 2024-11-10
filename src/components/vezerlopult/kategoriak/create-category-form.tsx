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
import { createCategorySchema } from "@/lib/zod/category";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";

export function CreateCategoryForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCategoryMutation = api.category.create.useMutation();

  const handleSubmit = async (data: z.infer<typeof createCategorySchema>) => {
    setIsSubmitting(true);
    try {
      await createCategoryMutation.mutateAsync(data);
      toast.success("Kategória sikeresen létrehozva!");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Hiba történt a kategória létrehozása során.");
    } finally {
      setIsSubmitting(false);
      router.push("/vezerlopult/kategoriak");
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
            Új kategória részletei
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, töltsd ki az új kategória adatait.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategória neve *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Programozás" {...field} />
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
                <FormLabel>Kategória leírása *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ebben a kategóriában találhatóak a programozással kapcsolatos versenyek..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Létrehozás..." : "Kategória Létrehozása"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
