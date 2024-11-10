import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import withRole from "@/utils/withRole";

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const session = await auth();

  await withRole(["SCHOOL"]);

  const { name } = await searchParams;

  const teams = await api.team.getTeamsBySchoolAccount({
    accountId: session!.user.id,
  });

  console.log(teams);

  return (
    <>
      <header>
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Jelentkező Csapatok"
          links={[
            {
              href: `/vezerlopult/csapatok`,
              label: "Csapatok",
            },
          ]}
        />
      </header>

      <main className="px-4">
        <DataTable
          columns={columns}
          initialData={teams}
          accountId={session!.user.id}
          teamName={name}
        />
      </main>
    </>
  );
}
