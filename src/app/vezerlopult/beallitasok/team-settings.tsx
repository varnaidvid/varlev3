import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ApplicationStatusCard from "@/components/ui/application-status";
import EditForm from "@/components/vezerlopult/team/update";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { Notification, Team } from "@prisma/client";
import React from "react";

export default async function TeamSettings() {
  const session = await auth();

  const teamWithDetails = await api.team.getTeamByAccountId({
    accountId: session?.user.id!,
  });
  if (!teamWithDetails) return;

  const notification = await api.notification.getDenialNotification();

  const schools = await api.school.getAll();

  return (
    <div className="space-y-12">
      {(teamWithDetails.status === "WAITING_FOR_ORGANIZER_APPROVAL" ||
        teamWithDetails.status === "WAITING_FOR_SCHOOL_APPROVAL") && (
        <ApplicationStatusCard
          competition={teamWithDetails.Competition}
          team={teamWithDetails}
          message={"Jóváhagyásra várva nem tudod módosítani a csapat adatait."}
        />
      )}

      {teamWithDetails.status === "REGISTERED" && (
        <ApplicationStatusCard
          competition={teamWithDetails.Competition}
          team={teamWithDetails}
          message={
            "Miután már jóváhagyta a szervező, nem tudod módosítani a csapat adatait."
          }
        />
      )}

      {teamWithDetails.status === "REJECTED_BY_ORGANIZER" && (
        <>
          <Alert variant="destructive">
            <AlertTitle>{notification.subject}</AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>

          <EditForm schools={schools} initialData={teamWithDetails} />
        </>
      )}
    </div>
  );
}
