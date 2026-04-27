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
}

export function FamilyRow({ family, application, href, className }: Props) {
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
        style={{ backgroundImage: `url(${family.photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-fg">
            {family.familyName}
          </span>
          <span className="text-xs text-fg-subtle">
            · {family.city}, {family.country}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {family.members.length} members
          </span>
          {application ? (
            <span>Submitted {formatDate(application.submittedAt)}</span>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {application ? <FamilyStatusPill state={application.state} /> : null}
        <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}
