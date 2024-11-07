import Link from "next/link";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Layers3 } from "lucide-react";
import Logo from "../components/logo";

export default async function Home() {
  const session = await auth();

  // const hello = await api.post.hello({ text: "asdlksandoiasndio" });

  // if (session?.user) {
  // void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-sky-600 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Logo />
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.email}</span>}
              </p>
              {session?.user && (
                <pre className="text-center text-2xl text-white">
                  <code>{JSON.stringify(session, null, 2)}</code>
                </pre>
              )}
              <Link
                href={session ? "/kijelentkezes" : "/bejelentkezes"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
