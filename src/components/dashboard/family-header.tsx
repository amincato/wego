import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { FamilyStatusPill } from "./status-pill";
import type { HostFamily } from "@/lib/types";
import type { FamilyApplicationState } from "@/lib/types-dashboard";

export function FamilyHeader({
  family,
  state,
  backHref,
  meta,
  actions,
}: {
  family: HostFamily;
  state?: FamilyApplicationState;
  backHref: string;
  /** Legacy label kept for back-compat; no longer rendered. */
  backLabel?: string;
  meta?: string;
  /** Optional custom action cluster shown under the meta line.
   * Defaults to Open chat / Email / Call when omitted. */
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <Link
        href={backHref}
        aria-label="Back"
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>

      <div className="rounded-card-lg bg-surface p-6 ring-1 ring-divider">
        <div className="flex flex-wrap items-stretch gap-6">
          <span
            className="size-32 shrink-0 self-start rounded-2xl bg-chip bg-cover bg-center"
            style={{ backgroundImage: `url(${family.photoUrl})` }}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="h-title text-fg">{family.familyName}</h1>
              {state ? <FamilyStatusPill state={state} /> : null}
            </div>
            <div className="mt-1 text-sm text-fg-muted">
              {family.city}, {family.country} · {family.members.length}{" "}
              member{family.members.length === 1 ? "" : "s"}
            </div>
            {meta ? (
              <div className="mt-0.5 text-xs text-fg-subtle">{meta}</div>
            ) : null}
            {actions ? (
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                {actions}
              </div>
            ) : null}
          </div>
          {!actions ? (
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-family px-4 py-2 text-xs font-bold text-white hover:brightness-105">
                <MessageSquare className="size-3.5" /> Open chat
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                <Mail className="size-3.5" /> Email
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                <Phone className="size-3.5" /> Call
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
