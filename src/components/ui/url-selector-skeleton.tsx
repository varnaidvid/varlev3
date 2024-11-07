import { Command, CommandGroup, CommandList } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from './separator'

export default function UrlSelectorSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-[240px] rounded-md my-2" />

      <Command className="rounded-lg border h-min">
        <Skeleton className="h-9 w-[calc(100% - 10px)] rounded-md m-2" />
        <Separator />
        <CommandList className="w-[calc(100% - 10px)] m-2">
          <CommandGroup>
            <ScrollArea className="h-full">
              {[...Array(5)].map((_, index) => (
                <div
                  className="flex mb-2 items-center space-x-2 justify-center"
                  key={index}
                >
                  <Skeleton className="size-6 rounded" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  )
}
