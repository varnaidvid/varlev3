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
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Users2, ArrowRight, Plus, ArrowLeft } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formThreeSchema } from "@/lib/zod/team-registration";
import { Competition } from "@prisma/client";
import TeamMember from "../../../ui/team-member";

export function TeamMembersForm({
  form,
  onSubmit,
  onBack,
  competition,
  memberFields,
  memberAppend,
  memberRemove,
}: {
  form: UseFormReturn<z.infer<typeof formThreeSchema>>;
  onSubmit: () => void;
  onBack: () => void;
  competition: Competition;
  memberFields: { id: string; name: string; year: number }[];
  memberAppend: (data: { name: string; year: number }) => void;
  memberRemove: (index: number) => void;
}) {
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
              Adja meg a pót csapattag nevét és évfolyamát
            </FormDescription>
            <TeamMember
              index="reserved"
              control={form.control}
              remove={undefined}
            />
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
