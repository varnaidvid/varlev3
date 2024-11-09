"use server";

import { api } from "@/trpc/server";

export async function createCompetition(competitionData: {
  description: string;
  name: string;
  technologies: [string, ...string[]];
  image: string;
  maxTeamSize: number;
  deadline: Date;
  categories: [string, ...string[]];
  id: string;
}) {
  const competition = await api.competition.create(competitionData);
  return competition;
}

export async function updateCompetition(competitionData: {
  description: string;
  name: string;
  technologies: [string, ...string[]];
  image: string;
  maxTeamSize: number;
  deadline: Date;
  categories: [string, ...string[]];
  id: string;
}) {
  const competition = await api.competition.update(competitionData);
  return competition;
}
