import { CircleArrowRight, Files, Settings } from 'lucide-react';
import TechStackLogos from '@/components/TechStackLogos';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {

  return (
    <section className="py-32">
      <div className="m-auto mt-20 flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            Idén az első helyezetre törünk.
          </h1>
          <p className="max-w-xl text-lg">
            Az elmúlt két évben a Varle csapata a harmadik és negyedik helyen végzett a versenyen. Idén az első helyezés a célunk, amiért mindent meg is teszünk.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="/varlev3_icon.svg"
            alt="VarleV3"
            className="w-full max-h-96 rounded-2xl"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-gray-100 p-10">
            <p className="text-sm text-muted-foreground">CSAPATUNKROL</p>
            <p className="text-lg font-medium">
              Csapatunkkal a Budapesti Bolyai János Műszaki Technikumot képviseljük a versenyen. A csapatunk kizárólag az iskolában tanuló diákokból áll, akik a programozás iránti szenvedélyüket szeretnék kamatoztatni.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Csapattagok
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Várnai Dávid
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum inventore modi cumque! Accusantium non a ipsum inventore, assumenda tempore odio omnis minima. Sit voluptates temporibus laudantium minima eaque iusto!
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Várszegi Barnabás
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat illum cum nisi architecto minus debitis placeat, minima quia maiores deserunt vitae culpa voluptatum fugit molestiae omnis incidunt sapiente sint! Quis.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Lénárt Dániel
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facilis numquam voluptatibus impedit consequatur iure? Labore deserunt voluptatibus facere porro impedit, voluptate velit dolorum perferendis. A deleniti aliquam iste neque.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              TECH STACK
            </p>
            <h2 className="text-3xl font-semibold md:text-5xl">
              Mivel dolgozunk?
            </h2>
          </div>
          <div className="mb-8">
            <TechStackLogos/>
          </div>
        </div>
      </div>

      <div className="m-auto mt-24 mb-4 px-4">
        <h2 className="text-3xl font-semibold md:text-5xl text-center mb-12">
          Gyakori Kérdések
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-normal">
              Hol tudsz minket elérni?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, doloremque dolorem exercitationem consectetur veritatis laudantium soluta ea dicta dolores in iure incidunt corrupti accusamus, omnis asperiores ducimus totam facere ipsum.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-normal">
              Mire szakosodtunk?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis accusantium expedita, dolorum possimus odit eum libero ducimus at incidunt voluptatem necessitatibus quos? Maxime aliquid beatae perferendis in incidunt dolorem suscipit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-normal">
              Mit csinálunk szabadidőnkben?
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
              Milyen tapasztalatokkal rendelkezünk?
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
    </section>
  );
};
