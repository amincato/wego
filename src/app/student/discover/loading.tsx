import { StatusBar } from "@/components/shared/status-bar";
import { SchoolCardSkeleton } from "@/components/shared/skeleton";

export default function Loading() {
  return (
    <>
      <StatusBar />
      <div className="px-4">
        <div className="h-8 w-40 animate-pulse rounded bg-chip" />
        <div className="mt-5 flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <SchoolCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
