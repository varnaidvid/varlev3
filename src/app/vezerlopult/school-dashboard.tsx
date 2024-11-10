import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import SchoolDetailCard from "@/components/ui/school-detail-card";
import { RegisteredTeamsBarChart } from "@/components/ui/registered-teams-bar-chart";
import { ClientOnly } from "../../components/client-only";
import SchoolActions from "../../components/ui/school-actions";
import SchoolCoachLeaderboard from "@/components/ui/school-coach-leaderboard";
import { Separator } from "@/components/ui/separator";

export default async function SchoolDashboard() {
  const session = await auth();

  const schoolWithIncludes = await api.school.getSchoolByAccountId({
    accountId: session?.user.id!,
  });
  if (!schoolWithIncludes) return;

  const teamsWaitingForApproval = await api.school.getTeamsWaitingForApproval();
  const schoolCoachLeaderboard = await api.school.getSchoolCoachesLeaderboard();

  return (
    <div className="space-y-12">
      <SchoolActions teamsWaitingForApproval={teamsWaitingForApproval} />

      <Separator />

      <ClientOnly>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <div className="h-[410px] min-w-[400px] flex-1">
            <RegisteredTeamsBarChart />
          </div>
          <div className="h-[410px] min-w-[400px] flex-1">
            <SchoolCoachLeaderboard data={schoolCoachLeaderboard} />
          </div>
        </div>
      </ClientOnly>

      <div>
        <SchoolDetailCard data={schoolWithIncludes} />
      </div>
    </div>
  );
}
