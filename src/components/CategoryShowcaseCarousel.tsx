"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import SignUpModal from "@/components/SignUpModal";

interface CategoryShowcaseCarouselProps {
  competitionsName: string[];
  competitionsDetails: string[];
  competitionDueDates: string[];
}

export function CategoryShowcaseCarousel({
  competitionsName,
  competitionsDetails,
  competitionDueDates,
}: CategoryShowcaseCarouselProps) {
  return (
    <div className="m-auto mx-20 my-2">
      <Carousel className="w-full p-6">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <div className="p-1">
                <Card className="pb-6">
                  <CardContent className="flex flex-col p-6 mb-2">
                    <h1 className="text-3xl font-semibold">{competitionsName[index]}</h1>
                    <p className="pt-2 pb-6">Határidő: {competitionDueDates[index]}</p>
                    <p className="text-zinc-600">{competitionsDetails[index]}</p>
                  </CardContent>
                  <SignUpModal />
                </Card>
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
