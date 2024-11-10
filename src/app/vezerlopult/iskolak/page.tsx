import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { api } from "@/trpc/server";
import { Folder, Plus, School } from "lucide-react";
import Link from "next/link";
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

      <main className="px-4"></main>
    </>
  );
}
