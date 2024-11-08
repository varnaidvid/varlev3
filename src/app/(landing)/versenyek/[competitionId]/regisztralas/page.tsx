import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import RegisterForm from "./form";
import { api } from "@/trpc/server";
import Logo from "@/components/logo";
import { ClientOnly } from "@/components/client-only";

export default async function RegisterTeam({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;

  const competition = await api.competition.getById({
    id: competitionId,
  });

  const schools = await api.school.getAll();
  const technologies = await api.technology.getCompetitionTechnologies({
    competitionId,
  });

  console.log("competition", competition);
  console.log("schools", schools);
  console.log("technologies", technologies);

  // TODO - handle not found
  if (!competition) return "Nem találtuk meg a megadott versenyt!";

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background p-2 py-[100px]">
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
        <div className="mb-4">
          <Logo iconBg="black" size="small" />
        </div>

        <h1 className="mb-2 text-center font-mono text-4xl font-bold">
          {competition.name}
        </h1>
        <h1 className="mb-12 text-center text-muted-foreground">
          {competition.description}
        </h1>

        <ClientOnly>
          <RegisterForm
            competition={competition}
            schools={schools}
            technologies={technologies}
          />
        </ClientOnly>

        <div className="mt-2 max-w-[390px] text-center text-sm text-slate-500">
          {/* <Separator className="my-3 w-20 mx-auto" />

          <p>
            A regisztrációs űrlap kitöltésével elfogadja az{' '}
            <i>adatvédelmi tájékoztatót</i> és a{' '}
            <i>felhasználási feltételeket.</i>
          </p> */}
        </div>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
