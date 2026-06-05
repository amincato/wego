import { GraduationCap, Users, type LucideIcon } from "lucide-react";
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

const ACCENT_TEXT: Record<NonNullable<Props["accent"]>, string> = {
  student: "text-student",
  family: "text-family",
  school: "text-school",
  neutral: "text-fg",
};

const ICON_BG: Record<NonNullable<Props["accent"]>, string> = {
  student: "bg-student/15 text-student",
  family: "bg-family/15 text-family",
  school: "bg-school/15 text-school",
  neutral: "bg-chip text-fg",
};

const ACCENT_ICON: Record<NonNullable<Props["accent"]>, LucideIcon> = {
  student: GraduationCap,
  family: Users,
  school: Users,
  neutral: Users,
};

export function StatPairCard({
  label,
  primary,
  secondary,
  accent = "neutral",
}: Props) {
  const total = primary.value + secondary.value;
  const pct = total > 0 ? Math.round((primary.value / total) * 100) : 0;
  const Icon = ACCENT_ICON[accent];

  return (
    <div className="rounded-card-lg bg-surface px-5 py-4 ring-1 ring-divider">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              ICON_BG[accent],
            )}
          >
            <Icon className="size-5" strokeWidth={2.2} />
          </span>
          <div>
            <h3 className="text-base font-bold text-fg">{label}</h3>
            <p className="mt-0.5 text-xs text-fg-subtle">
              {secondary.value} {secondary.label.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="text-right leading-none">
          <div>
            <span
              className={cn(
                "text-2xl font-bold tracking-tight",
                ACCENT_TEXT[accent],
              )}
            >
              {primary.value}
            </span>
            <span className="text-base text-fg-subtle"> / {total}</span>
          </div>
          <div className="mt-1 text-xs text-fg-subtle">
            {primary.label.toLowerCase()}
          </div>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-chip">
        <div
          className={cn("h-full rounded-full", ACCENT_BAR[accent])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
