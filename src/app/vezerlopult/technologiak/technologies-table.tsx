"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Folder, MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { TechnologyWithDetails } from "@/server/api/routers/technology";

export default function TechnologiesTable({
  technologies,
}: {
  technologies: TechnologyWithDetails[];
}) {
  const [data, setData] = useState<TechnologyWithDetails[]>(technologies);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<
    string | null
  >(null);
  const deleteTechnologyMutation = api.technology.delete.useMutation();

  const handleDelete = async () => {
    if (selectedTechnologyId) {
      await deleteTechnologyMutation.mutateAsync({ id: selectedTechnologyId });
      setData((prevData) =>
        prevData.filter((technology) => technology.id !== selectedTechnologyId),
      );
      setOpenDialog(false);
      setSelectedTechnologyId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedTechnologyId(id);
    setOpenDialog(true);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Név</TableHead>
          <TableHead>Csapatok száma</TableHead>
          <TableHead>Versenyek száma</TableHead>
          <TableHead className="text-right">Műveletek</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((technology) => (
          <TableRow key={technology.id}>
            <TableCell className="font-medium">{technology.name}</TableCell>
            <TableCell>{technology.teams.length}</TableCell>
            <TableCell>{technology.competitions.length}</TableCell>
            <TableCell className="text-right">
              <Link
                href={`/vezerlopult/technologiak/${technology.id}`}
                className="mr-2"
              >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Szerkesztés</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-red-600"
                onClick={() => openDeleteDialog(technology.id)}
                disabled={
                  technology.teams.length > 0 ||
                  technology.competitions.length > 0
                }
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Törlés</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Biztosan törölni szeretnéd a{" "}
              {
                data.find(
                  (technology) => technology.id === selectedTechnologyId,
                )?.name
              }{" "}
              technológiát?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ez a művelet nem visszavonható. A technológia véglegesen törlődik.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Mégse
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Törlés</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Table>
  );
}
