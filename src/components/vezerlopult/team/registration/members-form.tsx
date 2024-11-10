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
import {
  Users2,
  ArrowRight,
  Plus,
  ArrowLeft,
  Trash2,
  Loader2,
} from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formThreeSchema } from "@/lib/zod/team-crud";
import { Competition } from "@prisma/client";
import TeamMember from "../../../ui/team-member";
import { Input } from "@/components/ui/input";

export function TeamMembersForm({
  form,
  onSubmit,
  onBack,
  competition,
  memberFields,
  memberAppend,
  memberRemove,
  pending,
}: {
  pending: boolean;
  form: UseFormReturn<z.infer<typeof formThreeSchema>>;
  onSubmit: () => void;
  onBack: () => void;
  competition: Competition;
  memberFields: { id: string; name: string; year: number }[];
  memberAppend: (data: { name: string; year: number }) => void;
  memberRemove: (index: number) => void;
}) {
  const addEmail = () => {
    form.setValue("emails", [...(form.getValues("emails") || []), ""]);
  };

  const removeEmail = (index: number) => {
    const emails = form.getValues("emails") || [];
    if (emails.length > 1 || (emails.length === 1 && emails[0] !== "")) {
      form.setValue(
        "emails",
        emails.filter((_, i) => i !== index),
      );
    } else if (emails.length === 1 && emails[0] === "") {
      form.setValue("emails", []);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={Users2}
              variant="small"
              fromColor="from-red-500/20"
              toColor="to-orange-400/20"
            />
            Csapattagok megadása
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            A csapatodnak {competition.maxTeamSize} főből kell állnia, illetve
            egy lehetséges póttagból.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <FormLabel>Csapattagok *</FormLabel>
            <FormDescription className="flex justify-between">
              <span>Add meg a csapattagok neveit és évfolyamát</span>
              <span>
                {memberFields.length} / {competition.maxTeamSize}
              </span>
            </FormDescription>
            {memberFields.map((field, index) => (
              <TeamMember
                key={field.id}
                index={index}
                control={form.control}
                remove={
                  memberFields.length > 1
                    ? () => memberRemove(index)
                    : undefined
                }
              />
            ))}

            {memberFields.length < competition.maxTeamSize && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => memberAppend({ name: "", year: 1 })}
              >
                <Plus className="mr-2 h-4 w-4" /> Új csapattag hozzáadása
              </Button>
            )}
          </div>

          <div>
            <FormLabel>Pót csapattag</FormLabel>
            <FormDescription>
              Szintén teljes név és évfolyam szükséges
            </FormDescription>
            <TeamMember
              index="reserved"
              control={form.control}
              remove={undefined}
            />
          </div>

          <div>
            <FormLabel>Email címek</FormLabel>
            <FormDescription>
              Opcionálisan értesítünk a megadott email címeken is üzeneteitekről
            </FormDescription>
            {form.watch("emails")?.map((coach, index) => (
              <div key={index} className="mt-2 flex items-start space-x-2">
                <FormField
                  control={form.control}
                  name={`emails.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          placeholder={`${index + 1}. email cím`}
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
                  onClick={() => removeEmail(index)}
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
              onClick={addEmail}
            >
              <Plus className="mr-2 h-4 w-4" /> Új email hozzáadása
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="group w-full" type="submit" disabled={pending}>
            Következő lépés
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4 transition-all group-hover:ml-1" />
            )}
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
