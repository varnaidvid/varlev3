import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Folder, Plus } from "lucide-react";
import Link from "next/link";
import CategoriesTable from "./categories-table";
import { CategoryWithDetails } from "@/server/api/routers/category";

export default async function CategoriesPage() {
  const categories = await api.category.getAllWithDetails();

  // categories: ({
  //     competitions: {
  //         description: string;
  //         id: string;
  //         name: string;
  //         image: string;
  //         maxTeamSize: number;
  //         deadline: Date;
  //     }[];
  // } & {
  //     description: string;
  //     id: string;
  //     name: string;
  // })[]

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
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
      </header>

      <main className="px-4">
        <CategoriesTable categories={categories} />
      </main>
    </>
  );
}
