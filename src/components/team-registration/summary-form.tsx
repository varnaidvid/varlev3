import { CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { TeamRegistrationData } from "@/app/regisztracio/[competitionId]/form";

interface SummaryStepProps {
  formData: TeamRegistrationData;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function SummaryStep({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
}: SummaryStepProps) {
  const formatDataForDisplay = (data: TeamRegistrationData) => {
    const { account, team, members } = data;
    return {
      account: {
        username: account.username,
        password: account.password,
        password2: account.password2,
      },
      team: {
        name: team.name,
        school: team.school,
        coaches: team.coaches,
      },
      members: {
        teamMembers: members.members,
        reserveMember: members.reserveMember,
      },
      competition: data.competition,
    };
  };

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
        <div className="rounded-lg border bg-card">
          <div className="border-b p-4 font-medium">Csapat adatok</div>
          <pre className="overflow-auto rounded-b-lg bg-muted/50 p-4">
            <code>
              {JSON.stringify(formatDataForDisplay(formData), null, 2)}
            </code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t pt-6">
        <Button className="w-full" onClick={onSubmit} disabled={isSubmitting}>
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
