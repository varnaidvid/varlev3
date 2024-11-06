import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PageTitle } from "../../components/ui/page-title";
import { Gauge } from "lucide-react";

export default function Page() {
  return (
    <>
      <header className="flex shrink-0 flex-col gap-2 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Gauge}
          fromColor="from-sky-400"
          toColor="to-blue-500"
          title="Vezérlőpult"
        />
      </header>

      <main>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="h-full min-h-[100vh] flex-1 rounded-xl bg-muted/50" />
        </div>
      </main>
    </>
  );
}
