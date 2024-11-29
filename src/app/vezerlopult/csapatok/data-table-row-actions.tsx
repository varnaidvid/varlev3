import { Row } from "@tanstack/react-table";
import { TeamDetailDialog } from "./team-details-dialog";
import { api } from "@/trpc/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  accountId: string;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  schoolId: string;
}

export function DataTableRowActions<TData>({
  row,
  accountId,
  setData,
  schoolId,
}: DataTableRowActionsProps<TData>) {
  const teamApprovedBySchoolMutation =
    api.notification.teamApprovedBySchool.useMutation();
  const updateTeamStatusMutation = api.team.updateTeamStatus.useMutation();

  const handleApprove = async (id: string) => {
    await updateTeamStatusMutation.mutateAsync({
      teamId: id,
      status: "WAITING_FOR_ORGANIZER_APPROVAL",
    });
    await teamApprovedBySchoolMutation.mutateAsync({
      teamId: id,
      schoolId: (row.original as { school: { id: string } }).school.id,
      competitionId: (row.original as { competitionId: string }).competitionId,
      redirectForOrganizer: `/vezerlopult/csapatok`,
    });
    setData((prevData) =>
      prevData.map((team) =>
        (team as { id: string }).id === id
          ? { ...team, status: "WAITING_FOR_ORGANIZER_APPROVAL" }
          : team,
      ),
    );
  };

  return (
    <TeamDetailDialog
      teamId={(row.original as { id: string }).id}
      onApprove={handleApprove}
      accountId={accountId}
    />
  );
}
