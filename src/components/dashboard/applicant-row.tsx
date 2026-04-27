import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ApplicationStatusPill } from "./status-pill";
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
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-input border border-divider bg-bg px-3 py-3 transition-colors hover:border-fg/20 hover:bg-chip/40",
        className,
      )}
    >
      <span
        className="size-10 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${student.photoUrl})` }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-fg">
            {student.firstName} {student.lastName}
          </span>
          <span className="text-base leading-none">
            {FLAGS[student.nationality]}
          </span>
          <span className="text-xs text-fg-subtle">· {student.age} y/o</span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-fg-muted">
          <span className="truncate">{student.city}</span>
          <span>·</span>
          <span>{application.mobilityDurationMonths} months</span>
          <span>·</span>
          <span>Applied {formatDate(application.appliedAt)}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <ApplicationStatusPill state={application.lifecycleState} />
        <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}
