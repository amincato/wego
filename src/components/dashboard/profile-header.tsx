import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, MessageSquare, Phone } from "lucide-react";
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
  meta,
  actions,
}: {
  student: StudentProfile;
  state?: ApplicationLifecycleState;
  backHref: string;
  /** Legacy back-button label, no longer rendered (kept for backwards compat). */
  backLabel?: string;
  /** Optional small meta line under the name (e.g. "Family Bianchi · 4° L") */
  meta?: string;
  /** Optional custom action cluster shown under the meta line.
   * If omitted, defaults to Open chat / Call buttons on the right. */
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <Link
        href={backHref}
        aria-label="Back"
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>

      <div className="rounded-card-lg bg-surface p-6 ring-1 ring-divider">
        <div className="flex flex-wrap items-start gap-6">
          <span
            className="size-32 shrink-0 rounded-2xl bg-chip bg-cover bg-center"
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
            {actions ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {actions}
              </div>
            ) : null}
          </div>
          {!actions ? (
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-student px-4 py-2 text-xs font-bold text-white hover:bg-student-accent">
                <MessageSquare className="size-3.5" /> Open chat
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                <Phone className="size-3.5" /> Call
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
