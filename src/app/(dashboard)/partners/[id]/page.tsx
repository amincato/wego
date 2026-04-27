import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import { InfoCard, InfoGrid } from "@/components/dashboard/info-card";
import { schools } from "@/lib/mock/schools";
import { students } from "@/lib/mock/students";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import type { School } from "@/lib/types";

const LANGUAGE_LABEL: Record<School["language"], string> = {
  it: "Italian",
  fr: "French",
  de: "German",
  es: "Spanish",
  en: "English",
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
      <div className="relative mb-6 overflow-hidden rounded-card-lg ring-1 ring-divider">
        <div className="relative aspect-[16/6] w-full bg-chip">
          <Image
            src={school.imageUrl}
            alt={school.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
        </div>

        <div className="absolute left-5 top-4">
          <Link
            href="/partners"
            className="inline-flex items-center gap-1 rounded-full bg-bg/95 px-3 py-1.5 text-xs font-bold text-fg ring-1 ring-divider hover:bg-bg"
          >
            <ChevronLeft className="size-3.5" />
            Partner schools
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-school px-2.5 py-1 text-[11px] font-bold text-white">
                <MapPin className="size-3" />
                {school.city}, {school.country}
              </span>
              <h1 className="mt-2 h-display text-fg">{school.name}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-bg/90 px-3 py-1 text-xs font-bold text-fg ring-1 ring-divider capitalize">
                {school.orientation}
              </span>
              <span className="rounded-full bg-bg/90 px-3 py-1 text-xs font-bold text-fg ring-1 ring-divider">
                {LANGUAGE_LABEL[school.language]}
              </span>
              <span className="rounded-full bg-bg/90 px-3 py-1 text-xs font-bold text-fg ring-1 ring-divider">
                <Users className="mr-1 inline size-3" />
                {school.spotsLeft} spots left
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProfileTabs
        tabs={[
          {
            id: "description",
            label: "School description",
            content: <DescriptionTab school={school} />,
          },
          {
            id: "capacity",
            label: "Hosting capacity",
            content: <HostingCapacityTab school={school} />,
          },
          {
            id: "academic",
            label: "Academic informations",
            content: <AcademicTab school={school} />,
          },
          {
            id: "students",
            label: "Students they hosted",
            content: <StudentsHostedTab schoolId={school.id} />,
          },
          {
            id: "coordinator",
            label: "Mobility coordinator",
            content: <CoordinatorTab school={school} />,
          },
        ]}
      />
    </>
  );
}

function DescriptionTab({ school }: { school: School }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <InfoCard title="About" className="lg:col-span-2">
        <p className="text-sm leading-relaxed text-fg">{school.description}</p>
      </InfoCard>
      <InfoCard title="Quick facts">
        <InfoGrid
          columns={2}
          items={[
            { label: "City", value: school.city },
            { label: "Country", value: school.country },
            {
              label: "Language",
              value: LANGUAGE_LABEL[school.language],
            },
            { label: "Orientation", value: school.orientation },
            {
              label: "Destination",
              value: school.destinationType.replace(/_/g, " "),
            },
            {
              label: "Exchange presence",
              value: school.exchangeStudentsPresence,
            },
          ]}
        />
      </InfoCard>

      {school.galleryItems.length > 0 ? (
        <InfoCard title="Gallery" className="lg:col-span-3">
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
      ) : null}
    </div>
  );
}

function HostingCapacityTab({ school }: { school: School }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="Mobility options">
        <ul className="space-y-2">
          {school.mobilityOptions.map((opt) => (
            <li
              key={opt.durationMonths}
              className="flex items-center justify-between rounded-input bg-bg px-4 py-3 ring-1 ring-divider"
            >
              <span className="text-sm font-bold text-fg">
                {opt.durationMonths}-month program
              </span>
              <span className="text-sm font-bold text-school">
                € {opt.priceEur.toLocaleString()}/mo
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Capacity">
        <div className="rounded-input bg-bg p-5 text-center ring-1 ring-divider">
          <div className="text-5xl font-bold text-school">
            {school.spotsLeft}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wider text-fg-subtle">
            spots remaining for the next semester
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

function AcademicTab({ school }: { school: School }) {
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
    </div>
  );
}

function StudentsHostedTab({ schoolId }: { schoolId: string }) {
  // For demo purposes, derive a list of students "hosted by them" from
  // the outgoing applications (= our students who went there).
  const ourStudentsThere = incomingApplications
    .filter(() => false) // partner schools don't appear in incomingApplications
    .map((a) => a.studentId);

  // Use a mock subset of students based on the school id for variety.
  const fallbackIds: string[] =
    schoolId === "school_fsg"
      ? ["student_carlo", "student_giorgia"]
      : schoolId === "school_thiers"
        ? ["student_giorgio"]
        : schoolId === "school_goethe"
          ? ["student_carlo"]
          : [];

  const ids = ourStudentsThere.length > 0 ? ourStudentsThere : fallbackIds;
  const list = ids
    .map((id) => students.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <InfoCard title="Students they hosted from us">
      {list.length === 0 ? (
        <p className="text-sm text-fg-muted">
          No students of yours have been hosted by this school yet.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) =>
            s ? (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-input bg-bg p-3 ring-1 ring-divider"
              >
                <span
                  className="size-10 rounded-full bg-chip bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.photoUrl})` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-fg">
                    {s.firstName} {s.lastName}
                  </div>
                  <div className="text-xs text-fg-muted">
                    {s.mobilityDurationMonths} months · {s.city}
                  </div>
                </div>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </InfoCard>
  );
}

function CoordinatorTab({ school }: { school: School }) {
  return (
    <InfoCard title="Mobility coordinator">
      <div className="flex flex-wrap items-center gap-5">
        <span
          className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-2 ring-divider"
          style={{ backgroundImage: `url(${school.coordinator.avatarUrl})` }}
        />
        <div>
          <div className="text-base font-bold text-fg">
            {school.coordinator.name}
          </div>
          <div className="text-sm text-fg-muted">
            Coordinator at {school.name}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-full bg-school px-4 py-2 text-xs font-bold text-white hover:bg-school-accent">
              Send a message
            </button>
            <button className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
              Schedule a call
            </button>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
