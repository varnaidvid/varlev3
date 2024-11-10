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

export default function TechnologiesTable({
  technologies,
}: {
  technologies: Technology[];
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<
    string | null
  >(null);
  const deleteTechnologyMutation = api.technology.delete.useMutation();

  const handleDelete = async () => {
    if (selectedTechnologyId) {
      await deleteTechnologyMutation.mutateAsync({ id: selectedTechnologyId });
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
          <TableHead className="text-right">Műveletek</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {technologies.map((technology) => (
          <TableRow key={technology.id}>
            <TableCell className="font-medium">{technology.name}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Műveletek megnyitása</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href={`/vezerlopult/technologiak/${technology.id}`}
                      className="flex items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Szerkesztés</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => openDeleteDialog(technology.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Törlés</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                technologies.find(
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
