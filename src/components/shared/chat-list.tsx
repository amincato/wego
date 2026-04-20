"use client";

import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBar } from "./status-bar";
import { EmptyState } from "./empty-state";
import { useMessagesStore } from "@/lib/store/messages";
import { useUser } from "@/lib/hooks/use-user";
import type { ActiveView } from "@/lib/types";

export function ChatList({
  basePath,
  myView,
}: {
  basePath: "/student" | "/family";
  myView: ActiveView;
}) {
  const user = useUser();
  const threads = useMessagesStore((s) => s.threads);
  const [query, setQuery] = useState("");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
  }, []);

  const myId = user?.id ?? defaultUserId(myView);

  const myThreads = useMemo(() => {
    return [...threads]
      .filter((t) => t.participants.some((p) => p.userId === myId))
      .filter((t) => {
        if (!query.trim()) return true;
        const other = t.participants.find((p) => p.userId !== myId);
        const last = t.messages[t.messages.length - 1];
        const haystack = [other?.name, last?.text].join(" ").toLowerCase();
        return haystack.includes(query.toLowerCase().trim());
      })
      .sort(
        (a, b) =>
          new Date(b.lastMessageAt).getTime() -
          new Date(a.lastMessageAt).getTime(),
      );
  }, [threads, myId, query]);

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">Chat</h1>
        <p className="mt-1 text-[14px] text-fg-muted">
          Your ongoing conversations
        </p>

        <div className="mt-4 flex h-11 items-center gap-2 rounded-full bg-surface px-4 ring-1 ring-divider">
          <Search size={16} className="text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {myThreads.length === 0 && (
            <EmptyState
              icon={<MessageCircle size={22} />}
              title="No conversations yet"
              description="Start chatting with students, families or schools to see them here."
            />
          )}
          {myThreads.map((t) => {
            const other = t.participants.find((p) => p.userId !== myId)!;
            const last = t.messages[t.messages.length - 1];
            const mineLast = last?.from === myId;
            return (
              <Link
                key={t.id}
                href={`${basePath}/chat/${t.id}`}
                className="flex items-center gap-3 rounded-[18px] bg-surface p-3 ring-1 ring-divider transition active:scale-[0.99]"
              >
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={other.avatarUrl}
                    alt={other.name}
                    className="size-12 rounded-full object-cover"
                  />
                  <span className="absolute right-0 bottom-0 size-3 rounded-full bg-[#4eff86] ring-2 ring-surface" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[14px] font-bold text-fg">
                      {other.name}
                    </div>
                    <div className="shrink-0 text-[11px] text-fg-subtle">
                      {now ? formatRelative(t.lastMessageAt, now) : ""}
                    </div>
                  </div>
                  <div className="truncate text-[13px] text-fg-muted">
                    {mineLast && (
                      <span className="text-fg-subtle">You: </span>
                    )}
                    {last?.text ?? "No messages yet"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function defaultUserId(view: ActiveView) {
  return view === "student" ? "user_giorgia" : "user_rath";
}

function formatRelative(iso: string, nowMs: number) {
  const date = new Date(iso);
  const ms = nowMs - date.getTime();
  const mins = Math.floor(ms / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString("en", { day: "numeric", month: "short" });
}
