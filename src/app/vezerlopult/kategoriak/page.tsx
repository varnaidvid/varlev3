import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Folder, Plus } from "lucide-react";
import Link from "next/link";
import CategoriesTable from "./categories-table";
import { CategoryWithDetails } from "@/server/api/routers/category";

export default async function CategoriesPage() {
  const categories = await api.category.getAllWithDetails();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle
          Icon={Folder}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Kategóriák"
          links={[
            {
              href: "/vezerlopult/kategoriak",
              label: "Kategóriák",
            },
          ]}
        />
        <Button asChild>
          <Link href="/vezerlopult/kategoriak/uj">
            <Plus /> Új kategória létrehozása
          </Link>
        </Button>
      </div>

      <main>
        <CategoriesTable categories={categories} />
      </main>
    </>
  );
}
