"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import { Send, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AudienceRole = "student" | "family" | "buddy" | "school";
type Audience = "all" | AudienceRole;

export interface BroadcastRecipient {
  id: string;
  name: string;
  avatarUrl: string;
  role: AudienceRole;
}

const AUDIENCE_LABEL: Record<Audience, string> = {
  all: "All",
  student: "Students",
  family: "Host families",
  buddy: "Buddies",
  school: "Partner schools",
};

const AUDIENCE_ACTIVE: Record<Audience, string> = {
  all: "bg-black text-white",
  student: "bg-student text-white",
  family: "bg-family text-white",
  buddy: "bg-black text-white",
  school: "bg-school text-white",
};

const AUDIENCE_DOT: Record<AudienceRole, string> = {
  student: "ring-student",
  family: "ring-family",
  buddy: "ring-black",
  school: "ring-school",
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
  recipients,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Full list of possible recipients across all roles. */
  recipients: BroadcastRecipient[];
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(recipients.map((r) => r.id)),
  );
  /* When true, the user picked "All" explicitly. In that mode only
   * the All chip is highlighted; the per-role chips render inactive
   * even though every member is technically in selectedIds. As soon
   * as the user touches anything else, this flag flips off. */
  const [allMode, setAllMode] = useState(true);
  const [message, setMessage] = useState("");

  // Re-seed selection every time the modal opens so the form starts
  // fresh (defaulting to "send to everyone" via All mode).
  useEffect(() => {
    if (open) {
      setSelectedIds(new Set(recipients.map((r) => r.id)));
      setAllMode(true);
      setMessage("");
    }
  }, [open, recipients]);

  const idsByRole = useMemo(() => {
    const map: Record<AudienceRole, string[]> = {
      student: [],
      family: [],
      buddy: [],
      school: [],
    };
    for (const r of recipients) map[r.role].push(r.id);
    return map;
  }, [recipients]);

  const isRoleSelected = (role: AudienceRole) =>
    idsByRole[role].length > 0 &&
    idsByRole[role].every((id) => selectedIds.has(id));

  const toggleAudience = (a: Audience) => {
    if (a === "all") {
      if (allMode) {
        // Already in All mode → switch off, clear selection.
        setAllMode(false);
        setSelectedIds(new Set());
      } else {
        // Enter All mode → pick everyone.
        setAllMode(true);
        setSelectedIds(new Set(recipients.map((r) => r.id)));
      }
      return;
    }

    setAllMode(false);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const roleIds = idsByRole[a];
      const fullySelected =
        roleIds.length > 0 && roleIds.every((id) => next.has(id));
      if (fullySelected) {
        roleIds.forEach((id) => next.delete(id));
      } else {
        roleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const removeRecipient = (id: string) => {
    setAllMode(false);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const selectedRecipients = useMemo(
    () => recipients.filter((r) => selectedIds.has(r.id)),
    [recipients, selectedIds],
  );

  const canSend =
    message.trim().length > 0 && selectedRecipients.length > 0;

  const handleSend = () => {
    if (!canSend) return;
    setSelectedIds(new Set(recipients.map((r) => r.id)));
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
          className="fixed left-1/2 top-1/2 z-50 flex h-[min(720px,90dvh)] w-[calc(100%-48px)] max-w-[820px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] shadow-2xl ring-1 ring-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-black/10 px-7 py-5">
            <div>
              <Dialog.Title className="text-xl font-bold text-black">
                Send broadcast message
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-neutral-600">
                Reach one or more groups of people at once.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-black"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-7 py-6">
            {/* Audience picker */}
            <section>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Audience
              </div>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((a) => {
                  const isActive =
                    a === "all" ? allMode : !allMode && isRoleSelected(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAudience(a)}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-2 text-sm font-bold transition-colors",
                        isActive
                          ? cn(AUDIENCE_ACTIVE[a], "shadow-sm")
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black",
                      )}
                    >
                      {AUDIENCE_LABEL[a]}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Selected recipients */}
            <section>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Recipients
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm text-neutral-600">
                  <Users className="size-4" />
                  <span className="font-bold text-black">
                    {selectedRecipients.length}
                  </span>
                  {selectedRecipients.length === 1 ? "person" : "people"}
                </span>
              </div>

              <div className="h-[180px] overflow-y-auto rounded-[14px] bg-neutral-50 p-3 ring-1 ring-black/10">
                {selectedRecipients.length === 0 ? (
                  <p className="flex h-full items-center justify-center text-center text-sm text-neutral-500">
                    Select at least one group above to start building
                    the recipient list.
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {selectedRecipients.map((r) => (
                      <li
                        key={r.id}
                        className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 ring-1 ring-black/10"
                      >
                        <span
                          className={cn(
                            "block size-9 shrink-0 rounded-full bg-neutral-200 bg-cover bg-center ring-2",
                            AUDIENCE_DOT[r.role],
                          )}
                          style={{
                            backgroundImage: `url(${r.avatarUrl})`,
                          }}
                        />
                        <span className="text-sm font-semibold text-black">
                          {r.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeRecipient(r.id)}
                          aria-label={`Remove ${r.name} from broadcast`}
                          className="grid size-6 shrink-0 place-items-center rounded-full text-neutral-500 hover:bg-neutral-200 hover:text-black"
                        >
                          <X className="size-3.5" strokeWidth={2.4} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Message */}
            <section>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Message
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                placeholder="Write your broadcast message…"
                className="w-full resize-none rounded-[14px] bg-neutral-50 p-4 text-sm text-black placeholder:text-neutral-400 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-student"
              />
            </section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-black/10 bg-neutral-50 px-7 py-4">
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
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-black/40"
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
