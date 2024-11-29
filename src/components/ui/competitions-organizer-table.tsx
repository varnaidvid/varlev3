"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Users,
  Tag,
  ChevronRight,
  Loader2,
  ExternalLink,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Separator } from "./separator";
import { Countdown } from "../countdown";
import Link from "next/link";
import { Badge } from "./badge";

export function CompetitionsTable() {
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.organizer.getCompetitions.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage: any) => lastPage.nextCursor,
      },
    );

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const competitions = data?.pages.flatMap((page) => page.competitions) ?? [];

  if (isLoading) return <Loader2 className="size-6 animate-spin" />;

  return (
    <div className="rounded-md border">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-semibold">Versenyeid</h1>
      </div>

      <Separator />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Verseny neve</TableHead>
            <TableHead>Hátralevő idő</TableHead>
            <TableHead className="text-right">Kategóriák</TableHead>
            <TableHead className="text-right">Csapatok száma</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitions.map((competition, index) => {
            const competitionStatus = competition.ended
              ? "CLOSED"
              : competition.deadline > new Date()
                ? "PENDING"
                : "RUNNING";
            return (
              <TableRow key={competition.id}>
                <TableCell className="font-bold">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/vezerlopult/versenyek/${competition.id}`}
                    className="flex items-start gap-1 text-sm hover:underline"
                  >
                    {competition.name}
                    <ExternalLink className="size-3" />
                  </Link>
                </TableCell>
                <TableCell className="w-max">
                  {competitionStatus === "PENDING" && (
                    <Countdown
                      inTable
                      targetDate={competition.deadline.toISOString()}
                    />
                  )}

                  {competitionStatus === "RUNNING" && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      Aktív
                    </Badge>
                  )}

                  {competitionStatus === "CLOSED" && (
                    <Badge variant="outline" className="text-xs">
                      <BadgeCheck className="mr-1 h-3 w-3" />
                      Lezárult
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-end gap-2">
                    {competition.categories.map((category) => (
                      <span
                        key={category.id}
                        className="mr-1 w-min rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <span>{competition.teams.length}</span>
                    <Users size={18} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isFetchingNextPage ? (
        <div className="flex justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : hasNextPage ? (
        <div ref={ref} className="flex justify-center p-4">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  );
}
