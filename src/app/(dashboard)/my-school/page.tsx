import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import { InfoCard, InfoGrid } from "@/components/dashboard/info-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { mySchool } from "@/lib/mock/my-school";
import { currentCoordinator } from "@/lib/mock/coordinator";
import { students } from "@/lib/mock/students";
import type { SchoolExtended } from "@/lib/types-dashboard";

export default function MySchoolPage() {
  return (
    <>
      <PageHeader
        title={mySchool.name}
        subtitle={`${mySchool.city}, ${mySchool.country} · This is your school's profile, visible to partners.`}
        action={
          <Link
            href="/my-school/community"
            className="inline-flex items-center gap-2 rounded-full bg-school px-4 py-2 text-sm font-bold text-white hover:bg-school-accent"
          >
            <Sparkles className="size-4" />
            Open community
          </Link>
        }
      />

      <div className="relative mb-6 overflow-hidden rounded-card-lg ring-1 ring-divider">
        <div className="relative aspect-[16/5] w-full bg-chip">
          <Image
            src={mySchool.imageUrl}
            alt={mySchool.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-school px-2.5 py-1 text-[11px] font-bold text-white">
                <MapPin className="size-3" />
                {mySchool.city}, {mySchool.country}
              </span>
              <h1 className="mt-2 h-display text-fg">{mySchool.name}</h1>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-bg/95 px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-bg">
              <Pencil className="size-3.5" />
              Edit profile
            </button>
          </div>
        </div>
      </div>

      <ProfileTabs
        tabs={[
          {
            id: "description",
            label: "School description",
            content: <DescriptionTab />,
          },
          {
            id: "capacity",
            label: "Hosting capacity management",
            content: <CapacityTab school={mySchool} />,
          },
          {
            id: "coordinator",
            label: "Mobility coordinator",
            content: <CoordinatorTab />,
          },
          {
            id: "academic",
            label: "Academic informations",
            content: <AcademicTab school={mySchool} />,
          },
          {
            id: "we-hosted",
            label: "Students we hosted",
            content: <StudentsHostedTab school={mySchool} />,
          },
        ]}
      />
    </>
  );
}

function DescriptionTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <InfoCard
        title="About"
        className="lg:col-span-2"
        action={
          <button className="rounded-full bg-chip px-3 py-1 text-xs font-bold text-fg hover:bg-chip/70">
            Edit
          </button>
        }
      >
        <p className="text-sm leading-relaxed text-fg">{mySchool.description}</p>
      </InfoCard>
      <InfoCard title="Quick facts">
        <InfoGrid
          columns={2}
          items={[
            { label: "Orientation", value: mySchool.orientation },
            { label: "Language", value: mySchool.language.toUpperCase() },
            {
              label: "Destination",
              value: mySchool.destinationType.replace(/_/g, " "),
            },
            {
              label: "Exchange presence",
              value: mySchool.exchangeStudentsPresence,
            },
          ]}
        />
      </InfoCard>

      <InfoCard title="Highlights" className="lg:col-span-3">
        <div className="grid gap-6 lg:grid-cols-3">
          <Highlight title="Admission" items={mySchool.highlights.admission} />
          <Highlight
            title="Schedule"
            items={mySchool.highlights.schoolSchedule}
          />
          <Highlight
            title="Subjects & activities"
            items={mySchool.highlights.subjectsAndActivities}
          />
        </div>
      </InfoCard>
    </div>
  );
}

function Highlight({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-fg-subtle">
        {title}
      </h4>
      <ul className="space-y-2 text-sm leading-relaxed text-fg">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-school" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CapacityTab({ school }: { school: SchoolExtended }) {
  const cap = school.hostingCapacity;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          label="Total spots"
          value={cap.filledSpots}
          total={cap.totalSpots}
          accent="school"
        />
        <KpiCard
          label="Reserved spots"
          value={cap.reservedSpots}
          total={cap.totalSpots}
          accent="student"
        />
        <KpiCard
          label="Available now"
          value={cap.totalSpots - cap.filledSpots - cap.reservedSpots}
          total={cap.totalSpots}
          accent="family"
        />
      </div>

      <InfoCard
        title="Capacity per program duration"
        action={
          <button className="rounded-full bg-school px-3 py-1 text-xs font-bold text-white hover:bg-school-accent">
            Adjust capacity
          </button>
        }
      >
        <ul className="space-y-3">
          {cap.perDuration.map((row) => {
            const pct = Math.round((row.filled / row.total) * 100);
            return (
              <li key={row.months}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-bold text-fg">{row.months}-month spots</span>
                  <span className="font-semibold text-fg-muted">
                    {row.filled} / {row.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-chip">
                  <div
                    className="h-full rounded-full bg-school"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </InfoCard>
    </div>
  );
}

function CoordinatorTab() {
  return (
    <InfoCard title="Mobility coordinator">
      <div className="flex flex-wrap items-center gap-5">
        <span
          className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-2 ring-divider"
          style={{ backgroundImage: `url(${currentCoordinator.avatarUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-fg">
              {currentCoordinator.firstName} {currentCoordinator.lastName}
            </h4>
            <span className="rounded-full bg-school/15 px-2 py-0.5 text-[11px] font-bold text-school capitalize">
              {currentCoordinator.role.replace(/_/g, " ")}
            </span>
          </div>
          <div className="mt-1 text-sm text-fg-muted">
            {currentCoordinator.email} · {currentCoordinator.phone}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/profile"
              className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              Open profile
            </Link>
            <button className="rounded-full bg-chip px-4 py-2 text-xs font-bold text-fg hover:bg-chip/70">
              Manage team
            </button>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}

function AcademicTab({ school }: { school: SchoolExtended }) {
  const a = school.academicInfo;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="School year">
        <div className="flex items-center justify-between rounded-input bg-bg p-4 ring-1 ring-divider">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-school/15 text-school">
              <CalendarDays className="size-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-fg-subtle">
                Start
              </div>
              <div className="font-bold text-fg">{fmt(a.schoolYearStart)}</div>
            </div>
          </div>
          <span className="text-fg-subtle">→</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-fg-subtle">
                End
              </div>
              <div className="font-bold text-fg">{fmt(a.schoolYearEnd)}</div>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-school/15 text-school">
              <CalendarDays className="size-5" />
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-fg-muted">Average class size</span>
          <span className="font-bold text-fg">{a.averageClassSize}</span>
        </div>
      </InfoCard>

      <InfoCard title="Exam periods & holidays">
        <ul className="flex flex-col gap-2">
          {a.examPeriods.map((p) => (
            <li
              key={p.name}
              className="flex items-center justify-between rounded-input bg-bg px-3 py-2 ring-1 ring-divider"
            >
              <span className="text-sm font-bold text-fg">{p.name}</span>
              <span className="text-xs text-fg-muted">
                {fmt(p.from)} → {fmt(p.to)}
              </span>
            </li>
          ))}
          {a.holidays.map((p) => (
            <li
              key={p.name}
              className="flex items-center justify-between rounded-input bg-bg px-3 py-2 ring-1 ring-divider"
            >
              <span className="text-sm font-bold text-fg">{p.name}</span>
              <span className="text-xs text-fg-muted">
                {fmt(p.from)} → {fmt(p.to)}
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Subjects offered" className="lg:col-span-2">
        <div className="flex flex-wrap gap-2">
          {a.subjectsOffered.map((s) => (
            <span
              key={s}
              className="rounded-full bg-chip px-3 py-1 text-xs font-semibold text-fg"
            >
              {s}
            </span>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

function StudentsHostedTab({ school }: { school: SchoolExtended }) {
  const list = school.studentsHostedIds
    .map((id) => students.find((s) => s.id === id))
    .filter(Boolean);
  return (
    <InfoCard title="Students currently hosted">
      {list.length === 0 ? (
        <p className="text-sm text-fg-muted">No incoming students yet.</p>
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
                    <Users className="mr-1 inline size-3" />
                    {s.mobilityDurationMonths} months
                  </div>
                </div>
                <Link
                  href={`/incoming/hosted/${s.id}`}
                  className="rounded-full bg-chip px-3 py-1 text-[11px] font-bold text-fg hover:bg-chip/70"
                >
                  Open
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </InfoCard>
  );
}
