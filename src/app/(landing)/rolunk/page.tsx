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
                Webes applikációk fejlesztésében mélyültem el az elmúlt 2 évben mely során kipróbáltam számos könyvtárat, illetve keretrendszert. Jelenleg NextJS-t és Supabase-t használom "szerver nélküli" applikációk fejlesztésére.
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
                3 éve az egyik Arduinós projektemhez kellett egy program, akkor kezdtem programozói pályafutásomat. Azóta több térbe is belekóstoltam, de végig a webfejlesztés maradt fókuszban.
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
                Édesapám nyomán én is az informatika után kezdtem érdeklődni már gyerek koromban is. Pár éve komolyabban is foglalkozom az informatikával, főleg webfejlesztés keretein belül.
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
              Mire szakosodtunk?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Mindannyian főleg a webfejlesztés irányában orientálodtunk.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-normal">
              Mit csinálunk szabadidőnkben?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Egy iskolába járunk, szabadidőnkben is gyakran a programozással, fejlesztéssel foglalkozunk, néha együtt is.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-normal">
              Milyen tapasztalatokkal rendelkezünk?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Ez a harmadik versenyünk, de voltunk már együtt duális képzésen egy cégnél is dolgozni, mint Fullstack fejlesztők.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
