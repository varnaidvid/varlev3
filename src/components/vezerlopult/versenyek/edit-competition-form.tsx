"use client";

import { useState } from "react";
import { Box, ArrowRight, Loader, Users } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompetitionSchema } from "@/lib/zod/competition";
import { Technology, Category, SubCategory } from "@prisma/client";
import NumericInput from "@/components/ui/numeric-input";
import { ImageUpload } from "./image-upload";
import MultiSelect from "./multi-select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ContentEditor } from "./content-editor";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { CompetitionWithDetails } from "@/server/api/routers/competition";
import EditTagInput, { Tag } from "./edit-tag-input";
import { api } from "@/trpc/react";

export function EditCompetitionForm({
  competition,
  technologies,
  categories,
}: {
  competition: CompetitionWithDetails;
  technologies: Technology[];
  categories: Category[];
}) {
  const router = useRouter();
  const updateCompetitionMutation = api.competition.update.useMutation();

  const form = useForm<z.infer<typeof createCompetitionSchema>>({
    resolver: zodResolver(createCompetitionSchema),
    defaultValues: {
      name: competition.name,
      description: competition.description,
      image: competition.image,
      maxTeamSize: competition.maxTeamSize,
      deadline: new Date(competition.deadline),
      technologies: competition.technologies.map((tech) => tech.id),
      categories: competition.categories.map((cat) => cat.id),
      subCategories: competition.subCategories.map((subCat) => subCat.id),
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    data: z.infer<typeof createCompetitionSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      await updateCompetitionMutation.mutateAsync({
        ...data,
        id: competition.id,
      });
      toast.success("Verseny sikeresen frissítve!");
    } catch (error) {
      console.error("Error updating competition:", error);
      toast.error("Hiba történt a verseny frissítése során.");
    } finally {
      setIsSubmitting(false);
      router.push("/vezerlopult/versenyek");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={Box}
              variant="small"
              fromColor="from-indigo-500/20"
              toColor="to-sky-400/20"
            />
            Verseny szerkesztése
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, módosítsa a verseny adatait.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verseny neve *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Verseny neve" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verseny képe *</FormLabel>
                <FormControl>
                  <ImageUpload field={field} form={form} />
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
                <FormLabel>Verseny leírása *</FormLabel>
                <span className="mt-2 block text-sm text-muted-foreground">
                  <span className="text-sm text-muted-foreground">
                    Címsorokat következő módon hozhat létre
                  </span>
                  <ul className="mb-3 list-disc pl-5">
                    <li>
                      <b>#</b> = Nagy Címsor
                    </li>
                    <li>
                      <b>##</b> = Közepes Címsor
                    </li>
                    <li>
                      <b>###</b> = Kis Címsor
                    </li>
                  </ul>
                </span>
                <FormControl>
                  <ContentEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Markdown szintaxissal is formázhatja a szöveget.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxTeamSize"
            render={({ field }) => (
              <FormItem className="max-w-xs">
                <FormLabel>Maximális csapatméret *</FormLabel>
                <FormControl>
                  <NumericInput
                    value={field.value}
                    onChange={field.onChange}
                    minValue={1}
                    maxValue={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <DatePickerField
                label="Határidő"
                description="Kérjük, válasszon egy határidőt."
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Felhasználható Technológiák *</FormLabel>
                <FormControl>
                  <MultiSelect
                    form={form}
                    name="technologies"
                    items={technologies}
                    placeholder="Válasszon technológiákat..."
                    noItemsText="Nincs találat."
                  />
                </FormControl>
                <FormDescription>
                  Válassza ki a versenyen használható technológiákat.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategóriák *</FormLabel>
                <FormControl>
                  <MultiSelect
                    form={form}
                    name="categories"
                    items={categories}
                    placeholder="Válasszon kategóriákat..."
                    noItemsText="Nincs találat."
                  />
                </FormControl>
                <FormDescription>
                  Válassza ki melyik kategóriákba tartozzon a verseny.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alkategóriák *</FormLabel>
                <FormControl>
                  <EditTagInput
                    value={field.value}
                    subCategories={competition.subCategories}
                    competitionId={competition.id}
                    onChange={(tags) =>
                      field.onChange(tags.map((tag) => tag.id))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Adja meg az alkategóriákat, amelyeket létre szeretne hozni
                  vagy törölni.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Verseny Frissítése
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
