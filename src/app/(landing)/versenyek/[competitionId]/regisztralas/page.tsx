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

  // TODO - handle not found
  if (!competition) return "Nem találtuk meg a megadott versenyt!";

  return (
    <div className="relative overflow-hidden p-2 py-[100px]">
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
        <h1 className="mb-8 mt-10 max-w-xl break-words text-center font-mono text-4xl font-bold">
          {competition.name}
        </h1>

        <ClientOnly>
          <RegisterForm
            subCategories={competition.subCategories}
            competition={competition}
            schools={schools}
            technologies={competition.technologies}
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
