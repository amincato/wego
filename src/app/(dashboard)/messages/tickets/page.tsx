import Link from "next/link";
import { ChevronLeft, MessageCircle, Triangle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { supportTickets } from "@/lib/mock/dashboard-messages";
import type { SupportTicket } from "@/lib/types-dashboard";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<SupportTicket["status"], string> = {
  open: "bg-family/15 text-family",
  in_progress: "bg-student/15 text-student",
  resolved: "bg-success-bg/40 text-success-fg",
};

const CATEGORY_LABEL: Record<SupportTicket["category"], string> = {
  technical: "Technical",
  academic: "Academic",
  host_family: "Host family",
  documents: "Documents",
  other: "Other",
};

function fmt(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export default function TicketsPage() {
  const open = supportTickets.filter((t) => t.status === "open");
  const inProgress = supportTickets.filter(
    (t) => t.status === "in_progress",
  );
  const resolved = supportTickets.filter((t) => t.status === "resolved");

  return (
    <>
      <PageHeader
        title="Tickets & requests"
        subtitle="Support requests opened by students and host families."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/messages"
              className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              <ChevronLeft className="size-4" />
              Inbox
            </Link>
            <Link
              href="/messages/emergencies"
              className="inline-flex items-center gap-2 rounded-full bg-danger-bg/60 px-3 py-2 text-sm font-bold text-danger-fg hover:bg-danger-bg"
            >
              <Triangle className="size-4" />
              Emergencies
            </Link>
          </div>
        }
      />

      <ListTabs
        tabs={[
          {
            id: "open",
            label: "Open",
            count: open.length,
            content: <TicketList tickets={open} />,
          },
          {
            id: "progress",
            label: "In progress",
            count: inProgress.length,
            content: <TicketList tickets={inProgress} />,
          },
          {
            id: "resolved",
            label: "Resolved",
            count: resolved.length,
            content: <TicketList tickets={resolved} />,
          },
        ]}
      />
    </>
  );
}

function TicketList({ tickets }: { tickets: SupportTicket[] }) {
  if (tickets.length === 0) {
    return <p className="text-sm text-fg-muted">No tickets here.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {tickets.map((t) => (
        <li
          key={t.id}
          className="flex items-start gap-4 rounded-input border border-divider bg-surface px-4 py-3 hover:border-fg/20"
        >
          <span
            className="size-10 shrink-0 rounded-full bg-chip bg-cover bg-center"
            style={{ backgroundImage: `url(${t.openedBy.avatarUrl})` }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-fg">{t.subject}</span>
              {t.unread ? (
                <span className="size-1.5 rounded-full bg-student" />
              ) : null}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  STATUS_TONE[t.status],
                )}
              >
                {t.status.replace(/_/g, " ")}
              </span>
              <span className="rounded-full bg-chip px-2 py-0.5 text-[10px] font-bold text-fg-muted">
                {CATEGORY_LABEL[t.category]}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-fg-muted">
              Opened by{" "}
              <span className="font-bold text-fg">{t.openedBy.name}</span>{" "}
              ({t.openedBy.role}) · {fmt(t.openedAt)}
            </div>
            <p className="mt-1 text-sm text-fg-muted">{t.lastMessage}</p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-1 rounded-full bg-student px-3 py-1.5 text-xs font-bold text-white hover:bg-student-accent">
            <MessageCircle className="size-3.5" />
            Reply
          </button>
        </li>
      ))}
    </ul>
  );
}
