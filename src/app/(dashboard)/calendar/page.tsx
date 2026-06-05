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

const TONE_DOT: Record<CalEvent["tone"], string> = {
  student: "bg-student",
  family: "bg-family",
  school: "bg-school",
  neutral: "bg-fg-muted",
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

function startOfWeek(d: Date) {
  const day = (d.getDay() + 6) % 7;
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
  return s;
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

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function CalendarPage() {
  const [view, setView] = useState<View>("month");
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<Date>(today);

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

  const headerLabel = useMemo(() => {
    if (view === "year") return `${cursor.getFullYear()}`;
    if (view === "day") {
      const wd = WEEKDAYS_LONG[(cursor.getDay() + 6) % 7];
      return `${wd}, ${cursor.getDate()} ${MONTH_NAMES[cursor.getMonth()]}`;
    }
    if (view === "week") {
      const s = startOfWeek(cursor);
      const e = new Date(s);
      e.setDate(s.getDate() + 6);
      const sameMonth = s.getMonth() === e.getMonth();
      const left = `${s.getDate()} ${sameMonth ? "" : MONTH_NAMES[s.getMonth()] + " "}`;
      const right = `${e.getDate()} ${MONTH_NAMES[e.getMonth()]}`;
      return `${left}– ${right}`;
    }
    return MONTH_NAMES[cursor.getMonth()];
  }, [cursor, view]);

  const subLabel = useMemo(() => {
    if (view === "year") return "";
    return `${cursor.getFullYear()}`;
  }, [cursor, view]);

  const step = (dir: 1 | -1) => {
    setCursor((c) => {
      if (view === "day") {
        const d = new Date(c);
        d.setDate(c.getDate() + dir);
        return d;
      }
      if (view === "week") {
        const d = new Date(c);
        d.setDate(c.getDate() + 7 * dir);
        return d;
      }
      if (view === "year") return new Date(c.getFullYear() + dir, 0, 1);
      return new Date(c.getFullYear(), c.getMonth() + dir, 1);
    });
  };
  const goToday = () => setCursor(new Date(today));

  return (
    <div className="flex h-[calc(100dvh-7rem)] flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <h1 className="h-display">
          <span className="text-fg">{headerLabel}</span>{" "}
          {subLabel ? (
            <span className="text-fg-muted">{subLabel}</span>
          ) : null}
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
              onClick={() => step(-1)}
              aria-label="Previous"
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
              onClick={() => step(1)}
              aria-label="Next"
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

      <div className="min-h-0 flex-1">
        {view === "month" ? (
          <MonthGrid
            cursor={cursor}
            today={today}
            eventsByDay={eventsByDay}
          />
        ) : view === "week" ? (
          <WeekView
            cursor={cursor}
            today={today}
            eventsByDay={eventsByDay}
          />
        ) : view === "day" ? (
          <DayView cursor={cursor} eventsByDay={eventsByDay} />
        ) : (
          <YearView
            cursor={cursor}
            today={today}
            eventsByDay={eventsByDay}
            onPick={(d) => {
              setCursor(d);
              setView("month");
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Month ----------------------------- */

function MonthGrid({
  cursor,
  today,
  eventsByDay,
}: {
  cursor: Date;
  today: Date;
  eventsByDay: Map<string, CalEvent[]>;
}) {
  const cells = useMemo(() => buildMonthGrid(cursor), [cursor]);
  const cursorMonth = cursor.getMonth();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card-lg bg-surface ring-1 ring-divider">
      <div className="grid grid-cols-7 border-b border-divider">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="px-3 py-3 text-center text-sm font-bold text-fg"
          >
            {wd}
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {cells.map((d, i) => {
          const isCurMonth = d.getMonth() === cursorMonth;
          const isToday = sameDay(d, today);
          const evts = eventsByDay.get(d.toDateString()) ?? [];
          const rightBorder = (i + 1) % 7 !== 0;
          const bottomBorder = i < 35;
          return (
            <div
              key={i}
              className={cn(
                "min-h-0 overflow-hidden p-2 transition-colors",
                rightBorder ? "border-r border-divider" : "",
                bottomBorder ? "border-b border-divider" : "",
                !isCurMonth ? "bg-bg/40" : "",
              )}
            >
              <div className="mb-1 flex justify-end">
                {isToday ? (
                  <span className="grid size-8 place-items-center rounded-full bg-danger-fg text-sm font-bold text-white">
                    {d.getDate()}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-base font-bold",
                      isCurMonth ? "text-fg" : "text-fg-subtle/70",
                    )}
                  >
                    {d.getDate()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {evts.slice(0, 3).map((e) => (
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
                {evts.length > 3 ? (
                  <span className="px-2 text-[10px] text-fg-subtle">
                    +{evts.length - 3} more
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

/* ------------------------------ Week ----------------------------- */

function WeekView({
  cursor,
  today,
  eventsByDay,
}: {
  cursor: Date;
  today: Date;
  eventsByDay: Map<string, CalEvent[]>;
}) {
  const start = useMemo(() => startOfWeek(cursor), [cursor]);
  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
      }),
    [start],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card-lg bg-surface ring-1 ring-divider">
      <div className="grid grid-cols-7 border-b border-divider">
        {days.map((d, i) => {
          const isToday = sameDay(d, today);
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-1 py-4",
                i < 6 ? "border-r border-divider" : "",
              )}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                {WEEKDAYS[i]}
              </span>
              {isToday ? (
                <span className="grid size-10 place-items-center rounded-full bg-danger-fg text-base font-bold text-white">
                  {d.getDate()}
                </span>
              ) : (
                <span className="text-xl font-bold text-fg">{d.getDate()}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid flex-1 grid-cols-7 overflow-y-auto">
        {days.map((d, i) => {
          const evts = eventsByDay.get(d.toDateString()) ?? [];
          return (
            <div
              key={i}
              className={cn(
                "min-h-0 space-y-2 p-3",
                i < 6 ? "border-r border-divider" : "",
              )}
            >
              {evts.length === 0 ? (
                <div className="text-xs text-fg-subtle/70">—</div>
              ) : (
                evts.map((e) => (
                  <div
                    key={e.id}
                    className={cn(
                      "rounded-input px-2 py-1.5 text-xs font-semibold",
                      TONE_PILL[e.tone],
                    )}
                  >
                    <div className="truncate">{e.title}</div>
                    <div className="mt-0.5 text-[10px] opacity-75">
                      {fmtTime(e.date)}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Day ------------------------------ */

function DayView({
  cursor,
  eventsByDay,
}: {
  cursor: Date;
  eventsByDay: Map<string, CalEvent[]>;
}) {
  const evts = eventsByDay.get(cursor.toDateString()) ?? [];

  return (
    <div className="h-full overflow-y-auto rounded-card-lg bg-surface p-8 ring-1 ring-divider">
      {evts.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <span className="text-base font-semibold text-fg">
            Nothing scheduled
          </span>
          <span className="text-sm text-fg-muted">
            No events on{" "}
            {cursor.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            .
          </span>
        </div>
      ) : (
        <ul className="mx-auto flex max-w-2xl flex-col gap-3">
          {evts.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-4 rounded-input bg-bg px-4 py-4 ring-1 ring-divider"
            >
              <span
                className={cn("size-3 rounded-full", TONE_DOT[e.tone])}
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-fg">{e.title}</div>
                <div className="text-xs text-fg-muted">{fmtTime(e.date)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------ Year ----------------------------- */

function YearView({
  cursor,
  today,
  eventsByDay,
  onPick,
}: {
  cursor: Date;
  today: Date;
  eventsByDay: Map<string, CalEvent[]>;
  onPick: (d: Date) => void;
}) {
  const months = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {months.map((m) => {
          const first = new Date(cursor.getFullYear(), m, 1);
          const cells = buildMonthGrid(first);
          return (
            <button
              key={m}
              type="button"
              onClick={() =>
                onPick(new Date(cursor.getFullYear(), m, 1))
              }
              className="flex flex-col gap-2 rounded-card-lg bg-surface p-4 text-left ring-1 ring-divider hover:bg-chip/30"
            >
              <h3 className="text-sm font-bold text-fg">{MONTH_NAMES[m]}</h3>
              <div className="grid grid-cols-7 text-center">
                {WEEKDAYS.map((wd) => (
                  <span
                    key={wd}
                    className="text-[10px] font-semibold uppercase text-fg-subtle"
                  >
                    {wd[0]}
                  </span>
                ))}
                {cells.map((d, i) => {
                  const isCurMonth = d.getMonth() === m;
                  const isToday = sameDay(d, today);
                  const hasEvent =
                    (eventsByDay.get(d.toDateString())?.length ?? 0) > 0;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "relative mx-auto my-0.5 grid size-6 place-items-center rounded-full text-[11px]",
                        isToday
                          ? "bg-danger-fg font-bold text-white"
                          : isCurMonth
                            ? "text-fg"
                            : "text-fg-subtle/60",
                      )}
                    >
                      {d.getDate()}
                      {hasEvent && !isToday && isCurMonth ? (
                        <span className="absolute -bottom-0.5 size-1 rounded-full bg-student" />
                      ) : null}
                    </span>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
