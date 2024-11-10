import { auth } from "@/server/auth";
import ApplicationStatusCard from "@/components/ui/application-status";
import { api } from "@/trpc/server";
import TeamDetailCard from "@/components/ui/team-detail-card";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-12">
      <ApplicationStatusCard
        team={teamWithIncludes}
        competition={competition}
      />

      <Separator />

      <TeamDetailCard data={teamWithIncludes} />
    </div>
  );
}
