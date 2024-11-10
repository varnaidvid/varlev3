import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { auth } from "@/server/auth";
import React from "react";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="">
      <main className="mx-auto h-full min-h-[calc(100vh-57px-97px)] w-[calc(100%-16px)] flex-1 overflow-hidden sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <Header session={session} />

        {children}

        <Footer />
      </main>
    </div>
  );
}
