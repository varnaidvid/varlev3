import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { CreateCategoryForm } from "@/components/vezerlopult/kategoriak/create-category-form";
import { Folder } from "lucide-react";

export default function NewCategory() {
  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Folder}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Kategória Létrehozása"
          links={[
            {
              href: "/vezerlopult/kategoriak",
              label: "Kategóriák",
            },
            {
              href: "/vezerlopult/kategoriak/uj",
              label: "Új kategória",
            },
          ]}
        />
      </header>

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full max-w-lg">
          <CreateCategoryForm />
        </Card>
      </main>
    </>
  );
}
