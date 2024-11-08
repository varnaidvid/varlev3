"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Competition, School, Technology } from "@prisma/client";
import {
  formOneSchema,
  formTwoSchema,
  formThreeSchema,
} from "@/lib/zod/team-registration";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AccountForm } from "@/components/team-registration/account-form";
import { TeamDetailsForm } from "@/components/team-registration/details-form";
import { TeamMembersForm } from "@/components/team-registration/members-form";
import { SummaryStep } from "@/components/team-registration/summary-form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

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
}: {
  competition: Competition;
  schools: School[];
  technologies: Technology[];
}) {
  const [step, setStep] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutation = api.competition.registerTeam.useMutation();

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
      technologies: [""],
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

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await formOne.trigger();
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await formTwo.trigger();
      if (isValid) setStep(3);
    } else if (step === 3) {
      const isValid = await formThree.trigger();
      if (isValid) setStep(4);
    }
  };

  useEffect(() => {
    console.log("technologies", formTwo.getValues("technologies"));
  }, [formTwo.watch("technologies")]);

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

      console.log(formData);

      await mutation.mutateAsync(formData);

      toast.success("Sikeres regisztráció!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Hiba történt a regisztráció során.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => setStep(step - 1);

  return (
    <>
      {step === 1 && (
        <Card className="mx-auto w-full max-w-md">
          <AccountForm form={formOne} onSubmit={handleNextStep} />
        </Card>
      )}

      {step === 2 && (
        <Card className="mx-auto w-full max-w-md">
          <TeamDetailsForm
            technologies={technologies}
            form={formTwo}
            schools={schools}
            onSubmit={handleNextStep}
            onBack={handleBack}
          />
        </Card>
      )}

      {step === 3 && (
        <Card className="mx-auto w-full max-w-md">
          <TeamMembersForm
            form={formThree}
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
