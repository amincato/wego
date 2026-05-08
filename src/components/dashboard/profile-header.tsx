import Link from "next/link";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { ApplicationStatusPill } from "./status-pill";
import type { StudentProfile } from "@/lib/types";
import type { ApplicationLifecycleState } from "@/lib/types-dashboard";

const FLAGS: Record<StudentProfile["nationality"], string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

export function ProfileHeader({
  student,
  state,
  backHref,
  backLabel = "Back",
  meta,
  actions,
}: {
  student: StudentProfile;
  state?: ApplicationLifecycleState;
  backHref: string;
  backLabel?: string;
  /** Optional small meta line under the name (e.g. "Family Bianchi · 4° L") */
  meta?: string;
  /** Extra action buttons rendered before the default Open chat / Call buttons. */
  actions?: ReactNode;
}) {
  return (
    <>
      <Link
        href={backHref}
        aria-label={backLabel}
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>
      <div className="rounded-card-lg bg-surface ring-1 ring-divider">
        <div className="p-5">
          <div className="flex flex-wrap items-start gap-5">
            <span
              className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-4 ring-bg-elevated"
              style={{ backgroundImage: `url(${student.photoUrl})` }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="h-title text-fg">
                  {student.firstName} {student.lastName}
                </h1>
                <span className="text-xl leading-none">
                  {FLAGS[student.nationality]}
                </span>
                {state ? <ApplicationStatusPill state={state} /> : null}
              </div>
              <div className="mt-1 text-sm text-fg-muted">
                {student.age} y/o · {student.city} ·{" "}
                {student.mobilityDurationMonths}-month mobility
              </div>
              {meta ? (
                <div className="mt-0.5 text-xs text-fg-subtle">{meta}</div>
              ) : null}
            </div>
          </div>
          {actions ? (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
