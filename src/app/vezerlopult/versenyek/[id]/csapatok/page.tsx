import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
import { TeamWithDetails } from "@/server/api/routers/team";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ExportCSV from "@/components/vezerlopult/versenyek/csapatok/export-csv";

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

  const teamsForCSV = await api.team.getTeamsForCSV({
    competitionId: competitionId,
  });

  const csvData = teamsForCSV.map((team) => ({
    "Csapat neve": team.name,
    "Iskola neve": team.school?.name,
    "Jelentkezés státusza": team.status,
    "Tagok neve": team.members.map((member) => member.name).join(", "),
    "Tagok évfolyama": team.members.map((member) => member.year).join(", "),
    "Választott technológiák": team.technologies
      .map((tech) => tech.name)
      .join(", "),
    "Felkészítő tanár": team.coaches.map((coach) => coach.name).join(", "),
    "Jelentkezés dátuma": team.createdAt.toISOString(),
    "Értesítendő emailek": team.emails.join(", "),
  }));

  const csvFilename = `${competition?.name ?? competitionId}_jelentkezo_csapatok.csv`;

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <div className="flex items-center justify-between">
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
          <ExportCSV data={csvData} filename={csvFilename} />
        </div>
      </header>
      <main className="px-4">
        <DataTable columns={columns} data={teams} /*schools={schools}*/ />
      </main>
    </>
  );
}
