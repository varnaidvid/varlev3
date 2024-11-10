import React from "react";
import { api } from "@/trpc/server";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";
import Link from "next/link";

export default async function Page() {
  const competitions = await api.competition.getAllWithDetails();

  const categories = await api.category.getAll();

  return (
    <>
      <div className="mx-auto mt-28 w-[calc(100%-16px)] max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <div className="rounded-lg border p-12 shadow-xl">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Versenyek</h1>
            <p className="mb-8">{competitions.length} verseny található</p>
            <ul className="mb-12 flex items-center space-x-2 lg:space-x-2.5">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="rounded-md border bg-gray-100 px-4 py-2 text-sm font-medium"
                >
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
