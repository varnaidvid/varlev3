"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pencil, Users } from "lucide-react";
import Image from "next/image";
import { CompetitionWithDetails } from "@/server/api/routers/competition";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function CompetitionCard({
  competition,
}: {
  competition: CompetitionWithDetails;
}) {
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const onEdit = () => {
    console.log("Edit competition");
  };

  const onViewTeams = () => {
    console.log("View teams");
  };

  return (
    <Card className="mx-auto max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full" style={{ paddingTop: "66.67%" }}>
          <Image
            src={competition.image}
            alt={competition.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {competition.name}
          </h2>
        </div>
        <p className="mb-4 text-[15px] text-gray-600">
          {truncateDescription(
            competition.description.replace(/<\/?[^>]+(>|$)/g, ""),
            100,
          )}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {competition.technologies.map((tech) => (
            <Badge key={tech.id} variant="secondary">
              {tech.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-start gap-2 text-sm text-gray-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="cursor-help">
                  <Calendar className="mr-1 h-3 w-3" />
                  {competition.deadline.toLocaleDateString()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Jelentkezési határidő</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="cursor-help">
                  <Users className="mr-1 h-3 w-3" />
                  {competition.maxTeamSize}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Max csapat létszám</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`versenyek/${competition.id}/csapatok`}>
            <Users className="mr-2 h-4 w-4" />
            Jelentkezett csapatok ({competition.teams.length})
          </Link>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 aspect-square"
                asChild
              >
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
