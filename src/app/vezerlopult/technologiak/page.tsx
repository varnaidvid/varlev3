import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import TechnologiesTable from "./technologies-table";
import { api } from "@/trpc/server";
import { Cpu, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TechnologiesPage() {
  const technologies = await api.technology.getAllWithDetails();

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <div className="flex items-center justify-between">
          <PageTitle
            Icon={Cpu}
            fromColor="from-indigo-300"
            toColor="to-indigo-400"
            title="Technológiák"
            links={[
              {
                href: "/vezerlopult/technologiak",
                label: "Technológiák",
              },
              {
                href: "/vezerlopult/technologiak/uj",
                label: "Új technológia",
              },
            ]}
          />

          <Button asChild>
            <Link href="/vezerlopult/technologiak/uj">
              <Plus /> Új technológia létrehozása
            </Link>
          </Button>
        </div>
      </header>

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full">
          <TechnologiesTable technologies={technologies} />
        </Card>
      </main>
    </>
  );
}
