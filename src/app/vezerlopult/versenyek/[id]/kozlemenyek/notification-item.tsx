"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Info,
} from "lucide-react";
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

export function NotificationItem({
  notification,
}: {
  notification: Notification & {
    senderName: string;
    senderType: AccountType;
    clientStatus?: string;
    type: string;
  };
}) {
  const typeProps = getNotificationTypeProps(notification.type);
  const Icon = typeProps.icon;

  return (
    <div className="relative border-b p-4 last:border-b-0 hover:bg-gray-50">
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
          </div>
        </div>
      </div>
    </div>
  );
}
