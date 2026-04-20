import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-chip", className)}
    />
  );
}

export function SchoolCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-surface ring-1 ring-divider">
      <Skeleton className="h-[160px] w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function StudentCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-surface ring-1 ring-divider">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
