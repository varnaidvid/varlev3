import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ExportCSV from "@/components/vezerlopult/versenyek/csapatok/export-csv";
import { auth } from "@/server/auth";

export default async function TeamsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;

  searchParams: Promise<{ name?: string }>;
}) {
  const session = await auth();
  const competitionId = (await params).id;
  const { name } = await searchParams;
  const competition = await api.competition.getById({
    id: competitionId,
  });

  const teams = await api.team.getTeamsByCompetition({
    competitionId: competitionId,
  });

  const schools = Array.from(new Set(teams.map((team) => team.schoolName)));

  const teamsForCSV = await api.team.getTeamsForCSV({
    competitionId: competitionId,
  });

  const csvData = teamsForCSV.map((team) => ({
    "Csapat neve": team.name,
    "Iskola neve": team.schoolName,
    "Jelentkezés státusza": team.status,
    "Tagok neve": team.members.map((member) => member.name).join(", "),
    "Tagok évfolyama": team.members.map((member) => member.year).join(", "),
    "Választott technológiák": team.technologies
      .map((tech) => tech.name)
      .join(", "),
    "Felkészítő tanár": team.coaches.map((coach) => coach.name).join(", "),
    "Jelentkezés dátuma": team.createdAt.toISOString(),
  }));

  const csvFilename = `${competition?.name ?? competitionId}_jelentkezo_csapatok.csv`;

  return (
    <>
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

      <main>
        <DataTable
          columns={columns}
          initialData={teams}
          schools={schools}
          competitionId={competitionId}
          accountId={session!.user.id}
          teamName={name}
        />
      </main>
    </>
  );
}
