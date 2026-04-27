import Link from "next/link";
import { FileText, Globe2, Heart, Home, ScrollText, UserRound } from "lucide-react";
import { InfoCard, InfoGrid, InfoRow } from "./info-card";
import { JourneyTimeline } from "./journey-timeline";
import { PaymentsTable } from "./payments-table";
import { ChatPanel } from "./chat-panel";
import {
  classAssignments,
  getJourney,
  getPaymentsForStudent,
} from "@/lib/mock/dashboard-hosting";
import { dashboardHostFamilies } from "@/lib/mock/dashboard-families";
import { hostFamilies as foreignHostFamilies } from "@/lib/mock/families";
import type { ApplicationExtended } from "@/lib/types-dashboard";
import type { StudentProfile } from "@/lib/types";

const NATIONALITY_LABEL: Record<StudentProfile["nationality"], string> = {
  it: "Italian",
  fr: "French",
  de: "German",
  es: "Spanish",
  gb: "British",
};

const LIFESTYLE_LABEL: Record<string, string> = {
  time_with_family: "Family-oriented",
  often_out: "Often out",
  invite_people: "Loves inviting friends",
  quiet_private: "Quiet & private",
  social_outgoing: "Social & outgoing",
  small_circles: "Small circles",
  on_my_own: "On my own",
  has_pet_ok: "Has a pet · OK with pets",
  no_pets: "No pets",
  no_pets_please: "Prefers no pets",
  structured: "Structured routine",
  flexible: "Flexible routine",
  no_schedule: "No fixed schedule",
  not_specific: "No specific diet",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
};

export function PersonalInfoTab({ student }: { student: StudentProfile }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="Personal info">
        <InfoGrid
          items={[
            { label: "Full name", value: `${student.firstName} ${student.lastName}` },
            { label: "Age", value: `${student.age} years old` },
            {
              label: "Birthday",
              value: new Date(student.birthday).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
            { label: "Gender", value: student.gender },
            { label: "Nationality", value: NATIONALITY_LABEL[student.nationality] },
            { label: "City of origin", value: student.city },
          ]}
        />
      </InfoCard>

      <InfoCard title="Languages">
        <ul className="flex flex-col gap-2">
          {student.languages.map((l) => (
            <li
              key={l.code}
              className="flex items-center justify-between gap-3 rounded-input bg-bg px-3 py-2 ring-1 ring-divider"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
                <Globe2 className="size-4 text-fg-subtle" />
                {l.code.toUpperCase()}
              </span>
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs font-bold text-fg-muted capitalize">
                {l.level}
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Lifestyle">
        <ul className="space-y-1">
          <InfoRow label="At home" value={LIFESTYLE_LABEL[student.lifestyle.atHome]} />
          <InfoRow
            label="Social life"
            value={LIFESTYLE_LABEL[student.lifestyle.socialLife]}
          />
          <InfoRow label="Pets" value={LIFESTYLE_LABEL[student.lifestyle.pets]} />
          <InfoRow
            label="Daily habits"
            value={LIFESTYLE_LABEL[student.lifestyle.dailyHabits]}
          />
          <InfoRow
            label="Food / diet"
            value={LIFESTYLE_LABEL[student.lifestyle.foodDiet]}
          />
        </ul>
      </InfoCard>

      <InfoCard title="Hobbies & bio">
        <div className="flex flex-wrap gap-2">
          {student.hobbies.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-full bg-chip px-3 py-1 text-xs font-semibold capitalize text-fg"
            >
              <Heart className="size-3 text-family" />
              {h.replace(/_/g, " ")}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          {student.bio}
        </p>
      </InfoCard>
    </div>
  );
}

export function ApplicationSummaryTab({
  application,
}: {
  application: ApplicationExtended;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="Application summary">
        <InfoGrid
          items={[
            {
              label: "Mobility duration",
              value: `${application.mobilityDurationMonths} months`,
            },
            {
              label: "Submitted",
              value: new Date(application.appliedAt).toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" },
              ),
            },
            {
              label: "Current state",
              value: application.lifecycleState.replace(/_/g, " "),
            },
            {
              label: "Direction",
              value: application.flow,
            },
          ]}
        />
      </InfoCard>

      <InfoCard
        title="Report card (Pagella)"
        action={
          application.reportCardFilename ? (
            <button className="rounded-full bg-chip px-3 py-1 text-xs font-bold text-fg hover:bg-chip/70">
              Download
            </button>
          ) : null
        }
      >
        {application.reportCardFilename ? (
          <div className="flex items-center gap-3 rounded-input bg-bg px-3 py-3 ring-1 ring-divider">
            <span className="grid size-10 place-items-center rounded-lg bg-student/15 text-student">
              <ScrollText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-fg">
                {application.reportCardFilename}
              </div>
              <div className="text-xs text-fg-muted">PDF · uploaded by student</div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-fg-muted">No report card uploaded.</p>
        )}
      </InfoCard>

      <InfoCard
        title="Letter of motivation"
        className="lg:col-span-2"
      >
        <div className="flex items-start gap-3 rounded-input bg-bg p-4 ring-1 ring-divider">
          <FileText className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
          <p className="text-sm leading-relaxed text-fg">
            {application.letterOfMotivation}
          </p>
        </div>
      </InfoCard>
    </div>
  );
}

export function ContactTab({ student }: { student: StudentProfile }) {
  return (
    <div className="max-w-3xl">
      <ChatPanel
        withName={`${student.firstName} ${student.lastName}`}
        withAvatar={student.photoUrl}
      />
    </div>
  );
}

export function HostFamilyTab({
  student,
  matchId,
}: {
  student: StudentProfile;
  matchId?: string;
}) {
  const f = matchId
    ? dashboardHostFamilies.find((x) => x.id === matchId) ??
      foreignHostFamilies.find((x) => x.id === matchId)
    : undefined;
  if (!f) {
    return (
      <InfoCard title="Host family">
        <p className="text-sm text-fg-muted">
          No host family matched yet for {student.firstName}.
        </p>
      </InfoCard>
    );
  }
  return (
    <InfoCard title="Host family">
      <div className="flex flex-wrap items-start gap-5">
        <span
          className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-2 ring-divider"
          style={{ backgroundImage: `url(${f.photoUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-bold text-fg">{f.familyName}</h4>
            <span className="rounded-full bg-family/15 px-2 py-0.5 text-[11px] font-bold text-family">
              Matched
            </span>
          </div>
          <div className="mt-0.5 text-sm text-fg-muted">
            {f.city}, {f.country} · {f.homeType} · {f.spareRooms} spare room
            {f.spareRooms === 1 ? "" : "s"} · {f.hasPets ? "Has pets" : "No pets"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fg">{f.bio}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {f.members.map((m) => (
              <li
                key={m}
                className="inline-flex items-center gap-1 rounded-full bg-chip px-3 py-1 text-xs font-semibold text-fg"
              >
                <UserRound className="size-3" />
                {m}
              </li>
            ))}
          </ul>
          {dashboardHostFamilies.some((x) => x.id === f.id) ? (
            <Link
              href={`/families/hosting/${f.id}`}
              className="mt-4 inline-flex items-center gap-1 rounded-full bg-family px-4 py-2 text-xs font-bold text-white hover:brightness-105"
            >
              <Home className="size-3.5" />
              Open family profile
            </Link>
          ) : null}
        </div>
      </div>
    </InfoCard>
  );
}

export function ClassTab({ studentId }: { studentId: string }) {
  const c = classAssignments.find((x) => x.studentId === studentId);
  if (!c) {
    return (
      <InfoCard title="Class">
        <p className="text-sm text-fg-muted">
          No class assigned yet.
        </p>
      </InfoCard>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <InfoCard title="Class info" className="lg:col-span-1">
        <ul className="space-y-1">
          <InfoRow label="Class" value={c.className} />
          <InfoRow label="Homeroom teacher" value={c.homeroomTeacher} />
          <InfoRow label="Classmates" value={`${c.classmates.length} students`} />
        </ul>
        <h4 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-fg-subtle">
          Classmates
        </h4>
        <ul className="space-y-1.5">
          {c.classmates.map((m) => (
            <li key={m} className="text-sm text-fg-muted">
              · {m}
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Weekly schedule" className="lg:col-span-2">
        <div className="overflow-hidden rounded-input ring-1 ring-divider">
          <table className="w-full text-sm">
            <thead className="bg-chip/60 text-left text-xs uppercase tracking-wider text-fg-subtle">
              <tr>
                <th className="px-3 py-2 font-semibold">Day</th>
                {Array.from({
                  length: Math.max(...c.schedule.map((d) => d.periods.length)),
                }).map((_, i) => (
                  <th key={i} className="px-3 py-2 font-semibold">
                    P{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.schedule.map((row) => (
                <tr key={row.day} className="border-t border-divider/60">
                  <td className="px-3 py-2 font-bold text-fg">{row.day}</td>
                  {row.periods.map((p, i) => (
                    <td key={i} className="px-3 py-2 text-fg-muted">
                      {p}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoCard>
    </div>
  );
}

export function MobilityJourneyTab({ studentId }: { studentId: string }) {
  const j = getJourney(studentId);
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

export function PaymentsTab({ studentId }: { studentId: string }) {
  const payments = getPaymentsForStudent(studentId);
  return (
    <InfoCard title="Payments">
      <PaymentsTable payments={payments} />
    </InfoCard>
  );
}
