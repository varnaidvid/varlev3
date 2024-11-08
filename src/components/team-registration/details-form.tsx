import { Box, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
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
import { formTwoSchema } from "@/lib/zod/team-registration";
import { School } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import SelectSchool from "../ui/select-school";

export function TeamDetailsForm({
  form,
  onSubmit,
  onBack,
  schools,
}: {
  form: UseFormReturn<z.infer<typeof formTwoSchema>>;
  onSubmit: () => void;
  onBack: () => void;
  schools: School[];
}) {
  const addCoach = () => {
    form.setValue("coaches", [...form.getValues("coaches"), ""]);
  };

  const removeCoach = (index: number) => {
    if (form.getValues("coaches").length > 1) {
      form.setValue(
        "coaches",
        form.getValues("coaches").filter((_, i) => i !== index),
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={Box}
              variant="small"
              fromColor="from-indigo-500/20"
              toColor="to-sky-400/20"
            />
            Csapatod adatai
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Kérjük, töltsd ki a csapatod adatait. Legalább 1 felkészítő tanárt
            szükséges megadni.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Csapat neve *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="VarleV3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Iskola neve *</FormLabel>
                <FormControl>
                  <SelectSchool
                    schools={schools}
                    onSelect={(schoolId) => form.setValue("school", schoolId)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Felkészítő tanár(ok) *</FormLabel>
            {form.watch("coaches").map((coach, index) => (
              <div key={index} className="mt-2 flex items-start space-x-2">
                <FormField
                  control={form.control}
                  name={`coaches.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          placeholder={`${index + 1}. felkészítő tanár`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeCoach(index)}
                  disabled={form.watch("coaches").length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={addCoach}
            >
              <Plus className="mr-2 h-4 w-4" /> Új tanár hozzáadása
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="w-full" type="submit">
            Következő lépés
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Vissza
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
