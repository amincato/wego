"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import {
  emergencyNotifications,
  todaysTasks,
  upcomingReminders,
} from "@/lib/mock/dashboard-home";

/* ---------- types ---------- */
type ViewMode = "day" | "week" | "month" | "year";
type EventKind = "task" | "reminder" | "alert";

interface CalEvent {
  id: string;
  title: string;
  date: Date;
  kind: EventKind;
  meta?: string;
}

/* ---------- helpers ---------- */
const KIND_COLORS: Record<EventKind, string> = {
  task: "bg-chip text-fg-muted",
  reminder: "bg-chip text-fg-muted",
  alert: "bg-danger-fg/15 text-danger-fg",
};

const KIND_DOT: Record<EventKind, string> = {
  task: "bg-fg-muted",
  reminder: "bg-fg-muted",
  alert: "bg-danger-fg",
};

const KIND_LABEL: Record<EventKind, string> = {
  task: "Task",
  reminder: "Reminder",
  alert: "Site visit",
};

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

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function startOfMonthGrid(year: number, month: number) {
  // Find Monday of the week that contains the 1st of the month.
  const first = new Date(year, month, 1);
  const dow = (first.getDay() + 6) % 7; // 0 = Mon
  const start = new Date(first);
  start.setDate(first.getDate() - dow);
  return start;
}

function startOfWeek(d: Date) {
  const start = new Date(d);
  const dow = (start.getDay() + 6) % 7; // 0 = Mon
  start.setDate(start.getDate() - dow);
  start.setHours(0, 0, 0, 0);
  return start;
}

/* ---------- page ---------- */
export default function CalendarPage() {
  const [mode, setMode] = useState<ViewMode>("month");
  const [cursor, setCursor] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const events = useMemo<CalEvent[]>(() => {
    const isSiteVisit = (title: string) => /site visit/i.test(title);
    const taskEvents: CalEvent[] = todaysTasks.map((t) => ({
      id: t.id,
      title: t.title,
      date: new Date(t.dueAt),
      kind: isSiteVisit(t.title) ? "alert" : "task",
      meta: t.description,
    }));
    const reminderEvents: CalEvent[] = upcomingReminders.map((r) => ({
      id: r.id,
      title: r.title,
      date: new Date(r.dueDate),
      kind: "task",
      meta: r.category,
    }));
    return [...taskEvents, ...reminderEvents].sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
  }, []);

  const goPrev = () => {
    const d = new Date(cursor);
    if (mode === "year") d.setFullYear(d.getFullYear() - 1);
    else if (mode === "week") d.setDate(d.getDate() - 7);
    else if (mode === "day") d.setDate(d.getDate() - 1);
    else d.setMonth(d.getMonth() - 1);
    setCursor(d);
  };
  const goNext = () => {
    const d = new Date(cursor);
    if (mode === "year") d.setFullYear(d.getFullYear() + 1);
    else if (mode === "week") d.setDate(d.getDate() + 7);
    else if (mode === "day") d.setDate(d.getDate() + 1);
    else d.setMonth(d.getMonth() + 1);
    setCursor(d);
  };
  const goToday = () => setCursor(today);

  const headerLabel = useMemo(() => {
    if (mode === "year") return `${cursor.getFullYear()}`;
    if (mode === "week") {
      const start = startOfWeek(cursor);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
    }
    if (mode === "day") {
      return cursor.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`;
  }, [mode, cursor]);

  return (
    <>
      <Link
        href="/dashboard"
        aria-label="Back to home"
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>
      <PageHeader
        title="Calendar"
        subtitle="All your tasks, reminders and alerts in one place."
      />

      <div className="rounded-card-lg bg-surface ring-1 ring-divider">
        {/* TOOLBAR */}
        <div className="grid grid-cols-1 items-center gap-3 border-b border-divider px-5 py-3 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="grid size-8 place-items-center rounded-full text-fg-muted hover:bg-chip"
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={goToday}
              className="rounded-full bg-chip px-3 py-1 text-xs font-bold text-fg hover:bg-chip/70"
            >
              Today
            </button>
            <button
              onClick={goNext}
              className="grid size-8 place-items-center rounded-full text-fg-muted hover:bg-chip"
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </button>
            <h2 className="ml-2 h-section text-fg">{headerLabel}</h2>
          </div>

          <div className="flex justify-center">
            <ViewSwitcher mode={mode} onChange={setMode} />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-danger-fg" />
              Imminent activities
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-fg-muted" />
              Other activities
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="p-5">
          {mode === "month" ? (
            <MonthView cursor={cursor} today={today} events={events} />
          ) : mode === "week" ? (
            <WeekView cursor={cursor} today={today} events={events} />
          ) : mode === "day" ? (
            <DayView cursor={cursor} today={today} events={events} />
          ) : (
            <YearView
              cursor={cursor}
              today={today}
              events={events}
              onPickMonth={(d) => {
                setCursor(d);
                setMode("month");
              }}
            />
          )}
        </div>
      </div>

    </>
  );
}

/* ---------- view switcher ---------- */
function ViewSwitcher({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  const items: { id: ViewMode; label: string }[] = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];
  return (
    <div className="inline-flex items-center rounded-full bg-chip p-1.5">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onChange(it.id)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-bold transition-colors",
            mode === it.id
              ? "bg-surface text-fg shadow-sm"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- month view ---------- */
function MonthView({
  cursor,
  today,
  events,
}: {
  cursor: Date;
  today: Date;
  events: CalEvent[];
}) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const start = startOfMonthGrid(year, month);

  // 6 rows × 7 cols
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }

  return (
    <div className="overflow-hidden rounded-input ring-1 ring-divider">
      <div className="grid grid-cols-7 border-b border-divider bg-chip/40">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="px-2 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-fg-subtle"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const inMonth = d.getMonth() === month;
          const isToday = isSameDay(d, today);
          const dayEvents = events.filter((e) => isSameDay(e.date, d));
          const visibleEvents = dayEvents.slice(0, 3);
          const more = dayEvents.length - visibleEvents.length;

          return (
            <div
              key={i}
              className={cn(
                "min-h-28 border-b border-r border-divider p-2 last-of-type:border-r-0",
                i % 7 === 6 && "border-r-0",
                i >= 35 && "border-b-0",
                !inMonth && "bg-chip/30 text-fg-subtle",
              )}
            >
              <div className="mb-1 flex justify-end">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-xs font-bold",
                    isToday
                      ? "bg-student text-white"
                      : inMonth
                        ? "text-fg"
                        : "text-fg-subtle",
                  )}
                >
                  {d.getDate()}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {visibleEvents.map((e) => (
                  <li
                    key={e.id}
                    className={cn(
                      "truncate rounded px-1.5 py-0.5 text-[11px] font-semibold",
                      KIND_COLORS[e.kind],
                    )}
                    title={e.title}
                  >
                    {e.title}
                  </li>
                ))}
                {more > 0 ? (
                  <li className="text-[11px] font-semibold text-fg-subtle">
                    +{more} more
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- week view ---------- */
function WeekView({
  cursor,
  today,
  events,
}: {
  cursor: Date;
  today: Date;
  events: CalEvent[];
}) {
  const start = startOfWeek(cursor);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => {
        const isToday = isSameDay(d, today);
        const dayEvents = events.filter((e) => isSameDay(e.date, d));
        return (
          <div
            key={d.toISOString()}
            className="rounded-input bg-chip/40 p-3 ring-1 ring-divider"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">
                {WEEKDAYS[(d.getDay() + 6) % 7]}
              </span>
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full text-sm font-bold",
                  isToday ? "bg-student text-white" : "text-fg",
                )}
              >
                {d.getDate()}
              </span>
            </div>
            {dayEvents.length === 0 ? (
              <p className="text-[11px] text-fg-subtle">No events</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {dayEvents.map((e) => (
                  <li
                    key={e.id}
                    className={cn(
                      "rounded px-1.5 py-1 text-[11px] font-semibold",
                      KIND_COLORS[e.kind],
                    )}
                  >
                    <div className="truncate">{e.title}</div>
                    <div className="text-[10px] font-medium opacity-70">
                      {formatTime(e.date)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- day view ---------- */
function DayView({
  cursor,
  today,
  events,
}: {
  cursor: Date;
  today: Date;
  events: CalEvent[];
}) {
  const dayEvents = events.filter((e) => isSameDay(e.date, cursor));
  const isToday = isSameDay(cursor, today);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-full text-lg font-bold",
            isToday ? "bg-student text-white" : "bg-chip text-fg",
          )}
        >
          {cursor.getDate()}
        </span>
        <div>
          <div className="text-sm font-bold text-fg">
            {cursor.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className="text-xs text-fg-muted">
            {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
          </div>
        </div>
      </div>
      {dayEvents.length === 0 ? (
        <p className="rounded-input bg-chip/40 px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
          Nothing scheduled for this day.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {dayEvents.map((e) => (
            <li
              key={e.id}
              className="flex items-start gap-3 rounded-input border border-divider bg-bg p-3"
            >
              <span
                className={cn(
                  "mt-1 size-2.5 shrink-0 rounded-full",
                  KIND_DOT[e.kind],
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-fg">{e.title}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                    {KIND_LABEL[e.kind]}
                  </span>
                </div>
                {e.meta ? (
                  <p className="mt-0.5 text-xs text-fg-muted">{e.meta}</p>
                ) : null}
              </div>
              <span className="text-xs font-semibold text-fg-muted">
                {formatTime(e.date)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- year view ---------- */
function YearView({
  cursor,
  today,
  events,
  onPickMonth,
}: {
  cursor: Date;
  today: Date;
  events: CalEvent[];
  onPickMonth: (d: Date) => void;
}) {
  const year = cursor.getFullYear();
  const months = Array.from({ length: 12 }, (_, m) => m);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {months.map((m) => {
        const start = startOfMonthGrid(year, m);
        const days: Date[] = [];
        for (let i = 0; i < 42; i++) {
          const d = new Date(start);
          d.setDate(start.getDate() + i);
          days.push(d);
        }
        return (
          <button
            key={m}
            onClick={() => onPickMonth(new Date(year, m, 1))}
            className="rounded-input p-3 text-left ring-1 ring-divider hover:bg-chip/40"
          >
            <div className="mb-2 text-sm font-bold text-fg">
              {MONTH_NAMES[m]}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-[10px]">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="text-center font-bold text-fg-subtle"
                >
                  {d[0]}
                </div>
              ))}
              {days.map((d, i) => {
                const inMonth = d.getMonth() === m;
                const isToday = isSameDay(d, today);
                const has = events.some((e) => isSameDay(e.date, d));
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative grid h-5 place-items-center rounded text-[10px]",
                      isToday
                        ? "bg-student font-bold text-white"
                        : inMonth
                          ? "text-fg"
                          : "text-fg-subtle/60",
                    )}
                  >
                    {d.getDate()}
                    {has && !isToday ? (
                      <span className="absolute bottom-0.5 size-1 rounded-full bg-student" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}
