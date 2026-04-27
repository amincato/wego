"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  Heart,
  MapPin,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { communityEntries } from "@/lib/mock/dashboard-community";
import type { CommunityEntry, CommunityKind } from "@/lib/types-dashboard";
import { cn } from "@/lib/utils";

const KIND_META: Record<
  CommunityKind,
  { label: string; tone: string; icon: React.ReactNode }
> = {
  event: {
    label: "Event",
    tone: "bg-family/15 text-family",
    icon: <CalendarDays className="size-4" />,
  },
  post: {
    label: "Post",
    tone: "bg-student/15 text-student",
    icon: <MessageCircle className="size-4" />,
  },
  update: {
    label: "Update",
    tone: "bg-school/15 text-school",
    icon: <Sparkles className="size-4" />,
  },
};

function fmtRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function fmtAhead(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CommunityPage() {
  const events = useMemo(
    () => communityEntries.filter((e) => e.kind === "event"),
    [],
  );
  const posts = useMemo(
    () => communityEntries.filter((e) => e.kind === "post"),
    [],
  );
  const updates = useMemo(
    () => communityEntries.filter((e) => e.kind === "update"),
    [],
  );

  return (
    <>
      <PageHeader
        title="Community"
        subtitle="Events, posts and updates from your school's exchange programme."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/my-school"
              className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              <ChevronLeft className="size-4" />
              Back
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full bg-school px-4 py-2 text-sm font-bold text-white hover:bg-school-accent">
              <Plus className="size-4" />
              New post
            </button>
          </div>
        }
      />

      <ListTabs
        tabs={[
          {
            id: "all",
            label: "All",
            count: communityEntries.length,
            content: <Feed items={communityEntries} />,
          },
          {
            id: "events",
            label: "Events",
            count: events.length,
            content: <Feed items={events} />,
          },
          {
            id: "posts",
            label: "Posts",
            count: posts.length,
            content: <Feed items={posts} />,
          },
          {
            id: "updates",
            label: "Updates",
            count: updates.length,
            content: <Feed items={updates} />,
          },
        ]}
      />
    </>
  );
}

function Feed({ items }: { items: CommunityEntry[] }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {items.map((e) => (
        <li key={e.id}>
          <Card entry={e} />
        </li>
      ))}
    </ul>
  );
}

function Card({ entry }: { entry: CommunityEntry }) {
  const meta = KIND_META[entry.kind];
  const [liked, setLiked] = useState(false);

  return (
    <article className="overflow-hidden rounded-card-lg bg-surface ring-1 ring-divider">
      {entry.imageUrl ? (
        <div className="relative aspect-[16/9] w-full bg-chip">
          <Image
            src={entry.imageUrl}
            alt={entry.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-center gap-3">
          <span
            className="size-9 rounded-full bg-chip bg-cover bg-center"
            style={{ backgroundImage: `url(${entry.authorAvatarUrl})` }}
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-fg">
              {entry.authorName}
            </div>
            <div className="text-xs text-fg-subtle">
              {fmtRelative(entry.createdAt)}
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
              meta.tone,
            )}
          >
            {meta.icon}
            {meta.label}
          </span>
        </div>

        <h3 className="mt-4 text-base font-bold text-fg">{entry.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">
          {entry.body}
        </p>

        {entry.kind === "event" && entry.eventDate ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-input bg-bg p-3 text-sm ring-1 ring-divider">
            <span className="inline-flex items-center gap-1 font-bold text-family">
              <CalendarDays className="size-4" />
              {fmtAhead(entry.eventDate)}
            </span>
            {entry.eventLocation ? (
              <span className="inline-flex items-center gap-1 text-fg-muted">
                <MapPin className="size-3.5" />
                {entry.eventLocation}
              </span>
            ) : null}
            <button className="ml-auto rounded-full bg-family px-3 py-1 text-xs font-bold text-white hover:brightness-105">
              RSVP
            </button>
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-4 border-t border-divider pt-3 text-xs text-fg-muted">
          <button
            onClick={() => setLiked((v) => !v)}
            className="inline-flex items-center gap-1.5 hover:text-family"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                liked && "fill-family text-family",
              )}
            />
            {liked ? "Liked" : "Like"}
          </button>
          <button className="inline-flex items-center gap-1.5 hover:text-fg">
            <MessageCircle className="size-4" />
            Comment
          </button>
        </div>
      </div>
    </article>
  );
}
