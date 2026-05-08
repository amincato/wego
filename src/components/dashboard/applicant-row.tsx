import Link from "next/link";
import {
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  MessageCircle,
  PlaneTakeoff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ApplicationStatusPill } from "./status-pill";
import { schools } from "@/lib/mock/schools";
import { classAssignments } from "@/lib/mock/dashboard-hosting";
import type { ApplicationExtended } from "@/lib/types-dashboard";
import type { StudentProfile } from "@/lib/types";

const FLAGS: Record<StudentProfile["nationality"], string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

interface Props {
  application: ApplicationExtended;
  student: StudentProfile;
  /** Where to link to when the row is clicked. */
  href: string;
  className?: string;
}

export function ApplicantRow({ application, student, href, className }: Props) {
  const isOutgoing = application.flow === "outgoing";
  const destination = isOutgoing
    ? schools.find((s) => s.id === application.schoolId)
    : undefined;
  const klass = isOutgoing
    ? classAssignments.find((c) => c.studentId === student.id)
    : undefined;
  const isAcceptedPending =
    !isOutgoing &&
    (application.lifecycleState === "accepted" ||
      application.lifecycleState === "host_family_requests" ||
      application.lifecycleState === "host_family_match");

  const hostFamilyStatus = (() => {
    if (isOutgoing || application.lifecycleState !== "confirmed") return null;
    if (application.hostFamilyMatchId) {
      return {
        label: "Host family matched",
        Icon: Home,
        tone: "bg-success-bg/60 text-success-fg",
      };
    }
    const inContact =
      (application.hostFamilyRequestIds?.length ?? 0) > 0 ||
      (application.hostFamiliesInterested?.length ?? 0) > 0;
    if (inContact) {
      return {
        label: "In contact with a host family",
        Icon: MessageCircle,
        tone: "bg-family/15 text-family",
      };
    }
    return {
      label: "Waiting for a host family",
      Icon: Clock,
      tone: "bg-chip text-fg-muted",
    };
  })();

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-5 rounded-input border border-l-4 border-divider bg-surface px-5 py-5 transition-colors hover:bg-chip/40",
        isOutgoing
          ? "border-l-school hover:border-l-school"
          : "border-l-student hover:border-l-student",
        className,
      )}
    >
      <span
        className="size-14 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${student.photoUrl})` }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-lg font-bold text-fg">
            {student.firstName} {student.lastName}
          </span>
          {isOutgoing ? null : (
            <span className="text-base leading-none">
              {FLAGS[student.nationality]}
            </span>
          )}
          <span className="text-sm text-fg-subtle">· {student.age} y/o</span>
          {isOutgoing && klass ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-school/15 px-2.5 py-0.5 text-xs font-bold text-school">
              <GraduationCap className="size-3.5" />
              {klass.className}
            </span>
          ) : null}
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-fg-muted">
          {isOutgoing ? (
            <>
              <PlaneTakeoff className="size-3.5 shrink-0 text-school" />
              <span className="truncate">
                {destination
                  ? `Applying to ${destination.name} · ${destination.city}, ${destination.country}`
                  : "Applying abroad"}
              </span>
              <span>·</span>
              <span>{application.mobilityDurationMonths} months</span>
              <span>·</span>
              <span>Applied {formatDate(application.appliedAt)}</span>
            </>
          ) : (
            <>
              <span className="truncate">{student.city}</span>
              <span>·</span>
              <span>{application.mobilityDurationMonths} months</span>
              <span>·</span>
              <span>Applied {formatDate(application.appliedAt)}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {!isOutgoing && application.lifecycleState === "new_application" ? (
          <ApplicationStatusPill state={application.lifecycleState} />
        ) : null}
        {isAcceptedPending ? (
          <span className="inline-flex items-center rounded-full bg-chip px-2.5 py-0.5 text-xs font-bold text-fg-muted">
            Waiting student&apos;s confirmation
          </span>
        ) : null}
        {hostFamilyStatus ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold",
              hostFamilyStatus.tone,
            )}
          >
            <hostFamilyStatus.Icon className="size-3" />
            {hostFamilyStatus.label}
          </span>
        ) : null}
        <ChevronRight className="size-5 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}
