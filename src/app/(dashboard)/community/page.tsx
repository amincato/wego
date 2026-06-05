"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Heart,
  MapPin,
  MessageCircle,
  Plus,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import { communityEntries } from "@/lib/mock/dashboard-community";
import { currentCoordinator } from "@/lib/mock/coordinator";
import { mySchool } from "@/lib/mock/my-school";
import type { CommunityEntry } from "@/lib/types-dashboard";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
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
    () =>
      communityEntries.filter(
        (e) => e.kind === "post" || e.kind === "update",
      ),
    [],
  );

  const participants = useMemo<Participant[]>(() => {
    const list: Participant[] = [];

    // Coordinator
    list.push({
      id: currentCoordinator.id,
      name: `${currentCoordinator.firstName} ${currentCoordinator.lastName}`,
      avatarUrl: currentCoordinator.avatarUrl,
      role: "Coordinator",
      city: mySchool.city,
      country: mySchool.country,
    });

    // 4 students currently hosted
    list.push(
      {
        id: "student_carlo",
        name: "Carlo Liberti",
        avatarUrl: "/carlo-liberti.png",
        role: "Student",
        city: "Milan",
        country: "it",
      },
      {
        id: "student_alessandro_greco",
        name: "Alessandro Greco",
        avatarUrl:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=200&q=80",
        role: "Student",
        city: "Naples",
        country: "it",
      },
      {
        id: "student_sophie_laurent",
        name: "Sophie Laurent",
        avatarUrl:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
        role: "Student",
        city: "Nantes",
        country: "fr",
      },
      {
        id: "student_carmen_ruiz",
        name: "Carmen Ruiz",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        role: "Student",
        city: "Barcelona",
        country: "es",
      },
    );

    // 4 host families currently hosting students
    list.push(
      {
        id: "family_taununsanlage",
        name: "Family Taununsanlage",
        avatarUrl:
          "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
        role: "Host family",
        city: "Rostock",
        country: "Germany",
      },
      {
        id: "family_lenz",
        name: "Family Lenz",
        avatarUrl:
          "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=600&q=80",
        role: "Host family",
        city: "Rostock",
        country: "Germany",
      },
      {
        id: "family_stiefel",
        name: "Family Stiefel",
        avatarUrl:
          "https://images.unsplash.com/photo-1602407294553-6ac9170de9eb?auto=format&fit=crop&w=600&q=80",
        role: "Host family",
        city: "Rostock",
        country: "Germany",
      },
      {
        id: "family_rath",
        name: "Family Rath",
        avatarUrl: "/families/rath/avatar.png",
        role: "Host family",
        city: "Rostock",
        country: "Germany",
      },
    );

    // 2 buddies — students of FSG who help newcomers
    list.push(
      {
        id: "buddy_alex_willheim",
        name: "Alex Willheim",
        avatarUrl: "/community/buddy-alex-willheim.png",
        role: "Buddy",
        city: "Rostock",
        country: "de",
      },
      {
        id: "buddy_amelie_rotwurf",
        name: "Amélie Rotwürf",
        avatarUrl: "/community/buddy-amelie-rotwurf.png",
        role: "Buddy",
        city: "Rostock",
        country: "de",
      },
    );

    return list;
  }, []);

  return (
    <>
      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-3">
            School community
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-fg ring-1 ring-divider">
              AY 2025/26
            </span>
          </span>
        }
        subtitle="Posts, events and participants of your school's exchange community."
      />

      <div className="mx-auto mt-4 max-w-2xl">
        <ProfileTabs
          accent="neutral"
          tabs={[
            {
              id: "posts",
              label: "Posts",
              content: <PostsTab posts={posts} />,
              action: (
                <button className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-white hover:bg-fg/90">
                  <Plus className="size-4" />
                  New post
                </button>
              ),
            },
            {
              id: "events",
              label: "Events",
              content: <EventsTab events={events} />,
              action: (
                <button className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-white hover:bg-fg/90">
                  <Plus className="size-4" />
                  New event
                </button>
              ),
            },
            {
              id: "participants",
              label: "Participants",
              content: <ParticipantsTab participants={participants} />,
            },
          ]}
        />
      </div>
    </>
  );
}

/* ----------------------------- Posts ----------------------------- */

function PostsTab({ posts }: { posts: CommunityEntry[] }) {
  return (
    <ul className="flex flex-col gap-5">
      {posts.map((p) => (
        <li key={p.id}>
          <PostCard entry={p} />
        </li>
      ))}
    </ul>
  );
}

function PostCard({ entry }: { entry: CommunityEntry }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="rounded-card-lg bg-surface px-5 py-5 ring-1 ring-divider">
      <div className="flex items-center gap-3">
        <span
          className="size-10 rounded-full bg-chip bg-cover bg-center"
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
      </div>

      {entry.title ? (
        <h3 className="mt-4 text-base font-bold text-fg">{entry.title}</h3>
      ) : null}
      <p
        className={cn(
          "whitespace-pre-line text-sm leading-relaxed text-fg",
          entry.title ? "mt-1" : "mt-4",
        )}
      >
        {entry.body}
      </p>

      {entry.imageUrls && entry.imageUrls.length > 0 ? (
        <div
          className={cn(
            "mt-4 grid w-full max-w-md gap-2",
            entry.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {entry.imageUrls.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-input bg-chip"
            >
              <Image
                src={src}
                alt={`${entry.authorName} – photo ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 14rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : entry.imageUrl ? (
        <div className="relative mt-4 aspect-[16/10] w-full max-w-md overflow-hidden rounded-input">
          <Image
            src={entry.imageUrl}
            alt={entry.title || entry.authorName}
            fill
            sizes="(max-width: 1024px) 100vw, 28rem"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-5 border-t border-divider pt-3 text-sm text-fg-muted">
        <button
          onClick={() => setLiked((v) => !v)}
          className="inline-flex items-center gap-1.5 hover:text-family"
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              liked && "fill-family text-family",
            )}
          />
          <span className="font-semibold">{entry.likeCount ?? 10}</span>
        </button>
        <button className="inline-flex items-center gap-1.5 hover:text-fg">
          <MessageCircle className="size-[1.05rem]" strokeWidth={2.4} />
          <span className="font-semibold">{entry.comments?.length ?? 1}</span>
        </button>
      </div>

      {entry.comments && entry.comments.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3 border-t border-divider pt-4">
          {entry.comments.map((c) => (
            <li key={c.id} className="flex items-start gap-3">
              <span
                className="size-8 shrink-0 rounded-full bg-chip bg-cover bg-center"
                style={{ backgroundImage: `url(${c.authorAvatarUrl})` }}
              />
              <div className="min-w-0 flex-1 rounded-input bg-bg px-3 py-2 ring-1 ring-divider">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-fg">
                    {c.authorName}
                  </span>
                  <span className="text-[11px] text-fg-subtle">
                    {fmtRelative(c.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-fg">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/* ----------------------------- Events ---------------------------- */

function EventsTab({ events }: { events: CommunityEntry[] }) {
  const upcoming = events.filter(
    (e) => e.eventDate && new Date(e.eventDate).getTime() >= Date.now(),
  );
  const past = events.filter(
    (e) => e.eventDate && new Date(e.eventDate).getTime() < Date.now(),
  );
  return (
    <div>
      {upcoming.length === 0 ? (
        <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
          No upcoming events.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {upcoming.map((e) => (
            <li key={e.id}>
              <EventCard entry={e} />
            </li>
          ))}
        </ul>
      )}
      {past.length > 0 ? (
        <div className="mt-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-fg-subtle">
            Past events
          </h3>
          <ul className="flex flex-col gap-5">
            {past.map((e) => (
              <li key={e.id}>
                <EventCard entry={e} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function EventCard({ entry }: { entry: CommunityEntry }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="rounded-card-lg bg-surface px-5 py-5 ring-1 ring-divider">
      <div className="flex items-center gap-3">
        <span
          className="size-10 rounded-full bg-chip bg-cover bg-center"
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
      </div>

      {entry.title ? (
        <h3 className="mt-4 text-base font-bold text-fg">{entry.title}</h3>
      ) : null}
      <p
        className={cn(
          "whitespace-pre-line text-sm leading-relaxed text-fg",
          entry.title ? "mt-1" : "mt-4",
        )}
      >
        {entry.body}
      </p>

      {entry.eventDate ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-input bg-bg p-3 text-sm ring-1 ring-divider">
          <span className="inline-flex items-center gap-1 font-bold text-student">
            <CalendarDays className="size-4" />
            {fmtAhead(entry.eventDate)}
          </span>
          {entry.eventLocation ? (
            <span className="inline-flex items-center gap-1 text-fg-muted">
              <MapPin className="size-3.5" />
              {entry.eventLocation}
            </span>
          ) : null}
        </div>
      ) : null}

      {entry.imageUrls && entry.imageUrls.length > 0 ? (
        <div
          className={cn(
            "mt-4 grid w-full max-w-sm items-start gap-2",
            entry.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {entry.imageUrls.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${entry.authorName} – photo ${i + 1}`}
              className="h-auto w-full rounded-input"
            />
          ))}
        </div>
      ) : entry.imageUrl ? (
        <div className="relative mt-4 aspect-[16/10] w-full max-w-md overflow-hidden rounded-input">
          <Image
            src={entry.imageUrl}
            alt={entry.title || entry.authorName}
            fill
            sizes="(max-width: 1024px) 100vw, 28rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-5 border-t border-divider pt-3 text-sm text-fg-muted">
        <button
          onClick={() => setLiked((v) => !v)}
          className="inline-flex items-center gap-1.5 hover:text-family"
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              liked && "fill-family text-family",
            )}
          />
          <span className="font-semibold">{entry.likeCount ?? 10}</span>
        </button>
        <button className="inline-flex items-center gap-1.5 hover:text-fg">
          <MessageCircle className="size-[1.05rem]" strokeWidth={2.4} />
          <span className="font-semibold">{entry.comments?.length ?? 0}</span>
        </button>
      </div>

      {entry.comments && entry.comments.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3 border-t border-divider pt-4">
          {entry.comments.map((c) => (
            <li key={c.id} className="flex items-start gap-3">
              <span
                className="size-8 shrink-0 rounded-full bg-chip bg-cover bg-center"
                style={{ backgroundImage: `url(${c.authorAvatarUrl})` }}
              />
              <div className="min-w-0 flex-1 rounded-input bg-bg px-3 py-2 ring-1 ring-divider">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-fg">
                    {c.authorName}
                  </span>
                  <span className="text-[11px] text-fg-subtle">
                    {fmtRelative(c.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-fg">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/* -------------------------- Participants ------------------------- */

interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
  role: "Coordinator" | "Student" | "Host family" | "Buddy";
  city: string;
  country: string;
}

const ROLE_TONE: Record<Participant["role"], string> = {
  Coordinator: "bg-fg/10 text-fg",
  Student: "bg-student/15 text-student",
  "Host family": "bg-family/15 text-family",
  Buddy: "bg-school/15 text-school",
};

const ROLE_LABEL_PLURAL: Record<Participant["role"], string> = {
  Coordinator: "Coordinators",
  Student: "Students",
  "Host family": "Host families",
  Buddy: "Buddies",
};

function ParticipantsTab({ participants }: { participants: Participant[] }) {
  const [filter, setFilter] = useState<"all" | Participant["role"]>("all");
  const visible = participants.filter(
    (p) => filter === "all" || p.role === filter,
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", "Student", "Host family", "Buddy"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={cn(
                "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
                filter === r
                  ? "bg-fg text-white shadow-sm"
                  : "bg-chip text-fg-muted hover:text-fg",
              )}
            >
              {r === "all" ? "All" : ROLE_LABEL_PLURAL[r]}
            </button>
          ))}
        </div>
        <p className="t-caption ml-auto text-fg-muted">
          {participants.length} people in the community
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-3 rounded-input bg-surface px-4 py-3 ring-1 ring-divider"
          >
            <span
              className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
              style={{ backgroundImage: `url(${p.avatarUrl})` }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-fg">
                {p.name}
              </div>
              <div className="text-xs text-fg-muted">
                <MapPin className="mr-1 inline size-3" />
                {p.city}
                {p.role === "Student" && FLAGS[p.country]
                  ? ` · ${FLAGS[p.country]}`
                  : ""}
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                ROLE_TONE[p.role],
              )}
            >
              {p.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
