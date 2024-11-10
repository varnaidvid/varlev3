"use client";

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/react"; // Update the import to use the correct API client
import {
  Folder,
  Plus,
  Trophy,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
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
import { CategoryWithDetails } from "@/server/api/routers/category";
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
import { useState, useEffect } from "react";

export default function CategoriesTable({
  categories,
}: {
  categories: CategoryWithDetails[];
}) {
  const [data, setData] = useState<CategoryWithDetails[]>(categories);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const deleteCategoryMutation = api.category.delete.useMutation();

  const handleDelete = async () => {
    if (selectedCategoryId) {
      await deleteCategoryMutation.mutateAsync({ id: selectedCategoryId });
      setData((prevData) =>
        prevData.filter((category) => category.id !== selectedCategoryId),
      );
      setOpenDialog(false);
      setSelectedCategoryId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Név</TableHead>
            <TableHead>Leírás</TableHead>
            <TableHead>Versenyek száma</TableHead>
            <TableHead className="text-right">Műveletek</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {category.description.length > 50
                  ? `${category.description.substring(0, 50)}...`
                  : category.description}
              </TableCell>
              <TableCell>{category.competitions.length}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/vezerlopult/kategoriak/${category.id}`}
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
                  onClick={() => openDeleteDialog(category.id)}
                  disabled={category.competitions.length > 0}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Törlés</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Biztosan törölni szeretnéd a{" "}
              {
                data.find((category) => category.id === selectedCategoryId)
                  ?.name
              }{" "}
              kategóriát?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ez a művelet nem visszavonható. A kategória véglegesen törlődik.
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
    </div>
  );
}
