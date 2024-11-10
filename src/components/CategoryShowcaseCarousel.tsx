"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import SignUpModal from "@/components/SignUpModal";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";
import { CompetitionWithDetails } from "@/server/api/routers/competition";


export function CategoryShowcaseCarousel({
  competitions,
}: {
  competitions: CompetitionWithDetails[];
}) {
  return (
    <div className="m-auto mx-20 my-2">
      <Carousel className="w-full p-6">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <div className="p-1">
                <CompetitionCard competition={competitions[0]}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
