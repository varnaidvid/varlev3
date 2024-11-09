import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function Page({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;

  const competition = await api.competition.getById({ id: competitionId });

  return (
    <>
      <div className="mt-28 mx-auto w-[calc(100%-16px)] max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <div className="border rounded-lg p-12 shadow-xl">
          <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 space-x-0 lg:space-x-12">
            <img className="w-full md:w-1/5 rounded-lg shadow-xl" src={competition?.image} alt="" />
            <div className="flex flex-col justify-between w-full lg:w-4/5">
              <div>
                <h1 className="text-3xl font-bold pb-2">{competition?.name}</h1>
                <Separator />
                <div className="flex flex-col sm:flex-row justify-between py-2">
                  <p className="py-2 font-bold">Csapatok száma</p>
                  <Separator orientation="vertical" />
                  <p className="py-2">{competition?.maxTeamSize}</p>
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row justify-between py-2">
                  <p className="py-2 font-bold">Technológiák</p>
                  <Separator orientation="vertical" />
                  <div className="flex space-x-2 h-6 mt-2">
                    {competition?.technologies.map((tech) => (
                      <Badge key={tech.name}>{tech.name}</Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row justify-between py-2">
                  <p className="py-2 font-bold">Kategóriák</p>
                  <Separator orientation="vertical" />
                  <div className="flex space-x-2 h-6 mt-2">
                    {competition?.categories.map((cat) => (
                      <Badge key={cat.name}>{cat.name}</Badge>
                    ))}
                  </div>
                </div>
                <p className="py-2 font-bold mt-4">Leírás</p>
                <Separator />
                <p className="py-2">{competition?.description}</p>
              </div>
              <Button className="w-full">Jelentkezés</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
