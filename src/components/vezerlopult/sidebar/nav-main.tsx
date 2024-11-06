"use client";

import { ChevronRight, Gauge, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import data from "./data";
import Link from "next/link";

export function NavMain() {
  return (
    <>
      <SidebarGroup>
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
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Felhasználók</SidebarGroupLabel>
        <SidebarMenu>
          {data.users.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton tooltip={item.name} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
