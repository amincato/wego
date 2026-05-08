import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { FamilyStatusPill } from "./status-pill";
import type { FamilyApplication } from "@/lib/types-dashboard";
import type { HostFamily } from "@/lib/types";

interface Props {
  family: HostFamily;
  application?: FamilyApplication;
  href: string;
  className?: string;
  /** Hide the orange left stripe (used for "current" rows). */
  plain?: boolean;
}

export function FamilyRow({
  family,
  application,
  href,
  className,
  plain = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-5 rounded-input border border-divider bg-surface px-5 py-5 transition-colors hover:border-fg/20",
        plain
          ? "hover:bg-chip/40"
          : "border-l-4 border-l-family hover:border-l-family hover:bg-family/5",
        className,
      )}
    >
      <span
        className="size-14 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${family.photoUrl})` }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-lg font-bold text-fg">
            {family.familyName}
          </span>
          <span className="text-sm text-fg-subtle">
            · {family.city}, {family.country}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" />
            {family.members.length} members
          </span>
          {application ? (
            <span>Submitted {formatDate(application.submittedAt)}</span>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {application && !plain ? (
          <FamilyStatusPill state={application.state} />
        ) : null}
        <ChevronRight className="size-5 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}
