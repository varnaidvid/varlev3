import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./logo";
import { auth } from "@/server/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-[50] w-full border-b border-border/40 bg-background/90 backdrop-blur-md dark:bg-black/[0.6]">
      <div className="container mx-auto flex h-14 w-full items-center">
        <Logo size="small" iconBg="black" />

        <nav className="flex w-full items-center">
          <div className="ml-4 flex items-center gap-4">
            <Link href="/">
              <span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                Főoldal
              </span>
            </Link>
          </div>

          <div className="ml-auto flex">
            <Button>
              <Link href={session ? "/kijelentkezes" : "/bejelentkezes"}>
                {session ? "Kijelentkezés" : "Bejelentkezés"}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
