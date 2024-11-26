"use client";

import { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Competition, School, SubCategory, Technology } from "@prisma/client";
import {
  formOneSchema,
  formTwoSchema,
  formThreeSchema,
} from "@/lib/zod/team-crud";
import { Card } from "@/components/ui/card";
import { AccountForm } from "@/components/vezerlopult/team/registration/account-form";
import { TeamDetailsForm } from "@/components/vezerlopult/team/registration/details-form";
import { TeamMembersForm } from "@/components/vezerlopult/team/registration/members-form";
import { SummaryStep } from "@/components/vezerlopult/team/registration/summary-form";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { login } from "@/app/(landing)/bejelentkezes/actions";

export type TeamRegistrationData = {
  account: z.infer<typeof formOneSchema>;
  team: z.infer<typeof formTwoSchema>;
  members: z.infer<typeof formThreeSchema>;
  competitionId: string;
};

export default function RegisterForm({
  competition,
  schools,
  technologies,
  subCategories,
}: {
  competition: Competition;
  schools: School[];
  technologies: Technology[];
  subCategories: SubCategory[];
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerTeamMutation = api.competition.registerTeam.useMutation();
  const notifyNewTeamMutation =
    api.notification.newTeamRegistered.useMutation();

  const formOne = useForm<z.infer<typeof formOneSchema>>({
    resolver: zodResolver(formOneSchema),
    defaultValues: {
      username: "",
      password: "",
      password2: "",
    },
  });

  const formTwo = useForm<z.infer<typeof formTwoSchema>>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      name: "",
      school: "",
      coaches: [""],
      technologies: [],
    },
  });

  const formThree = useForm<z.infer<typeof formThreeSchema>>({
    resolver: zodResolver(formThreeSchema),
    defaultValues: {
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

  const { data: isUsernameAvailable, isFetching: fetch1 } =
    api.team.checkIfUsernameAvailable.useQuery({
      username: formOne.watch("username"),
    });
  const { data: isTeamnameAvailable, isFetching: fetch2 } =
    api.team.checkIfTeamNameAvailable.useQuery({
      name: formTwo.watch("name"),
    });
  const { data: unavailableEmails, isFetching: fetch3 } =
    api.auth.checkIfAnyOfTheEmailArrayIsNotAvailable.useQuery({
      emails: formThree.watch("emails") ?? [],
    });

  useEffect(() => {
    if (
      isUsernameAvailable !== undefined &&
      isUsernameAvailable !== null &&
      !isUsernameAvailable
    ) {
      formOne.setError("username", {
        type: "manual",
        message: "Ez a felhasználónév már foglalt!",
      });
    }

    if (isUsernameAvailable && formOne.formState.errors.username)
      formOne.clearErrors("username");
  }, [isUsernameAvailable]);
  useEffect(() => {
    if (
      isTeamnameAvailable !== undefined &&
      isTeamnameAvailable !== null &&
      !isTeamnameAvailable
    ) {
      formTwo.setError("name", {
        type: "manual",
        message: "Ez a csapatnév már foglalt!",
      });
    }

    if (isTeamnameAvailable && formTwo.formState.errors.name)
      formTwo.clearErrors("name");
  });

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
      (!unavailableEmails || unavailableEmails.length === 0) &&
      formThree.formState.errors.emails
    )
      formThree.clearErrors("emails");
  }, [unavailableEmails]);

  const [pending, startTransition] = useTransition();
  const handleNextStep = () => {
    startTransition(async () => {
      if (step === 1) {
        const isValid = await formOne.trigger();
        if (!isValid) return;

        if (!isUsernameAvailable) {
          formOne.setError("username", {
            type: "manual",
            message: "A felhasználónév foglalt. Kérjük válassz másikat.",
          });

          return;
        }

        setStep(2);
      } else if (step === 2) {
        if (formTwo.getValues("technologies")?.length === 0) {
          formTwo.setError("technologies", {
            type: "required",
            message: "Legalább egy technológiát ki kell választani.",
          });
          return;
        }

        if (!isTeamnameAvailable) {
          formTwo.setError("name", {
            type: "manual",
            message: "A csapatnév foglalt. Kérjük válassz másikat.",
          });

          return;
        }

        const isValid = await formTwo.trigger();
        if (isValid) setStep(3);
      } else if (step === 3) {
        const isValid = await formThree.trigger();
        if (!isValid) return;

        if (unavailableEmails && unavailableEmails.length > 0) {
          for (const email of unavailableEmails) {
            const index = formThree.getValues("emails")?.indexOf(email);

            if (index !== undefined && index !== -1) {
              formThree.setError(`emails.${index}`, {
                type: "manual",
                message: "Ez az e-mail cím már használatban van.",
              });
            }
          }

          return;
        }

        if (isValid) setStep(4);
      }
    });
  };

  const getAllFormData = () => {
    return {
      account: formOne.getValues(),
      team: formTwo.getValues(),
      members: formThree.getValues(),
      competitionId: competition.id,
    };
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = getAllFormData();

      const data = await registerTeamMutation.mutateAsync(formData);
      await notifyNewTeamMutation.mutateAsync({
        competitionId: competition.id,
        teamId: data.id,
        schoolId: data.school.id,
        redirectTo: "/vezerlopult",
      });

      await login(
        {
          username: formData.account.username,
          password: formData.account.password,
        },
        true,
      );
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => setStep(step - 1);

  return (
    <>
      {step === 1 && (
        <Card className="z-20 mx-auto w-full max-w-lg">
          <AccountForm
            pending={pending || fetch1}
            form={formOne}
            onSubmit={handleNextStep}
          />
        </Card>
      )}

      {step === 2 && (
        <Card className="z-20 mx-auto w-full max-w-lg">
          <TeamDetailsForm
            pending={pending || fetch2}
            subCategories={subCategories}
            technologies={technologies}
            form={formTwo}
            schools={schools}
            onSubmit={handleNextStep}
            onBack={handleBack}
          />
        </Card>
      )}

      {step === 3 && (
        <Card className="z-20 mx-auto w-full max-w-lg">
          <TeamMembersForm
            form={formThree}
            pending={pending || fetch3}
            competition={competition}
            memberFields={memberFields}
            memberAppend={memberAppend}
            memberRemove={memberRemove}
            onSubmit={handleNextStep}
            onBack={handleBack}
          />
        </Card>
      )}

      {step === 4 && (
        <SummaryStep
          formData={getAllFormData()}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
