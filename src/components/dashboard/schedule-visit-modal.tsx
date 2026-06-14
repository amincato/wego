"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

/** 8:30 → 17:30 every 30 minutes. */
const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const leadingBlanks = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - leadingBlanks);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function fmtLongDate(d: Date) {
  return `${WEEKDAYS_LONG[(d.getDay() + 6) % 7]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

function defaultMessage(familyName: string, date: Date, time: string) {
  return `Hi ${familyName} team,\n\nWe'd love to schedule the site visit for ${fmtLongDate(date)} at ${time}. Please let us know if this slot works, or feel free to suggest an alternative.\n\nBest,\nHans Schmidt`;
}

export function ScheduleVisitModal({
  open,
  onOpenChange,
  familyName,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  familyName: string;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const initialDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 7);
    return d;
  }, [today]);

  const [cursor, setCursor] = useState<Date>(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>("11:00");
  const [message, setMessage] = useState<string>("");
  const [messageEdited, setMessageEdited] = useState(false);

  useEffect(() => {
    if (open) {
      setCursor(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
      setSelectedDate(initialDate);
      setSelectedTime("11:00");
      setMessage(defaultMessage(familyName, initialDate, "11:00"));
      setMessageEdited(false);
    }
  }, [open, initialDate, familyName]);

  // Keep the message in sync with date/time as long as the user hasn't
  // started writing their own.
  useEffect(() => {
    if (!messageEdited) {
      setMessage(defaultMessage(familyName, selectedDate, selectedTime));
    }
  }, [selectedDate, selectedTime, familyName, messageEdited]);

  const cells = useMemo(() => buildMonthGrid(cursor), [cursor]);
  const goPrev = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));

  const canSend = selectedDate >= today && message.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          style={{ backgroundColor: "#ffffff", color: "#0a0a0a" }}
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[calc(100%-48px)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] shadow-2xl ring-1 ring-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-black/10 px-7 py-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-black">
                Schedule site visit
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-neutral-600">
                Propose a date and time for visiting{" "}
                <span className="font-semibold text-black">{familyName}</span>.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Body — no internal scroll, everything fits */}
          <div className="flex-1 px-7 py-5">
            <div className="grid gap-5 md:grid-cols-[1fr_220px]">
              {/* Calendar */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Date
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous month"
                      className="grid size-7 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="min-w-[120px] text-center text-sm font-bold text-black">
                      {MONTH_NAMES[cursor.getMonth()]}{" "}
                      {cursor.getFullYear()}
                    </span>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next month"
                      className="grid size-7 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[14px] ring-1 ring-black/10">
                  {/* Weekday header */}
                  <div className="grid grid-cols-7 border-b border-black/10 bg-neutral-50">
                    {WEEKDAYS.map((wd) => (
                      <div
                        key={wd}
                        className="px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-neutral-500"
                      >
                        {wd}
                      </div>
                    ))}
                  </div>
                  {/* Days */}
                  <div className="grid grid-cols-7">
                    {cells.map((d, i) => {
                      const isCurMonth = d.getMonth() === cursor.getMonth();
                      const isToday = sameDay(d, today);
                      const isSelected = sameDay(d, selectedDate);
                      const isPast = d < today;
                      const rightBorder = (i + 1) % 7 !== 0;
                      const bottomBorder = i < 35;
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={isPast}
                          onClick={() => setSelectedDate(new Date(d))}
                          className={cn(
                            "relative grid h-9 place-items-center transition-colors",
                            rightBorder && "border-r border-black/5",
                            bottomBorder && "border-b border-black/5",
                            isPast
                              ? "cursor-not-allowed text-neutral-300"
                              : isSelected
                                ? "bg-student text-white"
                                : isCurMonth
                                  ? "text-black hover:bg-student/10"
                                  : "text-neutral-300 hover:bg-neutral-50",
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm",
                              isSelected
                                ? "font-bold"
                                : isToday
                                  ? "font-bold"
                                  : "font-semibold",
                            )}
                          >
                            {d.getDate()}
                          </span>
                          {isToday && !isSelected ? (
                            <span className="absolute bottom-1 size-1 rounded-full bg-student" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Time slots — 2-col grid, every slot visible */}
              <section className="flex min-h-0 flex-col">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Time
                </div>
                <div className="rounded-[14px] bg-neutral-50 p-2 ring-1 ring-black/10">
                  <ul className="grid grid-cols-2 gap-1">
                    {TIME_SLOTS.map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={cn(
                            "w-full rounded-full px-2 py-1.5 text-xs font-semibold transition-colors",
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
            </div>

            {/* Message */}
            <section className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Message
                </div>
                <span className="text-xs text-neutral-500">
                  Proposing{" "}
                  <span className="font-bold text-black">
                    {fmtLongDate(selectedDate)} at {selectedTime}
                  </span>
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setMessageEdited(true);
                }}
                rows={5}
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
              onClick={handleSend}
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
