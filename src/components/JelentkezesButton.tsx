"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JelentkezesButton({
  competitionId,
}: {
  competitionId: string;
}) {
  return (
    <Link href={`/versenyek/${competitionId}/regisztralas`}>
      <Button size="lg" className="w-full">
        Jelentkezés
      </Button>
    </Link>
  );
}
