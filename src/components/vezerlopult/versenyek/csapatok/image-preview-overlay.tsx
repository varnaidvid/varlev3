import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImagePreviewOverlayProps {
  src: string;
  onClose: () => void;
}

export function ImagePreviewOverlay({
  src,
  onClose,
}: ImagePreviewOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="Application Form Preview"
          width={800}
          height={600}
          className="rounded-lg object-contain"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-red-500 text-white hover:bg-red-700"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
