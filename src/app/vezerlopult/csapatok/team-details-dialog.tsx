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
import {
  CheckCircle,
  XCircle,
  Loader,
  Download,
  X,
  Eye,
  Upload,
} from "lucide-react";
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
import { ImagePreviewOverlay } from "@/components/vezerlopult/versenyek/csapatok/image-preview-overlay";
import { createFileInfo, downloadFile } from "@/utils/file-helpers";
import { uploadFile } from "@/utils/upload-file";
import { toast } from "sonner";
import { ClientOnly } from "@/components/client-only";

interface ApplicationDetailDialogProps {
  teamId: string;
  onApprove: (id: string) => void;
  accountId: string;
}

export function TeamDetailDialog({
  teamId,
  onApprove,
  accountId,
}: ApplicationDetailDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);

  const {
    data: team,
    isLoading,
    error,
    refetch,
  } = api.team.getTeamById.useQuery({ teamId }, { enabled: isDialogOpen });

  const updateTeamApplicationFormMutation =
    api.team.updateTeamApplicationForm.useMutation();

  const isRegistered = team?.status === "REGISTERED";

  const handleApprove = async () => {
    if (team) {
      setIsApproveLoading(true);
      toast.loading("Jóváhagyás folyamatban...");
      try {
        await onApprove(team.id);
        toast.success("Jóváhagyás sikeres!");
        await refetch();
      } catch (error) {
        console.log("error", error);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A fájl mérete nem lehet nagyobb mint 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setFilePreview(base64String);
        setFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      try {
        const fileInfo = createFileInfo(team!.name, file);
        const result = await uploadFile(fileInfo.source, fileInfo.fileName);
        await updateTeamApplicationFormMutation.mutateAsync({
          teamId: teamId,
          applicationForm: result.url,
        });

        toast.success("Fájl feltöltése sikeres!");
        await refetch();
        setFilePreview(result.url);
        setFile(null);
      } catch (error) {
        toast.error("Fájl feltöltése sikertelen!");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="flex items-center gap-2">
            <Eye />
            <span>Részletek</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[80vh] flex-col sm:max-w-[625px]">
          <DialogHeader className="p-4">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold">
              <span className="flex items-center gap-2">
                {team?.name}
                {team?.status && (
                  <ApplicationStatusBadge
                    status={
                      team.status as ApplicationStatus & "COMPETITION_RUNNING"
                    }
                  />
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
              <p>Hiba történt a csapat adatainak betöltésekor</p>
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
                      <ClientOnly>
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
                      </ClientOnly>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {!filePreview && (
                        <label className="flex w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Klikk a tallózáshoz
                              </span>{" "}
                              vagy húzza ide a fájlt
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, WEBP ...(MAX. 5MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                          />
                        </label>
                      )}
                      {filePreview && (
                        <div className="relative flex w-full justify-center p-4">
                          <div className="group relative">
                            <img
                              src={filePreview}
                              alt="Kép előnézete"
                              className="max-h-64 max-w-full rounded-lg object-contain"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -right-2 -top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={() => setFilePreview(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {filePreview && (
                        <Button
                          onClick={handleUpload}
                          variant="default"
                          className="mt-4"
                          disabled={uploading}
                        >
                          {uploading ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            "Feltöltés"
                          )}
                        </Button>
                      )}
                    </div>
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
