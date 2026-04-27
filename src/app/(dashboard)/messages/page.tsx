"use client";

import Link from "next/link";
import { useState } from "react";
import { LifeBuoy, Pin, Search, Triangle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { inboxConversations } from "@/lib/mock/dashboard-messages";
import { cn } from "@/lib/utils";
import type { InboxConversation } from "@/lib/mock/dashboard-messages";

const ROLE_LABEL: Record<InboxConversation["withRole"], string> = {
  student: "Student",
  family: "Family",
  school: "Partner school",
};

function fmt(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(inboxConversations[0]?.id);
  const [query, setQuery] = useState("");

  const filtered = inboxConversations.filter(
    (c) =>
      c.withName.toLowerCase().includes(query.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(query.toLowerCase()),
  );

  const active = inboxConversations.find((c) => c.id === activeId);

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Inbox, support tickets and emergency workflows."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/messages/tickets"
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              <LifeBuoy className="size-4" />
              Tickets
            </Link>
            <Link
              href="/messages/emergencies"
              className="inline-flex items-center gap-2 rounded-full bg-danger-bg/60 px-3 py-2 text-sm font-bold text-danger-fg hover:bg-danger-bg"
            >
              <Triangle className="size-4" />
              Emergencies
            </Link>
          </div>
        }
      />

      <div className="grid h-[640px] gap-4 lg:grid-cols-[340px_1fr]">
        {/* Inbox list */}
        <aside className="flex min-h-0 flex-col rounded-card-lg bg-surface ring-1 ring-divider">
          <div className="border-b border-divider p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-fg-subtle" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations…"
                className="h-9 w-full rounded-full bg-bg pl-8 pr-3 text-sm outline-none ring-1 ring-divider focus:ring-student"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-divider/60 px-4 py-3 text-left transition-colors",
                    activeId === c.id ? "bg-chip/60" : "hover:bg-chip/30",
                  )}
                >
                  <span
                    className="size-10 shrink-0 rounded-full bg-chip bg-cover bg-center"
                    style={{ backgroundImage: `url(${c.withAvatarUrl})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-sm font-bold text-fg">
                        {c.withName}
                      </span>
                      {c.pinned ? (
                        <Pin className="size-3 text-fg-subtle" />
                      ) : null}
                      <span className="ml-auto shrink-0 text-[10px] text-fg-subtle">
                        {fmt(c.lastAt)}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="rounded-full bg-chip px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                        {ROLE_LABEL[c.withRole]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-fg-muted">
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unread > 0 ? (
                    <span className="ml-2 grid size-5 shrink-0 place-items-center rounded-full bg-student text-[10px] font-bold leading-none text-white">
                      {c.unread}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Active conversation */}
        <div className="min-h-0">
          {active ? (
            <ChatPanel
              withName={active.withName}
              withAvatar={active.withAvatarUrl}
              initialMessages={[
                {
                  id: "i1",
                  fromMe: false,
                  text: active.lastMessage,
                  time: fmt(active.lastAt) + " ago",
                },
                {
                  id: "i2",
                  fromMe: true,
                  text: "Hi! Thanks for reaching out, I'll get back to you shortly.",
                  time: "now",
                },
              ]}
            />
          ) : (
            <div className="grid h-full place-items-center rounded-card-lg bg-surface text-fg-muted ring-1 ring-divider">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </>
  );
}
