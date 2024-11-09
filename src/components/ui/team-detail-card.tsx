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
} from "lucide-react";
import { ApplicationStatus, Team } from "@prisma/client";
import { RouterOutputs } from "@/trpc/react";

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
            className="border-green-600 bg-green-200 text-green-600"
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Elfogadva iskola által
          </Badge>
        );
      case "APPROVED_BY_ORGANIZER":
        return (
          <Badge
            variant="outline"
            className="border-green-600 bg-green-200 text-green-600"
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Elfogadva szervező által
          </Badge>
        );
      case "DENIED_BY_ORGANIZER":
        return (
          <Badge
            variant="outline"
            className="border-red-600 bg-red-200 text-red-600"
          >
            <XCircle className="mr-1 h-4 w-4" />
            Elutasítva szervező által
          </Badge>
        );
      default:
        return (
          <Badge
            className="border-blue-600 bg-blue-200 text-blue-600"
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
          <p className="text-sm text-gray-600">{data?.Competition.name}</p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Blocks className="size-6 rounded-full border p-[3px]" />
            Verseny kategória(ák)
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
                <b>{coach.name}</b> (Iskola: {data?.school.name})
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Cpu className="size-6 rounded-full border p-[3px]" />
            Technológiák
          </h2>
          {data?.technologies.map((tech) => (
            <Badge key={tech.id} variant="secondary">
              {tech.name}
            </Badge>
          ))}
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
            <Mail className="size-6 rounded-full border p-[3px]" />
            Email címek
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {data?.emails.map((email) => (
              <li key={email.id} className="flex items-center gap-1 text-sm">
                <Mail className="h-4 w-4 text-gray-500" /> {email.email}
              </li>
            ))}
            {data?.emails.length === 0 && (
              <li className="text-sm text-gray-500">
                Nem adtatok meg még értesítendő email címet
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="grid w-full grid-cols-1 gap-2 p-4 sm:grid-cols-3">
        <Button variant="outline" className="w-full">
          <Trophy className="mr-2 h-4 w-4" />
          Verseny részletei
        </Button>

        <Button variant="outline" className="w-full">
          <MailPlus className="mr-2 h-4 w-4" />
          Email cím hozzáadás
        </Button>

        <Button variant="outline" className="w-full">
          <Cog className="mr-2 h-4 w-4" />
          Beállítások
        </Button>
      </CardFooter>
    </Card>
  );
}
