"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { ArrowLeft, LockKeyholeOpen } from "lucide-react";
import Link from "next/link";

export default async function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <div className="z-10 flex h-full w-full items-center justify-center text-center">
        <Card className="max-w-[600px]">
          <CardHeader>
            <h5 className="-mb-2 text-sm font-bold uppercase text-red-400">
              404
            </h5>
            <h1 className="text-2xl font-bold">Valami hiba történt!</h1>
          </CardHeader>

          <CardContent>
            <p>
              A rendszer valami hibát észlelt, próbáljon meg kijelentkezni és
              újra bejelentkezni.
            </p>

            <p className="mt-4">
              Amennyiben a probléma továbbra is fennáll, kérjük vegye fel a
              kapcsolatot egyik szervezővel.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col border-t">
            <Button asChild variant="default" className="w-full">
              <Link href="/kijelentkezes">
                <LockKeyholeOpen className="mr-2 h-4 w-4" />
                Kijelentkezés
              </Link>
            </Button>

            <Accordion
              type="single"
              collapsible
              className="-mb-6 w-full px-20 text-[10px] text-muted-foreground"
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>Részletek</AccordionTrigger>
                <AccordionContent>
                  <code>
                    <pre>{error.name}</pre>
                    <pre>{error.digest}</pre>
                    <pre>{error.message}</pre>
                  </code>
                  <button
                    className="rounded-md border bg-neutral-50 p-2 hover:bg-neutral-100"
                    onClick={() => reset()}
                  >
                    Újra
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
