"use server";

import { api } from "@/trpc/server";

export async function getTeamsWithDetails() {
  const teams = await api.teams.getTeamsWithDetails();
  return teams;
}
