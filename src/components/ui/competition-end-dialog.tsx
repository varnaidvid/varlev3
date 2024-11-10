"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { X, Save, Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Competition } from "@prisma/client";

const TournamentEndDialog = ({
  competition,
  open,
  setOpen,
  onOpenChange,
}: {
  competition: Competition;
  setOpen: any;
  open: boolean;
  onOpenChange: any;
}) => {
  const router = useRouter();
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const { data: teams } = api.team.getTeamsByCompetition.useQuery({
    competitionId: competition.id,
  });

  const endTournamentMutation = api.organizer.endTournament.useMutation({
    onSuccess: () => {
      toast.success("A verseny sikeresen lezárva");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error("Hiba történt a verseny lezárása közben");
    },
  });

  const handleScoreChange = (teamId: string, value: any) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setScores((prev) => ({
        ...prev,
        [teamId]: numValue,
      }));
    }
  };

  const handleSubmit = async () => {
    const results = Object.entries(scores).map(([teamId, score]) => ({
      teamId,
      score,
      competitionId: competition.id,
      place: 0,
    }));

    const sortedResults = results.sort((a: any, b: any) => b.score - a.score);
    sortedResults.forEach((result, index) => {
      result.place = index + 1;
    });

    await endTournamentMutation.mutateAsync({
      id: competition.id,
      results: sortedResults as any,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Verseny lezárása és pontszámok megadása</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Csapat neve</TableHead>
                <TableHead>Iskola</TableHead>
                <TableHead className="w-32 text-right">Pontszám</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams?.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.school.name}</TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center justify-end space-x-2">
                      <Input
                        type="number"
                        min="0"
                        className="w-[120px] px-4"
                        value={scores[team.id] || ""}
                        onChange={(e) =>
                          handleScoreChange(team.id, e.target.value)
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Mégsem
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              teams?.length !== Object.keys(scores).length ||
              endTournamentMutation.status === "pending"
            }
          >
            {endTournamentMutation.status === "pending" ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Mentés és lezárás
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentEndDialog;
