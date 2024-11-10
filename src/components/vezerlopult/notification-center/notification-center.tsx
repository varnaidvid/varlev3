"use client";

import { useState, useRef } from "react";
import { Bell, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { NotificationItem } from "./notification-item";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationItemSkeleton from "./notification-skeleton";

export default function NotificationCenter({ ...props }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const lastFetchedPageRef = useRef<string | null>(null);
  const [markedNotifications, setMarkedNotifications] = useState<Set<string>>(
    new Set(),
  );

  const { data: unreadCount = 0, refetch: refetchUnreadCount } =
    api.notification.getUnreadCount.useQuery();

  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch: refetchNotifications,
  } = api.notification.getNotifications.useInfiniteQuery(
    { limit: 3 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: isOpen,
    },
  );

  const markAsReadMutation = api.notification.markAsRead.useMutation();

  const notifications =
    notificationsData?.pages.flatMap((page) => page.items) ?? [];

  const processedNotifications = notifications.map((notification) => ({
    ...notification,
    clientStatus: markedNotifications.has(notification.id)
      ? "READ"
      : notification.status,
  }));

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const scrollBuffer = 50;
    const isNearBottom =
      scrollHeight - scrollTop - clientHeight <= scrollBuffer;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      const currentLastPage =
        notificationsData?.pages[notificationsData.pages.length - 1];
      const currentCursor = currentLastPage?.nextCursor;

      if (currentCursor && lastFetchedPageRef.current !== currentCursor) {
        lastFetchedPageRef.current = currentCursor;
      }

      await fetchNextPage();
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsReadMutation.mutateAsync({ notificationId });
    setMarkedNotifications((prev) => {
      const newSet = new Set(prev);
      newSet.add(notificationId);
      return newSet;
    });
    refetchUnreadCount();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpen} {...props}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative w-max rounded-full px-4 py-2 text-muted-foreground hover:text-black"
          aria-label="Értesítések"
        >
          <Bell className="size-4" />
          <span className="hidden md:block">Értesítések</span>
          {unreadCount > 0 && (
            <span className="absolute left-1 top-1 flex size-4 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-extrabold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96" align="center" side="top">
        <div className="flex items-center justify-between border-b px-3 py-1">
          <h2 className="flex items-center gap-2 font-semibold">
            <div className="size-2 animate-pulse rounded-full bg-red-400" />
            Értesítési központ
          </h2>
          <Button
            variant="ghost"
            className="-mr-2"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <div className="sr-only">Értesítési központ bezására</div>
          </Button>
        </div>
        {/* {unreadCount > 0 && (
          <div className="border-b p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-sm"
              onClick={handleMarkAllAsRead}
            >
              <Check className="mr-2 h-4 w-4" />
              Összeset elolvastam
            </Button>
          </div>
        )} */}
        <ScrollArea className="h-[300px]" onScrollCapture={handleScroll}>
          <div className="flex h-full w-full flex-col">
            {isLoading && (
              <div className="flex flex-col gap-2">
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
              </div>
            )}

            {processedNotifications.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                Szólunk, amint érkezik valami értesítésed.
              </div>
            ) : (
              <>
                {processedNotifications.map((notification: any) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))}
                {isFetchingNextPage && (
                  <div className="flex animate-pulse items-center justify-center px-2 py-4">
                    <Loader2 className="mr-2 size-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      További értesítések betöltése...
                    </span>
                  </div>
                )}
                {!hasNextPage && processedNotifications.length > 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Nincs további értesítésed.
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-2 text-center text-xs tracking-tighter text-muted-foreground">
          Az értesítéseket megadott email címekre is kiküldjük.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
