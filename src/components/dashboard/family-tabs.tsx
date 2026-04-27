import Link from "next/link";
import { Home, UserRound } from "lucide-react";
import { InfoCard, InfoGrid, InfoRow } from "./info-card";
import { ChatPanel } from "./chat-panel";
import { FamilyStatusPill } from "./status-pill";
import { JourneyTimeline } from "./journey-timeline";
import { students } from "@/lib/mock/students";
import { getJourney } from "@/lib/mock/dashboard-hosting";
import type {
  FamilyApplication,
  FamilyApplicationState,
} from "@/lib/types-dashboard";
import type { HostFamily } from "@/lib/types";

const FAMILY_FLOW: FamilyApplicationState[] = [
  "new_request",
  "site_visit_scheduled",
  "site_visit_completed",
  "allowed_to_host",
  "matched_with_student",
];

export function FamilyPersonalInfoTab({ family }: { family: HostFamily }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="Personal info">
        <InfoGrid
          items={[
            { label: "Family name", value: family.familyName },
            { label: "City", value: `${family.city}, ${family.country}` },
            { label: "Home type", value: family.homeType },
            { label: "Spare rooms", value: `${family.spareRooms}` },
            { label: "Pets", value: family.hasPets ? "Yes" : "No" },
            { label: "Members", value: `${family.members.length}` },
          ]}
        />
      </InfoCard>

      <InfoCard title="Members">
        <ul className="flex flex-col gap-2">
          {family.members.map((m) => (
            <li
              key={m}
              className="flex items-center gap-3 rounded-input bg-bg px-3 py-2 ring-1 ring-divider"
            >
              <span className="grid size-8 place-items-center rounded-full bg-family/15 text-family">
                <UserRound className="size-4" />
              </span>
              <span className="text-sm font-semibold text-fg">{m}</span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="About the family" className="lg:col-span-2">
        <p className="text-sm leading-relaxed text-fg">{family.bio}</p>
      </InfoCard>
    </div>
  );
}

export function FamilyApplicationSummaryTab({
  application,
}: {
  application: FamilyApplication;
}) {
  return (
    <InfoCard title="Application summary">
      <ul className="space-y-1">
        <InfoRow
          label="Submitted"
          value={new Date(application.submittedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
        <InfoRow
          label="Site visit"
          value={
            application.siteVisitDate
              ? new Date(application.siteVisitDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Not scheduled"
          }
        />
        <InfoRow
          label="Current state"
          value={<FamilyStatusPill state={application.state} />}
        />
        <InfoRow
          label="Matched with"
          value={
            application.matchedStudentId
              ? students.find((s) => s.id === application.matchedStudentId)
                  ?.firstName ?? "—"
              : "—"
          }
        />
      </ul>
      {application.notes ? (
        <p className="mt-4 rounded-input bg-bg p-3 text-sm leading-relaxed text-fg-muted ring-1 ring-divider">
          {application.notes}
        </p>
      ) : null}
    </InfoCard>
  );
}

export function FamilyApplicationStatusTab({
  application,
}: {
  application: FamilyApplication;
}) {
  const idx = FAMILY_FLOW.indexOf(application.state);
  return (
    <InfoCard title="Application status">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
        {FAMILY_FLOW.map((step, i) => {
          const isPast = i < idx;
          const isCurrent = i === idx;
          return (
            <li key={step} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                  isCurrent
                    ? "bg-family text-white ring-4 ring-family/15"
                    : isPast
                      ? "bg-success-bg/40 text-success-fg"
                      : "bg-chip text-fg-subtle"
                }`}
              >
                {i + 1}
              </div>
              <FamilyStatusPill state={step} />
              {i < FAMILY_FLOW.length - 1 ? (
                <span className="hidden h-px w-8 bg-divider sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2">
        <button className="rounded-full bg-success-bg/40 px-4 py-2 text-xs font-bold text-success-fg hover:bg-success-bg/60">
          Move to next step
        </button>
        <button className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
          Schedule site visit
        </button>
        <button className="rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg">
          Reject application
        </button>
      </div>
    </InfoCard>
  );
}

export function FamilyContactTab({ family }: { family: HostFamily }) {
  return (
    <div className="max-w-3xl">
      <ChatPanel withName={family.familyName} withAvatar={family.photoUrl} />
    </div>
  );
}

export function FamilyStudentHostedTab({
  matchedStudentId,
}: {
  matchedStudentId?: string;
}) {
  if (!matchedStudentId) {
    return (
      <InfoCard title="Student hosted">
        <p className="text-sm text-fg-muted">
          This family is not currently hosting any student.
        </p>
      </InfoCard>
    );
  }
  const s = students.find((x) => x.id === matchedStudentId);
  if (!s) {
    return (
      <InfoCard title="Student hosted">
        <p className="text-sm text-fg-muted">Student not found.</p>
      </InfoCard>
    );
  }
  return (
    <InfoCard title="Student hosted">
      <div className="flex flex-wrap items-start gap-5">
        <span
          className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-2 ring-divider"
          style={{ backgroundImage: `url(${s.photoUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-base font-bold text-fg">
            {s.firstName} {s.lastName}
          </div>
          <div className="mt-0.5 text-sm text-fg-muted">
            {s.age} y/o · {s.city} · {s.mobilityDurationMonths}-month mobility
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fg">{s.bio}</p>
          <Link
            href={`/incoming/hosted/${s.id}`}
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-student px-4 py-2 text-xs font-bold text-white hover:bg-student-accent"
          >
            <Home className="size-3.5" />
            Open student profile
          </Link>
        </div>
      </div>
    </InfoCard>
  );
}

export function FamilyMobilityJourneyTab({
  matchedStudentId,
}: {
  matchedStudentId?: string;
}) {
  if (!matchedStudentId) {
    return (
      <InfoCard title="Mobility journey">
        <p className="text-sm text-fg-muted">
          The journey starts when a student is matched with this family.
        </p>
      </InfoCard>
    );
  }
  const j = getJourney(matchedStudentId);
  if (!j) {
    return (
      <InfoCard title="Mobility journey">
        <p className="text-sm text-fg-muted">No journey data available.</p>
      </InfoCard>
    );
  }
  return (
    <InfoCard title="Mobility journey">
      <JourneyTimeline journey={j} />
    </InfoCard>
  );
}
