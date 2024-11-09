import { PageTitle } from "../../components/ui/page-title";
import { Gauge } from "lucide-react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { ClientOnly } from "@/components/client-only";
import ChartComponent from "@/components/ChartComponent";
import NotificationCenter from "@/components/vezerlopult/notification-center";

const chartData = [
  { key: "January", value: 186 },
  { key: "February", value: 305 },
  { key: "March", value: 237 },
  { key: "April", value: 73 },
  { key: "May", value: 209 },
  { key: "June", value: 214 },
];

export default async function Page() {
  const session = await auth();

  return (
    <>
      <header className="flex items-center justify-between gap-4 p-4 transition-[width,height] ease-linear">
        <PageTitle
          Icon={Gauge}
          fromColor="from-sky-400"
          toColor="to-blue-500"
          title="Vezérlőpult"
        />

        <NotificationCenter />
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
            <ClientOnly>
              <ChartComponent data={chartData} />
            </ClientOnly>
          </div>
          <div className="h-full min-h-[100vh] flex-1 rounded-xl bg-muted/85" />
        </div>
      </main>
    </>
  );
}
