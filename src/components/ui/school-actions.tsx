import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { School, Team } from "@prisma/client";
import { cn } from "@/lib/utils";
import DotPattern from "./dot-pattern";

type ActionStatus = "NO_ACTION" | "ACTION";

type StatusConfigType = {
  [key in ActionStatus]: {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    bgColor: string;
    borderColor: string;
    dotColor: string;
  };
};

const statusConfig: StatusConfigType = {
  NO_ACTION: {
    title: "Nincs függőben lévő teendő",
    description: "Jelenleg nincs olyan csapat, amely iskolai jóváhagyásra vár.",
    icon: CheckCircle2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    dotColor: "fill-blue-400/30",
  },
  ACTION: {
    title: "Függőben lévő jóváhagyások",
    description: "Csapatok várnak az iskolai jóváhagyásodra.",
    icon: AlertCircle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    dotColor: "fill-yellow-400/30",
  },
};

export default function SchoolActions({
  teamsWaitingForApproval,
}: {
  teamsWaitingForApproval: Team[];
}) {
  const status: ActionStatus =
    teamsWaitingForApproval.length === 0 ? "NO_ACTION" : "ACTION";
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card
      className={`w-full ${config.bgColor} ${config.borderColor} relative overflow-hidden border-2`}
    >
      <div
        className={cn(
          "absolute bottom-0 right-0 h-[400px] w-[400px]",
          "[mask-image:radial-gradient(300px_circle_at_bottom_right,white,transparent)]",
        )}
      >
        <DotPattern
          width={8}
          height={8}
          cx={2}
          cy={2}
          cr={2}
          className={cn(config.dotColor)}
        />
      </div>

      <CardContent className="relative z-10 p-6">
        <div className="flex items-start space-x-4">
          <StatusIcon className={`h-6 w-6 ${config.color}`} />
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${config.color}`}>
              {config.title}
            </h2>
            <p className="mt-1 text-gray-600">{config.description}</p>

            {status === "ACTION" && (
              <div className="my-8">
                <p className="font-medium text-gray-700">
                  Jóváhagyásra váró csapatok ({teamsWaitingForApproval.length}):
                </p>
                <ul className="mt-2 space-y-2">
                  {teamsWaitingForApproval.map((team) => (
                    <li
                      key={team.id}
                      className="flex items-center justify-between rounded-lg bg-white/50 p-3"
                    >
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-gray-600">
                          Jelentkezés ideje:{" "}
                          {team.createdAt.toLocaleDateString("hu-HU")}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className={config.color}
                      >
                        <Link href={`/vezerlopult/csapatok?name=${team.name}`}>
                          Részletek
                          <ExternalLink className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase text-neutral-400">
                További műveletek:
              </p>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" className={config.color}>
                  <Link href="/vezerlopult/csapatok">Összes csapat</Link>
                </Button>

                <Button asChild variant="outline" className={config.color}>
                  <Link href="/vezerlopult/beallitasok">Beállítások</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
