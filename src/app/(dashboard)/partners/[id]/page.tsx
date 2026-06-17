import Link from "next/link";
import Image from "next/image";
import {
  CalendarClock,
  ChevronLeft,
  Info,
  Languages,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { notFound } from "next/navigation";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import { InfoCard } from "@/components/dashboard/info-card";
import { schools } from "@/lib/mock/schools";
import type { School } from "@/lib/types";

const LANGUAGE_LABEL: Record<School["language"], string> = {
  it: "Italian",
  fr: "French",
  de: "German",
  es: "Spanish",
  en: "English",
};

const LANGUAGE_FLAG: Record<School["language"], string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  en: "🇬🇧",
};

export default async function PartnerSchoolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const school = schools.find((s) => s.id === id);
  if (!school) notFound();

  return (
    <>
      {/* Back chevron, sits above the hero like on student / family profiles */}
      <Link
        href="/partners"
        aria-label="Back"
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>

      {/* Hero image with city pill overlay */}
      <div className="relative mb-5 overflow-hidden rounded-card-lg ring-1 ring-divider">
        <div className="relative aspect-[16/4.5] w-full bg-chip">
          <Image
            src={school.imageUrl}
            alt={school.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute left-5 top-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface/50 px-4 py-2 text-sm font-semibold text-fg ring-1 ring-white/40 backdrop-blur-md">
            <MapPin className="size-4" />
            {school.city}, {school.country}
          </span>
        </div>
      </div>

      {/* Title row: name + mobility chips · spots available */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="h-display text-fg">{school.name}</h1>
          {school.mobilityOptions.map((opt) => (
            <span
              key={opt.durationMonths}
              className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-fg ring-1 ring-divider"
            >
              {opt.durationMonths} months
            </span>
          ))}
        </div>
        <span className="rounded-full bg-success-bg/60 px-4 py-2 text-sm font-semibold text-success-fg">
          {school.spotsLeft} spots available
        </span>
      </div>

      <ProfileTabs
        accent="neutral"
        tabs={[
          {
            id: "description",
            label: "School description",
            content: <DescriptionTab school={school} />,
          },
          {
            id: "academic",
            label: "Academic informations",
            content: <AcademicTab school={school} />,
          },
          {
            id: "gallery",
            label: "Gallery",
            content: <GalleryTab school={school} />,
          },
        ]}
      />
    </>
  );
}

function DescriptionTab({ school }: { school: School }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-stretch">
      <section>
        <h3 className="h-section mb-2 text-fg">About</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-fg">
          {school.description}
        </p>
      </section>

      <InfoCard
        title="Mobility coordinator"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-white hover:bg-fg/90"
          >
            <MessageSquare className="size-4" strokeWidth={2.4} />
            Contact
          </button>
        }
      >
        <div className="flex items-center gap-4">
          <span
            className="size-16 shrink-0 rounded-full bg-chip bg-cover bg-center ring-1 ring-divider"
            style={{
              backgroundImage: `url(${school.coordinator.avatarUrl})`,
            }}
          />
          <div className="min-w-0">
            <div className="text-base font-bold text-fg">
              {school.coordinator.name}
            </div>
            <div className="text-sm text-fg-muted">
              Coordinator at {school.name}
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

function AcademicTab({ school }: { school: School }) {
  const d = school.academicDetails;

  // Fallback to the old bullet-list view for schools without structured data.
  if (!d) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <InfoCard title="Admission requirements">
          <ul className="space-y-2 text-sm leading-relaxed text-fg">
            {school.highlights.admission.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-school" />
                {h}
              </li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard title="School schedule">
          <ul className="space-y-2 text-sm leading-relaxed text-fg">
            {school.highlights.schoolSchedule.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-school" />
                {h}
              </li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard title="Subjects & activities">
          <ul className="space-y-2 text-sm leading-relaxed text-fg">
            {school.highlights.subjectsAndActivities.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-school" />
                {h}
              </li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard title="Language">
          <p className="text-sm font-semibold text-fg">
            Teaching language:{" "}
            <span className="text-school">
              {LANGUAGE_LABEL[school.language]}
            </span>
          </p>
        </InfoCard>
      </div>
    );
  }

  const remaining = Math.max(d.capacity - d.confirmed, 0);

  return (
    <div className="space-y-6">
      {/* Teaching language — surfaced at the top of the tab */}
      <div className="flex items-center gap-3 rounded-card-lg bg-surface p-4 ring-1 ring-divider">
        <Languages className="size-5 shrink-0 text-fg" strokeWidth={2.2} />
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">
            Teaching language
          </div>
          <div className="mt-0.5 text-base font-bold text-fg">
            <span className="mr-2 text-lg leading-none">
              {LANGUAGE_FLAG[school.language]}
            </span>
            {LANGUAGE_LABEL[school.language]}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Admission stats + important note */}
        <InfoCard title="Admission">
          <div className="grid grid-cols-3 divide-x divide-divider rounded-input bg-bg ring-1 ring-divider">
            <StatCell label="Capacity" value={d.capacity} tone="neutral" />
            <StatCell label="Confirmed" value={d.confirmed} tone="student" />
            <StatCell label="Remaining" value={remaining} tone="success" />
          </div>
          {d.admissionNote ? (
            <div className="mt-3 flex items-start gap-2 rounded-input bg-student/10 px-3 py-2 ring-1 ring-student/25">
              <Info className="mt-0.5 size-3.5 shrink-0 text-student" />
              <p className="text-xs leading-relaxed text-fg">
                <span className="font-bold text-student">Important:</span>{" "}
                {d.admissionNote}
              </p>
            </div>
          ) : null}
        </InfoCard>

        {/* Schedule rows */}
        <InfoCard title="School schedule">
          <ul className="divide-y divide-divider/60">
            {d.scheduleRows.map((r) => (
              <li
                key={r.day}
                className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <span className="inline-flex items-center gap-2 text-sm font-bold text-fg">
                  <CalendarClock
                    className="size-4 text-fg-subtle"
                    strokeWidth={2.2}
                  />
                  {r.day}
                </span>
                <span className="text-sm font-semibold text-fg-muted">
                  {r.time}
                </span>
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>

      {/* Subjects + extracurricular */}
      <InfoCard title="Subjects & activities">
        <div className="space-y-5">
          <section>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-fg-subtle">
              Core subjects
            </h4>
            <div className="flex flex-wrap gap-2">
              {d.coreSubjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-fg px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
          {d.extracurricular && d.extracurricular.length > 0 ? (
            <section>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-fg-subtle">
                Extracurricular activities
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.extracurricular.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-chip px-3.5 py-1.5 text-xs font-bold text-fg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </InfoCard>
    </div>
  );
}

function StatCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "student" | "success";
}) {
  const valueTone =
    tone === "student"
      ? "text-student"
      : tone === "success"
        ? "text-success-fg"
        : "text-fg";
  return (
    <div className="px-3 py-2.5 text-center">
      <div className="text-[10px] font-bold uppercase tracking-wider text-fg-subtle">
        {label}
      </div>
      <div className={`mt-0.5 text-xl font-bold ${valueTone}`}>{value}</div>
    </div>
  );
}

function GalleryTab({ school }: { school: School }) {
  if (school.galleryItems.length === 0) {
    return (
      <InfoCard title="Gallery">
        <p className="text-sm text-fg-muted">No photos available yet.</p>
      </InfoCard>
    );
  }
  return (
    <InfoCard title="Gallery">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {school.galleryItems.map((g) => (
          <div
            key={g.id}
            className="relative aspect-[4/3] overflow-hidden rounded-input bg-chip"
          >
            <Image
              src={g.imageUrl}
              alt={g.caption ?? school.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            {g.caption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fg/70 to-transparent p-3">
                <span className="text-xs font-bold text-white">
                  {g.caption}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </InfoCard>
  );
}
