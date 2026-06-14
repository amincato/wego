"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertCircle, Megaphone, Pin, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { BroadcastModal } from "@/components/dashboard/broadcast-modal";
import {
  emergencyWorkflows,
  inboxConversations,
} from "@/lib/mock/dashboard-messages";
import { cn } from "@/lib/utils";
import type { InboxConversation } from "@/lib/mock/dashboard-messages";

const ROLE_LABEL: Record<InboxConversation["withRole"], string> = {
  student: "Student",
  family: "Host family",
  buddy: "Buddy",
  school: "Partner school",
};

const ROLE_TONE: Record<InboxConversation["withRole"], string> = {
  student: "bg-student/15 text-student",
  family: "bg-family/15 text-family",
  buddy: "bg-fg/10 text-fg",
  school: "bg-school/15 text-school",
};

type RoleFilter = "all" | InboxConversation["withRole"];

const FILTER_LABEL: Record<RoleFilter, string> = {
  all: "All",
  student: "Students",
  family: "Host families",
  buddy: "Buddies",
  school: "Partner schools",
};

const FILTER_ACTIVE: Record<RoleFilter, string> = {
  all: "bg-fg text-white",
  student: "bg-student text-white",
  family: "bg-family text-white",
  buddy: "bg-fg text-white",
  school: "bg-school text-white",
};

const FILTERS: RoleFilter[] = [
  "all",
  "student",
  "family",
  "buddy",
  "school",
];

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
  const [filter, setFilter] = useState<RoleFilter>("all");
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  /* Full recipient list for the broadcast modal, grouped by the
   * 6 audience buckets the coordinator broadcasts to. Avatars reuse
   * the same local assets we already ship for the rest of the demo. */
  const broadcastRecipients = useMemo<
    Array<{
      id: string;
      name: string;
      avatarUrl: string;
      role:
        | "hosted_student"
        | "incoming_student"
        | "outgoing_student"
        | "abroad_student"
        | "hosting_family"
        | "future_family";
    }>
  >(
    () => [
      // Hosted students (currently at FSG)
      {
        id: "r_carlo",
        name: "Carlo Liberti",
        avatarUrl: "/carlo-liberti.png",
        role: "hosted_student",
      },
      {
        id: "r_alessandro",
        name: "Alessandro Greco",
        avatarUrl:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=200&q=80",
        role: "hosted_student",
      },
      {
        id: "r_sophie",
        name: "Sophie Laurent",
        avatarUrl: "/students/confirmed/p6.png",
        role: "hosted_student",
      },
      {
        id: "r_carmen",
        name: "Carmen Ruiz",
        avatarUrl: "/students/confirmed/p7.png",
        role: "hosted_student",
      },
      // Incoming students (confirmed for next term)
      {
        id: "r_lily",
        name: "Lily Louise Jacob",
        avatarUrl: "/students/confirmed/p8.png",
        role: "incoming_student",
      },
      {
        id: "r_pablo",
        name: "Pablo García",
        avatarUrl: "/students/confirmed/p2.png",
        role: "incoming_student",
      },
      {
        id: "r_marco",
        name: "Marco Conti",
        avatarUrl: "/students/confirmed/p5.png",
        role: "incoming_student",
      },
      {
        id: "r_camille",
        name: "Camille Dubois",
        avatarUrl: "/students/confirmed/p10.png",
        role: "incoming_student",
      },
      {
        id: "r_giulia",
        name: "Giulia Bianchi",
        avatarUrl: "/students/confirmed/p9.png",
        role: "incoming_student",
      },
      {
        id: "r_lucas",
        name: "Lucas Martin",
        avatarUrl: "/students/confirmed/p3.png",
        role: "incoming_student",
      },
      // Outgoing students (FSG students leaving abroad next term)
      {
        id: "r_jonas",
        name: "Jonas Weber",
        avatarUrl: "/lukas-weber.png",
        role: "outgoing_student",
      },
      {
        id: "r_lena",
        name: "Lena Krüger",
        avatarUrl: "/giorgio-monti.png",
        role: "outgoing_student",
      },
      // Students currently abroad
      {
        id: "r_giorgia",
        name: "Giorgia Bernardi",
        avatarUrl: "/matthis-bernard.jpg",
        role: "abroad_student",
      },
      // Hosting families (currently matched with a student)
      {
        id: "r_family_rath",
        name: "Family Rath",
        avatarUrl: "/families/rath/avatar.png",
        role: "hosting_family",
      },
      {
        id: "r_family_taununsanlage",
        name: "Family Taununsanlage",
        avatarUrl:
          "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=200&q=80",
        role: "hosting_family",
      },
      {
        id: "r_family_lenz",
        name: "Family Lenz",
        avatarUrl: "/families/lenz.jpg",
        role: "hosting_family",
      },
      {
        id: "r_family_stiefel",
        name: "Family Stiefel",
        avatarUrl: "/families/stiefel.jpg",
        role: "hosting_family",
      },
      // Future host families (allowed to host, awaiting a match)
      {
        id: "r_family_schmidt",
        name: "Family Schmidt",
        avatarUrl:
          "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=200&q=80",
        role: "future_family",
      },
      {
        id: "r_family_klum",
        name: "Family Klum",
        avatarUrl:
          "https://images.unsplash.com/photo-1602407294553-6ac9170de9eb?auto=format&fit=crop&w=200&q=80",
        role: "future_family",
      },
    ],
    [],
  );

  // Hard-coded to 1 for the demo — keeps the notification dot single-digit
  // and matches what the user wants the topbar to communicate.
  void emergencyWorkflows;
  const openEmergencies = 1;

  const filtered = inboxConversations.filter((c) => {
    if (filter !== "all" && c.withRole !== filter) return false;
    if (!query) return true;
    return (
      c.withName.toLowerCase().includes(query.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  });

  const active = inboxConversations.find((c) => c.id === activeId);

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Your ongoing conversations."
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBroadcastOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-white hover:bg-fg/90"
            >
              <Megaphone className="size-4" strokeWidth={2.2} />
              Broadcast message
            </button>
            <div className="relative">
              <Link
                href="/messages/emergencies"
                className="inline-flex items-center gap-2 rounded-full bg-danger-bg/60 px-4 py-2 text-sm font-bold text-danger-fg hover:bg-danger-bg"
              >
                <AlertCircle className="size-4" strokeWidth={2.4} />
                Emergencies
              </Link>
              {openEmergencies > 0 ? (
                <span className="pointer-events-none absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-danger-fg text-[10px] font-bold leading-none text-white ring-2 ring-bg">
                  {openEmergencies}
                </span>
              ) : null}
            </div>
          </div>
        }
      />

      {/* Role filter chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setFilter(r)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-colors",
              filter === r
                ? cn(FILTER_ACTIVE[r], "shadow-sm")
                : "bg-chip text-fg-muted hover:text-fg",
            )}
          >
            {FILTER_LABEL[r]}
          </button>
        ))}
      </div>

      <div className="grid h-[calc(100dvh-15rem)] min-h-[540px] gap-4 lg:grid-cols-[340px_1fr]">
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
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          ROLE_TONE[c.withRole],
                        )}
                      >
                        {ROLE_LABEL[c.withRole]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-fg-muted">
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unread > 0 ? (
                    <span className="ml-2 grid size-5 shrink-0 place-items-center rounded-full bg-success-bg/50 text-[10px] font-bold leading-none text-success-fg">
                      {c.unread}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Active conversation */}
        <div className="h-full min-h-0">
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

      <BroadcastModal
        open={broadcastOpen}
        onOpenChange={setBroadcastOpen}
        recipients={broadcastRecipients}
      />
    </>
  );
}
