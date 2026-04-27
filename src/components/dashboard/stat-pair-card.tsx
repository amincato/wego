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
}

const ACCENT_BAR: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student",
  family: "bg-family",
  school: "bg-school",
  neutral: "bg-fg",
};

const ACCENT_DOT: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student",
  family: "bg-family",
  school: "bg-school",
  neutral: "bg-fg",
};

export function StatPairCard({
  label,
  primary,
  secondary,
  accent = "neutral",
}: Props) {
  const total = primary.value + secondary.value;
  const pct = total > 0 ? Math.round((primary.value / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4 rounded-card-lg bg-surface p-5 ring-1 ring-divider">
      <span className="t-caption uppercase tracking-wider text-fg-subtle">
        {label}
      </span>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold leading-none text-fg">
            {primary.value}
          </span>
          <span className="text-xs font-medium text-fg-subtle">
            {primary.label}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold leading-none text-fg-muted">
            {secondary.value}
          </span>
          <span className="text-xs font-medium text-fg-subtle">
            {secondary.label}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-chip">
          <div
            className={cn("h-full", ACCENT_BAR[accent])}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", ACCENT_DOT[accent])} />
            {primary.label.toLowerCase()}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-chip ring-1 ring-divider" />
            {secondary.label.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
