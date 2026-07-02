"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { SchoolCard } from "@/components/dashboard/school-card";
import { schools } from "@/lib/mock/schools";
import { cn } from "@/lib/utils";

const COUNTRIES = ["all", "Germany", "France", "Italy", "Spain"] as const;
const LANGUAGES = ["all", "de", "fr", "it", "es"] as const;
const DURATIONS = ["all", "3", "6", "10"] as const;

export default function PartnersPage() {
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("all");
  const [language, setLanguage] =
    useState<(typeof LANGUAGES)[number]>("all");
  const [duration, setDuration] =
    useState<(typeof DURATIONS)[number]>("all");

  const filtered = useMemo(
    () =>
      schools.filter((s) => {
        if (country !== "all" && s.country !== country) return false;
        if (language !== "all" && s.language !== language) return false;
        if (
          duration !== "all" &&
          !s.mobilityOptions.some(
            (m) => String(m.durationMonths) === duration,
          )
        )
          return false;
        return true;
      }),
    [country, language, duration],
  );

  return (
    <>
      <PageHeader
        title="Partner schools"
        subtitle="The international network of schools we collaborate with."
        action={
          <Link
            href="/partners/destinations"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-white hover:bg-fg/90"
          >
            <MapPin className="size-4" />
            View destinations map
          </Link>
        }
      />

      <section className="mb-5 rounded-card-lg bg-surface p-4 ring-1 ring-divider">
        <div className="flex flex-nowrap items-center gap-x-3">
          <FilterRow label="Country">
            {COUNTRIES.map((c) => (
              <Chip
                key={c}
                active={c === country}
                onClick={() => setCountry(c)}
              >
                {c === "all" ? "All countries" : c}
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="Language">
            {LANGUAGES.map((l) => (
              <Chip
                key={l}
                active={l === language}
                onClick={() => setLanguage(l)}
              >
                {l === "all" ? "Any" : l.toUpperCase()}
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="Mobility duration">
            {DURATIONS.map((d) => (
              <Chip
                key={d}
                active={d === duration}
                onClick={() => setDuration(d)}
              >
                {d === "all" ? "Any" : `${d} months`}
              </Chip>
            ))}
          </FilterRow>
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-card-lg bg-surface px-4 py-10 text-center text-sm text-fg-muted ring-1 ring-divider">
          No partner schools match the current filters.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 flex-nowrap items-center gap-1.5">
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
        {label}
      </span>
      <div className="flex flex-nowrap gap-1">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold capitalize transition-colors",
        active
          ? "bg-fg text-white"
          : "bg-chip text-fg-muted hover:bg-chip/70",
      )}
    >
      {children}
    </button>
  );
}
