"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { api, RouterOutputs } from "@/trpc/react";
import { z } from "zod";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import FormOne from "./form-one";
import FormTwo from "./form-two";
import {
  schoolRegisterStepOneSchema,
  schoolRegisterStepTwoSchema,
  schoolRegisterType,
} from "@/lib/zod/school-crud";

export default function RegisterSchoolForm() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerSchoolMutation = api.school.registerSchool.useMutation();
  const notifySchoolRegisteredMutation =
    api.notification.notifySchoolAboutRegistration.useMutation();

  const formOne = useForm({
    resolver: zodResolver(schoolRegisterStepOneSchema),
    defaultValues: {
      username: "",
      password: "",
      password2: "",
    },
  });

  const formTwo = useForm({
    resolver: zodResolver(schoolRegisterStepTwoSchema),
    defaultValues: {
      name: "",
      address: "",
      contactName: "",
      contactEmail: "",
    },
  });

  const { data: isUsernameAvailable, isFetching: fetch1 } =
    api.team.checkIfUsernameAvailable.useQuery({
      username: formOne.watch("username"),
    });

  const { data: isSchoolnameAvailable, isFetching: fetch2 } =
    api.school.checkIfSchoolnameIsAvailable.useQuery({
      name: formTwo.watch("name"),
    });
  const { data: isEmailAvailable, isFetching: fetch3 } =
    api.auth.checkIfEmailIsAvailable.useQuery({
      email: formTwo.watch("contactEmail"),
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
  }, [formOne, isUsernameAvailable]);
  useEffect(() => {
    if (
      isSchoolnameAvailable !== undefined &&
      isSchoolnameAvailable !== null &&
      !isSchoolnameAvailable
    ) {
      formTwo.setError("name", {
        type: "manual",
        message: "Ez az iskola már regisztrálva van!",
      });
    }

    if (isSchoolnameAvailable && formTwo.formState.errors.name)
      formTwo.clearErrors("name");
  }, [formTwo, isSchoolnameAvailable]);
  useEffect(() => {
    if (
      isEmailAvailable !== undefined &&
      isEmailAvailable !== null &&
      !isEmailAvailable
    ) {
      formTwo.setError("contactEmail", {
        type: "manual",
        message: "Ez az email cím már regisztrálva van!",
      });
    }

    if (isEmailAvailable && formTwo.formState.errors.contactEmail)
      formTwo.clearErrors("contactEmail");
  }, [formTwo, isEmailAvailable]);

  const [pending, startTransition] = useTransition();
  const handleNextStep = async () => {
    startTransition(async () => {
      if (step === 1) {
        const isValid = await formOne.trigger();

        if (!isUsernameAvailable) {
          formOne.setError("username", {
            type: "manual",
            message: "Ez a felhasználónév már foglalt!",
          });

          return;
        }

        if (isValid) setStep(2);
      } else if (step === 2) {
        const isValid = await formTwo.trigger();

        if (!isSchoolnameAvailable) {
          formTwo.setError("name", {
            type: "manual",
            message: "Ez az iskola már regisztrálva van!",
          });

          return;
        }

        if (!isEmailAvailable) {
          formTwo.setError("contactEmail", {
            type: "manual",
            message: "Ez az email cím már regisztrálva van!",
          });

          return;
        }

        if (isValid) await handleSubmit();
      }
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const allFormData: z.infer<typeof schoolRegisterType> = {
        stepOne: formOne.getValues(),
        stepTwo: formTwo.getValues(),
      };

      const school = await registerSchoolMutation.mutateAsync(allFormData);
      await notifySchoolRegisteredMutation.mutateAsync({
        schoolId: school.id,
        email: allFormData.stepTwo.contactEmail,
        username: allFormData.stepOne.username,
        password: allFormData.stepOne.password,
      });

      toast.success(
        `Sikeresen beregisztrálta a ${allFormData.stepTwo.name} intézményt!`,
      );
      router.push("/vezerlopult/iskolak");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Hiba történt a beregisztrálás során.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {step === 1 && (
        <Card className="mx-auto w-full">
          <FormOne
            onSubmit={handleNextStep}
            pending={isSubmitting || fetch1}
            form={formOne}
          />
        </Card>
      )}

      {step === 2 && (
        <Card className="mx-auto w-full">
          <FormTwo
            form={formTwo}
            onBack={() => setStep(step - 1)}
            onSubmit={handleNextStep}
            pending={isSubmitting || fetch2 || fetch3}
          />
        </Card>
      )}

      {step === 3 && <Card className="mx-auto w-full"></Card>}
    </div>
  );
}
