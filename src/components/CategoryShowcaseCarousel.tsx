"use client";

import CompetitionCard from "@/app/(landing)/versenyek/competition-card-lp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CompetitionWithDetails } from "@/server/api/routers/competition";

export function CategoryShowcaseCarousel({
  competitions,
}: {
  competitions: CompetitionWithDetails[];
}) {
  return (
    <div className="m-auto my-2">
      <Carousel className="w-full p-6">
        <CarouselContent>
          {competitions.slice(0, 3).map((competition, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <div className="p-1">
                <CompetitionCard competition={competition} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
