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
import { useState } from "react";

export default function CategoriesTable({
  categories,
}: {
  categories: CategoryWithDetails[];
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const deleteCategoryMutation = api.category.delete.useMutation();

  const handleDelete = async () => {
    if (selectedCategoryId) {
      await deleteCategoryMutation.mutateAsync({ id: selectedCategoryId });
      setOpenDialog(false);
      setSelectedCategoryId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  };

  return (
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
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>{category.competitions.length}</TableCell>
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
                      href={`/vezerlopult/kategoriak/${category.id}`}
                      className="flex items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Szerkesztés</span>
                    </Link>
                  </DropdownMenuItem>
                  {category.competitions.length > 0 ? (
                    <DropdownMenuItem className="text-red-600" disabled>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex cursor-not-allowed items-center">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Törlés</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Nem törölheted ezt a kategóriát, mivel vannak benne
                            versenyek.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => openDeleteDialog(category.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Törlés</span>
                    </DropdownMenuItem>
                  )}
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
                categories.find(
                  (category) => category.id === selectedCategoryId,
                )?.name
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
    </Table>
  );
}
