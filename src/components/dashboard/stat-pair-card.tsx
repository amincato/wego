import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  label: string;
}

interface Props {
  label: string;
  primary: Stat;
  secondary: Stat;
  accent?: "student" | "family" | "school" | "neutral";
  /** Hide the title and place the numbers inline with the icon. */
  hideLabel?: boolean;
}

const ACCENT_BAR: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student",
  family: "bg-family",
  school: "bg-school",
  neutral: "bg-fg",
};

const ACCENT_TINT: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student/10 text-student",
  family: "bg-family/10 text-family",
  school: "bg-school/10 text-school",
  neutral: "bg-chip text-fg",
};

const ICON_BG: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student/15 text-student",
  family: "bg-family/15 text-family",
  school: "bg-school/15 text-school",
  neutral: "bg-chip text-fg",
};

export function StatPairCard({
  label,
  primary,
  secondary,
  accent = "neutral",
  hideLabel = false,
}: Props) {
  const total = primary.value + secondary.value;
  const pct = total > 0 ? Math.round((primary.value / total) * 100) : 0;

  return (
    <div className="rounded-card-lg bg-surface p-6 shadow-sm ring-1 ring-divider">
      {/* Header — icon + label (when shown) + percentage badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-11 place-items-center rounded-2xl",
              ICON_BG[accent],
            )}
          >
            <Users className="size-5" strokeWidth={2.2} />
          </span>
          <div>
            {hideLabel ? (
              <span className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
                {primary.label} · {secondary.label}
              </span>
            ) : (
              <h3 className="h-section text-fg">{label}</h3>
            )}
            <p className="mt-0.5 text-xs text-fg-subtle">
              <span className="font-bold text-fg">{total}</span> total
            </p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold tracking-tight",
            ACCENT_TINT[accent],
          )}
        >
          {pct}% filled
        </span>
      </div>

      {/* Big numbers — primary on the left, secondary on the right */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold leading-none tracking-tight text-fg">
            {primary.value}
          </span>
          <span className="pb-1 text-base font-medium text-fg-subtle">
            / {total}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold leading-none tracking-tight text-fg-muted">
            {secondary.value}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-chip">
          <div
            className={cn("h-full rounded-full", ACCENT_BAR[accent])}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-6 text-xs">
          <span className="inline-flex items-center gap-2 text-fg-muted">
            <span className={cn("size-2.5 rounded-full", ACCENT_BAR[accent])} />
            {primary.label}
          </span>
          <span className="inline-flex items-center gap-2 text-fg-muted">
            <span className="size-2.5 rounded-full bg-chip ring-1 ring-divider" />
            {secondary.label}
          </span>
        </div>
      </div>
    </div>
  );
}
