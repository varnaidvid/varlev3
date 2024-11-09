import React from "react";
import { api } from "@/trpc/server";
import CompetitionCard from "@/components/vezerlopult/versenyek/competition-card";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await api.category.getAll();
  const competitions = await api.competition.getAllWithDetails();
  const filteredCompetitions = competitions.filter((competition) =>
    competition.categories.some((cat) => cat.id === category)
  );

  return (
    <>
      <div className="mt-28 mx-auto w-[calc(100%-16px)] max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <div className="border rounded-lg p-12 shadow-xl">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Versenyek</h1>
            <p className="mb-8">{filteredCompetitions.length} verseny található</p>
            <ul className="flex items-center space-x-2 lg:space-x-2.5 mb-12">
              {categoryData.map((cat) => (
                <li
                  key={cat.name}
                  className={`px-4 py-2 rounded-md text-sm font-medium border ${
                    cat.id === category ? 'bg-gray-900 text-white' : 'bg-gray-100'
                  }`}
                >
                  <Link href={`/category/${cat.id}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompetitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}