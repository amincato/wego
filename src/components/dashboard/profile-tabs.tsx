"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

export function ProfileTabs({
  tabs,
  defaultTab,
}: {
  tabs: TabDef[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-1 border-b border-divider">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-student" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="pt-6">{current?.content}</div>
    </div>
  );
}
