import React from "react";
import NotificationCenter from "../vezerlopult/notification-center/notification-center";
import { SidebarTrigger } from "./sidebar";
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
          <SidebarTrigger isDock />

          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}
