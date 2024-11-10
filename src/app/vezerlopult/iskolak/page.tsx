import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Folder, Plus, School } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./schools-table";
import withRole from "@/utils/withRole";

export default async function SchoolsPage() {
  await withRole(["ORGANIZER"]);

  const schools = await api.school.getSchoolsWithDetails();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle
          Icon={School}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Iskolák"
          links={[
            {
              href: "/vezerlopult/iskolak",
              label: "Iskolák",
            },
          ]}
        />
        <Button asChild>
          <Link href="/vezerlopult/iskolak/uj">
            <Plus /> Új iskola beregisztrálása
          </Link>
        </Button>
      </div>

      <main className="px-4">
        <DataTable columns={columns} data={schools} />
      </main>
    </>
  );
}
