"use client";

import { ChevronRight, Gauge, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import data from "./data";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function NavMain() {
  const session = useSession();

  if (!session?.data?.user) return null;

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

      {session?.data.user?.role === "WEBMESTER" && (
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
      )}
    </>
  );
}
