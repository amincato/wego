"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatThread, Message } from "@/lib/types";
import { threads as seedThreads } from "@/lib/mock/threads";

interface MessagesState {
  threads: ChatThread[];
  getThread: (id: string) => ChatThread | undefined;
  getThreadsForUser: (userId: string) => ChatThread[];
  sendMessage: (threadId: string, from: string, text: string) => void;
  ensureThreadBetween: (
    a: ChatThread["participants"][number],
    b: ChatThread["participants"][number],
  ) => ChatThread;
}

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      threads: seedThreads,
      getThread: (id) => get().threads.find((t) => t.id === id),
      getThreadsForUser: (userId) =>
        get().threads.filter((t) =>
          t.participants.some((p) => p.userId === userId),
        ),
      sendMessage: (threadId, from, text) => {
        const now = new Date().toISOString();
        const msg: Message = {
          id: `msg_${Date.now()}`,
          threadId,
          from,
          text,
          timestamp: now,
        };
        set({
          threads: get().threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [...t.messages, msg],
                  lastMessageAt: now,
                }
              : t,
          ),
        });
      },
      ensureThreadBetween: (a, b) => {
        const existing = get().threads.find(
          (t) =>
            t.participants.some((p) => p.userId === a.userId) &&
            t.participants.some((p) => p.userId === b.userId),
        );
        if (existing) return existing;
        const thread: ChatThread = {
          id: `thread_${a.userId}_${b.userId}`,
          participants: [a, b],
          messages: [],
          lastMessageAt: new Date().toISOString(),
        };
        set({ threads: [...get().threads, thread] });
        return thread;
      },
    }),
    { name: "wego_messages" },
  ),
);
