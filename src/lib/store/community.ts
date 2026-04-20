"use client";

import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActiveView } from "@/lib/types";
import { communityPosts, type CommunityPost } from "@/lib/mock/community";

interface DraftPost {
  id: string;
  author: CommunityPost["author"];
  content: string;
  /** ISO string of the creation time. */
  createdAt: string;
  likes: number;
  replies: number;
  reposts: number;
}

interface CommunityState {
  /** User-authored posts, persisted in localStorage. */
  userPosts: DraftPost[];
  /** Post ids the current user liked. */
  liked: Record<string, boolean>;
  /** Post ids the current user reposted. */
  reposted: Record<string, boolean>;

  addPost: (content: string, authorView: ActiveView) => void;
  toggleLike: (postId: string) => void;
  toggleRepost: (postId: string) => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      userPosts: [],
      liked: {},
      reposted: {},

      addPost: (content, authorView) => {
        const trimmed = content.trim();
        if (!trimmed) return;
        const now = new Date();
        const post: DraftPost = {
          id: `user_post_${now.getTime()}`,
          author: {
            userId: authorView === "family" ? "user_rath" : "user_giorgia",
            name: authorView === "family" ? "Family Rath" : "Giorgia Arnoldi",
            handle:
              authorView === "family" ? "@familyrath" : "@giorgia_arnoldi",
            avatarUrl:
              authorView === "family"
                ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80"
                : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            role: authorView,
          },
          content: trimmed,
          createdAt: now.toISOString(),
          likes: 0,
          replies: 0,
          reposts: 0,
        };
        set({ userPosts: [post, ...get().userPosts] });
      },

      toggleLike: (postId) =>
        set((s) => ({ liked: { ...s.liked, [postId]: !s.liked[postId] } })),

      toggleRepost: (postId) =>
        set((s) => ({
          reposted: { ...s.reposted, [postId]: !s.reposted[postId] },
        })),
    }),
    { name: "wego_community" },
  ),
);

/** Merges seeded posts + user-authored posts with "now" as reference. */
export function useCombinedFeed(): CommunityPost[] {
  const userPosts = useCommunityStore((s) => s.userPosts);
  // Freeze "now" at mount so relative times don't re-compute every render
  // (and to keep React 19 purity linter happy).
  const [now] = useState(() => Date.now());

  const drafts: CommunityPost[] = userPosts.map((p) => ({
    id: p.id,
    author: p.author,
    content: p.content,
    hoursAgo: Math.max(
      0,
      Math.round((now - new Date(p.createdAt).getTime()) / 3_600_000),
    ),
    likes: p.likes,
    replies: p.replies,
    reposts: p.reposts,
    audience: "all",
  }));

  return [...drafts, ...communityPosts];
}
