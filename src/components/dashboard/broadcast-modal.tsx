"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { Send, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "all" | "student" | "family" | "buddy" | "school";

const AUDIENCE_LABEL: Record<Audience, string> = {
  all: "All",
  student: "Students",
  family: "Host families",
  buddy: "Buddies",
  school: "Partner schools",
};

const AUDIENCE_ACTIVE: Record<Audience, string> = {
  all: "bg-fg text-white",
  student: "bg-student text-white",
  family: "bg-family text-white",
  buddy: "bg-fg text-white",
  school: "bg-school text-white",
};

const AUDIENCES: Audience[] = [
  "all",
  "student",
  "family",
  "buddy",
  "school",
];

export function BroadcastModal({
  open,
  onOpenChange,
  audienceCounts,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Number of recipients for each audience. Used for the
   * "Will reach X people" preview. */
  audienceCounts: Record<Exclude<Audience, "all">, number>;
}) {
  const [selected, setSelected] = useState<Set<Audience>>(new Set(["all"]));
  const [message, setMessage] = useState("");

  const toggle = (a: Audience) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (a === "all") {
        return new Set(["all"]);
      }
      next.delete("all");
      if (next.has(a)) next.delete(a);
      else next.add(a);
      if (next.size === 0) next.add("all");
      return next;
    });
  };

  const total = useMemo(() => {
    if (selected.has("all")) {
      return Object.values(audienceCounts).reduce((s, n) => s + n, 0);
    }
    return Array.from(selected).reduce(
      (s, a) => s + (audienceCounts[a as Exclude<Audience, "all">] ?? 0),
      0,
    );
  }, [selected, audienceCounts]);

  const canSend = message.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    // Mock: just close the modal and reset.
    setSelected(new Set(["all"]));
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          style={{
            backgroundColor: "#ffffff",
            color: "#0a0a0a",
          }}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] shadow-2xl ring-1 ring-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-black/10 px-6 py-5">
            <div>
              <Dialog.Title className="text-lg font-bold text-black">
                Send broadcast message
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-neutral-600">
                Reach one or more groups in your school community at
                once.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-8 shrink-0 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="space-y-5 px-6 py-5">
            <section>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Audience
              </div>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((a) => {
                  const isActive = selected.has(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggle(a)}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                        isActive
                          ? cn(AUDIENCE_ACTIVE[a], "shadow-sm")
                          : "bg-neutral-100 text-neutral-600 hover:text-black",
                      )}
                    >
                      {AUDIENCE_LABEL[a]}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-neutral-600">
                <Users className="size-3.5" />
                Will reach <span className="font-bold text-black">
                  {total}
                </span>{" "}
                {total === 1 ? "person" : "people"}.
              </p>
            </section>

            <section>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Message
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your broadcast message…"
                className="w-full resize-none rounded-[14px] bg-neutral-50 p-3 text-sm text-black placeholder:text-neutral-400 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-student"
              />
              <div className="mt-1 text-right text-[11px] text-neutral-400">
                {message.length} / 500
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-black/10 bg-neutral-50 px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full px-4 py-2 text-sm font-bold text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-bold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-black/40"
            >
              <Send className="size-4" strokeWidth={2.4} />
              Send broadcast
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
