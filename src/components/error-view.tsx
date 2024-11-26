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

export default async function ErrorView() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-md">
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
              kapcsolatot: <br />
              <a
                className="mt-2 text-blue-500 underline"
                href="mailto:support@leoai.hu"
              >
                support@leoai.hu
              </a>
            </p>
          </CardContent>

          <CardFooter className="flex justify-between gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="https://leoai.hu">
                <ArrowLeft className="mr-2 h-4 w-4" /> Vissza a főoldalra
              </Link>
            </Button>

            <Button asChild variant="default" className="w-full">
              <Link href="/kijelentkezes">
                <LockKeyholeOpen className="mr-2 h-4 w-4" />
                Kijelentkezés
              </Link>
            </Button>
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
