"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Users } from "lucide-react";
import { CompetitionWithDetails } from "@/server/api/routers/competition";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CompetitionCard({
  competition,
}: {
  competition: CompetitionWithDetails;
}) {
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substr(0, maxLength) + "..." : text;
  };

  const [competitonStatus, setCompetitionStatus] = useState<
    null | "PENDING" | "RUNNING" | "CLOSED"
  >(null);
  useEffect(() => {
    if (competition.ended) {
      setCompetitionStatus("CLOSED");
    } else if (competition.deadline > new Date()) {
      setCompetitionStatus("PENDING");
    } else {
      setCompetitionStatus("RUNNING");
    }
  }, [competition]);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`versenyek/${competition.id}`}>
          <div className="relative aspect-video w-full">
            <Image
              src={competition.image}
              alt={competition.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <Link href={`versenyek/${competition.id}`}>
            <h2 className="line-clamp-2 text-2xl font-bold text-primary hover:underline">
              {competition.name}
            </h2>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 text-sm text-muted-foreground">
          <TooltipProvider>
            {competition.categories.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="text-xs">
                  <Calendar className="mr-1 h-3 w-3" />
                  Határidő: {competition.deadline.toLocaleDateString()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Jelentkezési határidő</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="text-xs">
                  <Users className="mr-1 h-3 w-3" />
                  Max {competition.maxTeamSize}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Max csapat létszám</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {truncateDescription(
            competition.description.replace(/<\/?[^>]+(>|$)/g, ""),
            150,
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {competition.technologies.map((tech) => (
            <Badge key={tech.id} variant="secondary" className="text-xs">
              {tech.name}
            </Badge>
          ))}
        </div>
        {competition.subCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {competition.subCategories.map((subCategory) => (
                <Tooltip key={subCategory.id}>
                  <TooltipTrigger asChild>
                    <Badge variant="outline">{subCategory.name}</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alkategóriák</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        )}
        <div className="flex h-full max-h-24 flex-col items-end justify-end space-y-2">
          {competitonStatus === "PENDING" ? (
            <Button asChild className="mx-auto w-full font-bold">
              <Link href={`/versenyek/${competition.id}/regisztralas`}>
                Jelentkezés
              </Link>
            </Button>
          ) : competitonStatus === "RUNNING" ? (
            <Button disabled className="mx-auto w-full bg-blue-400 font-bold">
              Verseny aktív
            </Button>
          ) : (
            competitonStatus === "CLOSED" && (
              <Button
                disabled
                className="mx-auto w-full font-bold"
                variant={"destructive"}
              >
                Verseny lezárva
              </Button>
            )
          )}
          <Button className="mx-auto w-full" variant={"link"} asChild>
            <Link href={`/versenyek/${competition.id}`}>Részletek</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
