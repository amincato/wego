"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
  const myThreads = threads.filter((t) =>
    t.participants.some((p) => p.userId === (user?.id ?? defaultUserId(myView))),
  );

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">Chat</h1>
        <p className="mt-1 text-[14px] text-fg-muted">
          Your ongoing conversations
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {myThreads.length === 0 && (
            <EmptyState
              icon={<MessageCircle size={22} />}
              title="No conversations yet"
              description="Start chatting with students or schools to see them here."
            />
          )}
          {myThreads.map((t) => {
            const other = t.participants.find(
              (p) => p.userId !== (user?.id ?? defaultUserId(myView)),
            )!;
            const last = t.messages[t.messages.length - 1];
            return (
              <Link
                key={t.id}
                href={`${basePath}/chat/${t.id}`}
                className="flex items-center gap-3 rounded-[16px] bg-surface p-3 ring-1 ring-divider"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={other.avatarUrl}
                  alt={other.name}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-fg">
                    {other.name}
                  </div>
                  <div className="truncate text-[13px] text-fg-muted">
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
