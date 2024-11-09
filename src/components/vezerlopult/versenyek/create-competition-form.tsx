"use client";

import { useState } from "react";
import {
  Box,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Image,
  Save,
  Loader,
} from "lucide-react";
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
import { Technology, Category } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { ContentEditor } from "./content-editor";
import NumericInput from "@/components/ui/numeric-input";
import { ImageUpload } from "./image-upload";
import MultiSelect from "./multi-select";
import { createFileInfo } from "@/utils/file-helpers";
import { createId } from "@paralleldrive/cuid2";
import { uploadFile } from "@/utils/upload-file";
import { createCompetition } from "../../../app/vezerlopult/versenyek/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateCompetitionForm({
  technologies,
  categories,
}: {
  technologies: Technology[];
  categories: Category[];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createCompetitionSchema>>({
    resolver: zodResolver(createCompetitionSchema),
    defaultValues: {
      name: "",
      image: "",
      description: `
      Itt leírhatja a verseny célját, részleteit, szabályait, stb.
      `,
      maxTeamSize: 3,
      deadline: undefined,
      technologies: [],
      categories: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    data: z.infer<typeof createCompetitionSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      const competitionId = createId();
      const imageInfo = createFileInfo(competitionId, data.image);
      const uploadedImage = await uploadFile(
        imageInfo.source,
        imageInfo.fileName,
      );
      data.image = uploadedImage.url;

      const competitionData = {
        id: competitionId,
        ...data,
      };

      console.log("competitionData", competitionData);

      await createCompetition(competitionData);
      toast.success("Verseny sikeresen létrehozva!");
    } catch (error) {
      console.error("Error creating competition:", error);
      toast.error("Hiba történt a verseny létrehozása során.");
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
            Új verseny részletei
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, töltsd ki az új verseny adatait.
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
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Verseny Publikálása
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
