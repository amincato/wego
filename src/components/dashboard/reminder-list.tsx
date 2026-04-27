import { CalendarClock, FileText, Receipt, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Reminder } from "@/lib/types-dashboard";

const ICON: Record<Reminder["category"], React.ReactNode> = {
  deadline: <CalendarClock className="size-4" />,
  meeting: <Users className="size-4" />,
  report: <FileText className="size-4" />,
  payment: <Receipt className="size-4" />,
};

const TONE: Record<Reminder["category"], string> = {
  deadline: "bg-student/15 text-student",
  meeting: "bg-school/15 text-school",
  report: "bg-chip text-fg",
  payment: "bg-family/15 text-family",
};

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
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-lg",
              TONE[r.category],
            )}
          >
            {ICON[r.category]}
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
