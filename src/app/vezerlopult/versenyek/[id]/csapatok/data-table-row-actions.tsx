import { Row } from "@tanstack/react-table";
import { TeamDetailDialog } from "@/components/vezerlopult/versenyek/csapatok/team-details-dialog";
import { api } from "@/trpc/react";
import { te } from "date-fns/locale";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  competitionId: string;
  accountId: string;
}

export function DataTableRowActions<TData>({
  row,
  competitionId,
  accountId,
}: DataTableRowActionsProps<TData>) {
  const teamApprovedByOrganizerMutation =
    api.notification.teamApprovedByOrganizer.useMutation();
  const updateTeamStatusMutation = api.team.updateTeamStatus.useMutation();

  const handleApprove = (id: string) => {
    (async () => {
      await updateTeamStatusMutation.mutateAsync({
        teamId: id,
        status: "REGISTERED",
      });
      await teamApprovedByOrganizerMutation.mutateAsync({
        competitionId: competitionId,
        teamId: id,
        organizerId: accountId,
        redirectTo: `/vezerlopult/versenyek/${competitionId}/csapatok`,
      });
    })();
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
