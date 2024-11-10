import { PageTitle } from "../../components/ui/page-title";
import { Gauge } from "lucide-react";
import { auth } from "@/server/auth";
import NotificationCenter from "@/components/vezerlopult/notification-center/notification-center";
import TeamDashboard from "./team-dashboard";
import { api } from "@/trpc/server";
import { Team } from "@prisma/client";
import SchoolDashboard from "./school-dashboard";

export default async function Page() {
  const session = await auth();

  let team: Team | null = null;
  if (session?.user.type === "TEAM") {
    team = await api.team.getTeamByAccountId({
      accountId: session?.user.id!,
    });
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Gauge}
          fromColor="from-sky-400/50"
          toColor="to-blue-500/50"
          title={team ? team.name : "Vezérlőpult"}
        />

        <NotificationCenter />
      </header>

      {session?.user.type === "TEAM" && <TeamDashboard />}
      {session?.user.type === "SCHOOL" && <SchoolDashboard />}
    </>
  );
}
