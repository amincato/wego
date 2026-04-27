"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ListTabDef {
  id: string;
  label: string;
  count?: number;
  content: ReactNode;
}

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
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
                isActive
                  ? "bg-bg text-fg shadow-sm"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {tab.label}
              {typeof tab.count === "number" ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    isActive ? "bg-chip text-fg-muted" : "bg-bg/60 text-fg-muted",
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
