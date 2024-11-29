"use client";

import {
  AccountType,
  Notification,
  NotificationTopic,
  NotificationType,
} from "@prisma/client";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Crown,
  Info,
  School,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
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
  onMarkAsRead,
}: {
  notification: Notification & {
    senderName: string;
    senderType: AccountType;
    clientStatus?: string;
  };
  onMarkAsRead: (id: string) => void;
}) {
  const typeProps = getNotificationTypeProps(notification.type);
  const Icon = typeProps.icon;
  const isUnread =
    (notification.clientStatus || notification.status) === "UNREAD";

  return (
    <div className="relative border-b p-4 last:border-b-0 hover:bg-gray-50">
      {isUnread && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 rounded-full p-0 hover:bg-gray-200"
          onClick={() => onMarkAsRead(notification.id)}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Megjelölés olvasottként</span>
        </Button>
      )}

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Badge
            variant="default"
            className={`rounded-full p-[2px] ${typeProps.color}`}
          >
            <Icon className="size-4" />
          </Badge>
        </div>
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <h3 className="max-w-[calc(100%-50px)] break-words pr-2 font-semibold">
              {notification.subject}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
          {/* {notification.redirectTo && (
            <Button
              variant="link"
              className="mt-4 flex justify-start gap-1 p-0 text-sm"
              asChild
            >
              <Link href={notification.redirectTo}>
                További részletek <ArrowRight className="size-4" />
              </Link>
            </Button>
          )} */}

          <div className="mt-4 flex flex-wrap items-center gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
