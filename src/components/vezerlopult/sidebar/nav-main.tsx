"use client";

import { Gauge } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { organizerNav, schoolNav, teamNav } from "./data";

export function NavMain({ type }: { type: "ORGANIZER" | "SCHOOL" | "TEAM" }) {
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

      {["ORGANIZER", "SCHOOL", "TEAM"].includes(type) &&
        (type === "ORGANIZER"
          ? organizerNav
          : type === "SCHOOL"
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
