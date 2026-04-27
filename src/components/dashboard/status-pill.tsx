import { cn } from "@/lib/utils";
import type {
  ApplicationLifecycleState,
  FamilyApplicationState,
} from "@/lib/types-dashboard";

const STUDENT_STATE: Record<
  ApplicationLifecycleState,
  { label: string; tone: string }
> = {
  new_application: { label: "New", tone: "bg-student/15 text-student" },
  under_review: { label: "Under review", tone: "bg-chip text-fg" },
  accepted: { label: "Accepted", tone: "bg-success-bg/40 text-success-fg" },
  confirmed: { label: "Confirmed", tone: "bg-success-bg/60 text-success-fg" },
  host_family_requests: {
    label: "Host family requests",
    tone: "bg-family/15 text-family",
  },
  host_family_match: {
    label: "Host family matched",
    tone: "bg-family/25 text-family",
  },
  rejected: { label: "Rejected", tone: "bg-danger-bg/60 text-danger-fg" },
};

const FAMILY_STATE: Record<
  FamilyApplicationState,
  { label: string; tone: string }
> = {
  new_request: { label: "New request", tone: "bg-family/15 text-family" },
  site_visit_scheduled: {
    label: "Site visit scheduled",
    tone: "bg-chip text-fg",
  },
  site_visit_completed: {
    label: "Site visit done",
    tone: "bg-school/15 text-school",
  },
  allowed_to_host: {
    label: "Allowed to host",
    tone: "bg-success-bg/40 text-success-fg",
  },
  matched_with_student: {
    label: "Matched",
    tone: "bg-success-bg/60 text-success-fg",
  },
  rejected: { label: "Rejected", tone: "bg-danger-bg/60 text-danger-fg" },
};

export function ApplicationStatusPill({
  state,
}: {
  state: ApplicationLifecycleState;
}) {
  const { label, tone } = STUDENT_STATE[state];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
        tone,
      )}
    >
      {label}
    </span>
  );
}

export function FamilyStatusPill({
  state,
}: {
  state: FamilyApplicationState;
}) {
  const { label, tone } = FAMILY_STATE[state];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
        tone,
      )}
    >
      {label}
    </span>
  );
}
