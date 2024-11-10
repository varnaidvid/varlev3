import DotPattern from "@/components/ui/dot-pattern";
import LoginForm from "./form";
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/vezerlopult");

  return (
    <div className="relative -mb-[170px] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background p-2">
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
        <ClientOnly>
          <LoginForm />
        </ClientOnly>

        {/* <div className="mt-3 max-w-[390px] text-center text-sm text-slate-500">
          <Link
            href="/elfelejtett-jelszo"
            className="mt-3 block text-sm text-blue-600 underline"
          >
            Elfelejtett jelszó?
          </Link>
        </div> */}
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
