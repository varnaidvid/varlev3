import { PageTitle } from "@/components/ui/page-title";
import withRole from "@/utils/withRole";
import { UserPlus } from "lucide-react";
import RegisterForm from "./form";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default async function Page() {
  await withRole(["WEBMESTER"]);

  return (
    <>
      <header className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-2 transition-[width,height] ease-linear">
        <PageTitle
          Icon={UserPlus}
          fromColor="from-indigo-400"
          toColor="to-indigo-500"
          title="Új felhasználó"
          links={[
            {
              href: "/vezerlopult/felhasznalok",
              label: "Felhasználók",
            },
            {
              href: "/vezerlopult/felhasznalok/uj",
              label: "Új felhasználó",
            },
          ]}
        />
      </header>

      <main className="relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-background p-2 pb-8 md:shadow-xl">
        <div className="z-10 mx-auto flex w-full flex-col items-center justify-center">
          <RegisterForm />
        </div>

        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          )}
        />
      </main>
    </>
  );
}
