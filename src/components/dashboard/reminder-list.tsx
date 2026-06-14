import { CalendarDays } from "lucide-react";
import type { Reminder } from "@/lib/types-dashboard";

function formatDue(iso: string) {
  const d = new Date(iso);
  const days = Math.round(
    (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  if (days === 0) return `Today · ${date}`;
  if (days === 1) return `Tomorrow · ${date}`;
  if (days < 0) return `${Math.abs(days)} days ago · ${date}`;
  return `In ${days} days · ${date}`;
}

export function ReminderList({ reminders }: { reminders: Reminder[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {reminders.map((r) => (
        <li
          key={r.id}
          className="flex items-center gap-3 rounded-input border border-divider bg-bg px-3 py-2.5"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-chip text-fg-muted">
            <CalendarDays className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-fg">{r.title}</div>
            <div className="text-xs text-fg-muted">{formatDue(r.dueDate)}</div>
          </div>
          <span className="rounded-full bg-chip px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
            {r.category}
          </span>
        </li>
      ))}
    </ul>
  );
}
