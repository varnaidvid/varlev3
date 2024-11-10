import React from "react";
import { Button } from "./button";
import { Bell, PanelLeft } from "lucide-react";
import NotificationCenter from "../vezerlopult/notification-center/notification-center";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export default function DashboardDock() {
  return (
    <div
      className={cn(
        "fixed bottom-8 left-0 right-0 mx-auto w-screen",
        "animate-fade-up opacity-[0.01] transition-all duration-700 ease-in-out",
      )}
    >
      <div className="mx-auto w-max rounded-full border px-4 py-1 backdrop-blur-md">
        <div className="flex h-full w-full gap-4">
          <Button
            className="rounded-full text-muted-foreground transition-all hover:text-black"
            size={"icon"}
            variant={"ghost"}
            asChild
          >
            <SidebarTrigger />
          </Button>

          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}
