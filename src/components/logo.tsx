import React from "react";
import { cn } from "../lib/utils";
import { Layers3 } from "lucide-react";

export default function Logo({
  iconBg = "white",
  size = "medium",
  className,
  onlyIcon = false,
}: {
  iconBg?: "white" | "black";
  size?: "small" | "medium" | "large";
  className?: string;
  onlyIcon?: boolean;
}) {
  const textSize = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl",
  }[size];

  const iconSize = {
    small: "size-[30px]",
    medium: "size-[40px]",
    large: "size-[60px]",
  }[size];

  const iconPadding = {
    small: "p-[6px]",
    medium: "p-3",
    large: "p-4",
  }[size];

  return (
    <h1
      className={cn(
        "flex items-center gap-2 font-bold tracking-tight",
        textSize,
        className,
      )}
    >
      <Layers3
        className={cn(
          "rounded-full",
          iconSize,
          iconPadding,
          iconBg === "white" && "bg-white text-black",
          iconBg === "black" && "bg-black text-white",
        )}
      />
      {!onlyIcon && "VarleV3"}
    </h1>
  );
}
