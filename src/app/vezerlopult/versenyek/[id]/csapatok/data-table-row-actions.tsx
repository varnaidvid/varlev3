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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = () => {
    // Implement approval logic here
    console.log("Application approved");
  };

  const handleReject = () => {
    // Implement rejection logic here
    console.log("Application rejected with reason:", rejectionReason);
    setIsRejectDialogOpen(false);
    setRejectionReason("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          <Eye />
          {/* <span>Részletek</span> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Csapat neve majd</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Add your application details here */}
          <p>Team Name: some name placeholder</p>
          <p>Members: placeholder</p>
          <p>Project Description: placeholder</p>
          {/* Add more fields as needed */}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Approve
          </Button>
          <Dialog
            open={isRejectDialogOpen}
            onOpenChange={setIsRejectDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Application</DialogTitle>
              </DialogHeader>
              <Textarea
                placeholder="Enter reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
