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
import { Separator } from "./separator";

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
                        <Link href={link.href}>
                          {link.label.length > 20
                            ? `${link.label.substring(0, 20)}...`
                            : link.label}
                        </Link>
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
      </header>
    </>
  );
}
