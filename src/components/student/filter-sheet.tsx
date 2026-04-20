"use client";

import { ChevronDown } from "lucide-react";
import { BottomSheet } from "@/components/shared/bottom-sheet";
import { Button } from "@/components/ui/button";
import {
  useStudentFilters,
} from "@/lib/store/filters";
import type {
  DestinationType,
  ExchangeStudentsPresence,
  MobilityDurationMonths,
  SchoolOrientation,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const durations: MobilityDurationMonths[] = [3, 6, 10];
const orientations: { value: SchoolOrientation; label: string; emoji: string }[] = [
  { value: "scientific", label: "Scientific", emoji: "🔬" },
  { value: "classic", label: "Classic", emoji: "📚" },
  { value: "musical", label: "Musical", emoji: "🎵" },
  { value: "linguistic", label: "Linguistic", emoji: "🌍" },
  { value: "artistic", label: "Artistic", emoji: "🎨" },
];
const presences: ExchangeStudentsPresence[] = ["all", "low", "medium", "high"];
const destinations: { value: DestinationType; label: string; emoji: string }[] = [
  { value: "large_city", label: "Large city", emoji: "🏙️" },
  { value: "medium_city", label: "Medium city", emoji: "🏘️" },
  { value: "small_town", label: "Small town", emoji: "🏡" },
  { value: "rural_area", label: "Rural area", emoji: "🌳" },
];

export function StudentFilterSheet({
  open,
  onOpenChange,
  resultsCount,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resultsCount: number;
}) {
  const f = useStudentFilters();

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

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
            variant="primaryStudent"
            size="md"
            width="full"
            onClick={() => onOpenChange(false)}
          >
            Show {resultsCount} school{resultsCount !== 1 ? "s" : ""}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <SectionTitle>Core filters</SectionTitle>

        <Card>
          <Subtitle>Language of instruction</Subtitle>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-between rounded-[14px] bg-chip px-4 py-3 text-left text-fg-muted text-[14px]"
          >
            Select languages
            <ChevronDown size={18} />
          </button>
        </Card>

        <Card>
          <Subtitle>Mobility duration</Subtitle>
          <div className="mt-3 flex gap-2">
            {durations.map((d) => (
              <Chip
                key={d}
                active={f.durations.includes(d)}
                onClick={() =>
                  f.set({ durations: toggle(f.durations, d) })
                }
              >
                {d} months
              </Chip>
            ))}
          </div>
        </Card>

        <SectionTitle>Academic filters</SectionTitle>

        <Card>
          <Subtitle>School orientation</Subtitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {orientations.map((o) => (
              <Chip
                key={o.value}
                active={f.orientations.includes(o.value)}
                onClick={() =>
                  f.set({ orientations: toggle(f.orientations, o.value) })
                }
              >
                <span className="mr-1">{o.emoji}</span>
                {o.label}
              </Chip>
            ))}
          </div>
        </Card>

        <SectionTitle>Experience</SectionTitle>

        <Card>
          <Subtitle>Presence of exchange students</Subtitle>
          <div className="mt-3 flex gap-2">
            {presences.map((p) => (
              <Chip
                key={p}
                active={f.exchangePresence === p}
                onClick={() => f.set({ exchangePresence: p })}
                capitalize
              >
                {p}
              </Chip>
            ))}
          </div>
        </Card>

        <Card>
          <Subtitle>Type of destination</Subtitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Chip
                key={d.value}
                active={f.destinationTypes.includes(d.value)}
                onClick={() =>
                  f.set({
                    destinationTypes: toggle(f.destinationTypes, d.value),
                  })
                }
              >
                <span className="mr-1">{d.emoji}</span>
                {d.label}
              </Chip>
            ))}
          </div>
        </Card>
      </div>
    </BottomSheet>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[13px] text-fg-muted">{children}</div>;
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[15px] font-bold text-student">{children}</div>;
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
  capitalize,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  capitalize?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-4 text-[13px] font-semibold",
        active ? "bg-student text-white" : "bg-chip text-fg",
        capitalize && "capitalize",
      )}
    >
      {children}
    </button>
  );
}
