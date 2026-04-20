"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Application } from "@/lib/types";
import { schools } from "@/lib/mock/schools";
import { cn } from "@/lib/utils";

const statusText: Record<Application["status"], string> = {
  draft: "Draft",
  under_review: "Under review",
  accepted: "Accepted",
  rejected: "Rejected",
};

const nextText: Record<Application["status"], string> = {
  draft: "Complete your application",
  under_review: "Next: wait school confirmation",
  accepted: "Next: host families will contact you",
  rejected: "Thanks for applying — see other schools",
};

const statusBadge: Record<Application["status"], string> = {
  draft: "bg-chip text-fg",
  under_review: "bg-student/20 text-student",
  accepted: "bg-success-bg text-success-fg",
  rejected: "bg-danger-bg text-danger-fg",
};

export function ApplicationCard({
  application,
  compact,
}: {
  application: Application;
  compact?: boolean;
}) {
  const school = schools.find((s) => s.id === application.schoolId);
  if (!school) return null;

  const progress = progressForStatus(application.status);

  return (
    <Link
      href={`/student/applications/${application.id}`}
      className="block overflow-hidden rounded-[20px] bg-surface ring-1 ring-divider"
    >
      <div className="relative h-[130px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={school.imageUrl}
          alt={school.name}
          className="size-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold text-fg truncate">
              {school.shortName}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[13px] text-fg-muted">
              <MapPin size={13} />
              {school.city}, {school.country}
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold whitespace-nowrap",
              statusBadge[application.status],
            )}
          >
            {statusText[application.status]}
          </span>
        </div>

        {/* progress bar */}
        <div className="mt-3 h-[3px] w-full rounded-full bg-divider">
          <div
            className="h-full rounded-full bg-fg"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-3 text-[13px] font-semibold text-fg">
          {nextText[application.status]}
        </div>

        {!compact && application.status === "accepted" && (
          <ExpandedDetails application={application} />
        )}
      </div>
    </Link>
  );
}

function ExpandedDetails({ application }: { application: Application }) {
  return (
    <div className="mt-4 grid grid-cols-[1fr_auto] gap-y-2 text-[13px]">
      <DetailRow
        icon="🕒"
        label="Mobility duration"
        value={`${application.mobilityDurationMonths} months`}
      />
      <DetailRow
        icon="📅"
        label="Applied on"
        value={formatDate(application.appliedAt)}
      />
      {application.acceptedAt && (
        <DetailRow
          icon="✅"
          label="Accepted"
          value={formatDate(application.acceptedAt)}
          accent="text-success-bg"
        />
      )}
      <DetailRow
        icon="👥"
        label="Host families interest in you"
        value={String(application.hostFamiliesInterested.length || "-")}
      />
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <>
      <div className={cn("flex items-center gap-2 text-fg-muted", accent)}>
        <span>{icon}</span>
        {label}
      </div>
      <div className="text-right text-fg">{value}</div>
    </>
  );
}

function progressForStatus(status: Application["status"]) {
  switch (status) {
    case "draft":
      return 0.15;
    case "under_review":
      return 0.4;
    case "accepted":
      return 0.8;
    case "rejected":
      return 1;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
