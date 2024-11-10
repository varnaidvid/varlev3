import React, { ElementType } from "react";
import { ExtraIcon } from "./extra-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import Link from "next/link";
import NotificationCenter from "../vezerlopult/notification-center/notification-center";
import { Button } from "./button";
import { SidebarTrigger } from "./sidebar";
import { ClientOnly } from "../client-only";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface ILink {
  href: string;
  label: string;
}

export function PageTitle({
  fromColor,
  toColor,
  title,
  Icon,
  links,
}: {
  fromColor: string;
  toColor: string;
  title: string;
  Icon: any;
  links?: ILink[];
}) {
  return (
    <>
      <header className="flex items-start justify-between gap-4 transition-[width,height] ease-linear">
        <div className="mb-8 flex items-center gap-3">
          <ExtraIcon Icon={Icon} fromColor={fromColor} toColor={toColor} />
          <div>
            <Breadcrumb className="font-mono">
              <BreadcrumbList>
                <BreadcrumbItem className="uppercase">
                  <BreadcrumbLink asChild>
                    <Link href="/vezerlopult">Vezérlőpult</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {links?.map((link) => (
                  <div key={link.href} className="flex items-center gap-1">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="uppercase">
                      <BreadcrumbLink asChild>
                        <Link href={link.href}>{link.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            {/* <h5 className="uppercase text-xs text-slate-500">{alt}</h5> */}

            <h2 className="font-mono text-3xl font-bold tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <ClientOnly>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <NotificationCenter />
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end">
                  <p>Értesítési központ megnyitása</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="block md:hidden">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button asChild variant={"outline"} size={"icon"}>
                      <SidebarTrigger />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end">
                    <p>Menü kinyitása</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </ClientOnly>
        </div>
      </header>
    </>
  );
}
