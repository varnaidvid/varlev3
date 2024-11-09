type ImageFormat = "jpg" | "jpeg" | "png" | "gif" | "webp" | "svg" | "unknown";

interface FormatSignature {
  char: string;
  format: ImageFormat;
}

interface FileInfo {
  fileName: string;
  source: string;
}

const FORMAT_SIGNATURES: FormatSignature[] = [
  { char: "/", format: "jpg" },
  { char: "i", format: "png" },
  { char: "R", format: "gif" },
  { char: "U", format: "webp" },
  { char: "P", format: "svg" },
];

function getImageExtension(input: string): ImageFormat {
  try {
    // Check if it's a URL
    if (input.startsWith("http://") || input.startsWith("https://")) {
      // Remove query parameters and hash
      const cleanUrl = input.split(/[?#]/)[0];
      // Get the file extension
      const extension = cleanUrl?.split(".").pop()?.toLowerCase();

      if (extension) {
        // Handle jpeg/jpg case
        if (extension === "jpeg" || extension === "jpg") {
          return "jpg";
        }
        // Check if extension is a valid ImageFormat
        if (isValidImageFormat(extension)) {
          return extension as ImageFormat;
        }
      }
      return "unknown";
    }

    // Handle base64 string
    if (input.startsWith("data:")) {
      const matches = input.match(/^data:image\/([a-zA-Z0-9-+]+);base64,/);
      if (matches && matches[1]) {
        const format = matches[1].toLowerCase();
        // Handle jpeg/jpg case
        if (format === "jpeg") {
          return "jpg";
        }
        return format as ImageFormat;
      }
      // Extract the actual base64 content
      input = input.split(",")[1] || "";
    }

    // Remove any whitespace
    input = input.trim();

    // If string is empty after cleanup
    if (!input) {
      return "unknown";
    }

    // Get the first character and look up the format
    const firstChar = input.charAt(0);
    const matchedFormat = FORMAT_SIGNATURES.find(
      (sig) => sig.char === firstChar,
    );
    return matchedFormat ? matchedFormat.format : "unknown";
  } catch (error) {
    console.error("Error detecting image format:", error);
    return "unknown";
  }
}

// Helper function to check if a string is a valid ImageFormat
function isValidImageFormat(format: string): format is ImageFormat {
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(format);
}

// Helper function to convert string to kebab case
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createFileInfo(name: string, source: string): FileInfo {
  const extension = getImageExtension(source);
  const kebabName = toKebabCase(name);

  return {
    fileName: `${kebabName}.${extension}`,
    source,
  };
}

export function downloadFile(
  url: string,
  fileName: string = url.split("/").pop() || "default-filename",
) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName; // Set the filename

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Free up memory
    })
    .catch((error) => {
      console.error("Download failed:", error);
    });
}
