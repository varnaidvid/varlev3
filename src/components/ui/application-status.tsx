"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { ApplicationStatus, Competition, Team } from "@prisma/client";
import { api } from "@/trpc/react";
import { Countdown } from "../countdown";
import { cn } from "@/lib/utils";
import DotPattern from "./dot-pattern";

type StatusConfigType = {
  [key in ApplicationStatus]: {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    bgColor: string;
    borderColor: string;
    timerColor: string;
    dotColor: string;
  };
};

const statusConfig: StatusConfigType = {
  REGISTERED: {
    title: "Jelentkezés folyamatban",
    description: "Regisztrációtok az iskolátok jóváhagyására vár",
    icon: Loader2,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-blue-400/30",
  },
  APPROVED_BY_SCHOOL: {
    title: "Elfogadva",
    description: "Az iskola elfogadta a jelentkezéseteket",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-green-400/30",
  },
  APPROVED_BY_ORGANIZER: {
    title: "Elfogadva a szervezők által",
    description: "Az iskola elfogadta a jelentkezéseteket",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-green-400/30",
  },
  DENIED_BY_ORGANIZER: {
    title: "Elutasítva",
    description: "A szervezők elutasították a jelentkezéseteket",
    icon: AlertCircle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-red-400/30",
  },
};

export default function ApplicationStatusCard({
  competition,
  team,
}: {
  competition: Competition;
  team: Team;
}) {
  const config = statusConfig[team.status];
  const StatusIcon = config.icon;

  const { data: notification } =
    api.notification.getDenialNotification.useQuery(undefined, {
      enabled: team.status === "DENIED_BY_ORGANIZER",
    });

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
          <StatusIcon
            className={`h-6 w-6 ${config.color} ${team.status === "REGISTERED" ? "animate-spin" : ""}`}
          />
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${config.color}`}>
              {config.title}
            </h2>
            <p className="mt-1 text-gray-600">{config.description}</p>
            {team.status === "DENIED_BY_ORGANIZER" && (
              <p className="mt-2 text-gray-600">
                Szervező(k) üzenete: {notification?.message}
              </p>
            )}

            <div className="mt-4 text-sm text-gray-500">
              <p>Csapat: {team.name}</p>
              <p>Verseny: {competition.name}</p>
              <p>
                Határidő:{" "}
                {new Date(competition.deadline).toLocaleDateString("hu-HU")}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href={`/versenyek/${competition.id}`}>
                <Button
                  variant="outline"
                  className={`${config.color} hover:bg-white/30`}
                >
                  Verseny részletei
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Verseny kezdetéig</span>
                <Clock className={`h-4 w-4 ${config.color}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative z-10 flex justify-end">
            <div className={`text-2xl font-medium ${config.color}`}>
              <Countdown targetDate={competition.deadline.toISOString()} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
