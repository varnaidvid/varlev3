import {
  AccountType,
  Notification,
  NotificationTopic,
  NotificationType,
} from "@prisma/client";
import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Crown,
  Info,
  School,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const getNotificationTypeProps = (type: NotificationType) => {
  switch (type) {
    case "INFO":
      return {
        icon: Info,
        color: "bg-blue-100 text-blue-700",
        iconColor: "text-blue-700",
      };
    case "SUCCESS":
      return {
        icon: CheckCircle2,
        color: "bg-green-100 text-green-700",
        iconColor: "text-green-700",
      };
    case "WARNING":
      return {
        icon: AlertTriangle,
        color: "bg-yellow-100 text-yellow-700",
        iconColor: "text-yellow-700",
      };
    case "ERROR":
      return {
        icon: AlertCircle,
        color: "bg-red-100 text-red-700",
        iconColor: "text-red-700",
      };
  }
};

const getTopicDisplayText = (topic: NotificationTopic) => {
  switch (topic) {
    case "TEAM_REGISTERED":
      return "Csapat regisztráció";
    case "TEAM_APPROVED_BY_SCHOOL":
      return "Iskolai jóváhagyás";
    case "TEAM_APPROVED_BY_ORGANIZER":
      return "Szervezői jóváhagyás";
    case "TEAM_REJECTED_BY_ORGANIZER":
      return "Szervezői elutasítás";
    case "TEAM_UPDATE":
      return "Csapat hiánypótlás";
    case "COMPETITION_ANNOUNCEMENT":
      return "Verseny közlemény";
  }
};

export function NotificationItem({
  notification,
}: {
  notification: Notification & {
    senderName: string;
    senderType: AccountType;
    clientStatus?: string;
  };
}) {
  const typeProps = getNotificationTypeProps(notification.type);
  const Icon = typeProps.icon;

  return (
    <div className="border-b p-4 last:border-b-0 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="default"
              className={`rounded-full p-[2px] ${typeProps.color}`}
            >
              <Icon className="size-4" />
            </Badge>
            <h3 className="break-words pr-2 font-semibold">
              {notification.subject}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
          {notification.redirectTo && (
            <Button
              variant="link"
              className="mt-2 inline-block text-sm"
              asChild
            >
              <Link href={notification.redirectTo}>További részletek</Link>
            </Button>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(notification.clientStatus || notification.status) ===
              "UNREAD" && (
              <Badge
                variant="outline"
                className="w-max text-xs text-neutral-600"
              >
                <Sparkles className="mr-2 size-3" />
                Új
              </Badge>
            )}
            <Badge variant="outline" className="w-max text-xs text-neutral-600">
              {getTopicDisplayText(notification.topic)}
            </Badge>
            <Badge variant="outline" className="w-max text-xs text-neutral-600">
              {notification.senderType === "SCHOOL" && (
                <School className="mr-2 size-3" />
              )}
              {notification.senderType === "ORGANIZER" && (
                <User className="mr-2 size-3" />
              )}
              {notification.senderType === "TEAM" && (
                <Users className="mr-2 size-3" />
              )}

              {notification.senderName}
            </Badge>
            <Badge variant="outline" className="text-xs text-neutral-600">
              <CalendarDays className="mr-2 size-3" />
              {new Date(notification.createdAt).toLocaleString("hu-HU", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
