"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { communityEntries } from "@/lib/mock/dashboard-community";
import { cn } from "@/lib/utils";

type View = "day" | "week" | "month" | "year";

const VIEWS: { id: View; label: string }[] = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

/* Calendar events sourced from the community mock so the demo stays
 * consistent across pages. */
interface CalEvent {
  id: string;
  title: string;
  date: Date;
  tone: "student" | "family" | "school" | "neutral";
}

const TONE_PILL: Record<CalEvent["tone"], string> = {
  student: "bg-student/15 text-student",
  family: "bg-family/15 text-family",
  school: "bg-school/15 text-school",
  neutral: "bg-chip text-fg-muted",
};

function buildEvents(): CalEvent[] {
  const list: CalEvent[] = communityEntries
    .filter((e) => e.kind === "event" && e.eventDate)
    .map((e) => ({
      id: e.id,
      title: e.title,
      date: new Date(e.eventDate!),
      tone: e.title.toLowerCase().includes("host family")
        ? "family"
        : "student",
    }));

  // A couple of coordinator-only entries so the current month isn't empty
  list.push(
    {
      id: "cal_meeting",
      title: "Coordinators meeting",
      date: new Date("2026-06-09T10:00:00.000Z"),
      tone: "school",
    },
    {
      id: "cal_site_visit",
      title: "Site visit · Family Rath",
      date: new Date("2026-06-18T11:00:00.000Z"),
      tone: "family",
    },
    {
      id: "cal_carlo_call",
      title: "Call with Carlo Liberti",
      date: new Date("2026-06-23T15:00:00.000Z"),
      tone: "student",
    },
  );

  return list;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns the 42 cells (6 rows × 7 days) that fit a month grid starting on Monday. */
function buildMonthGrid(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  // JS Sunday=0 … we want Monday=0
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

export default function CalendarPage() {
  const [view, setView] = useState<View>("month");
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const events = useMemo(buildEvents, []);
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalEvent[]>();
    for (const e of events) {
      const key = e.date.toDateString();
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => buildMonthGrid(cursor), [cursor]);

  const goPrev = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  const goToday = () =>
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <>
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="h-display">
          <span className="text-fg">{MONTH_NAMES[cursor.getMonth()]}</span>{" "}
          <span className="text-fg-muted">{cursor.getFullYear()}</span>
        </h1>

        <div className="mx-auto inline-flex items-center rounded-full bg-chip p-1">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                view === v.id
                  ? "bg-surface text-fg shadow-sm"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-full bg-surface ring-1 ring-divider">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous month"
              className="grid size-9 place-items-center rounded-full hover:bg-chip"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goToday}
              className="px-3 py-1.5 text-sm font-semibold text-fg hover:bg-chip"
            >
              Today
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next month"
              className="grid size-9 place-items-center rounded-full hover:bg-chip"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-white hover:bg-fg/90"
          >
            <Plus className="size-4" strokeWidth={2.4} />
            Add event
          </button>
        </div>
      </div>

      {view === "month" ? (
        <MonthGrid
          cells={cells}
          cursorMonth={cursor.getMonth()}
          today={today}
          eventsByDay={eventsByDay}
        />
      ) : (
        <div className="rounded-card-lg bg-surface p-10 text-center text-sm text-fg-muted ring-1 ring-divider">
          {view === "day"
            ? "Day view — coming soon."
            : view === "week"
              ? "Week view — coming soon."
              : "Year view — coming soon."}
        </div>
      )}
    </>
  );
}

function MonthGrid({
  cells,
  cursorMonth,
  today,
  eventsByDay,
}: {
  cells: Date[];
  cursorMonth: number;
  today: Date;
  eventsByDay: Map<string, CalEvent[]>;
}) {
  return (
    <div className="overflow-hidden rounded-card-lg bg-surface ring-1 ring-divider">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-divider">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-fg-subtle"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          const isCurMonth = d.getMonth() === cursorMonth;
          const isToday = sameDay(d, today);
          const events = eventsByDay.get(d.toDateString()) ?? [];
          const rightBorder = (i + 1) % 7 !== 0;
          const bottomBorder = i < 35;
          return (
            <div
              key={i}
              className={cn(
                "min-h-[110px] p-2 transition-colors",
                rightBorder ? "border-r border-divider" : "",
                bottomBorder ? "border-b border-divider" : "",
                !isCurMonth ? "bg-bg/40 text-fg-subtle" : "text-fg",
              )}
            >
              <div className="mb-1 flex justify-end">
                {isToday ? (
                  <span className="grid size-7 place-items-center rounded-full bg-danger-fg text-xs font-bold text-white">
                    {d.getDate()}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      isCurMonth ? "text-fg" : "text-fg-subtle",
                    )}
                  >
                    {d.getDate()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {events.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    title={e.title}
                    className={cn(
                      "truncate rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      TONE_PILL[e.tone],
                    )}
                  >
                    {e.title}
                  </span>
                ))}
                {events.length > 3 ? (
                  <span className="px-2 text-[10px] text-fg-subtle">
                    +{events.length - 3} more
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
