"use client";

import { BottomSheet } from "@/components/shared/bottom-sheet";
import { Button } from "@/components/ui/button";
import { useFamilyFilters } from "@/lib/store/filters";
import type { Gender, MobilityDurationMonths, Nationality } from "@/lib/types";
import { cn } from "@/lib/utils";

const genders: { value: Gender; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const durations: MobilityDurationMonths[] = [3, 6, 10];

const nationalities: { value: Nationality; label: string; flag: string }[] = [
  { value: "it", label: "Italy", flag: "🇮🇹" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "es", label: "Spain", flag: "🇪🇸" },
];

export function FamilyFilterSheet({
  open,
  onOpenChange,
  resultsCount,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resultsCount: number;
}) {
  const f = useFamilyFilters();

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Filters"
      footer={
        <div className="flex gap-3">
          <Button
            variant="ghostDark"
            size="md"
            width="full"
            onClick={() => f.reset()}
          >
            Delete all
          </Button>
          <Button
            variant="primaryFamily"
            size="md"
            width="full"
            onClick={() => onOpenChange(false)}
          >
            Show {resultsCount} student{resultsCount !== 1 ? "s" : ""}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <Card>
          <Subtitle>Gender</Subtitle>
          <div className="mt-3 flex gap-2 flex-wrap">
            {genders.map((g) => (
              <Chip
                key={g.value}
                active={f.genders.includes(g.value)}
                onClick={() => f.toggle("genders", g.value)}
              >
                {g.label}
              </Chip>
            ))}
          </div>
        </Card>

        <Card>
          <Subtitle>Mobility duration</Subtitle>
          <div className="mt-3 flex gap-2">
            {durations.map((d) => (
              <Chip
                key={d}
                active={f.durations.includes(d)}
                onClick={() => f.toggle("durations", d)}
              >
                {d} months
              </Chip>
            ))}
          </div>
        </Card>

        <Card>
          <Subtitle>Nationality</Subtitle>
          <div className="mt-3 flex gap-2 flex-wrap">
            {nationalities.map((n) => (
              <Chip
                key={n.value}
                active={f.nationalities.includes(n.value)}
                onClick={() => f.toggle("nationalities", n.value)}
              >
                <span className="mr-1">{n.flag}</span>
                {n.label}
              </Chip>
            ))}
          </div>
        </Card>
      </div>
    </BottomSheet>
  );
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[15px] font-bold text-family">{children}</div>;
}
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] bg-surface px-4 py-4 ring-1 ring-divider">
      {children}
    </div>
  );
}
function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-4 text-[13px] font-semibold",
        active ? "bg-family text-white" : "bg-chip text-fg",
      )}
    >
      {children}
    </button>
  );
}
