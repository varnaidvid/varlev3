import { Footer } from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto h-full min-h-[calc(100vh-57px-97px)] w-[calc(100%-16px)] flex-1 sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]">
        <Header />

        {children}

        <Footer />
      </main>
    </div>
  );
}
