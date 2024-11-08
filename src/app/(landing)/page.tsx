import { auth } from "@/server/auth";
import { CategoryShowcaseCarousel } from "@/components/CategoryShowcaseCarousel";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/countdown";
import { ClientOnly } from "@/components/client-only";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function HomePage() {
  const session = await auth();

  const competitionsName = [
    "Verseny I.",
    "Verseny II.",
    "Verseny III.",
    "Verseny IV.",
    "Verseny V.",
  ];

  const competitionsDetails = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae purus. Sed euismod, nisl nec ultrices. Quisque ut dolor.",
  ];

  const competitionDueDates = [
    "2022.01.01",
    "2022.01.02",
    "2022.01.03",
    "2022.01.04",
    "2022.01.05",
  ];

  return (
    <>
      <Hero />

      <h1 className="p-4 text-3xl font-bold">Aktuális versenyek</h1>

      <CategoryShowcaseCarousel
        competitionsName={competitionsName}
        competitionsDetails={competitionsDetails}
        competitionDueDates={competitionDueDates}
      />

      <h1 className="mt-16 p-4 text-3xl font-bold">A verseny története</h1>
      <p className="my-8 px-4 text-justify text-lg font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ad eius
        harum dolore molestiae nihil ipsa est eveniet sed? Totam sapiente itaque
        minima reprehenderit placeat incidunt quibusdam nam similique
        repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Quia distinctio atque velit aliquid at iusto similique excepturi,
        molestiae, ut dolorem temporibus dolore sed aliquam soluta harum sit
        labore officia. Repellat? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Eos laboriosam sapiente tenetur ea facilis et ad
        veritatis, similique voluptate omnis, expedita saepe eius cupiditate
        quaerat animi culpa. Ullam, doloribus ut?
      </p>

      <div className="my-12 px-4 text-center text-5xl font-medium">
        {/*to-do: fetch data from database*/}
        <div className="text-left">
          <ClientOnly>
            <Countdown targetDate="2025-01-01T23:59:59" />
          </ClientOnly>
          <span className="text-xl">a következő versenyig...</span>
        </div>
      </div>

      <h1 className="mt-16 p-4 text-3xl font-bold">Kérdések és Válaszok</h1>

      <div className="m-auto my-4 px-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-normal">
              Mikor lesz a következő verseny?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {/*to-do: fetch data from database*/}A következő verseny
              időpontja: 2025.01.01
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-normal">
              Mi kell a jelentkezéshez?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              A jelentkezés nagyon egyszerű folyamat...
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-normal">
              Hogyan zajlik a folyamat?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
              quo praesentium laborum non totam. Nemo animi officiis doloribus
              ex, doloremque dicta aliquam repellat obcaecati maxime eaque iste
              nisi, modi error.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-normal">
              Mi a fődíj?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
              quo praesentium laborum non totam. Nemo animi officiis doloribus
              ex, doloremque dicta aliquam repellat obcaecati maxime eaque iste
              nisi, modi error.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
