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

  const teams = await api.team.getTeamsByCompetition({
    competitionId: competitionId,
  });

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Csapatok"
          links={[{ href: "/vezerlopult/csapatok", label: "Csapatok" }]}
        />
      </header>
      <main className="px-4">
        <DataTable columns={columns} data={teams} />
      </main>
    </>
  );
}
