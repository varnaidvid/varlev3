import { api } from "@/trpc/server";
import Notifications from "./notifications";
import CreateNewAnnouncement from "./create";
import { PageTitle } from "../../../../../components/ui/page-title";
import { Megaphone } from "lucide-react";

export default async function CompetitionAnnouncements({
  params,
}: {
  params: { id: string };
}) {
  const competitionId = (await params).id;

  const competitionAnnouncements =
    await api.organizer.getCompetitionAnnouncements({
      id: competitionId,
    });

  const competition = await api.competition.getById({ id: competitionId });

  return (
    <>
      <PageTitle
        title="Közlemények"
        Icon={Megaphone}
        fromColor="from-yellow-300/50"
        toColor="to-orange-400/40"
        links={[
          {
            href: "/vezerlopult/versenyek",
            label: "Versenyek",
          },
          {
            href: `/vezerlopult/versenyek/${competitionId}`,
            label: (competition?.name.slice(0, 20) as string) + "...",
          },
          {
            href: `/vezerlopult/versenyek/${competitionId}/kozlemenyek`,
            label: "Közlemények",
          },
        ]}
      />

      <div className="space-y-6">
        <CreateNewAnnouncement competitionId={competitionId} />

        <Notifications data={competitionAnnouncements} />
      </div>
    </>
  );
}
