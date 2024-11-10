"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Pencil, Trash } from "lucide-react";
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
import { SubCategoryWithDetails } from "@/server/api/routers/sub-category";

export default function SubCategoriesTable({
  subCategories,
}: {
  subCategories: SubCategoryWithDetails[];
}) {
  const [data, setData] = useState(subCategories);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const deleteSubCategoryMutation = api.subCategory.delete.useMutation();

  const handleDelete = async () => {
    if (selectedSubCategoryId) {
      await deleteSubCategoryMutation.mutateAsync({
        id: selectedSubCategoryId,
      });
      setData((prevData) =>
        prevData.filter(
          (subCategory) => subCategory.id !== selectedSubCategoryId,
        ),
      );
      setOpenDialog(false);
      setSelectedSubCategoryId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedSubCategoryId(id);
    setOpenDialog(true);
  };

  return (
    <div className="rounded-lg border shadow-sm">
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
          {data.map((subCategory) => (
            <TableRow key={subCategory.id}>
              <TableCell className="font-medium">{subCategory.name}</TableCell>
              <TableCell>{subCategory.teams.length}</TableCell>
              <TableCell>
                <Link
                  href={`/versenyek/${subCategory.Competition.id}`}
                  className="block max-w-xs truncate"
                  title={subCategory.Competition.name}
                >
                  {subCategory.Competition.name.length > 20
                    ? `${subCategory.Competition.name.slice(0, 10)}...${subCategory.Competition.name.slice(-10)}`
                    : subCategory.Competition.name}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/vezerlopult/alkategoriak/${subCategory.id}`}
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
                  onClick={() => openDeleteDialog(subCategory.id)}
                  disabled={subCategory.teams.length > 0}
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
                data.find(
                  (subCategory) => subCategory.id === selectedSubCategoryId,
                )?.name
              }{" "}
              alkategóriát?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ez a művelet nem visszavonható. Az alkategória véglegesen
              törlődik.
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
