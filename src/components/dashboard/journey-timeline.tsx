import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MobilityJourney } from "@/lib/types-dashboard";

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function JourneyTimeline({ journey }: { journey: MobilityJourney }) {
  return (
    <ol className="relative space-y-6 border-l border-divider pl-6">
      {journey.steps.map((step) => {
        const isCurrent = step.status === "current";
        const isCompleted = step.status === "completed";
        return (
          <li key={step.id} className="relative">
            <span
              className={cn(
                "absolute -left-[33px] grid size-6 place-items-center rounded-full ring-4 ring-bg",
                isCompleted && "bg-student text-white",
                isCurrent && "bg-family text-white animate-pulse",
                step.status === "upcoming" && "bg-chip text-fg-subtle",
              )}
            >
              {isCompleted ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : isCurrent ? (
                <Circle className="size-2 fill-current" />
              ) : (
                <Circle className="size-2" />
              )}
            </span>

            <div className="flex flex-wrap items-baseline gap-2">
              <span
                className={cn(
                  "text-sm font-bold",
                  isCurrent ? "text-family" : "text-fg",
                )}
              >
                {step.label}
              </span>
              <span className="text-xs text-fg-muted">{fmt(step.date)}</span>
              {isCurrent ? (
                <span className="rounded-full bg-family/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-family">
                  Current
                </span>
              ) : null}
            </div>
            {step.description ? (
              <p className="mt-1 text-xs text-fg-muted">{step.description}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
