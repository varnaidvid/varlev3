import { authenticator } from "../lib/imagekit-authenticator";

export const uploadFile = async (fileSource: string, fileName: string) => {
  const { signature, expire, token } = await authenticator();

  if (!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not defined");
  }

  const formData = new FormData();
  formData.append("file", fileSource);
  formData.append("fileName", fileName);
  formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
  formData.append("signature", signature);
  formData.append("expire", expire);
  formData.append("token", token);
  formData.append("useUniqueFileName", "true");
  formData.append("folder", "competition-images");
  formData.append("isPrivateFile", "false");
  formData.append("isPublished", "true");

  const url = "https://upload.imagekit.io/api/v1/files/upload";
  const options = {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("File upload failed");
  }
};
