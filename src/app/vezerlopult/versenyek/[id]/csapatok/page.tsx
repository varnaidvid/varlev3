import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
import { TeamWithDetails } from "@/server/api/routers/team";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function TeamsPage({
  params,
}: {
  params: { id: string };
}) {
  const competitionId = (await params).id;
  const competition = await api.competition.getById({
    id: competitionId,
  });

  const teams = await api.team.getTeamsByCompetition({
    competitionId: competitionId,
  });

  //   const schools = await api.school.getSchoolsByCompetitionId({
  //     competitionId,
  //   });

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Jelentkező Csapatok"
          links={[
            { href: "/vezerlopult/versenyek", label: "Versenyek" },
            {
              href: `/vezerlopult/versenyek/${competitionId}/`,
              label: (competition?.name ?? competitionId) as string,
            },
            {
              href: `/vezerlopult/versenyek/${competitionId}/csapatok`,
              label: "Csapatok",
            },
          ]}
        />
      </header>
      <main className="px-4">
        <DataTable columns={columns} data={teams} /*schools={schools}*/ />
      </main>
    </>
  );
}
