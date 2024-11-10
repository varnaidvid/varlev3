import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { EditCategoryForm } from "@/components/vezerlopult/kategoriak/edit-category-form";
import { api } from "@/trpc/server";
import withRole from "@/utils/withRole";
import { Folder } from "lucide-react";

export default async function EditCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await withRole(["ORGANIZER"]);
  const categoryId = (await params).id;

  const category = await api.category.getById({ id: categoryId });
  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
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

      <main className="px-4 pb-16">
        <Card className="mx-auto w-full max-w-lg">
          <EditCategoryForm category={category} />
        </Card>
      </main>
    </>
  );
}
