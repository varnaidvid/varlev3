import Link from "next/link";
import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Logo from "../components/logo";
import { Button } from "@/components/ui/button";

export async function Hero() {
  const session = await auth();

  return (
    <section
      id="hero"
      className="relative mx-auto flex flex-col items-center gap-6 py-16 pt-[100px] text-black lg:py-32"
    >
      <Logo size="large" className="z-10 mb-4" />

      <h1 className="animate-fadeIn max-w-[750px] text-center text-2xl font-semibold italic text-gray-800 dark:text-gray-200">
        This is VarleV3.
      </h1>

      {/* Call-to-action buttons */}
      <div className="mt-10 flex gap-4">
        <Button
          asChild
          className="transform shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          <Link href={session ? "/kijelentkezes" : "/bejelentkezes"}>
            {session ? "Kijelentkezés" : "Bejelentkezés"}
          </Link>
        </Button>

        {session && (
          <Button
            asChild
            variant="outline"
            className="transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <Link href="/vezerlopult">Vezérlőpult</Link>
          </Button>
        )}
      </div>

      <DotPattern
        width={25}
        height={25}
        cx={1}
        cy={1}
        cr={1}
        style={{
          maskImage:
            "radial-gradient(circle, rgba(255,255,255,1) 50%, transparent)",
        }}
        className={cn("absolute top-10 opacity-75 dark:opacity-50")}
      />

      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-500 opacity-10 blur-[200px] dark:opacity-20" />
    </section>
  );
}
