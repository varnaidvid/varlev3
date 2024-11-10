import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Blocks, Plus } from "lucide-react";
import Link from "next/link";
import SubCategoriesTable from "./subcategories-table";

export default async function SubCategoriesPage() {
  const subCategories = await api.subCategory.getAllWithDetails();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle
          Icon={Blocks}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Alkategóriák"
          links={[
            {
              href: "/vezerlopult/alkategoriak",
              label: "Alkategóriák",
            },
          ]}
        />
        <Button asChild>
          <Link href="/vezerlopult/alkategoriak/uj">
            <Plus /> Új alkategória létrehozása
          </Link>
        </Button>
      </div>

      <main className="px-4">
        <SubCategoriesTable subCategories={subCategories} />
      </main>
    </>
  );
}
