"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { schools } from "@/lib/mock/schools";
import { cn } from "@/lib/utils";

/* Leaflet relies on `window`, so we load it client-side only. */
const LeafletMap = dynamic(
  () => import("@/components/dashboard/leaflet-map").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[640px] items-center justify-center rounded-card-lg bg-chip ring-1 ring-divider">
        <span className="text-sm text-fg-muted">Loading map…</span>
      </div>
    ),
  },
);

const COUNTRIES = ["all", "Germany", "France", "Italy", "Spain"] as const;
const LANGUAGES = ["all", "de", "fr", "it", "es"] as const;
const ORIENTATIONS = [
  "all",
  "scientific",
  "classic",
  "linguistic",
  "musical",
  "artistic",
] as const;

export default function DestinationsPage() {
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("all");
  const [language, setLanguage] =
    useState<(typeof LANGUAGES)[number]>("all");
  const [orientation, setOrientation] =
    useState<(typeof ORIENTATIONS)[number]>("all");

  const filtered = schools.filter((s) => {
    if (country !== "all" && s.country !== country) return false;
    if (language !== "all" && s.language !== language) return false;
    if (orientation !== "all" && s.orientation !== orientation) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="Destinations"
        subtitle="A geographical view of our partner schools across Europe."
        action={
          <Link
            href="/partners"
            className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
          >
            <ChevronLeft className="size-4" />
            Back to partner schools
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LeafletMap
            schools={schools}
            highlightedIds={filtered.map((s) => s.id)}
          />
        </div>

        <div className="space-y-4">
          <FiltersBar
            country={country}
            setCountry={setCountry}
            language={language}
            setLanguage={setLanguage}
            orientation={orientation}
            setOrientation={setOrientation}
          />

        </div>
      </div>
    </>
  );
}

function FiltersBar({
  country,
  setCountry,
  language,
  setLanguage,
  orientation,
  setOrientation,
}: {
  country: (typeof COUNTRIES)[number];
  setCountry: (v: (typeof COUNTRIES)[number]) => void;
  language: (typeof LANGUAGES)[number];
  setLanguage: (v: (typeof LANGUAGES)[number]) => void;
  orientation: (typeof ORIENTATIONS)[number];
  setOrientation: (v: (typeof ORIENTATIONS)[number]) => void;
}) {
  return (
    <div className="rounded-card-lg bg-surface p-5 ring-1 ring-divider">
      <h3 className="t-label mb-3">Filters</h3>
      <FilterGroup label="Country">
        {COUNTRIES.map((c) => (
          <Chip
            key={c}
            active={c === country}
            onClick={() => setCountry(c)}
          >
            {c === "all" ? "All countries" : c}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Language">
        {LANGUAGES.map((l) => (
          <Chip
            key={l}
            active={l === language}
            onClick={() => setLanguage(l)}
          >
            {l === "all" ? "Any" : l.toUpperCase()}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Orientation">
        {ORIENTATIONS.map((o) => (
          <Chip
            key={o}
            active={o === orientation}
            onClick={() => setOrientation(o)}
          >
            {o === "all" ? "Any" : o}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
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
        "rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors",
        active
          ? "bg-school text-white"
          : "bg-chip text-fg-muted hover:bg-chip/70",
      )}
    >
      {children}
    </button>
  );
}
