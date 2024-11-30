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
import {
  Calendar,
  Check,
  ChevronUp,
  Megaphone,
  Menu,
  MoreHorizontal,
  Pencil,
  Users,
  X,
} from "lucide-react";
import { CompetitionWithDetails } from "@/server/api/routers/competition";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TournamentEndDialog from "@/components/ui/competition-end-dialog";
import { cn } from "@/lib/utils";

export default function CompetitionCard({
  competition,
}: {
  competition: CompetitionWithDetails;
}) {
  const router = useRouter();

  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substr(0, maxLength) + "..." : text;
  };

  const [startModalOpen, setStartModalOpen] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);

  const { data: teamsThatNeedApproval } =
    api.organizer.getTeamsThatNeedApproval.useQuery({
      competitionId: competition.id,
    });
  const startMutation = api.organizer.startTournament.useMutation();

  const handleStartCompetition = async () => {
    await startMutation.mutateAsync({ id: competition.id });

    setStartModalOpen(false);

    toast.success("A verseny sikeresen elindítva.");

    router.refresh();
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
    <>
      <AlertDialog open={startModalOpen} onOpenChange={setStartModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Biztos elindítod a versenyt?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block">Ez a művelet visszavonhatatlan.</span>
              {teamsThatNeedApproval && teamsThatNeedApproval.length > 0 ? (
                <span className="mt-2 block text-red-500">
                  {teamsThatNeedApproval?.length} csapatnak még nincs elfogadva
                  a jelentkezése.
                </span>
              ) : (
                <span className="mt-2 block italic">
                  Az összes jelentkezett csapatok sikeresen be regisztrált.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Mégsem</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartCompetition}>
              Elindítom
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TournamentEndDialog
        onOpenChange={setCloseModalOpen}
        open={closeModalOpen}
        setOpen={setCloseModalOpen}
        competition={competition}
      />

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

          <TooltipProvider>
            <div className="flex flex-wrap items-center justify-start gap-2 text-sm text-muted-foreground">
              <Badge
                className={cn("text-xs", {
                  "bg-green-200 text-green-800": competitonStatus === "PENDING",
                  "bg-blue-200 text-blue-800": competitonStatus === "RUNNING",
                  "bg-red-200 text-red-800": competitonStatus === "CLOSED",
                })}
              >
                {competitonStatus === "PENDING" && "Nyitott"}
                {competitonStatus === "RUNNING" && "Aktív"}
                {competitonStatus === "CLOSED" && "Lezárva"}
              </Badge>

              {competition.categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2 text-sm text-muted-foreground">
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
            </div>
          </TooltipProvider>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Menu className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
              <DropdownMenuLabel>Műveletek</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                {competitonStatus === "PENDING" ? (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStartModalOpen(true)}
                  >
                    <Check className="mr-2 h-4 w-4 text-green-400" />
                    Elindítás
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full" disabled>
                    <Check className="mr-2 h-4 w-4" />
                    Elindítás
                  </Button>
                )}
              </DropdownMenuItem>

              {competitonStatus !== "PENDING" && (
                <DropdownMenuItem asChild>
                  <Button
                    variant={"ghost"}
                    className="w-full"
                    onClick={() => setCloseModalOpen(true)}
                    disabled={competitonStatus === "CLOSED"}
                  >
                    <X className="size-4 text-red-400" />
                    Lezárás
                  </Button>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <div className="space-y-1">
                <DropdownMenuItem asChild>
                  <Button variant={"ghost"} className="w-full" asChild>
                    <Link href={`versenyek/${competition.id}/kozlemenyek`}>
                      <Megaphone className="size-4" />
                      Közlemények
                    </Link>
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Button variant={"ghost"} className="w-full" asChild>
                    <Link href={`versenyek/${competition.id}`}>
                      <Pencil className="size-4" />
                      Szerkesztése
                    </Link>
                  </Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </>
  );
}
