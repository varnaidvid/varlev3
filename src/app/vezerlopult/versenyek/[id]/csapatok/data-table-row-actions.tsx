import { Row } from "@tanstack/react-table";
import {
  CheckCircle,
  Eye,
  File,
  MoreHorizontal,
  Trash,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeamDetailDialog } from "@/components/vezerlopult/versenyek/csapatok/team-details-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const handleApprove = () => {
    // Implement approval logic here
    console.log("Application approved");
  };

  const handleReject = (reason: string) => {
    // Implement rejection logic here
    console.log("Application rejected with reason:", reason);
  };

  return (
    <TeamDetailDialog
      teamId={(row.original as { id: string }).id}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
