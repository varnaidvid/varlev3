import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { Folder } from "lucide-react";

export default function NewCategory() {
  return (
    <>
      <PageTitle
        Icon={Folder}
        fromColor="from-indigo-300"
        toColor="to-indigo-400"
        title="Iskola beregisztrálása"
        links={[
          {
            href: "/vezerlopult/iskolak",
            label: "Iskolák",
          },
          {
            href: "/vezerlopult/iskolak/uj",
            label: "Új iskola",
          },
        ]}
      />

      <main className="px-4 pb-16"></main>
    </>
  );
}
