"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, Phone, Video } from "lucide-react";
import { useMessagesStore } from "@/lib/store/messages";
import { useUser } from "@/lib/hooks/use-user";
import type { ActiveView } from "@/lib/types";
import { cn } from "@/lib/utils";

const botReplies: Record<string, string[]> = {
  user_rath: [
    "Thanks for your message! We're really excited to meet you 😊",
    "Our daughter Lena can't wait to show you around Rostock 🌍",
    "Let us know if you have any questions about the trip.",
  ],
  user_giorgia: [
    "Thank you so much 💙 I'm really looking forward to this.",
    "I'll let you know once the school confirms!",
    "That sounds wonderful. Danke schön!",
  ],
  user_coord_anna: [
    "Got it — I'll forward this to the principal right away.",
    "We usually confirm within 3–4 working days. Hang tight!",
    "Feel free to email me the documents whenever you're ready.",
  ],
  user_lucas: [
    "Haha yeah, Rostock winters are no joke. Bring a real coat 🧥",
    "Totally. DM me anytime, I owe it to the ones who helped me in 2025.",
    "Pro tip: join the school choir, it's the fastest way to make friends.",
  ],
  user_marco: [
    "Piano and guitar — we're going to be THAT family with the Sunday jam 🎶",
    "Can't wait! Should I bring anything from Italy?",
    "Sounds great, thanks for being so welcoming!",
  ],
  user_miller: [
    "Perfect, I'll start a shared doc with the logistics.",
    "Great — we're aiming for the 2nd weekend of September.",
    "Let me know if the Rath kids have any food preferences we should plan for.",
  ],
};

function pickBotReply(forUser: string, turn: number) {
  const pool = botReplies[forUser] ?? ["That sounds great!"];
  return pool[turn % pool.length];
}

export function ChatThread({
  threadId,
  basePath,
}: {
  threadId: string;
  basePath: "/student" | "/family";
}) {
  const user = useUser();
  const thread = useMessagesStore((s) => s.getThread(threadId));
  const send = useMessagesStore((s) => s.sendMessage);
  const [text, setText] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread?.messages.length]);

  if (!thread) {
    return (
      <div className="p-8 text-center text-fg">
        Thread not found.{" "}
        <Link href={`${basePath}/chat`} className="underline">
          Back to chats
        </Link>
      </div>
    );
  }

  const myId = user?.id ?? (basePath === "/student" ? "user_giorgia" : "user_rath");
  const other = thread.participants.find((p) => p.userId !== myId)!;

  const handleSend = () => {
    const content = text.trim();
    if (!content) return;
    send(thread.id, myId, content);
    setText("");
    // scripted bot reply from the other participant after ~1.5s
    const turn = thread.messages.filter((m) => m.from === other.userId).length;
    window.setTimeout(() => {
      send(thread.id, other.userId, pickBotReply(other.userId, turn));
    }, 1500);
  };

  return (
    <div className="flex h-dvh flex-col bg-bg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-divider px-4 pt-12 pb-3">
        <Link
          href={`${basePath}/chat`}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
        >
          <ChevronLeft size={18} />
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={other.avatarUrl}
          alt={other.name}
          className="size-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="truncate text-[15px] font-bold text-fg">
            {other.name}
          </div>
          <div className="text-[11px] text-fg-muted">Online · just now</div>
        </div>
        <button className="text-fg-muted" aria-label="Call">
          <Phone size={18} />
        </button>
        <button className="text-fg-muted" aria-label="Video">
          <Video size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto no-scrollbar px-4 py-5"
      >
        <div className="flex flex-col gap-3">
          {thread.messages.map((m) => {
            const mine = m.from === myId;
            return (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  mine ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] whitespace-pre-wrap rounded-[18px] px-4 py-2.5 text-[14px] leading-snug",
                    mine
                      ? basePath === "/student"
                        ? "bg-student text-white rounded-br-md"
                        : "bg-family text-white rounded-br-md"
                      : "bg-surface text-fg rounded-bl-md ring-1 ring-divider",
                  )}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-divider p-3">
        <div className="flex items-center gap-2 rounded-full bg-surface pl-4 pr-1 py-1 ring-1 ring-divider">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
          />
          <button
            onClick={handleSend}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-white",
              basePath === "/student" ? "bg-student" : "bg-family",
            )}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
