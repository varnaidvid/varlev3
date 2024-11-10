import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { CreateCompetitionForm } from "@/components/vezerlopult/versenyek/create-competition-form";
import { api } from "@/trpc/server";
import { Save, Trophy } from "lucide-react";
import withRole from "@/utils/withRole";

export default async function NewCompetition() {
  await withRole(["ORGANIZER"]);
  const categories = await api.category.getAll();
  const technologies = await api.technology.getAll();
  const subCategories = await api.subCategory.getAll();

  return (
    <>
      <PageTitle
        Icon={Trophy}
        fromColor="from-indigo-300"
        toColor="to-indigo-400"
        title="Verseny Létrehozása"
        links={[
          {
            href: "/vezerlopult/versenyek",
            label: "Versenyek",
          },
          {
            href: "/vezerlopult/versenyek/uj",
            label: "Új verseny",
          },
        ]}
      />

      <main className="pb-16">
        {/* <DataTable columns={columns} data={teams} /> */}
        {/* <div>
        {competitions.map((competition) => (
          // <div key={competition.id}>{competition.name}</div>
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div> */}
        <Card className="mx-auto w-full max-w-3xl">
          <CreateCompetitionForm
            categories={categories}
            technologies={technologies}
            subCategories={subCategories}
          />
        </Card>
      </main>
    </>
  );
}
