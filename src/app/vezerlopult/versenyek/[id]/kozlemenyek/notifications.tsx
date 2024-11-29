"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouterOutputs } from "@/trpc/react";
import { Megaphone } from "lucide-react";
import { NotificationItem } from "./notification-item";

export default function Notifications({
  data,
}: {
  data: RouterOutputs["organizer"]["getCompetitionAnnouncements"];
}) {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          Előzmények
        </CardTitle>
        <CardDescription>
          A versenyhez kapcsolódó összes közlemény időrendi sorrendben
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        {data.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              Még nem került közzétételre közlemény ehhez a versenyhez.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((announcement) => (
              <NotificationItem
                key={announcement.id}
                notification={{
                  ...announcement,
                  senderName: "Szervező",
                  senderType: "ORGANIZER",
                }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
