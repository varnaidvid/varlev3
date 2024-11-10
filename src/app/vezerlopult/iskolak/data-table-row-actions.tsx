import { Row } from "@tanstack/react-table";
import { TeamDetailDialog } from "@/components/vezerlopult/versenyek/csapatok/team-details-dialog";
import { api } from "@/trpc/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const teamApprovedByOrganizerMutation =
    api.notification.teamApprovedByOrganizer.useMutation();
  const updateTeamStatusMutation = api.team.updateTeamStatus.useMutation();
  const teamRejectedByOrganizerMutation =
    api.notification.teamRejectedByOrganizer.useMutation();

  return <div>{/* Add any row actions here */}</div>;
}
