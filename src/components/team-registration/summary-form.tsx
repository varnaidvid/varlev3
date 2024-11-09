import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { z } from "zod";
import { teamRegistrationSchema } from "@/lib/zod/team-registration";

const SuccessCard = () => {
  return (
    <Card className="mx-auto mt-4 w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ExtraIcon
            Icon={CheckCircle2}
            variant="small"
            fromColor="from-green-500/20"
            toColor="to-emerald-400/20"
          />
          Sikeres regisztráció
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="mt-4 flex items-center gap-1 text-sm">
            <CheckCircle2 className="size-4 text-green-700" />
            <span>Értesítés küldve iskolának a jóváhagyásért</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <CheckCircle2 className="size-4 text-green-700" />
            <span>Jelentkezési státuszotok megfigyelhető a vezérlőpultban</span>
          </div>
        </div>

        <Button asChild variant={"link"} className="mt-4">
          <Link href="/bejelentkezes">
            Jelentkezz be most a vezérlőpultodba
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export function SummaryStep({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  formData: z.infer<typeof teamRegistrationSchema>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const submitButtonRef = React.useRef(null);

  const handleSubmit = async () => {
    await onSubmit();
    setShowSuccess(true);
  };

  if (showSuccess) return <SuccessCard />;

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ExtraIcon
            Icon={CheckCircle2}
            variant="small"
            fromColor="from-green-500/20"
            toColor="to-emerald-400/20"
          />
          Regisztráció összegzése
        </CardTitle>
        <CardDescription className="!mt-4 text-justify">
          Kérjük, ellenőrizd a megadott adatokat a véglegesítés előtt.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <p className="font-mono text-sm uppercase text-muted-foreground">
          Megadott adatok:
        </p>

        <ul>
          <li>
            <ul>
              <li>
                <span className="font-semibold">Név:</span> {formData.team.name}
              </li>
              <li>
                <span className="font-semibold">Iskola:</span>{" "}
                {formData.team.school}
              </li>
              <li className="mt-2">
                <span className="font-semibold">Felkészítő tanárok:</span>
                <p>{formData.team.coaches.join(", ")}</p>
              </li>
            </ul>
          </li>
          <li className="mt-2">
            <p className="font-semibold">Csapat tagjai:</p>
            <ul>
              {formData.members.members.map((member, index) => (
                <li key={index}>
                  <span className="font-semibold">{index + 1}:</span>{" "}
                  {member.name} - {member.year}.
                </li>
              ))}
              <li>
                <span className="font-semibold">Pót tag:</span>{" "}
                {formData.members.reserveMember.name} -{" "}
                {formData.members.reserveMember.year}.
              </li>
            </ul>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t pt-6">
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
          ref={submitButtonRef}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Regisztráció folyamatban...
            </>
          ) : (
            <>
              Regisztráció véglegesítése
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Vissza
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SummaryStep;
