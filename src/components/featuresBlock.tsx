import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PersonStanding, Timer, Zap, ZoomIn } from 'lucide-react';

export default function FeaturesBlock() {
  
  return (
    <div className="mx-20 mt-10 mb-20">
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
          <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
            <Timer className="size-5 md:size-6" />
          </span>
          <div>
            <h3 className="font-medium md:mb-2 md:text-xl">
              Versenyek kezelése
              <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              A versenyek kezelése egyszerű és gyors. A versenyeket könnyedén tudod létrehozni, módosítani és törölni.
            </p>
          </div>
        </div>
        <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
          <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
            <Zap className="size-5 md:size-6" />
          </span>
          <div>
            <h3 className="font-medium md:mb-2 md:text-xl">
              Vezérlőpult
              <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              A vezérlőpult segítségével könnyedén tudod nyomon követni a versenyeket és a csapatokat.
            </p>
          </div>
        </div>
        <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
          <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
            <ZoomIn className="size-5 md:size-6" />
          </span>
          <div>
            <h3 className="font-medium md:mb-2 md:text-xl">
              Statisztikák
              <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              A statisztikák segítségével könnyedén tudod nyomon követni a versenyeket és a csapatokat.
            </p>
          </div>
        </div>
        <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
          <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
            <PersonStanding className="size-5 md:size-6" />
          </span>
          <div>
            <h3 className="font-medium md:mb-2 md:text-xl">
              Jelentkezés
              <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              A jelentkezési felület segítségével a versenyzők könnyedén tudnak jelentkezni a versenyekre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
