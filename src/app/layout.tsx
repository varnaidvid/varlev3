import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ToastCatcher from "@/components/toast-catcher";
import { Suspense } from "react";
import LoadingFallback from "@/components/loading-fallback";
import { HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
  title: "VarleV3",
  description: "2024-es Dusza Árpád Országos Webprogramozói Verseny",
  icons: [{ rel: "icon", url: "/varlev3_icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" className={`${GeistSans.variable}`}>
      <body>
        <Suspense fallback={<LoadingFallback />}>
          <SessionProvider>
            <TRPCReactProvider>
              <HydrateClient>{children}</HydrateClient>

              <Toaster position="bottom-center" richColors expand />
              <ToastCatcher />
            </TRPCReactProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
