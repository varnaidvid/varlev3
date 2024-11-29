"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Mail,
  CheckCircle,
  XCircle,
  Cog,
  Trophy,
  MailPlus,
  School,
  BrainCircuit,
  Cpu,
  Blocks,
  ExternalLink,
} from "lucide-react";
import { ApplicationStatus, Team } from "@prisma/client";
import { RouterOutputs } from "@/trpc/react";
import Link from "next/link";

export default function TeamDetailCard({
  data,
}: {
  data: RouterOutputs["team"]["getTeamByAccountId"];
}) {
  const formatStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "APPROVED_BY_SCHOOL":
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-500"
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Elfogadva iskola által
          </Badge>
        );
      case "REGISTERED":
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-500"
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Regisztrálva a versenyre
          </Badge>
        );
      case "REJECTED_BY_ORGANIZER":
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-500"
          >
            <XCircle className="mr-1 h-4 w-4" />
            Elutasítva szervező által
          </Badge>
        );
      default:
        return (
          <Badge
            className="border-blue-200 bg-blue-50 text-blue-600"
            variant="outline"
          >
            Jóváhagyásra vár
          </Badge>
        );
    }
  };

  return (
    <Card className="mx-auto w-full overflow-hidden">
      <CardHeader className="bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{data?.name}</h2>
          {data?.status && formatStatusBadge(data.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <School className="size-6 rounded-full border p-[3px]" />
            Iskola
          </h2>
          <p className="text-sm text-gray-600">{data?.school.name}</p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Trophy className="size-6 rounded-full border p-[3px]" />
            Verseny
          </h2>
          <Link
            href={`/versenyek/${data?.Competition.id}`}
            className="flex items-start gap-1 text-sm text-gray-600 hover:underline"
          >
            {data?.Competition.name}
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Blocks className="size-6 rounded-full border p-[3px]" />
            Verseny főkategóriái
          </h2>

          <ul className="list-disc pl-5 text-gray-600">
            {data?.Competition.categories.map((category) => (
              <li key={category.id} className="text-sm">
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Users className="size-6 rounded-full border p-[3px]" />
            Csapattagok
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {data?.members.map((member) => (
              <li key={member.id} className="text-sm">
                <b>{member.name}</b> -- Évfolyam: <b>{member.year}</b>{" "}
                {member.isReserve && "(Póttag)"}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <BrainCircuit className="size-6 rounded-full border p-[3px]" />
            Felkészítő tanárok
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {data?.coaches.map((coach) => (
              <li key={coach.id} className="text-sm">
                <b>{coach.name}</b>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Cpu className="size-6 rounded-full border p-[3px]" />
            Kiválasztott technológiák
          </h2>
          <div className="flex flex-wrap gap-2">
            {data?.technologies.map((tech) => (
              <Badge key={tech.id} variant="secondary">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Cpu className="size-6 rounded-full border p-[3px]" />
            Kiválasztott alkategória
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{data?.SubCategory.name}</Badge>
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Mail className="size-6 rounded-full border p-[3px]" />
            Email címek
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {data?.account.emails.map((email) => (
              <li key={email.id} className="flex items-center gap-1 text-sm">
                {email.email}
              </li>
            ))}
            {data?.account.emails.length === 0 && (
              <li className="text-sm text-gray-500">
                Nem adtatok meg még értesítendő email címet
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
