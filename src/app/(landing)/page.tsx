import { auth } from "@/server/auth";
import { CategoryShowcaseCarousel } from "@/components/CategoryShowcaseCarousel";
import Hero from "@/components/Hero";
import { api } from "@/trpc/server";
import { Countdown } from "@/components/countdown";
import { ClientOnly } from "@/components/client-only";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturesBlock from "@/components/featuresBlock";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function HomePage() {
  const session = await auth();

  const competitions = await api.competition.getAllWithDetails();

  const popularCompetitions = competitions.sort(
    (a, b) => b.teams.length - a.teams.length
  ).slice(0, 5);  

  return (
    <>

      <Hero />

      <div className="mt-96"></div>

      <h1 className="px-4 pt-14 text-3xl font-bold z-50">Fő funkciók</h1>

      <FeaturesBlock />

      <h1 className="px-4 py-14 text-3xl font-bold">Legpopulárisabb versenyek</h1>

      <CategoryShowcaseCarousel
        competitions={popularCompetitions}
      />

      <h1 className="mt-16 p-4 text-3xl font-bold">Rólunk</h1>
      <p className="mt-8 px-4 text-justify text-lg font-medium">
        Elkötelezettek és szakmailag felkészültek vagyunk alkalmazásunk
        fejlesztésében. A csapat most intenzíven dolgozik a verseny
        idején, és minden erőfeszítésünket arra összpontosítjuk, hogy az
        alkalmazásunk a lehető legjobb teljesítményt nyújtsa a versenyen.
        A csapatunk tagjai szorosan együttműködnek, és kitartóan
        törekszünk a kiválóságra, hogy bizonyítsuk elhivatottságunkat és
        tehetségünket a versenyen.
      </p>

      <div className="flex justify-end px-4">
        <Link href="/rolunk">
          <Button className="w-full sm:w-auto">
            <ArrowRight className="mr-2 size-4" />
            Rólunk
          </Button>
        </Link>
      </div>

      <div className="my-12 px-4 text-center text-5xl font-medium">
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
              A jelentkezés nagyon egyszerű folyamat...
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-normal">
              Mi a fődíj?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              A fődíj egy országos elismerő oklevél, és tárgyi díj...
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
