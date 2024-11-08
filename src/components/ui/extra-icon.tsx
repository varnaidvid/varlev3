import { cn } from "@/lib/utils";
import GridPattern from "./grid-pattern";
import React, { ElementType } from "react";

export function ExtraIcon({
  fromColor,
  toColor,
  Icon,
  variant = "large",
}: {
  fromColor: string;
  toColor: string;
  Icon: ElementType;
  variant?: "small" | "medium" | "large";
}) {
  // Define sizes, padding, grid size, and inner box dimensions based on variant
  const sizeMap = {
    small: {
      iconSize: 20,
      padding: "p-2",
      gridSize: 18,
      gridPosition: { x: -11, y: -15 },
      borderGap: "m-0.5",
      innerSize: "h-[2rem] w-[2rem]", // Inner box size for small variant
    },
    medium: {
      iconSize: 30,
      padding: "p-3",
      gridSize: 20,
      gridPosition: { x: -8, y: -10 },
      borderGap: "m-1",
      innerSize: "h-[2.9rem] w-[2.9rem]", // Inner box size for medium variant
    },
    large: {
      iconSize: 40,
      padding: "p-4",
      gridSize: 24,
      gridPosition: { x: -6, y: -4 },
      borderGap: "m-1.5",
      innerSize: "h-[3.8rem] w-[3.8rem]", // Inner box size for large variant
    },
  };

  const { iconSize, padding, gridSize, gridPosition, borderGap, innerSize } =
    sizeMap[variant];

  return (
    <div
      className={`relative z-0 w-max items-center justify-center overflow-hidden rounded-lg border-2 bg-background ${padding} md:shadow-xl`}
    >
      <p className="z-10">
        <Icon
          className="z-10 text-slate-800"
          size={iconSize}
          strokeWidth={2.4}
        />
      </p>
      <div
        className={cn(
          `absolute bottom-0 left-0 right-0 top-0 ${borderGap} ${innerSize} rounded-lg border-2 bg-gradient-to-r opacity-80`,
          fromColor,
          toColor,
        )}
      >
        <GridPattern
          width={gridSize}
          height={gridSize}
          x={gridPosition.x}
          y={gridPosition.y}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(100px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
    </div>
  );
}
