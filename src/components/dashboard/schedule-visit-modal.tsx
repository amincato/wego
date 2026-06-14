"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS_LONG = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** 09:00 → 17:00 every 30 minutes. */
const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

function fmtLongDate(d: Date) {
  return `${WEEKDAYS_LONG[(d.getDay() + 6) % 7]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

function defaultMessage(familyName: string, date: Date, time: string) {
  return `Hi ${familyName} team,\n\nWe'd love to schedule the site visit for ${fmtLongDate(date)} at ${time}. Please let us know if this slot works, or feel free to suggest an alternative.\n\nBest,\nHans Schmidt`;
}

/**
 * Time + message picker used once the coordinator has chosen a day on the
 * big /calendar page. The day is fixed (passed via `date`); the modal just
 * collects the time slot and the proposal message and bubbles up `onSend`.
 */
export function ScheduleVisitModal({
  open,
  onOpenChange,
  familyName,
  date,
  onSend,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  familyName: string;
  date: Date | null;
  onSend: () => void;
}) {
  const [selectedTime, setSelectedTime] = useState<string>("11:00");
  const [message, setMessage] = useState<string>("");
  const [messageEdited, setMessageEdited] = useState(false);

  useEffect(() => {
    if (open && date) {
      setSelectedTime("11:00");
      setMessage(defaultMessage(familyName, date, "11:00"));
      setMessageEdited(false);
    }
  }, [open, date, familyName]);

  useEffect(() => {
    if (!messageEdited && date) {
      setMessage(defaultMessage(familyName, date, selectedTime));
    }
  }, [date, selectedTime, familyName, messageEdited]);

  const canSend = !!date && message.trim().length > 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          style={{ backgroundColor: "#ffffff", color: "#0a0a0a" }}
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[calc(100%-48px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] shadow-2xl ring-1 ring-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-black/10 px-7 py-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-black">
                Propose a time
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-neutral-600">
                Site visit for{" "}
                <span className="font-semibold text-black">{familyName}</span>
                {date ? (
                  <>
                    {" "}
                    on{" "}
                    <span className="font-semibold text-black">
                      {fmtLongDate(date)}
                    </span>
                  </>
                ) : null}
                .
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-5">
            {/* Time slots — 3-column grid */}
            <section>
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Time
                </div>
                <span className="text-xs font-semibold text-black">
                  {selectedTime}
                </span>
              </div>
              <div className="rounded-[14px] bg-neutral-50 p-2 ring-1 ring-black/10">
                <ul className="grid grid-cols-3 gap-1.5">
                  {TIME_SLOTS.map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={cn(
                          "w-full rounded-full px-2 py-1.5 text-sm font-semibold transition-colors",
                          selectedTime === t
                            ? "bg-student text-white"
                            : "bg-white text-black hover:bg-student/10",
                        )}
                      >
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Message */}
            <section className="mt-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Message
              </div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setMessageEdited(true);
                }}
                rows={6}
                placeholder="Write your proposal message…"
                className="w-full resize-none rounded-[14px] bg-neutral-50 p-3 text-sm leading-relaxed text-black placeholder:text-neutral-400 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-student"
              />
            </section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-black/10 bg-neutral-50 px-7 py-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full px-4 py-2 text-sm font-bold text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (canSend) onSend();
              }}
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-black/40"
            >
              <Send className="size-4" strokeWidth={2.4} />
              Send proposal
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
