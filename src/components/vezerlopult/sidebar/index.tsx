import * as React from "react";
import { NavUser } from "@/components/vezerlopult/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Logo from "../../logo";
import { auth } from "@/server/auth";
import Link from "next/link";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  if (!session) return null;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="relative flex items-center justify-between gap-2 transition-all group-data-[collapsible=icon]:flex-col">
                <Link href="/vezerlopult">
                  <Logo size="small" onlyIcon iconBg="black" />
                </Link>

                <SidebarTrigger className="transition-all duration-200 ease-linear" />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain type={session.user.type} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser session={session} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
