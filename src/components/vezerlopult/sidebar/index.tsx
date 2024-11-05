"use client";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="relative flex items-center justify-between">
                <h1 className="inline-block bg-gradient-to-r from-neutral-500 via-neutral-600 to-indigo-700 bg-clip-text font-mono text-2xl font-bold text-transparent transition-all duration-200 ease-linear group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:translate-x-2 group-data-[collapsible=icon]:opacity-0">
                  VarleV3
                </h1>

                <SidebarTrigger className="transition-all duration-200 ease-linear group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:left-0 group-data-[collapsible=icon]:top-0" />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
