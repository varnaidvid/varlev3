import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Trophy } from "lucide-react";

export default async function CompetitionPage({
  params,
}: {
  params: { id: string };
}) {
  const competitionId = (await params).id;
  const competition = await api.competition.getById({
    id: competitionId,
  });

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
        {/* <DataTable columns={columns} data={teams} /> */}
      </main>
    </>
  );
}
