"use client";

import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  BadgeCheck,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCommunityStore } from "@/lib/store/community";
import type { CommunityPost } from "@/lib/mock/community";

export function FeedPost({ post }: { post: CommunityPost }) {
  const liked = useCommunityStore((s) => !!s.liked[post.id]);
  const reposted = useCommunityStore((s) => !!s.reposted[post.id]);
  const toggleLike = useCommunityStore((s) => s.toggleLike);
  const toggleRepost = useCommunityStore((s) => s.toggleRepost);

  const [replyCount] = useState(post.replies);
  const likeCount = post.likes + (liked ? 1 : 0);
  const repostCount = post.reposts + (reposted ? 1 : 0);

  return (
    <article className="flex gap-3 border-b border-divider px-4 py-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.author.avatarUrl}
        alt={post.author.name}
        className="size-11 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[14px] font-bold text-fg">
            {post.author.name}
          </span>
          {post.author.verified && (
            <BadgeCheck
              size={15}
              className="shrink-0 fill-student text-bg"
              aria-label="Verified"
            />
          )}
          <RoleBadge role={post.author.role} />
          <span className="truncate text-[13px] text-fg-subtle">
            {post.author.handle} · {formatTime(post.hoursAgo)}
          </span>
          <button
            className="ml-auto flex size-7 items-center justify-center rounded-full text-fg-subtle transition hover:bg-chip"
            aria-label="More"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-fg">
          {post.content}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-2 text-[13px] text-student">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        {post.imageUrl && (
          <div className="mt-3 overflow-hidden rounded-[16px] ring-1 ring-divider">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="block aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between pr-6 text-fg-muted">
          <Action
            icon={<MessageCircle size={16} />}
            count={replyCount}
            color="student"
            onClick={() => {}}
          />
          <Action
            icon={<Repeat2 size={16} />}
            count={repostCount}
            color="success"
            active={reposted}
            onClick={() => toggleRepost(post.id)}
          />
          <Action
            icon={
              <Heart
                size={16}
                fill={liked ? "currentColor" : "none"}
              />
            }
            count={likeCount}
            color="danger"
            active={liked}
            onClick={() => toggleLike(post.id)}
          />
          <Action
            icon={<Share size={16} />}
            color="student"
            onClick={() => {}}
          />
        </div>
      </div>
    </article>
  );
}

function Action({
  icon,
  count,
  color,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  count?: number;
  color: "student" | "success" | "danger";
  active?: boolean;
  onClick: () => void;
}) {
  const colorClass =
    color === "student"
      ? "group-hover:text-student group-hover:bg-student/10"
      : color === "success"
        ? "group-hover:text-success-fg group-hover:bg-success-bg/30"
        : "group-hover:text-danger-fg group-hover:bg-danger-bg/30";
  const activeClass =
    active &&
    (color === "danger"
      ? "text-danger-fg"
      : color === "success"
        ? "text-success-fg"
        : "text-student");

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-1.5 text-[12px] font-medium transition",
        activeClass || "text-fg-muted",
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition",
          colorClass,
        )}
      >
        {icon}
      </span>
      {count !== undefined && count > 0 && <span>{formatCount(count)}</span>}
    </button>
  );
}

function RoleBadge({ role }: { role: CommunityPost["author"]["role"] }) {
  const label =
    role === "school"
      ? "School"
      : role === "alumni"
        ? "Alumni"
        : role === "family"
          ? "Host"
          : "Student";
  const cls =
    role === "school"
      ? "bg-student/15 text-student"
      : role === "family"
        ? "bg-family/15 text-family"
        : role === "alumni"
          ? "bg-chip text-fg-muted"
          : "bg-student/15 text-student";
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-1.5 py-[1px] text-[10px] font-semibold",
        cls,
      )}
    >
      {label}
    </span>
  );
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function formatTime(hoursAgo: number) {
  if (hoursAgo < 1) return "now";
  if (hoursAgo < 24) return `${hoursAgo}h`;
  const days = Math.floor(hoursAgo / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}
