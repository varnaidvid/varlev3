import { PageTitle } from "@/components/ui/page-title";
import withRole from "@/utils/withRole";
import { Users } from "lucide-react";

export default async function Page() {
  await withRole(["WEBMESTER"]);

  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-300"
          toColor="to-indigo-400"
          title="Felhasználók"
          links={[
            {
              href: "/vezerlopult/felhasznalok",
              label: "Felhasználók",
            },
          ]}
        />
      </header>

      <main>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/85" />
            <div className="aspect-video rounded-xl bg-muted/85" />
            <div className="aspect-video rounded-xl bg-muted/85" />
          </div>
          <div className="h-full min-h-[100vh] flex-1 rounded-xl bg-muted/85" />
        </div>
      </main>
    </>
  );
}
