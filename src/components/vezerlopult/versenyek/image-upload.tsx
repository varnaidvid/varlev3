"use client";

import { useState } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
interface ImageUploadProps {
  field: any;
  form: any;
}

export function ImageUpload({ field, form }: ImageUploadProps) {
  const [preview, setPreview] = useState(field.value || null);
  const [uploadTab, setUploadTab] = useState("upload");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A fájl mérete nem lehet nagyobb mint 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        form.setValue(field.name, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A fájl mérete nem lehet nagyobb mint 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        form.setValue(field.name, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = () => {
    setPreview(null);
    form.setValue(field.name, "");
  };

  return (
    <Tabs value={uploadTab} onValueChange={setUploadTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Fájl feltöltése
        </TabsTrigger>
        <TabsTrigger value="url" className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          Kép URL megadása
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="mt-4">
        <div
          className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!preview ? (
            <label className="flex w-full cursor-pointer flex-col items-center justify-center p-8">
              <div className="flex flex-col items-center justify-center">
                <Upload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Klikk a tallózáshoz</span>{" "}
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
          ) : (
            <div className="relative flex w-full justify-center p-4">
              <div className="group relative">
                <img
                  src={preview}
                  alt="Kép előnézete"
                  className="max-h-64 max-w-full rounded-lg object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="url" className="mt-4">
        <div className="space-y-4">
          <Input
            placeholder="https://example.com/image.jpg"
            value={field.value}
            onChange={(e) => {
              setPreview(e.target.value);
              form.setValue(field.name, e.target.value);
            }}
          />
          {preview && (
            <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
              <div className="group relative">
                <img
                  src={preview}
                  alt="Kép előnézete"
                  className="max-h-64 max-w-full rounded-lg object-contain"
                  onError={() => {
                    setPreview(null);
                    form.setValue(field.name, "");
                    toast.error("Érvénytelen kép URL");
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
