import Link from "next/link";
import { Check, ChevronLeft, Circle, ShieldAlert, Triangle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { InfoCard } from "@/components/dashboard/info-card";
import { NotificationList } from "@/components/dashboard/notification-list";
import { emergencyWorkflows } from "@/lib/mock/dashboard-messages";
import { emergencyNotifications } from "@/lib/mock/dashboard-home";
import type { EmergencyWorkflow } from "@/lib/types-dashboard";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<EmergencyWorkflow["status"], string> = {
  active: "bg-danger-bg/60 text-danger-fg",
  monitoring: "bg-family/15 text-family",
  closed: "bg-success-bg/40 text-success-fg",
};

function fmt(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hrs = Math.round(diff / (1000 * 60 * 60));
  if (hrs < 24) return `Started ${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `Started ${days}d ago`;
}

export default function EmergenciesPage() {
  return (
    <>
      <PageHeader
        title="Emergency workflows"
        subtitle="Active mediations and incidents that require coordinator action."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/messages"
              className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              <ChevronLeft className="size-4" />
              Inbox
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full bg-danger-bg/60 px-3 py-2 text-sm font-bold text-danger-fg hover:bg-danger-bg">
              <Triangle className="size-4" />
              Open new emergency
            </button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <InfoCard title="Live alerts" className="xl:col-span-1">
          <NotificationList notifications={emergencyNotifications} />
        </InfoCard>

        <div className="xl:col-span-2 space-y-4">
          {emergencyWorkflows.map((w) => (
            <article
              key={w.id}
              className="rounded-card-lg bg-surface p-5 ring-1 ring-divider"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-danger-bg/60 text-danger-fg">
                    <ShieldAlert className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-fg">{w.title}</h3>
                    <div className="mt-0.5 text-xs text-fg-muted">
                      {fmt(w.startedAt)}
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                    STATUS_TONE[w.status],
                  )}
                >
                  {w.status}
                </span>
              </header>

              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                {w.steps.map((s, i) => {
                  const nextUp =
                    !s.done &&
                    w.steps.findIndex((x) => !x.done) === i;
                  return (
                    <li
                      key={s.label}
                      className={cn(
                        "flex items-center gap-2 rounded-input px-3 py-2 text-sm",
                        s.done && "bg-success-bg/30",
                        nextUp && "bg-family/10 ring-1 ring-family/40",
                        !s.done && !nextUp && "bg-bg ring-1 ring-divider",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full",
                          s.done
                            ? "bg-success-fg text-white"
                            : nextUp
                              ? "bg-family text-white"
                              : "bg-chip text-fg-subtle",
                        )}
                      >
                        {s.done ? (
                          <Check className="size-3" strokeWidth={3} />
                        ) : (
                          <Circle className="size-2" />
                        )}
                      </span>
                      <span
                        className={cn(
                          "font-semibold",
                          s.done ? "text-fg-muted line-through" : "text-fg",
                        )}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full bg-success-bg/40 px-4 py-2 text-xs font-bold text-success-fg hover:bg-success-bg/60">
                  Mark next step done
                </button>
                <button className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                  Add note
                </button>
                {w.status !== "closed" ? (
                  <button className="rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg">
                    Close workflow
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
