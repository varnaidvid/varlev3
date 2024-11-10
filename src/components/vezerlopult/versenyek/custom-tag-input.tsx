"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Tag {
  id: string;
  text: string;
}

interface CustomTagInputProps {
  value: Tag[];
  onChange: (tags: string[]) => void;
}

export default function CustomTagInput({
  value,
  onChange,
}: CustomTagInputProps) {
  const [tags, setTags] = useState<Tag[]>(value || []);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const addTag = (text: string) => {
    const newTag: Tag = { id: Date.now().toString(), text: text.trim() };
    const newTags = [...tags, newTag];
    setTags(newTags);
    setInputValue("");
    onChange(newTags.map((tag) => tag.text));
  };

  const removeTag = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    onChange(newTags.map((tag) => tag.text));
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="custom-tag-input"
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
            <span
              key={tag.id}
              className="inline-flex items-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
            >
              {tag.text}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-5 w-5 p-0 hover:bg-secondary-foreground/20"
                onClick={() => removeTag(tag.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Alkategória eltávolítása</span>
              </Button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
