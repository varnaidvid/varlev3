import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PageTitle } from "@/components/ui/page-title";
import { Gauge, Users } from "lucide-react";

export default function Page() {
  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Users}
          fromColor="from-indigo-400"
          toColor="to-indigo-500"
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
