"use client";

import {
  Box,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Image,
  Save,
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

export function CreateCompetitionForm({
  technologies,
  categories,
}: {
  technologies: Technology[];
  categories: Category[];
}) {
  const form = useForm<z.infer<typeof createCompetitionSchema>>({
    resolver: zodResolver(createCompetitionSchema),
  });

  const handleSubmit = (data: z.infer<typeof createCompetitionSchema>) => {
    console.log("Submit");
    console.log(data);
  };

  const onBack = () => {
    console.log("Back");
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
            Új verseny létrehozása
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verseny leírása *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Verseny leírása" {...field} />
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
                  <Input type="file" accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxTeamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximális csapatméret *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Maximális csapatméret"
                    {...field}
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

          {/* <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Felhasznált Technológiák *</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {technologies?.map((technology) => (
                    <label
                      key={technology.id}
                      className="relative flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-2 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                    >
                      <Checkbox
                        id={technology.id}
                        className="order-1 after:absolute"
                        checked={(
                          form.getValues("technologies") || []
                        ).includes(technology.id)}
                        onCheckedChange={(checked) => {
                          const currentValues =
                            form.getValues("technologies") || [];

                          if (checked) {
                            form.setValue("technologies", [
                              ...currentValues,
                              technology.id,
                            ]);
                          } else {
                            form.setValue(
                              "technologies",
                              currentValues.filter(
                                (id: string) => id !== technology.id,
                              ),
                            );
                          }
                        }}
                      />

                      <Label
                        className="text-sm tracking-tight"
                        htmlFor={technology.id}
                      >
                        {technology.name}
                      </Label>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategóriák *</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {categories?.map((category) => (
                    <label
                      key={category.id}
                      className="relative flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-2 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                    >
                      <Checkbox
                        id={category.id}
                        className="order-1 after:absolute"
                        checked={(form.getValues("categories") || []).includes(
                          category.id,
                        )}
                        onCheckedChange={(checked) => {
                          const currentValues =
                            form.getValues("categories") || [];

                          if (checked) {
                            form.setValue("categories", [
                              ...currentValues,
                              category.id,
                            ]);
                          } else {
                            form.setValue(
                              "categories",
                              currentValues.filter(
                                (id: string) => id !== category.id,
                              ),
                            );
                          }
                        }}
                      />

                      <Label
                        className="text-sm tracking-tight"
                        htmlFor={category.id}
                      >
                        {category.name}
                      </Label>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit">
            Verseny Publikálása
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
