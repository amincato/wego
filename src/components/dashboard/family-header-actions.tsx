import Link from "next/link";
import { CalendarDays, X } from "lucide-react";

/**
 * Pills shown on a family-application profile page. The primary action sends
 * the coordinator to the big /calendar in "schedule" mode for this
 * application — they see existing events, pick a day, then a small dialog
 * collects the time and proposal message.
 */
export function FamilyApplicationActions({
  applicationId,
}: {
  applicationId: string;
}) {
  return (
    <>
      <Link
        href={`/calendar?schedule=${applicationId}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-xs font-bold text-white hover:bg-fg/90"
      >
        <CalendarDays className="size-3.5" strokeWidth={2.4} />
        Schedule site visit
      </Link>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg/80"
      >
        <X className="size-3.5" strokeWidth={2.6} />
        Reject application
      </button>
    </>
  );
}
