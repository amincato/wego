import {
  AlertTriangle,
  FileWarning,
  HeartPulse,
  Home,
  Triangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  EmergencyKind,
  EmergencyNotification,
} from "@/lib/types-dashboard";

const ICON: Record<EmergencyKind, { icon: React.ReactNode; tone: string }> = {
  health: {
    icon: <HeartPulse className="size-4" />,
    tone: "bg-danger-bg/60 text-danger-fg",
  },
  host_family_issue: {
    icon: <Home className="size-4" />,
    tone: "bg-family/15 text-family",
  },
  school_issue: {
    icon: <Triangle className="size-4" />,
    tone: "bg-student/15 text-student",
  },
  documents_missing: {
    icon: <FileWarning className="size-4" />,
    tone: "bg-chip text-fg-muted",
  },
  other: {
    icon: <AlertTriangle className="size-4" />,
    tone: "bg-chip text-fg",
  },
};

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function NotificationList({
  notifications,
}: {
  notifications: EmergencyNotification[];
}) {
  if (notifications.length === 0) {
    return (
      <p className="text-sm text-fg-muted">No emergency notifications.</p>
    );
  }
  return (
    <ul className="flex flex-col gap-2">
      {notifications.map((n) => {
        const { icon, tone } = ICON[n.kind];
        return (
          <li
            key={n.id}
            className="flex items-start gap-3 rounded-input border border-divider bg-bg px-3 py-3"
          >
            <span
              className={cn(
                "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg",
                tone,
              )}
            >
              {icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-fg">{n.title}</span>
                <span className="ml-auto shrink-0 text-xs text-fg-subtle">
                  {relativeTime(n.createdAt)}
                </span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">
                {n.body}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
