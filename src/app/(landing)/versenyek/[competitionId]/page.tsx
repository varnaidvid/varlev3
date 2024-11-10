import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WinnersTable } from "@/components/WinnersTable";

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
  ];

  return (
    <>
      <div className="mx-auto mt-28 w-[calc(100%-16px)] max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <div className="rounded-lg border p-12 shadow-xl">
          <div className="flex flex-col space-x-0 space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0">
            <img
              className="w-full rounded-lg shadow-xl md:w-1/5"
              src={competition?.image}
              alt=""
            />
            <div className="flex w-full flex-col justify-between lg:w-4/5">
              <div>
                <h1 className="pb-2 text-3xl font-bold">{competition?.name}</h1>
                <Separator />
                <div className="flex flex-col justify-between py-2 sm:flex-row">
                  <p className="py-2 font-bold">Csapatok száma</p>
                  <Separator orientation="vertical" />
                  <p className="py-2">{competition?.maxTeamSize}</p>
                </div>
                <Separator />
                <div className="flex flex-col justify-between py-2 sm:flex-row">
                  <p className="py-2 font-bold">Technológiák</p>
                  <Separator orientation="vertical" />
                  <div className="mt-2 flex h-6 space-x-2">
                    {competition?.technologies.map((tech) => (
                      <Badge key={tech.name}>{tech.name}</Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col justify-between py-2 sm:flex-row">
                  <p className="py-2 font-bold">Kategóriák</p>
                  <Separator orientation="vertical" />
                  <div className="mt-2 flex h-6 space-x-2">
                    {competition?.categories.map((cat) => (
                      <Badge key={cat.name}>{cat.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between space-x-0 space-y-12 py-4 md:flex-row lg:space-x-12 lg:space-y-0">
            <div className="w-fit lg:w-2/4">
              <h1 className="pb-2 text-3xl font-bold">Ranglista</h1>
              <WinnersTable teams={teams} />
            </div>
            <div className="w-fit lg:w-2/4">
              <p className="pb-4 text-3xl font-bold">Leírás</p>
              <Separator />
              <div
                className="pt-4"
                dangerouslySetInnerHTML={{ __html: competition?.description! }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
