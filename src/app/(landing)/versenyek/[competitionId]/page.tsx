import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WinnersTable } from "@/components/WinnersTable"

export default async function Page({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;

  const competition = await api.competition.getById({ id: competitionId });

  const teams = [
    {
      team: "Csapat 1",
      score: "182",
    },
    {
      team: "Csapat 2",
      score: "176",
    },
    {
      team: "Csapat 3",
      score: "150",
    },
    {
      team: "Csapat 4",
      score: "139",
    },
    {
      team: "Csapat 5",
      score: "104",
    },
  ]

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
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between md:flex-row py-4 mt-8 space-y-12 lg:space-y-0 space-x-0 lg:space-x-12">
            <div className="w-fit lg:w-2/4">
              <h1 className="text-3xl font-bold pb-2">Ranglista</h1>
              <WinnersTable teams={ teams } />
            </div>
            <div className="w-fit lg:w-2/4">
              <p className="font-bold text-3xl pb-4">Leírás</p>
              <Separator />
              <div className="pt-4" dangerouslySetInnerHTML={{ __html: competition?.description }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
