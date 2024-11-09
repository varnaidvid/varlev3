import { Skeleton } from "@/components/ui/skeleton";

const NotificationItemSkeleton = () => {
  return (
    <div className="relative mt-4 border-b p-4 last:border-b-0">
      <div className="flex items-start gap-3">
        {/* Icon skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="size-6 rounded-full" />
        </div>

        <div className="flex-1">
          {/* Subject skeleton */}
          <div className="flex items-start gap-2">
            <Skeleton className="h-6 w-3/4" />
          </div>

          {/* Message skeleton */}
          <div className="mt-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-2/3" />
          </div>

          {/* Link skeleton - only shown sometimes, so we'll show it 50% of the time */}
          <div className="mt-4">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Badges skeleton */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Date badge */}
            <Skeleton className="h-5 w-32" />

            {/* Topic badge */}
            <Skeleton className="h-5 w-24" />

            {/* Sender badge */}
            <Skeleton className="h-5 w-28" />

            {/* New badge - shown sometimes */}
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItemSkeleton;
