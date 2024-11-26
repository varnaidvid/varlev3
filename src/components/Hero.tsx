import DotPattern from "@/components/ui/dot-pattern";
import FlickeringGrid from "./ui/flickering-grid";

export default async function Hero() {
  return (
    <>
      <div className="mt-40 w-full">
        <div className="flex w-full flex-row justify-around space-x-12 px-4 md:px-6">
          <div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <img
                  src="/landing_hero_title.svg"
                  alt="VarléV3"
                  className="h-[200px]"
                />
                <p className="mx-auto !mt-12 text-muted-foreground md:text-xl">
                  Dusza Árpád Országos Webprogamozói Verseny
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
