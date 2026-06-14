"use client";

import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { ScheduleVisitModal } from "./schedule-visit-modal";

export function FamilyApplicationActions({
  familyName,
}: {
  familyName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-xs font-bold text-white hover:bg-fg/90"
      >
        <CalendarDays className="size-3.5" strokeWidth={2.4} />
        Schedule site visit
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg/80"
      >
        <X className="size-3.5" strokeWidth={2.6} />
        Reject application
      </button>

      <ScheduleVisitModal
        open={open}
        onOpenChange={setOpen}
        familyName={familyName}
      />
    </>
  );
}
