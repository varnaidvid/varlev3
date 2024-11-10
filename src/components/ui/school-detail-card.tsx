"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Building2,
  UserRound,
  School,
  GraduationCap,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { RouterOutputs } from "@/trpc/react";
import Link from "next/link";

export default function SchoolDetailCard({
  data,
}: {
  data: RouterOutputs["school"]["getSchoolByAccountId"];
}) {
  return (
    <Card className="mx-auto w-full overflow-hidden">
      <CardHeader className="bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{data?.name}</h2>
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-500"
          >
            <School className="mr-2 size-[14px]" />
            Iskola
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Building2 className="size-6 rounded-full border p-[3px]" />
            Cím
          </h2>
          <p className="text-sm text-gray-600">{data?.address}</p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <UserRound className="size-6 rounded-full border p-[3px]" />
            Kapcsolattartó
          </h2>
          <p className="text-sm text-gray-600">{data?.contactName}</p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Trophy className="size-6 rounded-full border p-[3px]" />
            Versenyző csapatok
          </h2>
          {data?.teams && data.teams.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {data.teams.map((team) => (
                <li key={team.id} className="text-sm">
                  <Link
                    href={`/vezerlopult/csapatok/${team.id}`}
                    className="flex items-start gap-1 hover:underline"
                  >
                    <span>
                      <b>{team.name}</b> - {team.Competition.name}
                    </span>

                    <ExternalLink className="size-3" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Nincsenek még versenyző csapatok
            </p>
          )}
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <GraduationCap className="size-6 rounded-full border p-[3px]" />
            Felkészítő tanárok
          </h2>
          {data?.coaches && data.coaches.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {data.coaches.map((coach) => (
                <li key={coach.id} className="text-sm">
                  <span className="font-medium">{coach.name}</span>
                  {coach.Team.name && (
                    <span className="text-gray-500">
                      {" "}
                      - Csapat: {coach.Team.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Nincsenek még felkészítő tanárok
            </p>
          )}
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Mail className="size-6 rounded-full border p-[3px]" />
            Értesítési email címek
          </h2>
          {data?.account.emails && data.account.emails.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {data.account.emails.map((email) => (
                <li key={email.id} className="text-sm">
                  {email.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Nem adtatok meg még értesítendő email címet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
