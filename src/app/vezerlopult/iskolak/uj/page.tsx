import { PageTitle } from "@/components/ui/page-title";
import { School } from "lucide-react";
import RegisterSchoolForm from "../../../../components/vezerlopult/school/register/form";
import withRole from "@/utils/withRole";

export default async function NewCategory() {
  await withRole(["ORGANIZER"]);

  return (
    <>
      <PageTitle
        Icon={School}
        fromColor="from-indigo-300"
        toColor="to-indigo-400"
        title="Új iskola beregisztrálása"
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

      <main className="pb-16">
        <RegisterSchoolForm />
      </main>
    </>
  );
}
