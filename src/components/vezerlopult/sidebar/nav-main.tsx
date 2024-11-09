"use client";

import { ChevronRight, Gauge, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { organizerNav, schoolNav, teamNav } from "./data";

export function NavMain() {
  const session = useSession();

  if (!session?.data?.user) return null;

  return (
    <SidebarGroup className="space-y-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={"Vezérlőpult"} asChild>
            <Link href="/vezerlopult">
              <Gauge />
              <span>Vezérlőpult</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {["ORGANIZER", "SCHOOL", "TEAM"].includes(session?.data.user.type) &&
        (session?.data.user.type === "ORGANIZER"
          ? organizerNav
          : session?.data.user.type === "SCHOOL"
            ? schoolNav
            : teamNav
        ).map((item, index) => (
          <SidebarMenu key={index}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.name} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
    </SidebarGroup>
  );
}
