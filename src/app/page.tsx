import Link from "next/link";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Header from "@/components/header";
import { CategoryShowcaseCarousel } from "@/components/CategoryShowcaseCarousel";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { ClientOnly } from '@/components/client-only';
import { Footer } from "@/components/Footer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function HomePage() {
  const session = await auth();

  const competitionsName = [
    "Verseny I.",
    "Verseny II.",
    "Verseny III.",
    "Verseny IV.",
    "Verseny V."
  ]

  const competitionsDetails = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.", ]

  const competitionDueDates = [
    "2022.01.01",
    "2022.01.02",
    "2022.01.03",
    "2022.01.04",
    "2022.01.05"
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto min-h-[calc(100vh-57px-97px)] w-full flex-1">
        
        <Hero />

        <h1 className="text-3xl font-bold p-4">Aktuális versenyek</h1>

        <CategoryShowcaseCarousel 
          competitionsName={competitionsName}
          competitionsDetails={competitionsDetails}
          competitionDueDates={competitionDueDates}
        />

        <h1 className="text-3xl font-bold p-4 mt-16">A verseny története</h1>
        <p className="px-4 text-lg my-8 font-medium text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ad eius harum dolore molestiae nihil ipsa est eveniet sed? Totam sapiente itaque minima reprehenderit placeat incidunt quibusdam nam similique repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia distinctio atque velit aliquid at iusto similique excepturi, molestiae, ut dolorem temporibus dolore sed aliquam soluta harum sit labore officia. Repellat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos laboriosam sapiente tenetur ea facilis et ad veritatis, similique voluptate omnis, expedita saepe eius cupiditate quaerat animi culpa. Ullam, doloribus ut?
        </p>

        <div className="px-4 text-5xl my-12 font-medium text-center">
          {/*to-do: fetch data from database*/}
          <div className="text-left">
            <ClientOnly>
              <Countdown targetDate="2025-01-01T23:59:59" />
            </ClientOnly>
            <span className="text-xl">a következő versenyig...</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold p-4 mt-16">Kérdések és Válaszok</h1>

        <div className="m-auto my-4 px-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-normal">Mikor lesz a következő verseny?</AccordionTrigger>
              <AccordionContent>
                {/*to-do: fetch data from database*/}
                A következő verseny időpontja: 2025.01.01
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-normal">Mi kell a jelentkezéshez?</AccordionTrigger>
              <AccordionContent className="">
                A jelentkezés nagyon egyszerű folyamat...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-normal">Hogyan zajlik a folyamat?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quo praesentium laborum non totam. Nemo animi officiis doloribus ex, doloremque dicta aliquam repellat obcaecati maxime eaque iste nisi, modi error.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4 text-">
              <AccordionTrigger className="text-xl font-normal">Mi a fődíj?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quo praesentium laborum non totam. Nemo animi officiis doloribus ex, doloremque dicta aliquam repellat obcaecati maxime eaque iste nisi, modi error.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Footer />

      </main>
    </div>
  );
}
