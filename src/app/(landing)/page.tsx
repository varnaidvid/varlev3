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
import { Separator } from "@/components/ui/separator";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default async function HomePage() {
  const session = await auth();

  const competitions = await api.competition.getAllWithDetails();

  const popularCompetitions = competitions
    .sort((a, b) => b.teams.length - a.teams.length)
    .slice(0, 5);

  return (
    <div className="mx-auto">
      <FlickeringGrid
        className="absolute inset-0 top-6 z-0 h-[600px] w-full overflow-hidden"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.1}
        flickerChance={0.2}
        height={550}
      />

      <Hero />

      <div className="mt-32"></div>

      <h1 className="z-50 px-4 pt-14 text-center text-3xl font-bold">
        🎯 Fő funkciók
      </h1>
      <Separator className="mx-auto mt-1 w-20" />

      <FeaturesBlock />

      <h1 className="z-50 px-4 pt-14 text-center text-3xl font-bold">
        🏆 Fő versenyek
      </h1>
      <Separator className="mx-auto mt-1 w-20" />

      <CategoryShowcaseCarousel competitions={popularCompetitions} />

      <h1 className="z-50 px-4 pt-14 text-center text-3xl font-bold">
        🙋 Gyakori Kérdések
      </h1>
      <Separator className="mx-auto mt-1 w-20" />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-normal">
            Mire szakosodtunk?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Mindannyian a webfejlesztés irányába orientálodtunk.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-normal">
            Mit csinálunk szabadidőnkben?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Egy iskolába járunk, szabadidőnkben is gyakran a programozással,
            fejlesztéssel foglalkozunk, néha együtt is.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl font-normal">
            Milyen tapasztalatokkal rendelkezünk?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Ez a harmadik versenyünk, de voltunk már együtt duális képzésen egy
            cégnél is dolgozni, mint Fullstack fejlesztők.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
