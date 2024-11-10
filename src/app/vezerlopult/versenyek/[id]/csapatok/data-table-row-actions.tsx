import { Row } from "@tanstack/react-table";
import { TeamDetailDialog } from "@/components/vezerlopult/versenyek/csapatok/team-details-dialog";
import { api } from "@/trpc/react";

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
  const teamRejectedByOrganizerMutation =
    api.notification.teamRejectedByOrganizer.useMutation();

  const handleApprove = async (id: string) => {
    await updateTeamStatusMutation.mutateAsync({
      teamId: id,
      status: "REGISTERED",
    });
    await teamApprovedByOrganizerMutation.mutateAsync({
      competitionId: competitionId,
      teamId: id,
      accountId: accountId,
      redirectTo: `/vezerlopult/versenyek/${competitionId}/csapatok`,
    });
  };

  const handleReject = async (reason: string) => {
    await updateTeamStatusMutation.mutateAsync({
      teamId: (row.original as { id: string }).id,
      status: "REJECTED_BY_ORGANIZER",
    });
    await teamRejectedByOrganizerMutation.mutateAsync({
      teamId: (row.original as { id: string }).id,
      organizerId: accountId,
      competitionId: competitionId,
      redirectTo: `/vezerlopult/versenyek/${competitionId}/csapatok`,
      message: reason,
    });
  };

  return (
    <TeamDetailDialog
      teamId={(row.original as { id: string }).id}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
