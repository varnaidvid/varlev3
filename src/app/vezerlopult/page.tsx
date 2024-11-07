import { PageTitle } from "../../components/ui/page-title";
import { Gauge } from "lucide-react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <header className="flex shrink-0 flex-col gap-4 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Gauge}
          fromColor="from-sky-400"
          toColor="to-blue-500"
          title="Vezérlőpult"
        />
      </header>

      <div className="m-4 rounded-md bg-muted/85 p-4 text-left text-2xl">
        <pre>
          <code>
            <b>logged in user: </b>
          </code>
          <code>
            {session
              ? JSON.stringify(session?.user, null, 2)
              : "no session found"}
          </code>
        </pre>
      </div>

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
