import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { EditTechnologyForm } from "@/components/vezerlopult/technologiak/edit-technology-form";
import { api } from "@/trpc/server";
import { Folder } from "lucide-react";

export default async function EditTechnology({
  params,
}: {
  params: { id: string };
}) {
  const technologyId = (await params).id;

  const technology = await api.technology.getById({ id: technologyId });
  if (!technology) {
    return <div>Technology not found</div>;
  }

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Folder}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Technológia Szerkesztése"
          links={[
            {
              href: "/vezerlopult/technologiak",
              label: "Technológiák",
            },
            {
              href: `/vezerlopult/technologiak/${technologyId}`,
              label: "Technológia Szerkesztése",
            },
          ]}
        />
      </header>

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full max-w-3xl">
          <EditTechnologyForm technology={technology} />
        </Card>
      </main>
    </>
  );
}
