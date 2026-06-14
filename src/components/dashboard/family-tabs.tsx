import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Home, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
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

const LANG_FLAG: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  en: "🇬🇧",
};

const LANG_LEVEL_TONE: Record<string, string> = {
  native: "bg-chip text-fg-muted",
  advanced: "bg-chip text-fg-muted",
  intermediate: "bg-chip text-fg-muted",
  beginner: "bg-chip text-fg-muted",
};

const FAMILY_HOBBY: Record<string, { emoji: string; label: string }> = {
  cooking: { emoji: "🍳", label: "Cooking" },
  travelling: { emoji: "✈️", label: "Travelling" },
  music: { emoji: "🎵", label: "Music" },
  hiking: { emoji: "🥾", label: "Hiking" },
  reading: { emoji: "📚", label: "Reading" },
  board_games: { emoji: "🎲", label: "Board games" },
  gardening: { emoji: "🌱", label: "Gardening" },
  sports: { emoji: "⚽", label: "Sports" },
};

const FAMILY_FLOW: { id: FamilyApplicationState; label: string }[] = [
  { id: "new_request", label: "New request" },
  { id: "site_visit_scheduled", label: "Site visit scheduled" },
  { id: "allowed_to_host", label: "Allowed to host" },
  { id: "matched_with_student", label: "Student matched" },
  { id: "final_confirmation", label: "Final confirmation" },
];

export function FamilyPersonalInfoTab({ family }: { family: HostFamily }) {
  return (
    <div className="space-y-6">
      {/* About the family — full width, no card */}
      <section>
        <h3 className="h-section mb-2 text-fg">About the family</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-fg">
          {family.bio}
        </p>
      </section>

      {/* Personal info + Languages (left) · Members + Hobbies (right) */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col gap-6">
          <InfoCard title="Personal info">
            <InfoGrid
              items={[
                { label: "Family name", value: family.familyName },
                { label: "City", value: `${family.city}, ${family.country}` },
                { label: "Pets", value: family.hasPets ? "Yes" : "No" },
                {
                  label: "Family members",
                  value: `${family.members.length}`,
                },
              ]}
            />
          </InfoCard>

          <InfoCard title="Languages">
            {family.languages && family.languages.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {family.languages.map((l) => (
                  <li
                    key={l.code}
                    className="flex items-center justify-between gap-3 rounded-input bg-bg px-3 py-2.5 ring-1 ring-divider"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
                      <span className="text-base leading-none">
                        {LANG_FLAG[l.code] ?? "🌐"}
                      </span>
                      {l.code.toUpperCase()}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold capitalize",
                        LANG_LEVEL_TONE[l.level] ?? "bg-chip text-fg-muted",
                      )}
                    >
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-fg-muted">No languages declared.</p>
            )}
          </InfoCard>

          {family.lifestyle ? (
            <InfoCard title="Lifestyle">
              <ul className="space-y-1">
                <InfoRow label="At home" value={family.lifestyle.atHome} />
                <InfoRow
                  label="Social life"
                  value={family.lifestyle.socialLife}
                />
                <InfoRow label="Pets" value={family.lifestyle.pets} />
                <InfoRow
                  label="Daily habits"
                  value={family.lifestyle.dailyHabits}
                />
                <InfoRow
                  label="Food / Diet"
                  value={family.lifestyle.foodDiet}
                />
              </ul>
            </InfoCard>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <InfoCard title="Members">
            {family.memberProfiles ? (
              <ul className="flex flex-col gap-2">
                {family.memberProfiles.map((m) => (
                  <li
                    key={`${m.name}-${m.age}`}
                    className="flex items-center gap-3 rounded-input bg-bg px-3 py-2 ring-1 ring-divider"
                  >
                    <span
                      role="img"
                      aria-label={`${m.role} ${m.name}`}
                      className="size-9 shrink-0 rounded-full bg-chip bg-cover bg-center"
                      style={{ backgroundImage: `url(${m.photoUrl})` }}
                    />
                    <span className="text-sm font-semibold text-fg">
                      {m.name}, {m.age}
                    </span>
                    {m.klasseLabel ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-school/15 px-2.5 py-0.5 text-[11px] font-bold text-school">
                        <GraduationCap className="size-3" strokeWidth={2.4} />
                        {m.klasseLabel}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
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
            )}
          </InfoCard>

          {family.hobbies && family.hobbies.length > 0 ? (
            <InfoCard title="Hobbies">
              <div className="flex flex-wrap gap-2">
                {family.hobbies.map((h) => {
                  const meta = FAMILY_HOBBY[h];
                  return (
                    <span
                      key={h}
                      className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2.5 text-sm font-semibold text-fg"
                    >
                      <span className="text-lg leading-none">
                        {meta?.emoji ?? "•"}
                      </span>
                      {meta?.label ?? h.replace(/_/g, " ")}
                    </span>
                  );
                })}
              </div>
            </InfoCard>
          ) : null}
        </div>
      </div>

      {/* Photos — full width, only when the family has a gallery */}
      {family.galleryUrls && family.galleryUrls.length > 0 ? (
        <InfoCard title="Photos">
          <div className="grid gap-3 md:grid-cols-3">
            {family.galleryUrls.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square w-full overflow-hidden rounded-input bg-chip"
              >
                <Image
                  src={src}
                  alt={`${family.familyName} – photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </InfoCard>
      ) : null}

      {/* Home photos — full width, only when present */}
      {family.homePhotoUrls && family.homePhotoUrls.length > 0 ? (
        <InfoCard title="Home photos">
          <div className="grid gap-3 md:grid-cols-3">
            {family.homePhotoUrls.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square w-full overflow-hidden rounded-input bg-chip"
              >
                <Image
                  src={src}
                  alt={`${family.familyName} – home photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </InfoCard>
      ) : null}
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
  const currentIndex = FAMILY_FLOW.findIndex(
    (s) => s.id === application.state,
  );

  return (
    <InfoCard title="Application status">
      <ol className="flex flex-wrap items-center gap-3 sm:gap-4">
        {FAMILY_FLOW.map((step, idx) => {
          const isCurrent = idx === currentIndex;
          const isPast = idx < currentIndex;
          const isReached = isPast || isCurrent;
          return (
            <li key={step.id} className="flex items-center gap-3">
              <div
                className={`grid size-10 place-items-center rounded-full text-sm font-bold ${
                  isCurrent
                    ? "bg-family text-white ring-4 ring-family/15"
                    : isPast
                      ? "bg-family/15 text-family"
                      : "bg-bg text-fg-subtle"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                  isReached
                    ? "bg-family/15 text-family"
                    : "bg-bg text-fg-muted"
                }`}
              >
                {step.label}
              </span>
              {idx < FAMILY_FLOW.length - 1 ? (
                <span className="hidden h-px w-6 bg-divider sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>
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
