import { NextResponse } from "next/server";
import crypto from "crypto";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

export async function GET(request: Request) {
  if (!privateKey) {
    return NextResponse.json(
      { error: "ImageKit private key is missing" },
      { status: 500 },
    );
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || crypto.randomUUID();
  const expire =
    searchParams.get("expire") ||
    (Math.floor(Date.now() / 1000) + 2400).toString();

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    token,
    expire,
    signature,
  });
}
