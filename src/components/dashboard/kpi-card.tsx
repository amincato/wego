import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  total: number;
  delta?: number;
  accent?: "student" | "family" | "school" | "neutral";
}

const ACCENT_BAR: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student",
  family: "bg-family",
  school: "bg-school",
  neutral: "bg-fg",
};

export function KpiCard({ label, value, total, delta, accent = "neutral" }: Props) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-3 rounded-card-lg bg-surface p-5 ring-1 ring-divider">
      <div className="flex items-start justify-between">
        <span className="t-caption uppercase tracking-wider text-fg-subtle">
          {label}
        </span>
        {typeof delta === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
              delta >= 0
                ? "bg-success-bg/40 text-success-fg"
                : "bg-danger-bg/60 text-danger-fg",
            )}
          >
            {delta >= 0 ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
        ) : null}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold leading-none text-fg">{value}</span>
        <span className="text-sm font-semibold text-fg-muted">/ {total}</span>
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-chip">
          <div
            className={cn("h-full rounded-full", ACCENT_BAR[accent])}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-fg-subtle">
          <span>{pct}% used</span>
          <span>{total - value} available</span>
        </div>
      </div>
    </div>
  );
}
