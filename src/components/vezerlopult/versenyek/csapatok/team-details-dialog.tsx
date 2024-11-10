"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader, Download, X, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  School,
  Trophy,
  Blocks,
  BrainCircuit,
  Cpu,
  Mail,
  ExternalLink,
} from "lucide-react";
import { ApplicationStatus } from "@prisma/client";
import { ApplicationStatusBadge } from "@/components/ui/application-status";
import { ImagePreviewOverlay } from "./image-preview-overlay";
import { downloadFile } from "@/utils/file-helpers";
import { toast } from "sonner";

interface ApplicationDetailDialogProps {
  teamId: string;
  onApprove: (id: string) => void;
  onReject: (reason: string) => void;
}

export function TeamDetailDialog({
  teamId,
  onApprove,
  onReject,
}: ApplicationDetailDialogProps) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const {
    data: team,
    isLoading,
    error,
  } = api.team.getTeamById.useQuery({ teamId }, { enabled: isDialogOpen });

  const isRegistered = team?.status === "REGISTERED";

  console.log(team);

  const handleReject = () => {
    onReject(rejectionReason);
    setIsRejectDialogOpen(false);
    setRejectionReason("");
  };

  const handleApprove = async () => {
    if (team) {
      setIsApproveLoading(true);
      toast.loading("Jóváhagyás folyamatban...");
      try {
        await onApprove(team.id);
        toast.success("Jóváhagyás sikeres!");
      } catch (error) {
        toast.error("Jóváhagyás sikertelen!");
      } finally {
        setIsApproveLoading(false);
        setIsDialogOpen(false);
        toast.dismiss();
      }
    }
  };

  const handleImagePreviewOpen = () => {
    setIsDialogOpen(false);
    setIsImagePreviewOpen(true);
  };

  const handleImagePreviewClose = () => {
    setIsImagePreviewOpen(false);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="flex items-center gap-2">
            <CheckCircle />
            <span>Részletek</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[80vh] flex-col sm:max-w-[625px]">
          <DialogHeader className="p-4">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold">
              <span className="flex items-center gap-2">
                {team?.name}
                {team?.status && (
                  <ApplicationStatusBadge status={team.status} />
                )}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-grow items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : error ? (
              <p>Error loading team details</p>
            ) : (
              <CardContent className="space-y-6 p-6">
                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <School className="size-6 rounded-full border p-[3px]" />
                    Iskola
                  </h2>
                  <p className="text-sm text-gray-600">{team?.school.name}</p>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Trophy className="size-6 rounded-full border p-[3px]" />
                    Verseny
                  </h2>
                  <Link
                    href={`/versenyek/${team?.Competition.id}`}
                    className="flex items-start gap-1 text-sm text-gray-600 hover:underline"
                  >
                    {team?.Competition.name}
                    <ExternalLink className="size-3" />
                  </Link>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Blocks className="size-6 rounded-full border p-[3px]" />
                    Kiválasztott kategória
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {team?.Competition.subCategories.map((subCategory) => (
                      <li key={subCategory.id} className="text-sm">
                        {subCategory.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Users className="size-6 rounded-full border p-[3px]" />
                    Csapattagok
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {team?.members.map((member) => (
                      <li key={member.id} className="text-sm">
                        <b>{member.name}</b> -- Évfolyam: <b>{member.year}</b>{" "}
                        {member.isReserve && "(Póttag)"}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <BrainCircuit className="size-6 rounded-full border p-[3px]" />
                    Felkészítő tanárok
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {team?.coaches.map((coach) => (
                      <li key={coach.id} className="text-sm">
                        <b>{coach.name}</b> (Iskola: {team?.school.name})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Cpu className="size-6 rounded-full border p-[3px]" />
                    Technológiák
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                      {team?.technologies.map((tech) => (
                        <Badge key={tech.id} variant="secondary">
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Mail className="size-6 rounded-full border p-[3px]" />
                    Email címek
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {team?.account.emails.map((email) => (
                      <li
                        key={email.id}
                        className="flex items-center gap-1 text-sm"
                      >
                        {email.email}
                      </li>
                    ))}
                    {team?.account.emails.length === 0 && (
                      <li className="text-sm text-gray-500">
                        Nem adtatok meg még értesítendő email címet
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-gray-700">
                    <Download className="size-6 rounded-full border p-[3px]" />
                    Jelentkezési lap
                  </h2>
                  {team?.applicationForm ? (
                    <div className="mt-2">
                      <button onClick={handleImagePreviewOpen}>
                        <Card className="w-[200px] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-0">
                            <div className="relative h-[300px] w-full">
                              <Image
                                src={team.applicationForm}
                                alt="Application Form Preview"
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-300 hover:scale-105"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="flex items-center gap-2"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span>Megtekintés</span>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </button>
                      <Button
                        variant="outline"
                        className="mt-2 flex w-[200px] items-center gap-2"
                        onClick={() =>
                          team?.applicationForm &&
                          downloadFile(
                            team.applicationForm,
                            team.name + "_jelentkezesi_lap",
                          )
                        }
                      >
                        <Download className="h-4 w-4" />
                        <span>Letöltés</span>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Még nincs feltöltve a dokumentum
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </div>
          <DialogFooter className="space-x-2 sm:justify-start">
            <Button
              onClick={handleApprove}
              variant="outline"
              className="flex-1"
              disabled={isApproveLoading || isRegistered || isLoading}
            >
              {isApproveLoading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Jóváhagyás
            </Button>

            <Dialog
              open={isRejectDialogOpen}
              onOpenChange={setIsRejectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex-1"
                  disabled={isRegistered || isLoading || isApproveLoading}
                >
                  <XCircle className="mr-2 h-4 w-4" /> Elutasítás
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Jelentkezés elutasítása
                  </DialogTitle>
                </DialogHeader>
                <Textarea
                  placeholder="Írd be az elutasítás okát"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRejectDialogOpen(false)}
                  >
                    Mégse
                  </Button>
                  <Button variant="destructive" onClick={handleReject}>
                    Elutasítás megerősítése
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isImagePreviewOpen && (
        <ImagePreviewOverlay
          src={team?.applicationForm || ""}
          onClose={handleImagePreviewClose}
        />
      )}
    </>
  );
}
