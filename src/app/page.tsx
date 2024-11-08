import Link from "next/link";

import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Header from "@/components/header";
import Logo from "../components/logo";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto min-h-[calc(100vh-57px-97px)] w-full flex-1">
        <section
          id="hero"
          className="relative mx-auto flex flex-col items-center gap-2 py-8 pb-10 md:py-12 md:pb-8 lg:py-24 lg:pb-6"
        >
          <Logo size="large" iconBg="black" className="z-10" />

          <span className="max-w-[750px] text-center text-lg font-light italic text-foreground text-gray-600 dark:text-gray-400">
            This is VarleV3
          </span>
          <div className="mt-6 flex gap-2 pb-12">
            <Button asChild variant={"link"}>
              <Link href={session ? "/kijelentkezes" : "/bejelentkezes"}>
                {session ? "Kijelentkezés" : "Bejelentkezés"}
              </Link>
            </Button>

            {session && (
              <Button asChild variant={"link"}>
                <Link href="/vezerlopult">Vezérlőpult</Link>
              </Button>
            )}
          </div>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            style={{
              maskImage:
                "radial-gradient(circle at top, rgba(255,255,255,1) 100%, transparent, transparent)",
            }}
            className={cn("opacity-75 dark:opacity-50")}
          />
        </section>
      </main>
    </div>
  );
}
