import { auth, signOut } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.redirect("/bejelentkezes");

  await signOut({
    redirectTo: `/?toast=true&type=success&message=${encodeURI("Sikeres kijelentkezés!")}`,
  });

  //   return NextResponse.redirect(redirectTo)
}
