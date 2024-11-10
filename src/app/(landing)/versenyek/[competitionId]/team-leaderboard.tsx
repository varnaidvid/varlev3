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

interface TeamData {
  id: string;
  name: string;
  score: number;
  members: string[];
}

interface TeamLeaderboardProps {
  teams: TeamData[];
}

export function TeamLeaderboard({ teams }: TeamLeaderboardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const totalTeams = teams.length;

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
                            {team.name}
                          </TableCell>
                          <TableCell className="cursor-help text-right">
                            {team.score}
                          </TableCell>
                        </TableRow>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="mb-1 font-semibold">
                          {team.name} tagjai:
                        </p>
                        <ul className="list-disc pl-4">
                          {team.members.map((member, idx) => (
                            <li key={idx}>{member}</li>
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
            Összes csapat: {totalTeams}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
