"use client";

import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
  /** Optional action rendered on the right of the tab bar when this tab is active. */
  action?: ReactNode;
}

const ACCENT_BAR: Record<"student" | "family" | "school" | "neutral", string> =
  {
    student: "bg-student",
    family: "bg-family",
    school: "bg-school",
    neutral: "bg-fg",
  };

const ACCENT_TEXT: Record<"student" | "family" | "school" | "neutral", string> =
  {
    student: "text-student",
    family: "text-family",
    school: "text-school",
    neutral: "text-fg",
  };

export function ProfileTabs({
  tabs,
  defaultTab,
  accent = "student",
}: {
  tabs: TabDef[];
  defaultTab?: string;
  accent?: "student" | "family" | "school" | "neutral";
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const handleSelect = (id: string) => {
    setActive(id);
    // Skip scrolling on the initial mount; only scroll on actual user clicks.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    requestAnimationFrame(() => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div ref={rootRef} className="mt-6 scroll-mt-6">
      <div className="flex items-end justify-between gap-4 border-b border-divider">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id)}
                  className={cn(
                    "relative whitespace-nowrap px-4 py-3 text-sm transition-colors",
                    isActive
                      ? cn("font-bold", ACCENT_TEXT[accent])
                      : "font-semibold text-fg-muted hover:text-fg",
                  )}
                >
                  {tab.label}
                  {isActive ? (
                    <span
                      className={cn(
                        "absolute inset-x-2 -bottom-px h-1 rounded-full",
                        ACCENT_BAR[accent],
                      )}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        {current?.action ? (
          <div className="shrink-0 pb-2">{current.action}</div>
        ) : null}
      </div>
      <div className="pt-6">{current?.content}</div>
    </div>
  );
}
