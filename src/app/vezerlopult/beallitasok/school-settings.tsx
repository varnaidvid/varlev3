import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ApplicationStatusCard from "@/components/ui/application-status";
import { Card } from "@/components/ui/card";
import SchoolUpdateForm from "@/components/vezerlopult/school/update/form";
import EditForm from "@/components/vezerlopult/team/update";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { Notification, Team } from "@prisma/client";
import React from "react";

export default async function SchoolSettings() {
  const session = await auth();

  const schoolWithDetails = await api.school.getSchoolDetails({
    accountId: session!.user.id,
  });
  if (!schoolWithDetails) return;

  return (
    <div className="space-y-12">
      <Card className="mx-auto w-full">
        <SchoolUpdateForm initialData={schoolWithDetails} />
      </Card>
    </div>
  );
}
