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
import { Folder, Check, X, Loader } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { CategoryWithDetails } from "@/server/api/routers/category";

export function EditCategoryForm({
  category,
}: {
  category: CategoryWithDetails;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateCategoryMutation = api.category.update.useMutation();

  const handleSubmit = async (data: z.infer<typeof createCategorySchema>) => {
    setIsSubmitting(true);
    try {
      await updateCategoryMutation.mutateAsync({ id: category.id, ...data });
      toast.success("Kategória sikeresen frissítve!");
      router.push("/vezerlopult/kategoriak");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Hiba történt a kategória frissítése során.");
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
              Icon={Folder}
              variant="small"
              fromColor="from-indigo-500/20"
              toColor="to-sky-400/20"
            />
            Kategória Szerkesztése
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Alábbi űrlap segítségével szerkesztheti a kategória adatait.
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
                  <Input type="text" placeholder="Kategória neve" {...field} />
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
                  <Textarea placeholder="Kategória leírása" {...field} />
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
                  <Check className="mr-2" /> Kategória Frissítése
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
