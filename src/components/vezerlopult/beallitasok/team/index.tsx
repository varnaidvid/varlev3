"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api, RouterOutputs } from "@/trpc/react";
import { z } from "zod";
import { TeamDetailsForm } from "@/components/team-update/details-form";
import { TeamMembersForm } from "@/components/team-update/members-form";
import { SummaryStep } from "@/components/team-update/summary-form";
import { toast } from "sonner";
import {
  formThreeSchema,
  formTwoSchema,
  updateTeamSchema,
} from "@/lib/zod/team-registration";
import { School } from "@prisma/client";

export default function EditForm({
  initialData,
  schools,
  competitionTechnologies,
}: {
  initialData: RouterOutputs["team"]["getTeamByAccountId"];
  schools: School[];
  competitionTechnologies: RouterOutputs["technology"]["getCompetitionTechnologies"];
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendTeamUpdateMutation = api.notification.teamUpdatedData.useMutation();
  const updateTeamMutation = api.team.updateTeam.useMutation();

  const formTwo = useForm({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      name: initialData?.name || "",
      school: initialData?.school.name,
      coaches: initialData?.coaches.map((coach) => coach.name) || [""],
      technologies: initialData?.technologies?.map((tech) => tech.name) || [""],
    },
  }) as any;

  const formThree = useForm({
    resolver: zodResolver(formThreeSchema),
    defaultValues: initialData?.members
      ? {
          members: initialData?.members
            .filter((member) => !member.isReserve)
            .map((member) => ({
              name: member.name,
              year: member.year,
            })),
          reserveMember: initialData?.members.find(
            (member) => member.isReserve,
          ) || { name: "", year: 1 },
        }
      : {
          members: [{ name: "", year: 1 }],
          reserveMember: { name: "", year: 1 },
        },
  });

  const {
    fields: memberFields,
    append: memberAppend,
    remove: memberRemove,
  } = useFieldArray({
    control: formThree.control,
    name: "members",
  });

  const handleNextStep = async () => {
    if (step === 1) {
      if (formTwo.getValues("technologies")?.length === 0) {
        formTwo.setError("technologies", {
          type: "required",
          message: "Legalább egy technológiát ki kell választani.",
        });
        return;
      }
      const isValid = await formTwo.trigger();
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await formThree.trigger();
      if (isValid) setStep(3);
    }
  };

  const getAllFormData = (): z.infer<typeof updateTeamSchema> => ({
    teamId: initialData?.id || "",
    formOne: formTwo.getValues(),
    formTwo: {
      members: formThree.getValues().members,
      reserveMember: {
        name: formThree.getValues().reserveMember?.name,
        year: formThree.getValues().reserveMember?.year,
      },
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = getAllFormData();

      if (!initialData?.id || !initialData?.Competition.id) return;

      await updateTeamMutation.mutateAsync(formData);
      await sendTeamUpdateMutation.mutateAsync({
        teamId: initialData?.id,
        competitionId: initialData?.Competition.id,
        redirectTo: "/bejelentkezes",
      });

      toast.success("Sikeres frissítés!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Hiba történt a frissítés során.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {step === 1 && (
        <Card className="mx-auto w-full max-w-md">
          <TeamDetailsForm
            technologies={competitionTechnologies}
            selectedTechnologies={
              initialData?.technologies.map((tech) => tech.id) || []
            }
            form={formTwo}
            schools={schools}
            onSubmit={handleNextStep}
          />
        </Card>
      )}

      {step === 2 && (
        <Card className="mx-auto w-full max-w-md">
          <TeamMembersForm
            form={formThree as any}
            competition={initialData?.Competition as any}
            memberFields={memberFields}
            memberAppend={memberAppend}
            memberRemove={memberRemove}
            onSubmit={handleNextStep}
            onBack={() => setStep(1)}
          />
        </Card>
      )}

      {step === 3 && (
        <SummaryStep
          formData={getAllFormData() as any}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
