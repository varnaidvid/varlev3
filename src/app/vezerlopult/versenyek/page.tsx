import { PageTitle } from "@/components/ui/page-title";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";
import { api } from "@/trpc/server";
import { Trophy } from "lucide-react";

export default async function CompetitionsPage() {
  const competitions = await api.competition.getAllWithDetails();

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Trophy}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Versenyek"
          links={[
            {
              href: "/vezerlopult/versenyek",
              label: "Versenyek",
            },
          ]}
        />
      </header>

      <main className="px-4">
        {/* <DataTable columns={columns} data={teams} /> */}
        <div>
          {competitions.map((competition) => (
            // <div key={competition.id}>{competition.name}</div>
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </main>
    </>
  );
}
