"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { api, RouterOutputs } from "@/trpc/react";
import { z } from "zod";
import { TeamDetailsForm } from "@/components/vezerlopult/team/update/details-form";
import { TeamMembersForm } from "@/components/vezerlopult/team/update/members-form";
import { SummaryStep } from "@/components/vezerlopult/team/update/summary-form";
import { toast } from "sonner";
import {
  formThreeSchema,
  formTwoSchema,
  updateTeamSchema,
} from "@/lib/zod/team-crud";
import { School } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function EditForm({
  initialData,
  schools,
}: {
  initialData: RouterOutputs["team"]["getTeamByAccountId"];
  schools: School[];
}) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendTeamUpdateMutation = api.notification.teamUpdatedData.useMutation();
  const updateTeamMutation = api.team.updateTeam.useMutation();

  const formTwo = useForm({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      name: initialData.name,
      school: initialData.school.name,
      coaches: initialData.coaches.map((coach) => coach.name),
      technologies: initialData.technologies,
      subCategory: {
        id: initialData.SubCategory.id,
        name: initialData.SubCategory.name,
      },
    },
  });

  const formThree = useForm({
    resolver: zodResolver(formThreeSchema),
    defaultValues: {
      members: initialData.members
        .filter((member) => !member.isReserve)
        .map((member) => ({
          name: member.name,
          year: member.year,
        })),
      emails: initialData.account.emails.map((email) => email.email),
      reserveMember: initialData.members.find((member) => member.isReserve) || {
        name: "",
        year: 1,
      },
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

  const { data: isTeamnameAvailable, isFetching: fetch } =
    api.team.checkIfTeamNameAvailable.useQuery({
      name: formTwo.watch("name"),
    });
  const { data: unavailableEmails, isFetching: fetch2 } =
    api.auth.checkIfAnyOfTheEmailArrayIsNotAvailable.useQuery({
      emails: formThree.watch("emails") ?? [],
    });

  useEffect(() => {
    if (
      isTeamnameAvailable !== undefined &&
      isTeamnameAvailable !== null &&
      !isTeamnameAvailable
    ) {
      formTwo.setError("name", {
        type: "manual",
        message: "A csapatnév foglalt. Kérjük válassz másikat.",
      });
    }

    if (
      (isTeamnameAvailable && formTwo.formState.errors.name) ||
      formTwo.getValues("name") === initialData.name
    )
      formTwo.clearErrors("name");
  }, [formTwo, isTeamnameAvailable]);
  useEffect(() => {
    if (
      unavailableEmails !== undefined &&
      unavailableEmails !== null &&
      unavailableEmails.length > 0
    ) {
      for (const email of unavailableEmails) {
        const index = formThree.getValues("emails")?.indexOf(email);

        if (index !== undefined && index !== -1) {
          formThree.setError(`emails.${index}`, {
            type: "manual",
            message: "Ez az e-mail cím már használatban van.",
          });
        }
      }
    }

    if (
      (unavailableEmails &&
        unavailableEmails.length === 0 &&
        formThree.formState.errors.emails) ||
      formThree.getValues("emails") ===
        initialData.account.emails.map((email) => email.email)
    )
      formThree.clearErrors("emails");
  }, [formThree, unavailableEmails]);

  const [pending, startTransition] = useTransition();
  const handleNextStep = async () => {
    startTransition(async () => {
      if (step === 1) {
        if (formTwo.getValues("technologies")?.length === 0) {
          formTwo.setError("technologies", {
            type: "required",
            message: "Legalább egy technológiát ki kell választani.",
          });
          return;
        }

        if (
          !isTeamnameAvailable &&
          initialData.name !== formTwo.getValues("name")
        ) {
          formTwo.setError("name", {
            type: "manual",
            message: "A csapatnév foglalt. Kérjük válassz másikat.",
          });

          return;
        }

        const isValid = await formTwo.trigger();
        if (isValid) setStep(2);
      } else if (step === 2) {
        const isValid = await formThree.trigger();

        if (unavailableEmails && unavailableEmails.length > 0) {
          for (const email of unavailableEmails) {
            if (initialData.account.emails.some((e) => e.email === email)) {
              continue;
            } else {
              const index = formThree.getValues("emails")?.indexOf(email);

              if (index !== undefined && index !== -1) {
                formThree.setError(`emails.${index}`, {
                  type: "manual",
                  message: "Ez az e-mail cím már használatban van.",
                });
              }
            }
          }
          return;
        }

        if (isValid) setStep(3);
      }
    });
  };

  const getAllFormData = (): z.infer<typeof updateTeamSchema> => ({
    teamId: initialData.id || "",
    formOne: formTwo.getValues(),
    formTwo: {
      members: formThree.getValues().members,
      reserveMember: {
        name: formThree.getValues().reserveMember?.name,
        year: formThree.getValues().reserveMember?.year,
      },
      emails: formThree.getValues().emails,
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = getAllFormData();

      if (!initialData.id || !initialData.Competition.id) return;

      await updateTeamMutation.mutateAsync(formData);
      await sendTeamUpdateMutation.mutateAsync({
        teamId: initialData.id,
        competitionId: initialData.Competition.id,
        redirectTo: "/vezerlopult",
      });

      toast.success("Sikeres frissítés!");
      router.push("/vezerlopult");
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
        <Card className="mx-auto w-full max-w-lg">
          <TeamDetailsForm
            pending={pending || fetch}
            subCategories={initialData.Competition.subCategories}
            technologies={initialData.Competition.technologies}
            form={formTwo as any}
            schools={schools}
            onSubmit={handleNextStep}
          />
        </Card>
      )}

      {step === 2 && (
        <Card className="mx-auto w-full max-w-lg">
          <TeamMembersForm
            pending={pending || fetch2}
            form={formThree as any}
            competition={initialData.Competition}
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
          formData={getAllFormData()}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
