"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Trash2, Loader } from "lucide-react"; // Import Loader icon
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createId } from "@paralleldrive/cuid2";
import { SubCategoryWithDetails } from "@/server/api/routers/sub-category";
import { CompetitionWithDetails } from "@/server/api/routers/competition";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // Import toast

export interface Tag {
  id: string;
  text: string;
  teamCount: number;
}

interface EditTagInputProps {
  value: string[];
  onChange: (tags: Tag[]) => void;
  subCategories: CompetitionWithDetails["subCategories"];
  competitionId: string;
}

export default function EditTagInput({
  value,
  onChange,
  subCategories,
  competitionId,
}: EditTagInputProps) {
  const [tags, setTags] = useState<Tag[]>(
    value.map((id) => ({
      id: id,
      text:
        subCategories.find((subCategory) => subCategory.id === id)?.name || "",
      teamCount:
        subCategories.find((subCategory) => subCategory.id === id)?.teams
          .length || 0,
    })) || [],
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const createSubCategoryMutation = api.subCategory.create.useMutation();
  const deleteSubCategoryMutation = api.subCategory.delete.useMutation();

  //   useEffect(() => {
  //     setTags(
  //       value.map((id) => ({
  //         id: id,
  //         text:
  //           subCategories.find((subCategory) => subCategory.id === id)?.name ||
  //           "",
  //         teamCount:
  //           subCategories.find((subCategory) => subCategory.id === id)?.teams
  //             .length || 0,
  //       })) || [],
  //     );
  //   }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      await addTag(inputValue);
    }
  };

  const addTag = async (text: string) => {
    const newTag: Tag = {
      id: createId(),
      text: text.trim(),
      teamCount: 0,
    };
    const createdSubCategory = await createSubCategoryMutation.mutateAsync({
      name: newTag.text,
      competitionId,
    });
    newTag.id = createdSubCategory.id;
    newTag.text = createdSubCategory.name;

    console.log("------------");
    console.log(newTag);
    const newTags = [...tags, newTag];
    setTags(newTags);
    setInputValue("");
    onChange(newTags);
    toast.success("Új alkategória létrehozva");
  };

  const removeTag = async (id: string) => {
    setLoading(true);
    toast.loading("Törlés folyamatban...");
    await deleteSubCategoryMutation.mutateAsync({ id });
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    onChange(newTags);
    setLoading(false);
    toast.dismiss();
    toast.success("Alkategória törölve");
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="edit-tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Adjon hozzá egy alkategóriát"
            className="w-full"
          />
          {inputValue && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">
              Enter: alkategória létrehozása
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <TooltipProvider key={tag.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`inline-flex items-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground ${
                      tag.teamCount > 0 ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {tag.text}
                    <span className="mx-2 text-muted-foreground">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center">
                          <Users className="h-4 w-4" />
                          <span className="ml-1">{tag.teamCount}</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Csapatok száma: {tag.teamCount}</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 h-5 w-5 p-0 text-red-600 hover:bg-secondary-foreground/20"
                              disabled={tag.teamCount > 0}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">
                                Alkategória eltávolítása
                              </span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>
                              Alkategória törlése: {tag.text}
                            </DialogTitle>
                            <DialogDescription>
                              Biztosan törölni szeretné ezt az alkategóriát?
                            </DialogDescription>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setLoading(false)}
                              >
                                Mégse
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => removeTag(tag.id)}
                                disabled={loading}
                              >
                                {loading ? (
                                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  "Törlés"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Alkategória törlése</p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </TooltipTrigger>
                {tag.teamCount > 0 && (
                  <TooltipContent>
                    <p>
                      Nem törölhető, mert már vannak csapatok, akik ezt
                      használják.
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
