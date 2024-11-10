import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import JelentkezesButton from "@/components/JelentkezesButton";
import { TeamLeaderboard } from "./team-leaderboard";

export default async function Page({
  params,
}: {
  params: { competitionId: string };
}) {
  const { competitionId } = params;
  const competition = await api.competition.getById({ id: competitionId });
  if (!competition) return null;
  const competitionStatus = competition.ended
    ? "CLOSED"
    : competition.deadline > new Date()
      ? "PENDING"
      : "RUNNING";

  // Mock data for the TeamLeaderboard
  const mockTeams = [
    {
      id: "1",
      name: "ByteBrilliants",
      score: 945,
      members: ["Nagy Anna", "Kovács Péter", "Kiss János"],
    },
    {
      id: "2",
      name: "CodeCrusaders",
      score: 892,
      members: ["Szabó Eszter", "Tóth Márk", "Horváth Bence"],
    },
    {
      id: "3",
      name: "TechTitans",
      score: 867,
      members: ["Varga Lilla", "Molnár Dániel", "Németh Zsófia"],
    },
    {
      id: "4",
      name: "DataDynamos",
      score: 843,
      members: ["Fekete Ádám", "Balogh Emma", "Simon Gergő"],
    },
    {
      id: "5",
      name: "QuantumQuesters",
      score: 825,
      members: ["Papp Viktória", "Takács Balázs", "Farkas Réka"],
    },
    {
      id: "6",
      name: "AlgoAces",
      score: 798,
      members: ["Mészáros Dávid", "Szűcs Katalin", "Oláh Máté"],
    },
    {
      id: "7",
      name: "WebWizards",
      score: 776,
      members: ["Lukács Nóra", "Pintér Attila", "Végh Zsolt"],
    },
    {
      id: "8",
      name: "DevDreamers",
      score: 754,
      members: ["Bíró Laura", "Kelemen Tamás", "Somogyi Petra"],
    },
  ];

  if (!competition) return null;
  return (
    <div className="mx-auto mt-28 w-[calc(100%-16px)] max-w-7xl space-y-8 sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
      <div className="rounded-lg border bg-card p-8 shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <img
            className="aspect-video w-full rounded-lg object-cover shadow-xl lg:w-1/3"
            src={competition.image}
            alt={competition.name}
          />
          <div className="flex w-full flex-col justify-between lg:w-2/3">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                {competition.name}
              </h1>
              <Badge variant="outline" className="text-xs">
                {competitionStatus === "PENDING" && "Függőben"}
                {competitionStatus === "RUNNING" && "Fut"}
                {competitionStatus === "CLOSED" && "Lezárva"}
              </Badge>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Max. csapat létszám</span>
                  <span>{competition.maxTeamSize}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Technológiák</span>
                  <div className="flex flex-wrap gap-2">
                    {competition.technologies.map(
                      (tech: { id: string; name: string }) => (
                        <Badge key={tech.id} variant="secondary">
                          {tech.name}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Kategóriák</span>
                  <div className="flex flex-wrap gap-2">
                    {competition.categories.map(
                      (cat: { id: string; name: string }) => (
                        <Badge key={cat.id}>{cat.name}</Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
              {competitionStatus === "PENDING" && (
                <div className="mt-6">
                  <JelentkezesButton competitionId={competition.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {(competitionStatus === "RUNNING" || competitionStatus === "CLOSED") && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <TeamLeaderboard teams={mockTeams} />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold">Leírás</h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: competition.description }}
            />
          </div>
        </div>
      )}
      {competitionStatus === "PENDING" && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Leírás</h2>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: competition.description }}
          />
        </div>
      )}
    </div>
  );
}
