"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Pencil, Users } from "lucide-react";
import { CompetitionWithDetails } from "@/server/api/routers/competition";

export default function CompetitionCard({
  competition,
}: {
  competition: CompetitionWithDetails;
}) {
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substr(0, maxLength) + "..." : text;
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`versenyek/${competition.id}/csapatok`}>
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
          <Link href={`versenyek/${competition.id}/csapatok`}>
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
      </CardContent>
      <CardFooter className="flex gap-2 p-6">
        <Button variant="default" className="flex-grow" asChild>
          <Link href={`versenyek/${competition.id}/csapatok`}>
            <Users className="mr-2 h-4 w-4" />
            Jelentkezők ({competition.teams.length})
          </Link>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" asChild>
                <Link href={`versenyek/${competition.id}`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verseny szerkesztése</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
