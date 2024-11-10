import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { CreateTechnologyForm } from "@/components/vezerlopult/technologiak/create-technology-form";
import { Folder } from "lucide-react";

export default function NewTechnology() {
  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Folder}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Technológia Létrehozása"
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
      </header>

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full max-w-3xl">
          <CreateTechnologyForm />
        </Card>
      </main>
    </>
  );
}
