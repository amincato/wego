import Link from "next/link";
import { ChevronRight, GraduationCap, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import { mySchool } from "@/lib/mock/my-school";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

const COUNTRY_NAME: Record<string, string> = {
  it: "Italy",
  fr: "France",
  de: "Germany",
  es: "Spain",
  gb: "United Kingdom",
};

/** Hardcoded confirmed-arrival roster (7 students locked in for the
 * upcoming term but not yet on campus). Kept inline so the existing
 * students/applications mocks stay small. */
const confirmedRoster = [
  {
    id: "conf_lily",
    firstName: "Lily Louise",
    lastName: "Jacob",
    nationality: "de",
    city: "Munich",
    age: 17,
    months: 10,
    appliedAt: "2025-09-12",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_marco",
    firstName: "Marco",
    lastName: "Conti",
    nationality: "it",
    city: "Florence",
    age: 16,
    months: 6,
    appliedAt: "2025-09-15",
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_camille",
    firstName: "Camille",
    lastName: "Dubois",
    nationality: "fr",
    city: "Lille",
    age: 17,
    months: 3,
    appliedAt: "2025-09-18",
    photoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_pablo",
    firstName: "Pablo",
    lastName: "García",
    nationality: "es",
    city: "Madrid",
    age: 16,
    months: 10,
    appliedAt: "2025-09-20",
    photoUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_carmen",
    firstName: "Carmen",
    lastName: "Ruiz",
    nationality: "es",
    city: "Barcelona",
    age: 16,
    months: 6,
    appliedAt: "2025-09-22",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_giulia",
    firstName: "Giulia",
    lastName: "Bianchi",
    nationality: "it",
    city: "Milan",
    age: 17,
    months: 3,
    appliedAt: "2025-09-25",
    photoUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conf_lucas",
    firstName: "Lucas",
    lastName: "Martin",
    nationality: "fr",
    city: "Marseille",
    age: 17,
    months: 6,
    appliedAt: "2025-09-28",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

const HOSTED_CLASS: Record<string, string> = {
  student_carlo: "11. Klasse",
};

export default function IncomingPage() {
  const newApplications = incomingApplications.filter(
    (a) => a.lifecycleState === "new_application",
  );
  const accepted = incomingApplications.filter(
    (a) => a.lifecycleState === "accepted",
  );

  const capacity = mySchool.hostingCapacity;
  const available = capacity.totalSpots - capacity.filledSpots;

  const hostedStudents = mySchool.studentsHostedIds
    .map((id) => students.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader
        title="Incoming students"
        subtitle="Students applying to and currently hosted by your school."
      />

      {/* Capacity strip */}
      <div className="mb-8 inline-flex items-center gap-3 rounded-input bg-surface px-4 py-3 ring-1 ring-divider">
        <span className="grid size-9 place-items-center rounded-lg bg-student/15 text-student">
          <Users className="size-4" strokeWidth={2.2} />
        </span>
        <div className="text-sm">
          <span className="font-bold text-fg">
            {available} spots still available
          </span>
          <span className="ml-1.5 text-fg-subtle">
            out of {capacity.totalSpots}
          </span>
        </div>
      </div>

      {/* FUTURE INCOMING STUDENTS */}
      <section className="mb-10">
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Future incoming students
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-fg ring-1 ring-divider">
              AY 2026/27
            </span>
          </h2>
        </header>

        <ListTabs
          tabs={[
            {
              id: "new",
              label: "New applications",
              count: newApplications.length,
              accent: "student",
              content: (
                <ul className="flex flex-col gap-2">
                  {newApplications.map((app) => {
                    const student = students.find(
                      (s) => s.id === app.studentId,
                    );
                    if (!student) return null;
                    return (
                      <li key={app.id}>
                        <ApplicantRow
                          application={app}
                          student={student}
                          href={`/incoming/applicants/${app.id}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              ),
            },
            {
              id: "accepted",
              label: "Accepted",
              count: accepted.length,
              accent: "student",
              content: (
                <ul className="flex flex-col gap-2">
                  {accepted.map((app) => {
                    const student = students.find(
                      (s) => s.id === app.studentId,
                    );
                    if (!student) return null;
                    return (
                      <li key={app.id}>
                        <ApplicantRow
                          application={app}
                          student={student}
                          href={`/incoming/applicants/${app.id}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              ),
            },
            {
              id: "confirmed",
              label: "Confirmed",
              count: confirmedRoster.length,
              accent: "student",
              content: (
                <ul className="flex flex-col gap-2">
                  {confirmedRoster.map((s) => (
                    <li key={s.id}>
                      <ConfirmedRow student={s} />
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </section>

      {/* CURRENT HOSTED STUDENTS */}
      <section>
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Current hosted students
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-fg ring-1 ring-divider">
              AY 2025/26
            </span>
          </h2>
        </header>
        <ul className="flex flex-col gap-2">
          {hostedStudents.map((s) => (
            <li key={s.id}>
              <HostedRow
                id={s.id}
                firstName={s.firstName}
                lastName={s.lastName}
                nationality={s.nationality}
                months={s.mobilityDurationMonths}
                photoUrl={s.photoUrl}
                className={HOSTED_CLASS[s.id]}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ConfirmedRow({ student }: { student: (typeof confirmedRoster)[number] }) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  return (
    <Link
      href={`/incoming/applicants/${student.id}`}
      className={cn(
        "group flex items-center gap-4 rounded-input border border-divider border-l-4 border-l-student bg-surface px-4 py-3.5 transition-colors hover:border-fg/20 hover:border-l-student hover:bg-chip/40",
      )}
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
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
          <span>{student.months} months</span>
          <span>·</span>
          <span>Applied {fmt(student.appliedAt)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="rounded-full bg-success-bg/40 px-2.5 py-0.5 text-xs font-bold text-success-fg">
          Confirmed
        </span>
        <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}

function HostedRow({
  id,
  firstName,
  lastName,
  nationality,
  months,
  photoUrl,
  className,
}: {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  months: number;
  photoUrl: string;
  className?: string;
}) {
  return (
    <Link
      href={`/incoming/hosted/${id}`}
      className="group flex items-center gap-4 rounded-input border border-divider bg-surface px-4 py-3.5 transition-colors hover:border-fg/20 hover:bg-chip/40"
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-fg">
            {firstName} {lastName}
          </span>
          <span className="text-base leading-none">{FLAGS[nationality]}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-fg-muted">
          <span>{COUNTRY_NAME[nationality] ?? nationality}</span>
          <span>·</span>
          <span>{months} months</span>
          {className ? (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="size-3.5" />
                {className}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
    </Link>
  );
}
