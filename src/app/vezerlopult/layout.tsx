import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/vezerlopult/sidebar";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // TODO: uncomment this line when auth is implemented
  //   if (!session) redirect("/bejelentkezes");

  return (
    <SidebarProvider>
      <AppSidebar>
        <main className="mx-auto my-8 h-full min-h-[calc(100vh-57px-97px)] w-[calc(100%-16px)] flex-1 sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
          <div className="container mx-auto max-w-5xl">{children}</div>
        </main>
      </AppSidebar>
    </SidebarProvider>
  );
}
