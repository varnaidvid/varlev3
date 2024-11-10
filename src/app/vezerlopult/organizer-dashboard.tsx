import { auth } from "@/server/auth";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, School, Trophy, Users2 } from "lucide-react";
import { api } from "@/trpc/server";
import { CompetitionsTable } from "../../components/ui/competitions-organizer-table";

export default async function OrganizerDashboard() {
  const session = await auth();

  const competitionCount = await api.organizer.getCompetitionCount();
  const teamCount = await api.organizer.getRegisteredTeamsCount();
  const schoolCount = await api.organizer.getSchoolCount();

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="w-full shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Versenyek száma
                </CardTitle>
              </div>

              <Trophy className="text-yellow-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">{competitionCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Regisztrált csapatok száma
                </CardTitle>
              </div>

              <Users2 className="text-blue-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">{teamCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Iskolák száma
                </CardTitle>
              </div>

              <School className="text-orange-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">{schoolCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <CompetitionsTable />
    </div>
  );
}
