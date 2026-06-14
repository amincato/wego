import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  PlaneTakeoff,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

interface FutureOutgoing {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  age: number;
  klasse: string;
  destinationSchool: string;
  destinationCity: string;
  destinationCountry: string;
  months: number;
  appliedAt: string;
  photoUrl: string;
}

interface AbroadStudent {
  id: string;
  firstName: string;
  lastName: string;
  klasse: string;
  schoolName: string;
  schoolCity: string;
  schoolCountry: string;
  months: number;
  photoUrl: string;
}

const newApplications: FutureOutgoing[] = [
  {
    id: "out_lena",
    firstName: "Lena",
    lastName: "Krüber",
    nationality: "de",
    age: 17,
    klasse: "11. Klasse",
    destinationSchool: "Lycée Thiers",
    destinationCity: "Marseille",
    destinationCountry: "France",
    months: 6,
    appliedAt: "2025-10-08",
    photoUrl: "/students/outgoing/lena.jpg",
  },
  {
    id: "out_julius",
    firstName: "Julius",
    lastName: "Himmel",
    nationality: "de",
    age: 17,
    klasse: "10. Klasse",
    destinationSchool: "Liceo Galileo Galilei",
    destinationCity: "Florence",
    destinationCountry: "Italy",
    months: 6,
    appliedAt: "2025-09-25",
    photoUrl: "/students/outgoing/julius.jpg",
  },
];

const accepted: FutureOutgoing[] = [];
const confirmed: FutureOutgoing[] = [];

const studentsAbroad: AbroadStudent[] = [
  {
    id: "abr_dalila",
    firstName: "Dalila",
    lastName: "Nielsen Hard",
    klasse: "11. Klasse",
    schoolName: "Lycée Thiers",
    schoolCity: "Marseille",
    schoolCountry: "France",
    months: 6,
    photoUrl: "/students/outgoing/dalila.jpg",
  },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OutgoingPage() {
  return (
    <>
      <PageHeader
        title="Outgoing students"
        subtitle="Your students applying abroad and currently abroad."
      />

      {/* FUTURE OUTGOING STUDENTS */}
      <section className="mb-10">
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Future outgoing students
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
              accent: "school",
              content: (
                <ul className="flex flex-col gap-2">
                  {newApplications.map((s) => (
                    <li key={s.id}>
                      <FutureRow student={s} />
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "accepted",
              label: "Accepted",
              count: accepted.length,
              accent: "school",
              content: (
                <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
                  No accepted students yet.
                </p>
              ),
            },
            {
              id: "confirmed",
              label: "Confirmed",
              count: confirmed.length,
              accent: "school",
              content: (
                <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
                  No confirmed students yet.
                </p>
              ),
            },
          ]}
        />
      </section>

      {/* CURRENT STUDENTS ABROAD */}
      <section>
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Current students abroad
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-fg ring-1 ring-divider">
              AY 2025/26
            </span>
          </h2>
        </header>
        <ul className="flex flex-col gap-2">
          {studentsAbroad.map((s) => (
            <li key={s.id}>
              <AbroadRow student={s} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function KlasseChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-school/15 px-2.5 py-0.5 text-[11px] font-bold text-school">
      <GraduationCap className="size-3" strokeWidth={2.4} />
      {label}
    </span>
  );
}

function FutureRow({ student: s }: { student: FutureOutgoing }) {
  return (
    <Link
      href={`/outgoing/applications/${s.id}`}
      className={cn(
        "group flex items-center gap-4 rounded-input border border-divider border-l-4 border-l-school bg-surface px-4 py-5 transition-colors hover:border-fg/20 hover:border-l-school hover:bg-chip/40",
      )}
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${s.photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-bold text-fg">
            {s.firstName} {s.lastName}
          </span>
          <span className="text-xs text-fg-subtle">· {s.age} y/o</span>
          <KlasseChip label={s.klasse} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1 text-school">
            <PlaneTakeoff className="size-3.5" />
            Applying to {s.destinationSchool} · {s.destinationCity},{" "}
            {s.destinationCountry} {FLAGS[s.nationality] ? "" : ""}
          </span>
          <span>·</span>
          <span>{s.months} months</span>
          <span>·</span>
          <span>Applied {fmtDate(s.appliedAt)}</span>
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-fg-subtle group-hover:text-fg" />
    </Link>
  );
}

function AbroadRow({ student: s }: { student: AbroadStudent }) {
  return (
    <Link
      href={`/outgoing/abroad/${s.id}`}
      className="group flex items-center gap-4 rounded-input border border-divider bg-surface px-4 py-5 transition-colors hover:border-fg/20 hover:bg-chip/40"
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${s.photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-bold text-fg">
            {s.firstName} {s.lastName}
          </span>
          <KlasseChip label={s.klasse} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="size-3.5" />
            {s.schoolName} · {s.schoolCity}, {s.schoolCountry}
          </span>
          <span>·</span>
          <span>{s.months}-month mobility</span>
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-fg-subtle group-hover:text-fg" />
    </Link>
  );
}
