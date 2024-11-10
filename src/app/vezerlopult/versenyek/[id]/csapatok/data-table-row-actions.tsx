import { Row } from "@tanstack/react-table";
import { TeamDetailDialog } from "@/components/vezerlopult/versenyek/csapatok/team-details-dialog";
import { api } from "@/trpc/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  competitionId: string;
  accountId: string;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DataTableRowActions<TData>({
  row,
  competitionId,
  accountId,
  setData,
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
    setData((prevData) =>
      prevData.map((team) =>
        (team as { id: string }).id === id
          ? { ...team, status: "REGISTERED" }
          : team,
      ),
    );
  };

  const handleReject = async (reason: string) => {
    const teamId = (row.original as { id: string }).id;
    await updateTeamStatusMutation.mutateAsync({
      teamId: teamId,
      status: "REJECTED_BY_ORGANIZER",
    });
    await teamRejectedByOrganizerMutation.mutateAsync({
      teamId: teamId,
      accountId: accountId,
      competitionId: competitionId,
      redirectTo: `/vezerlopult/versenyek/${competitionId}/csapatok`,
      message: reason,
    });
    setData((prevData) =>
      prevData.map((team) =>
        (team as { id: string }).id === teamId
          ? { ...team, status: "REJECTED_BY_ORGANIZER" }
          : team,
      ),
    );
  };

  return (
    <TeamDetailDialog
      teamId={(row.original as { id: string }).id}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
