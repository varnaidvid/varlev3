import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";
import { api } from "@/trpc/server";
import { Plus, Trophy } from "lucide-react";
import Link from "next/link";

export default async function CompetitionsPage() {
  const competitions = await api.competition.getAllWithDetails();

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <div className="flex items-center justify-between">
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
          <Button asChild>
            <Link href="/vezerlopult/versenyek/uj">
              <Plus /> Új verseny létrehozása
            </Link>
          </Button>
        </div>
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
