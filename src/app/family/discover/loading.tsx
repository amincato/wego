import { StatusBar } from "@/components/shared/status-bar";
import { StudentCardSkeleton } from "@/components/shared/skeleton";

export default function Loading() {
  return (
    <>
      <StatusBar />
      <div className="px-4">
        <div className="h-8 w-40 animate-pulse rounded bg-chip" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <StudentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
