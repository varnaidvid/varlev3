import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/vezerlopult/sidebar";
import { auth } from "@/server/auth";
import { Bell, PanelLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { ClientOnly } from "../../components/client-only";
import DashboardDock from "../../components/ui/dock";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/bejelentkezes");

  return (
    <SidebarProvider>
      <AppSidebar>
        <main className="relative mx-auto mb-20 mt-8 h-full min-h-[calc(100vh-57px-97px)] w-[calc(100%-16px)] flex-1 sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
          <div className="container mx-auto max-w-6xl">{children}</div>

          <DashboardDock />
        </main>
      </AppSidebar>
    </SidebarProvider>
  );
}
