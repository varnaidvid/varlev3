import { PageTitle } from "@/components/ui/page-title";
import NotificationCenter from "@/components/vezerlopult/notification-center/notification-center";
import { auth } from "@/server/auth";
import { Cog } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import TeamSettings from "./team-settings";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <header className="flex items-center justify-between gap-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Cog}
          fromColor="from-gray-400/50"
          toColor="to-slate-500/50"
          title={"Beállítások"}
          links={[{ href: "/vezerlopult/beallitasok", label: "Beállítások" }]}
        />

        <NotificationCenter />
      </header>

      {session?.user.type === "TEAM" && <TeamSettings />}

      {/* <DotPattern
        className={cn(
          "absolute bottom-0 right-0 z-0 h-full w-full !fill-neutral-400/40",
        )}
      /> */}
    </>
  );
}
