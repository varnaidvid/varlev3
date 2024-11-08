import Link from "next/link";
import Logo from "../components/logo";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function Footer() {

  return (
    <footer className="bg-muted py-8 md:py-12 px-6 mt-16">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Link href="#" prefetch={false}>
            <Logo />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Főoldal
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            versenyek
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Vezérlőpult
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Fiók
          </Link>
        </nav>
        <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
          <div>Várnai Dávid</div>
          <div>Várszegi Barnabás</div>
          <div>Lénárt Dániel</div>
        </div>
        <div className="text-xs text-muted-foreground">&copy; VarleV3</div>
      </div>
    </footer>
  )
}