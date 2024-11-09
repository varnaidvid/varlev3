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
import {
  CheckCircle2,
  ArrowLeft,
  Loader2,
  BrainCircuit,
  Users,
  School,
  Blocks,
  Cpu,
} from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { z } from "zod";
import { teamRegistrationSchema } from "@/lib/zod/team-registration";
import { Badge } from "@/components/ui/badge";

const SuccessCard = () => {
  return (
    <Card className="mx-auto mt-4 w-full max-w-lg">
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
  const {
    account: { password, password2, username },
    members: { members, reserveMember },
    team: { coaches, name, school, subCategory, technologies },
    competitionId,
  } = formData;

  const [showSuccess, setShowSuccess] = useState(false);
  const submitButtonRef = React.useRef(null);

  if (showSuccess) return <SuccessCard />;

  return (
    <Card className="mx-auto w-full max-w-lg">
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
      <CardContent className="mt-4 space-y-6">
        <h1 className="text-2xl font-semibold">{name}:</h1>

        <div>
          <h2 className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <School className="size-6 rounded-full border p-[3px]" />
            Iskola
          </h2>
          <p className="text-gray-700">{school}</p>
        </div>

        <div>
          <h2 className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Users className="size-6 rounded-full border p-[3px]" />
            Csapattagok
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {members.map((member) => (
              <li key={member.name} className="text-sm">
                <b>{member.name}</b> -- Évfolyam: <b>{member.year}</b>{" "}
              </li>
            ))}
            {reserveMember?.name && (
              <li>
                <b>{reserveMember.name}</b> -- Évfolyam:{" "}
                <b>{reserveMember.year}</b> (Póttag)
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <BrainCircuit className="size-6 rounded-full border p-[3px]" />
            Felkészítő tanárok
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {coaches.map((coach) => (
              <li key={coach} className="text-sm">
                <b>{coach}</b>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Cpu className="size-6 rounded-full border p-[3px]" />
            Technológiák
          </h2>
          <div className="flex flex-wrap gap-2">
            {technologies?.map((tech) => (
              <Badge key={tech.id} variant="secondary">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Blocks className="size-6 rounded-full border p-[3px]" />
            Kategória
          </h2>
          <Badge variant="default">{subCategory.name}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t pt-6">
        <Button
          className="w-full"
          onClick={onSubmit}
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
