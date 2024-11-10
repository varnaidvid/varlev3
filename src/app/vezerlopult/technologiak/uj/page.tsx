import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { CreateTechnologyForm } from "@/components/vezerlopult/technologiak/create-technology-form";
import { Cpu } from "lucide-react";
import withRole from "@/utils/withRole";

export default async function NewTechnology() {
  await withRole(["ORGANIZER"]);

  return (
    <>
      <PageTitle
        Icon={Cpu}
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

      <main className="pb-16">
        <Card className="mx-auto w-full max-w-lg">
          <CreateTechnologyForm />
        </Card>
      </main>
    </>
  );
}
