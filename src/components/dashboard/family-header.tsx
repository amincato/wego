import Link from "next/link";
import { ChevronLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { FamilyStatusPill } from "./status-pill";
import type { HostFamily } from "@/lib/types";
import type { FamilyApplicationState } from "@/lib/types-dashboard";

export function FamilyHeader({
  family,
  state,
  backHref,
  backLabel = "Back",
  meta,
}: {
  family: HostFamily;
  state?: FamilyApplicationState;
  backHref: string;
  backLabel?: string;
  meta?: string;
}) {
  return (
    <div className="rounded-card-lg bg-surface ring-1 ring-divider">
      <div className="flex items-center gap-2 border-b border-divider px-5 py-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-fg-muted hover:bg-chip hover:text-fg"
        >
          <ChevronLeft className="size-4" />
          {backLabel}
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-5 p-5">
        <span
          className="size-20 shrink-0 rounded-full bg-chip bg-cover bg-center ring-4 ring-bg-elevated"
          style={{ backgroundImage: `url(${family.photoUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="h-title text-fg">{family.familyName}</h1>
            {state ? <FamilyStatusPill state={state} /> : null}
          </div>
          <div className="mt-1 text-sm text-fg-muted">
            {family.city}, {family.country} · {family.homeType} ·{" "}
            {family.spareRooms} spare room{family.spareRooms === 1 ? "" : "s"} ·{" "}
            {family.hasPets ? "Has pets" : "No pets"}
          </div>
          {meta ? (
            <div className="mt-0.5 text-xs text-fg-subtle">{meta}</div>
          ) : null}
        </div>
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
      </div>
    </div>
  );
}
