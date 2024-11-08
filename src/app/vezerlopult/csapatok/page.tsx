import { PageTitle } from "@/components/ui/page-title";
import { Users } from "lucide-react";
import { api } from "@/trpc/server";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function TeamsPage() {
  const teams = await api.teams.getTeamsWithDetails();

  console.log(teams);

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Csapatok"
          links={[
            {
              href: "/vezerlopult/csapatok",
              label: "Csapatok",
            },
          ]}
        />
      </header>

      <main className="px-4">
        <DataTable columns={columns} data={teams} />
      </main>
    </>
  );
}
