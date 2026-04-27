"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MockMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export function ChatPanel({
  withName,
  withAvatar,
  initialMessages,
}: {
  withName: string;
  withAvatar: string;
  initialMessages?: MockMessage[];
}) {
  const [messages, setMessages] = useState<MockMessage[]>(
    initialMessages ?? [
      {
        id: "m1",
        fromMe: false,
        text: `Hi! Thank you for the chance to apply.`,
        time: "10:24",
      },
      {
        id: "m2",
        fromMe: true,
        text: "Welcome! Let me know if you need anything during the process.",
        time: "10:30",
      },
    ],
  );
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m_${m.length + 1}`,
        fromMe: true,
        text: draft.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-[480px] flex-col overflow-hidden rounded-card-lg ring-1 ring-divider">
      <header className="flex items-center gap-3 border-b border-divider bg-surface px-4 py-3">
        <span
          className="size-9 rounded-full bg-chip bg-cover bg-center"
          style={{ backgroundImage: `url(${withAvatar})` }}
        />
        <div>
          <div className="text-sm font-bold text-fg">{withName}</div>
          <div className="text-xs text-fg-subtle">Online</div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-bg-elevated p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex flex-col gap-1",
              m.fromMe ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                m.fromMe
                  ? "bg-student text-white"
                  : "bg-surface text-fg ring-1 ring-divider",
              )}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-fg-subtle">{m.time}</span>
          </div>
        ))}
      </div>

      <footer className="flex items-center gap-2 border-t border-divider bg-surface p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Write a message…"
          className="h-10 flex-1 rounded-full bg-bg-elevated px-4 text-sm outline-none ring-1 ring-divider focus:ring-student"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="grid size-10 place-items-center rounded-full bg-student text-white hover:bg-student-accent disabled:bg-btn-disabled"
          aria-label="Send"
        >
          <Send className="size-4" />
        </button>
      </footer>
    </div>
  );
}
