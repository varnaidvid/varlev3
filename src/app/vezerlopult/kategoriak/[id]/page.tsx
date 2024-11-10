import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { EditCategoryForm } from "@/components/vezerlopult/kategoriak/edit-category-form";
import { api } from "@/trpc/server";
import { Folder } from "lucide-react";

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = (await params).id;

  const category = await api.category.getById({ id: categoryId });
  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Folder}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Kategória Szerkesztése"
          links={[
            {
              href: "/vezerlopult/kategoriak",
              label: "Kategóriák",
            },
            {
              href: `/vezerlopult/kategoriak/${categoryId}`,
              label: "Kategória Szerkesztése",
            },
          ]}
        />
      </header>

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full max-w-lg">
          <EditCategoryForm category={category} />
        </Card>
      </main>
    </>
  );
}
