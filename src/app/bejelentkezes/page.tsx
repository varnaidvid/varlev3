import DotPattern from "@/components/ui/dot-pattern";
import LoginForm from "./form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ClientOnly } from "@/components/client-only";

export default async function LoginPage() {
  // await redirectAuthenticated()

  return (
    <main className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-2 md:shadow-xl">
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
        <ClientOnly>
          <LoginForm />
        </ClientOnly>

        <div className="mt-3 max-w-[390px] text-center text-sm text-slate-500">
          <Link
            href="/elfelejtett-jelszo"
            className="mt-3 block text-sm text-blue-500 underline"
          >
            Elfelejtett jelszó?
          </Link>
        </div>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
        )}
      />
    </main>
  );
}
