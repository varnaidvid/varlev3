import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import JelentkezesButton from "@/components/JelentkezesButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, Medal, Trophy, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Page({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;
  const competition = await api.competition.getById({ id: competitionId });
  if (!competition) return null;
  const competitionStatus = competition.ended
    ? "CLOSED"
    : competition.deadline > new Date()
      ? "PENDING"
      : "RUNNING";

  if (!competition) return null;

  const results = await api.competition.getResults({
    id: competitionId,
  });

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const sortedTeams = [...results].sort((a, b) => b.score - a.score);
  const totalTeams = results.length;

  return (
    <div className="mx-auto mt-28 w-[calc(100%-16px)] max-w-7xl space-y-8 sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
      <div className="rounded-lg border bg-card p-8 shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <img
            className="aspect-video w-full rounded-lg object-cover shadow-xl lg:w-1/3"
            src={competition.image}
            alt={competition.name}
          />
          <div className="flex w-full flex-col justify-between lg:w-2/3">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                {competition.name}
              </h1>
              <Badge variant="outline" className="text-xs">
                {competitionStatus === "PENDING" && "Függőben"}
                {competitionStatus === "RUNNING" && "Fut"}
                {competitionStatus === "CLOSED" && "Lezárva"}
              </Badge>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Max. csapat létszám</span>
                  <span>{competition.maxTeamSize}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Technológiák</span>
                  <div className="flex flex-wrap gap-2">
                    {competition.technologies.map(
                      (tech: { id: string; name: string }) => (
                        <Badge key={tech.id} variant="secondary">
                          {tech.name}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Kategóriák</span>
                  <div className="flex flex-wrap gap-2">
                    {competition.categories.map(
                      (cat: { id: string; name: string }) => (
                        <Badge key={cat.id}>{cat.name}</Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
              {competitionStatus === "PENDING" && (
                <div className="mt-6">
                  <JelentkezesButton competitionId={competition.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {competitionStatus === "CLOSED" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <Card className="h-full w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
                <div>
                  <CardTitle className="text-xl">Csapat ranglista</CardTitle>
                  <CardDescription>
                    A versenyben résztvevő csapatok eredményei
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-0 pt-4 sm:px-4">
                <ScrollArea className="h-[250px] w-full">
                  {sortedTeams.length === 0 && (
                    <div className="flex h-full w-full items-center justify-center">
                      Nincs megjeleníthető adat
                    </div>
                  )}

                  {sortedTeams.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 text-center">#</TableHead>
                          <TableHead>Csapat neve</TableHead>
                          <TableHead className="text-right">Pontszám</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedTeams.map((team, index) => (
                          <TooltipProvider key={team.id}>
                            <Tooltip>
                              <TooltipTrigger asChild className="cursor-help">
                                <TableRow>
                                  <TableCell className="text-center">
                                    {getMedalIcon(index) || index + 1}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {team.Team.name}
                                  </TableCell>
                                  <TableCell className="cursor-help text-right">
                                    {team.score}
                                  </TableCell>
                                </TableRow>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="mb-1 font-semibold">
                                  {team.Team.name} tagjai:
                                </p>
                                <ul className="list-disc pl-4">
                                  {team.Team.members.map(
                                    (member: any, idx: any) => (
                                      <li key={idx}>{member}</li>
                                    ),
                                  )}
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Összes csapat: {totalTeams}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold">Leírás</h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: competition.description }}
            />
          </div>
        </div>
      )}
      {competitionStatus === "PENDING" && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Leírás</h2>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: competition.description }}
          />
        </div>
      )}
    </div>
  );
}
