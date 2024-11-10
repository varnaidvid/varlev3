"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  MousePointerClickIcon,
} from "lucide-react";
import Link from "next/link";
import { ApplicationStatus, Competition, Team } from "@prisma/client";
import { api } from "@/trpc/react";
import { Countdown } from "../countdown";
import { cn } from "@/lib/utils";
import DotPattern from "./dot-pattern";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

const statusColors = {
  WAITING_FOR_SCHOOL_APPROVAL: "bg-yellow-100 text-yellow-800",
  APPROVED_BY_SCHOOL: "bg-blue-100 text-blue-800",
  WAITING_FOR_ORGANIZER_APPROVAL: "bg-yellow-100 text-yellow-800",
  REJECTED_BY_ORGANIZER: "bg-red-100 text-red-800",
  REGISTERED: "bg-green-100 text-green-800",

  COMPETITION_RUNNING: "bg-blue-100 text-blue-800",
};

const statusIcons = {
  REGISTERED: <CheckCircle className="mr-1 h-4 w-4" />,
  APPROVED_BY_SCHOOL: <CheckCircle className="mr-1 h-4 w-4" />,
  REJECTED_BY_ORGANIZER: <XCircle className="mr-1 h-4 w-4" />,
  WAITING_FOR_SCHOOL_APPROVAL: <Clock className="mr-1 h-4 w-4" />,
  WAITING_FOR_ORGANIZER_APPROVAL: <Clock className="mr-1 h-4 w-4" />,

  COMPETITION_RUNNING: <Clock className="mr-1 h-4 w-4" />,
};

export function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus & "COMPETITION_RUNNING";
}) {
  return (
    <Badge className={`${statusColors[status]}`}>
      {statusIcons[status]}
      {status === "REGISTERED" && "Regisztrált"}
      {status === "APPROVED_BY_SCHOOL" && "Iskola által jóváhagyott"}
      {status === "WAITING_FOR_ORGANIZER_APPROVAL" &&
        "Szervezői jóváhagyásra vár"}
      {status === "REJECTED_BY_ORGANIZER" && "Hiánypótlásra vár"}
      {status === "WAITING_FOR_SCHOOL_APPROVAL" && "Iskolai jóváhagyásra vár"}
      {status === "COMPETITION_RUNNING" && "Verseny éppen zajlik"}
    </Badge>
  );
}

type StatusConfigType = {
  [key: string]: {
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
    title: "Regisztráció sikeres",
    description:
      "Csapatod sikeresen beregisztrálva a versenyre. Sikeres felkészülést kívánunk!",
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-blue-400/30",
  },
  WAITING_FOR_ORGANIZER_APPROVAL: {
    title: "Várakozás szervezői jóváhagyásra",
    description:
      "Csapatod jelentkezését a szervezők még nem fogadták el. Kérlek várj türelemmel.",
    icon: Loader2,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-yellow-400/30",
  },
  WAITING_FOR_SCHOOL_APPROVAL: {
    title: "Várakozás iskolai jóváhagyásra",
    description:
      "Csapatod jelentkezését az iskola még nem fogadta el. Kérlek várj türelemmel.",
    icon: Loader2,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-yellow-400/30",
  },
  APPROVED_BY_SCHOOL: {
    title: "Elfogadva az iskolád által",
    description: "Az iskola elfogadta a jelentkezéseteket",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-green-400/30",
  },
  REJECTED_BY_ORGANIZER: {
    title: "Hiánypótlás szükséges",
    description: "A szervezők hiányosságokat találtak a jelentkezésben",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-red-400/30",
  },

  COMPETITION_RUNNING: {
    title: "Verseny éppen zajlik",
    description: "A verseny éppen zajlik. Sok sikert kívánunk!",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    timerColor: "text-neutral-600",
    dotColor: "fill-blue-400/30",
  },
};

export default function ApplicationStatusCard({
  competition,
  team,
  message,
}: {
  competition: Competition;
  team: Team;
  message?: string;
}) {
  const isRunning = competition.deadline > new Date() && !competition.ended;

  const config = statusConfig[isRunning ? "COMPETITION_RUNNING" : team.status];
  if (!config) return;

  const StatusIcon = config.icon;

  const { data: notification } =
    api.notification.getDenialNotification.useQuery(undefined, {
      enabled: team.status === "REJECTED_BY_ORGANIZER",
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
            className={`h-6 w-6 ${config.color} ${["WAITING_FOR_ORGANIZER_APPROVAL", "WAITING_FOR_SCHOOL_APPROVAL"].includes(team.status) && "animate-spin"}`}
          />
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${config.color}`}>
              {config.title}
            </h2>
            <p className="mt-1 text-gray-600">{config.description}</p>
            {team.status === "REJECTED_BY_ORGANIZER" && (
              <p className="mt-2 text-gray-600">
                Szervező(k) üzenete:{" "}
                {notification?.message ?? "Tekintsd meg értesítés központodban"}
              </p>
            )}
            {message && (
              <Alert className="mt-2 bg-white/50">
                <AlertTitle>
                  {message.split("\n\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br className="mt-1" />
                    </React.Fragment>
                  ))}
                </AlertTitle>
                <AlertDescription>
                  Ha bármilyen kérdésed van, kérlek vedd fel a kapcsolatot a
                  szervezőkkel.
                </AlertDescription>
              </Alert>
            )}

            {message ? (
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  <b>Csapat:</b> {team.name}
                </p>
                <p className="flex items-center gap-1">
                  <b>Verseny:</b>
                  <Link
                    href={`/versenyek/${competition.id}`}
                    className="flex items-start gap-1 text-sm hover:underline"
                  >
                    {competition.name}
                    <ExternalLink className="size-3" />
                  </Link>
                </p>
                <p>
                  <b>Határidő:</b>{" "}
                  {new Date(competition.deadline).toLocaleDateString("hu-HU")}
                </p>
              </div>
            ) : (
              <div className="mt-6 flex flex-col justify-between gap-10 sm:flex-row">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase text-neutral-400">
                    További műveletek:
                  </p>

                  <div className="flex items-center gap-2">
                    {team.status === "REJECTED_BY_ORGANIZER" && (
                      <Button
                        asChild
                        variant="outline"
                        className={`${config.color}`}
                      >
                        <Link href={`/vezerlopult/beallitasok`}>
                          Hiánypótlás
                          <MousePointerClickIcon className="size-2" />
                        </Link>
                      </Button>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      className={`${config.color}`}
                    >
                      <Link href={`/versenyek/${competition.id}`}>
                        Verseny részletei
                        <ExternalLink className="size-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="-mb-4 flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">
                    Verseny kezdetéig
                  </span>
                  <Clock className={`h-4 w-4 ${config.color}`} />
                </div>
              </div>
            )}
          </div>
        </div>

        {!message && (
          <div className="mt-8">
            <div className="relative z-10 flex justify-end">
              <div
                className={`text-lg font-medium sm:text-xl md:text-2xl ${config.color}`}
              >
                <Countdown targetDate={competition.deadline.toISOString()} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
