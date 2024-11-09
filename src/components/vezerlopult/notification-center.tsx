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

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const lastFetchedPageRef = useRef<string | null>(null);
  // Track which notifications have been marked as read during this session
  const [sessionReadIds, setSessionReadIds] = useState(new Set<string>());

  const { data: unreadCount = 0, refetch: refetchUnreadCount } =
    api.notification.getUnreadCount.useQuery();

  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
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
  const markAllAsReadMutation = api.notification.markAllAsRead.useMutation();

  const notifications =
    notificationsData?.pages.flatMap((page) => page.items) ?? [];

  // Process notifications to maintain client-side unread state
  const processedNotifications = notifications.map((notification) => ({
    ...notification,
    clientStatus: sessionReadIds.has(notification.id)
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

        const unreadNotifications = notifications.filter(
          (n) => n.status === "UNREAD" && !sessionReadIds.has(n.id),
        );

        if (unreadNotifications.length > 0) {
          await markAsReadMutation.mutateAsync();
          setSessionReadIds((prev) => {
            const newSet = new Set(prev);
            unreadNotifications.forEach((n) => newSet.add(n.id));
            return newSet;
          });
          refetchUnreadCount();
        }
      }

      await fetchNextPage();
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsReadMutation.mutateAsync();
    // Update session read IDs with all current notification IDs
    setSessionReadIds((prev) => {
      const newSet = new Set(prev);
      notifications.forEach((n) => newSet.add(n.id));
      return newSet;
    });
    refetchUnreadCount();
    refetchNotifications();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative w-fit px-4">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          Értesítések
          {unreadCount > 0 && (
            <span className="absolute -left-2 -top-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-extrabold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96" align="end">
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
          <div className="flex flex-col">
            {processedNotifications.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                Nem jött még értesítés számodra
              </div>
            ) : (
              <>
                {processedNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
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
