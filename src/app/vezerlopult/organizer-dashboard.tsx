import { auth } from "@/server/auth";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default async function OrganizerDashboard() {
  const session = await auth();

  return (
    <div className="space-y-12">
      <div className="flex w-full flex-wrap gap-4">
        <Card className="flex-1 flex-grow shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Versenyek száma
                </CardTitle>
              </div>

              <Eye className="text-purple-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex-grow shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Regisztrált csapatok száma
                </CardTitle>
              </div>

              <Eye className="text-purple-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex-grow shadow-lg">
          <CardHeader className="border-b p-3">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-medium text-slate-800">
                  Iskolák száma
                </CardTitle>
              </div>

              <Eye className="text-purple-400" size={26} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{">"}</span>
              <span className="text-xl text-slate-800">100</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
