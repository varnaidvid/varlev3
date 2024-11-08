import { api } from "@/trpc/server";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;

  const competition = await api.competition.getById({ id: competitionId });

  return (
    <>
      <h1>Asdsdds</h1>
    </>
  );
}
