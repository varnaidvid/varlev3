import { cn } from "@/lib/utils";
import GridPattern from "./grid-pattern";
import React, { ElementType } from "react";

export function ExtraIcon({
  fromColor,
  toColor,
  Icon,
  variant = "default",
}: {
  fromColor: string;
  toColor: string;
  Icon: ElementType;
  variant?: "default" | "small";
}) {
  if (variant === "default")
    return (
      <div className="relative z-0 w-max items-center justify-center overflow-hidden rounded-lg border-2 bg-background p-4 md:shadow-xl">
        <p className="z-10">
          <Icon className="z-10 text-slate-800" size={40} strokeWidth={2.4} />
        </p>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-16 w-16 rounded-lg border-2 bg-gradient-to-r opacity-80",
            fromColor,
            toColor,
          )}
        >
          <GridPattern
            width={24}
            height={24}
            x={-6}
            y={-4}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(100px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
      </div>
    );
  else
    return (
      <div className="border-1 relative z-0 w-max items-center justify-center overflow-hidden rounded-lg bg-background p-2 md:shadow-xl">
        <p className="z-10">
          <Icon className="z-10 text-slate-800" size={20} strokeWidth={2.4} />
        </p>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-full w-full rounded-lg border-2 bg-gradient-to-r opacity-80",
            fromColor,
            toColor,
          )}
        >
          <GridPattern
            width={18}
            height={18}
            x={-11}
            y={-15}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(50px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
      </div>
    );
}
