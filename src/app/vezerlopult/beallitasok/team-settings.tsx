import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ApplicationStatusCard from "@/components/ui/application-status";
import EditForm from "@/components/vezerlopult/beallitasok/team";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { Team } from "@prisma/client";
import React from "react";

export default async function TeamSettings() {
  const session = await auth();

  const teamWithDetails = await api.team.getTeamByAccountId({
    accountId: session?.user.id!,
  });
  if (!teamWithDetails) return;

  const notification = await api.notification.getDenialNotification();
  const technologies = await api.technology.getCompetitionTechnologies({
    competitionId: teamWithDetails.competitionId,
  });
  const schools = await api.school.getAll();
  const competition = await api.competition.getById({
    id: teamWithDetails.competitionId,
  });
  if (!competition) return;

  return (
    <div className="space-y-12">
      {notification && (
        <Alert variant="destructive">
          <AlertTitle>{notification.subject}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      {teamWithDetails.status === "REGISTERED" ? (
        <ApplicationStatusCard
          team={teamWithDetails}
          competition={competition}
          message={
            "Miután már jóváhagyta a szervező, nem tudod módosítani a csapat adatait."
          }
        />
      ) : (
        <EditForm
          schools={schools}
          competitionTechnologies={technologies}
          initialData={teamWithDetails}
        />
      )}
    </div>
  );
}
