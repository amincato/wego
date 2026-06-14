import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";

interface FutureFamily {
  id: string;
  familyName: string;
  city: string;
  country: string;
  members: number;
  submittedAt: string;
  photoUrl: string;
  pillLabel: string;
  pillTone: string;
}

interface HostingFamily {
  id: string;
  familyName: string;
  city: string;
  country: string;
  members: number;
  months: number;
  photoUrl: string;
}

const newApplications: FutureFamily[] = [
  {
    id: "famapp_mueller",
    familyName: "Family Müller",
    city: "Rostock",
    country: "Germany",
    members: 4,
    submittedAt: "2025-09-15",
    photoUrl: "/families/mueller-photo.png",
    pillLabel: "New request",
    pillTone: "bg-family/15 text-family",
  },
];

const inProgress: FutureFamily[] = [
  {
    id: "famapp_weber",
    familyName: "Family Weber",
    city: "Rostock",
    country: "Germany",
    members: 3,
    submittedAt: "2025-09-08",
    photoUrl:
      "https://images.unsplash.com/photo-1602407294553-6ac9170de9eb?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Site visit scheduled",
    pillTone: "bg-chip text-fg",
  },
  {
    id: "famapp_handolf",
    familyName: "Family Handolf",
    city: "Rostock",
    country: "Germany",
    members: 4,
    submittedAt: "2025-08-30",
    photoUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Site visit done",
    pillTone: "bg-school/15 text-school",
  },
];

const allowedToHost: FutureFamily[] = [
  {
    id: "famapp_schmidt",
    familyName: "Family Schmidt",
    city: "Berlin",
    country: "Germany",
    members: 4,
    submittedAt: "2025-08-12",
    photoUrl:
      "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
  {
    id: "famapp_klum",
    familyName: "Family Klum",
    city: "Rostock",
    country: "Germany",
    members: 3,
    submittedAt: "2025-08-05",
    photoUrl:
      "https://images.unsplash.com/photo-1602407294553-6ac9170de9eb?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
  {
    id: "famapp_sonnenschirm",
    familyName: "Family Sonnenschirm",
    city: "Rostock",
    country: "Germany",
    members: 3,
    submittedAt: "2025-07-28",
    photoUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
  {
    id: "famapp_flasche",
    familyName: "Family Flasche",
    city: "Rostock",
    country: "Germany",
    members: 2,
    submittedAt: "2025-07-22",
    photoUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
  {
    id: "famapp_lippenschtift",
    familyName: "Family Lippenschtift",
    city: "Rostock",
    country: "Germany",
    members: 3,
    submittedAt: "2025-07-15",
    photoUrl:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
  {
    id: "famapp_foster",
    familyName: "Family Foster",
    city: "Rostock",
    country: "Germany",
    members: 4,
    submittedAt: "2025-07-08",
    photoUrl:
      "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=600&q=80",
    pillLabel: "Allowed to host",
    pillTone: "bg-success-bg/40 text-success-fg",
  },
];

const currentHosting: HostingFamily[] = [
  {
    id: "host_taununsanlage",
    familyName: "Family Taununsanlage",
    city: "Rostock",
    country: "Germany",
    members: 3,
    months: 6,
    photoUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "host_lenz",
    familyName: "Family Lenz",
    city: "Rostock",
    country: "Germany",
    members: 3,
    months: 10,
    photoUrl: "/families/lenz.jpg",
  },
  {
    id: "host_stiefel",
    familyName: "Family Stiefel",
    city: "Rostock",
    country: "Germany",
    members: 3,
    months: 6,
    photoUrl: "/families/stiefel.jpg",
  },
  {
    id: "host_rath",
    familyName: "Family Rath",
    city: "Rostock",
    country: "Germany",
    members: 3,
    months: 10,
    photoUrl: "/families/rath/avatar.png",
  },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FamiliesPage() {
  return (
    <>
      <PageHeader
        title="Host families"
        subtitle="Host families of the school"
      />

      {/* FUTURE HOST FAMILIES */}
      <section className="mb-10">
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Future host families
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
              accent: "family",
              content: <FutureList families={newApplications} />,
            },
            {
              id: "in_progress",
              label: "In progress",
              count: inProgress.length,
              accent: "family",
              content: <FutureList families={inProgress} />,
            },
            {
              id: "allowed",
              label: "Allowed to host",
              count: allowedToHost.length,
              accent: "family",
              content: <FutureList families={allowedToHost} />,
            },
          ]}
        />
      </section>

      {/* CURRENT HOST FAMILIES */}
      <section>
        <header className="mb-4">
          <h2 className="h-section flex flex-wrap items-center gap-3 font-bold text-fg">
            Current host families
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-fg ring-1 ring-divider">
              AY 2025/26
            </span>
          </h2>
        </header>
        <ul className="flex flex-col gap-2">
          {currentHosting.map((f) => (
            <li key={f.id}>
              <HostingRow family={f} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function FutureList({ families }: { families: FutureFamily[] }) {
  if (families.length === 0) {
    return (
      <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
        No families in this stage.
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-2">
      {families.map((f) => (
        <li key={f.id}>
          <FutureRow family={f} />
        </li>
      ))}
    </ul>
  );
}

function FutureRow({ family: f }: { family: FutureFamily }) {
  return (
    <Link
      href={`/families/applications/${f.id}`}
      className="group flex items-center gap-4 rounded-input border border-divider border-l-4 border-l-family bg-surface px-4 py-5 transition-colors hover:border-fg/20 hover:border-l-family hover:bg-chip/40"
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${f.photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-bold text-fg">
            {f.familyName}
          </span>
          <span className="text-xs text-fg-subtle">
            · {f.city}, {f.country}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {f.members} members
          </span>
          <span>Submitted {fmtDate(f.submittedAt)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${f.pillTone}`}
        >
          {f.pillLabel}
        </span>
        <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
      </div>
    </Link>
  );
}

function HostingRow({ family: f }: { family: HostingFamily }) {
  return (
    <Link
      href={`/families/hosting/${f.id}`}
      className="group flex items-center gap-4 rounded-input border border-divider bg-surface px-4 py-5 transition-colors hover:border-fg/20 hover:bg-chip/40"
    >
      <span
        className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
        style={{ backgroundImage: `url(${f.photoUrl})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-bold text-fg">
            {f.familyName}
          </span>
          <span className="text-xs text-fg-subtle">
            · {f.city}, {f.country}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {f.members} members
          </span>
          <span>Hosting for {f.months} months</span>
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-fg-subtle group-hover:text-fg" />
    </Link>
  );
}
