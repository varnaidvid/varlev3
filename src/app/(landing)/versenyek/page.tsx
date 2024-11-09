import React from "react";
import { api } from "@/trpc/server";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";

export default async function Page() {
  
  const competitions = await api.competition.getAllWithDetails();
  

  return (
    <>
      <div className="mt-28 mx-auto w-[calc(100%-16px)] max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <div className="border rounded-lg p-12 shadow-xl">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Versenyek</h1>
            <p className="mb-8">{competitions.length} verseny található</p>
            <ul className="flex snap-x snap-mandatory overflow-auto items-center space-x-2 lg:space-x-2.5 pb-2">
              {}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
