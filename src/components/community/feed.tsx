"use client";

import { useMemo, useState } from "react";
import { StatusBar } from "@/components/shared/status-bar";
import { Composer } from "./composer";
import { FeedPost } from "./feed-post";
import { useCombinedFeed } from "@/lib/store/community";
import type { ActiveView } from "@/lib/types";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "for_you", label: "For you" },
  { id: "schools", label: "Schools" },
  { id: "alumni", label: "Alumni" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function CommunityFeed({ view }: { view: ActiveView }) {
  const [tab, setTab] = useState<TabId>("for_you");
  const posts = useCombinedFeed();

  const filtered = useMemo(() => {
    switch (tab) {
      case "schools":
        return posts.filter((p) => p.author.role === "school");
      case "alumni":
        return posts.filter((p) => p.author.role === "alumni");
      default:
        return posts;
    }
  }, [posts, tab]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur">
        <StatusBar />
        <div className="px-4 pb-3">
          <h1 className="h-display text-fg">Community</h1>
          <p className="mt-1 text-[13px] text-fg-muted">
            What the wego community is talking about right now
          </p>
        </div>

        <div className="flex items-center gap-1 border-b border-divider px-2">
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex-1 px-3 py-3 text-[13px] font-semibold transition",
                  active ? "text-fg" : "text-fg-muted",
                )}
              >
                {t.label}
                {active && (
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-px h-[3px] rounded-full",
                      view === "family" ? "bg-family" : "bg-student",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Composer view={view} />

      <div className="flex flex-col">
        {filtered.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>

      <div className="pb-4 pt-6 text-center text-[12px] text-fg-subtle">
        You&apos;ve reached the end of the feed ✨
      </div>
    </div>
  );
}
