import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Trophy } from "lucide-react";
import { EditCompetitionForm } from "@/components/vezerlopult/versenyek/edit-competition-form";
import { CompetitionWithDetails } from "@/server/api/routers/competition";

export default async function CompetitionPage({
  params,
}: {
  params: { id: string };
}) {
  const competitionId = (await params).id;
  const competition = await api.competition.getById({
    id: competitionId,
  });

  const technologies = await api.technology.getAll();
  const categories = await api.category.getAll();
  const subCategories = await api.subCategory.getAll();

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Trophy}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Verseny szerkesztése"
          links={[
            { href: "/vezerlopult/versenyek", label: "Versenyek" },
            {
              href: `/vezerlopult/versenyek/${competitionId}/`,
              label: (competition?.name ?? competitionId) as string,
            },
          ]}
        />
      </header>
      <main className="px-4">
        <EditCompetitionForm
          // @ts-ignore
          competition={competition}
          technologies={technologies}
          categories={categories}
          subCategories={subCategories}
        />
      </main>
    </>
  );
}
