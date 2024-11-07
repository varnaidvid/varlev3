import DotPattern from "@/components/ui/dot-pattern";
import RegisterForm from "./form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/vezerlopult");

  return (
    <main className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-2 md:shadow-xl">
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
        <RegisterForm />

        <div className="mt-2 max-w-[390px] text-center text-sm text-slate-500">
          {/* <Separator className="my-3 w-20 mx-auto" />

          <p>
            A regisztrációs űrlap kitöltésével elfogadja az{' '}
            <i>adatvédelmi tájékoztatót</i> és a{' '}
            <i>felhasználási feltételeket.</i>
          </p> */}
        </div>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />
    </main>
  );
}
