"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { StatusBar } from "@/components/shared/status-bar";
import { SchoolCard } from "@/components/student/school-card";
import { countriesAvailable } from "@/lib/mock/schools";
import { useStudentFilters } from "@/lib/store/filters";
import { StudentFilterSheet } from "@/components/student/filter-sheet";
import { cn } from "@/lib/utils";
import type { School } from "@/lib/types";

export function DiscoverSchoolsClient({
  firstName,
  schools,
}: {
  firstName: string;
  schools: School[];
}) {
  const filters = useStudentFilters();
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      if (filters.countries.length && !filters.countries.includes(s.country))
        return false;
      if (filters.languages.length && !filters.languages.includes(s.language))
        return false;
      if (
        filters.durations.length &&
        !s.mobilityOptions.some((o) =>
          filters.durations.includes(o.durationMonths),
        )
      )
        return false;
      if (
        filters.orientations.length &&
        !filters.orientations.includes(s.orientation)
      )
        return false;
      if (
        filters.exchangePresence !== "all" &&
        s.exchangeStudentsPresence !== filters.exchangePresence
      )
        return false;
      if (
        filters.destinationTypes.length &&
        !filters.destinationTypes.includes(s.destinationType)
      )
        return false;
      return true;
    });
  }, [filters, schools]);

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <p className="text-[19px] text-student-accent font-bold">
          Hello, {firstName} <span className="ml-1">👋</span>
        </p>
        <h1 className="h-display mt-1 text-fg">Discover schools</h1>

        <div className="mt-5 flex items-center gap-2">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {countriesAvailable.map((c) => {
              const active = filters.countries.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => filters.toggleCountry(c)}
                  className={cn(
                    "h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold",
                    active
                      ? "bg-student text-white"
                      : "bg-surface text-fg ring-1 ring-divider",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            aria-label="Open filters"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <p className="mt-5 text-[14px] text-fg-muted">
          {filtered.length} school{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-4 flex flex-col gap-4">
          {filtered.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-[20px] bg-surface p-8 text-center text-fg-muted">
              No schools match your filters.
            </div>
          )}
        </div>
      </div>

      <StudentFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        resultsCount={filtered.length}
      />
    </>
  );
}
