"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ListTabAccent = "default" | "student" | "family" | "school";

export interface ListTabDef {
  id: string;
  label: string;
  count?: number;
  content: ReactNode;
  accent?: ListTabAccent;
}

const ACTIVE_BG: Record<ListTabAccent, string> = {
  default: "bg-bg text-fg shadow-sm",
  student: "bg-student text-white shadow-sm",
  family: "bg-family text-white shadow-sm",
  school: "bg-school text-white shadow-sm",
};

const ACTIVE_COUNT: Record<ListTabAccent, string> = {
  default: "bg-chip text-fg-muted",
  student: "bg-white/25 text-white",
  family: "bg-white/25 text-white",
  school: "bg-white/25 text-white",
};

export function ListTabs({
  tabs,
  defaultTab,
}: {
  tabs: ListTabDef[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-full bg-chip p-1">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const accent: ListTabAccent = tab.accent ?? "default";
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
                isActive
                  ? ACTIVE_BG[accent]
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {tab.label}
              {typeof tab.count === "number" ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    isActive ? ACTIVE_COUNT[accent] : "bg-bg/60 text-fg-muted",
                  )}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-6">{current?.content}</div>
    </div>
  );
}
