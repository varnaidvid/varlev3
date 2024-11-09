import { auth } from "@/server/auth";
import ApplicationStatusCard from "@/components/ui/application-status";
import { api } from "@/trpc/server";
import TeamDetailCard from "@/components/ui/team-detail-card";

export default async function TeamDashboard() {
  const session = await auth();
  console.log("session: ", session);

  const teamWithIncludes = await api.team.getTeamByAccountId({
    accountId: session?.user.id!,
  });
  if (!teamWithIncludes) return;

  const competition = await api.competition.getById({
    id: teamWithIncludes.competitionId,
  });
  if (!competition) return;

  return (
    <div>
      <ApplicationStatusCard
        team={teamWithIncludes}
        competition={competition}
      />

      <h2 className="mb-2 mt-8 text-2xl font-semibold">Csapatod részletei</h2>
      <TeamDetailCard data={teamWithIncludes} />
    </div>
  );
}
