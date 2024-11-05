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
  variant = "default",
}: {
  fromColor: string;
  toColor: string;
  title: string;
  Icon: ElementType;
  links?: ILink[];
  variant?: "default" | "small";
}) {
  if (variant === "default")
    return (
      <div className="mb-8 flex items-center gap-3">
        <ExtraIcon Icon={Icon} fromColor={fromColor} toColor={toColor} />
        <div>
          <Breadcrumb className="font-mono">
            <BreadcrumbList>
              <BreadcrumbItem className="uppercase">
                <BreadcrumbLink asChild>
                  <Link href="/">Vezérlőpult</Link>
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
    );
  else
    return (
      <div className="flex items-center gap-3">
        <ExtraIcon
          Icon={Icon}
          fromColor={fromColor}
          toColor={toColor}
          variant="small"
        />
        <div>
          <Breadcrumb className="font-mono">
            <BreadcrumbList>
              <BreadcrumbItem className="uppercase">
                <BreadcrumbLink asChild className="text-xs">
                  <Link href="/">Vezérlőpult</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {links?.map((link) => (
                <div key={link.href} className="flex items-center gap-1">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="uppercase">
                    <BreadcrumbLink asChild className="text-xs">
                      <Link href={link.href}>{link.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* <h5 className="uppercase text-xs text-slate-500">{alt}</h5> */}

          <h2 className="font-mono text-lg font-bold leading-none tracking-tight text-slate-800">
            {title}
          </h2>
        </div>
      </div>
    );
}
