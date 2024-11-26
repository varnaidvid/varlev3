import { Footer } from "@/components/footer";
import Header from "@/components/header";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { auth } from "@/server/auth";
import React from "react";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="bg-gradient-to-b from-background to-slate-100">
      <main className="sm:w-[calc(100%-32px) relative mx-auto h-full min-h-[calc(100vh-57px-97px)] w-[calc(100%-16px)] max-w-7xl flex-1 overflow-hidden md:w-[calc(100%-64px)]">
        <Header session={session} />
        {children}
        <Footer />
      </main>
    </div>
  );
}
