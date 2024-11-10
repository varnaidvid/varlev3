import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Trophy } from "lucide-react";
import { EditCompetitionForm } from "@/components/vezerlopult/versenyek/edit-competition-form";
import { Card } from "@/components/ui/card";
import withRole from "@/utils/withRole";

export default async function CompetitionPage({
  params,
}: {
  params: { id: string };
}) {
  await withRole(["ORGANIZER"]);
  const competitionId = (await params).id;
  const competition = await api.competition.getById({
    id: competitionId,
  });

  const technologies = await api.technology.getAll();
  const categories = await api.category.getAll();

  return (
    <>
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

      <main>
        <Card className="mx-auto w-full">
          <EditCompetitionForm
            //@ts-ignore
            competition={competition}
            technologies={technologies}
            categories={categories}
          />
        </Card>
      </main>
    </>
  );
}
