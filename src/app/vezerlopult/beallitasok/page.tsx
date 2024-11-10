import { PageTitle } from "@/components/ui/page-title";
import NotificationCenter from "@/components/vezerlopult/notification-center/notification-center";
import { auth } from "@/server/auth";
import { Cog } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import TeamSettings from "./team-settings";
import SchoolSettings from "./school-settings";

export default async function Page() {
  const session = await auth();

  return (
    // <div className="relative -mb-[170px] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background p-2">
    //   <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
    //     <ClientOnly>
    //       <LoginForm />
    //     </ClientOnly>

    //     {/* <div className="mt-3 max-w-[390px] text-center text-sm text-slate-500">
    //       <Link
    //         href="/elfelejtett-jelszo"
    //         className="mt-3 block text-sm text-blue-500 underline"
    //       >
    //         Elfelejtett jelszó?
    //       </Link>
    //     </div> */}
    //   </div>

    //   <DotPattern
    //     className={cn(
    //       "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
    //     )}
    //   />
    // </div>

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
      {session?.user.type === "SCHOOL" && <SchoolSettings />}
    </>
  );
}
