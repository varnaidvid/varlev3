import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Menü megnyitása</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Szerkesztés</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog>
          <DropdownMenuItem asChild>
            <DialogTrigger>
              <div className="flex items-center space-x-2">
                <Trash className="h-4 w-4 text-destructive" />
                <span>Törlés</span>
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
          <DialogTitle>Csapat törlése</DialogTitle>
          <DialogContent>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Csapat törlése</h3>
              <p>Biztosan törölni szeretnéd ezt a csapatot?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Mégse</Button>
                <Button variant="destructive">Törlés</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
