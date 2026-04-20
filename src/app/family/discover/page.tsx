"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { StatusBar } from "@/components/shared/status-bar";
import { StudentCard } from "@/components/family/student-card";
import { FamilyFilterSheet } from "@/components/family/filter-sheet";
import { students } from "@/lib/mock/students";
import { useFamilyFilters } from "@/lib/store/filters";
import { useCurrentProfileName } from "@/lib/hooks/use-current-profile-name";

export default function FamilyDiscoverPage() {
  const name = useCurrentProfileName("Rath");
  const [sheetOpen, setSheetOpen] = useState(false);
  const filters = useFamilyFilters();

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (filters.genders.length && !filters.genders.includes(s.gender))
        return false;
      if (
        filters.durations.length &&
        !filters.durations.includes(s.mobilityDurationMonths)
      )
        return false;
      if (
        filters.nationalities.length &&
        !filters.nationalities.includes(s.nationality)
      )
        return false;
      return true;
    });
  }, [filters]);


  return (
    <>
      <StatusBar />
      <div className="px-4">
        <p className="text-[19px] text-family font-bold">
          Hi, {name} family <span className="ml-1">👋</span>
        </p>
        <h1 className="h-display mt-1 text-fg">Discover students</h1>

        <div className="mt-5 flex items-center gap-2">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {["All", "Italy", "France", "Spain"].map((c) => (
              <button
                key={c}
                className="h-9 shrink-0 rounded-full bg-surface px-4 text-[13px] font-semibold text-fg ring-1 ring-divider"
              >
                {c}
              </button>
            ))}
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
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 rounded-[20px] bg-surface p-8 text-center text-fg-muted">
              No students match your filters.
            </div>
          )}
        </div>
      </div>

      <FamilyFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        resultsCount={filtered.length}
      />
    </>
  );
}
