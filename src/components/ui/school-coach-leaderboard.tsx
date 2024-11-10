"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, Award, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RouterOutputs } from "@/trpc/react";

export default function SchoolCoachLeaderboard({
  data,
}: {
  data: RouterOutputs["school"]["getSchoolCoachesLeaderboard"];
}) {
  const coaches = data[0]?.coaches || [];
  const sortedCoaches = [...coaches].sort(
    (a, b) => b.teams.length - a.teams.length,
  );
  const totalCoaches = coaches.length;

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

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <div>
          <CardTitle className="text-xl">Tanár ranglista</CardTitle>
          <CardDescription>A felkészítő tanárok összegzése</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-0 pt-4 sm:px-4">
        <ScrollArea className="h-[250px] w-full">
          {sortedCoaches.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              Nincs megjeleníthető adat
            </div>
          )}

          {sortedCoaches.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Felkészítő tanár neve</TableHead>
                  <TableHead className="text-right">Csapatai</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCoaches.map((coach, index) => (
                  <TooltipProvider key={coach.id}>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-help">
                        <TableRow>
                          <TableCell className="text-center">
                            {getMedalIcon(index) || index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {coach.name}
                          </TableCell>
                          <TableCell className="cursor-help text-right">
                            {coach.teams.length}
                          </TableCell>
                        </TableRow>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="mb-1 font-semibold">
                          {coach.name} csapatai:
                        </p>
                        <ul className="list-disc pl-4">
                          {coach.teams.map((team) => (
                            <li key={team.id}>{team.name}</li>
                          ))}
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
            Összes felkészítő tanár: {totalCoaches}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
