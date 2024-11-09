import { auth } from "@/server/auth";
import ApplicationStatusCard from "@/components/ui/application-status";
import { api } from "@/trpc/server";

export default async function TeamDashboard() {
  const session = await auth();
  console.log("session: ", session);

  const team = await api.team.getTeamByAccountId({
    accountId: session?.user.id!,
  });
  if (!team) return;

  const competition = await api.competition.getById({ id: team.competitionId });
  if (!competition) return;

  return (
    <div>
      <ApplicationStatusCard team={team} competition={competition} />
    </div>
  );
}
