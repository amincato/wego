"use client";

import Link from "next/link";
import { Bell, LifeBuoy, LogOut, MessageSquare, Search, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { currentCoordinator } from "@/lib/mock/coordinator";

export function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-divider bg-bg/80 px-6 backdrop-blur">
      <div className="relative max-w-lg flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
        <input
          type="search"
          placeholder="Search students, families, schools…"
          className="h-10 w-full rounded-input bg-surface pl-9 pr-3 text-sm text-fg placeholder:text-fg-subtle outline-none ring-1 ring-divider focus:ring-2 focus:ring-student"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/messages"
          className="relative grid size-10 place-items-center rounded-full bg-surface ring-1 ring-divider hover:bg-chip"
          aria-label="Messages"
        >
          <MessageSquare className="size-4 text-fg" />
          <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-family text-[10px] font-bold leading-none text-white">
            3
          </span>
        </Link>

        <Link
          href="/messages/emergencies"
          className="relative grid size-10 place-items-center rounded-full bg-surface ring-1 ring-divider hover:bg-chip"
          aria-label="Notifications"
        >
          <Bell className="size-4 text-fg" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-danger-fg ring-2 ring-bg" />
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full bg-surface py-1.5 pl-1.5 pr-3 ring-1 ring-divider hover:bg-chip"
          >
            <span
              className="size-7 rounded-full bg-chip bg-cover bg-center"
              style={{ backgroundImage: `url(${currentCoordinator.avatarUrl})` }}
            />
            <span className="text-sm font-semibold text-fg">
              {currentCoordinator.firstName}
            </span>
          </button>

          {profileOpen ? (
            <div
              className="absolute right-0 top-12 w-60 rounded-card bg-surface p-2 shadow-lg ring-1 ring-divider"
              onMouseLeave={() => setProfileOpen(false)}
            >
              <div className="px-3 py-2">
                <div className="text-sm font-bold text-fg">
                  {currentCoordinator.firstName} {currentCoordinator.lastName}
                </div>
                <div className="text-xs text-fg-muted">
                  {currentCoordinator.email}
                </div>
              </div>
              <div className="my-1 h-px bg-divider" />
              <ProfileItem href="/profile" icon={<UserRound className="size-4" />} label="Profile" />
              <ProfileItem href="/profile/settings" icon={<Settings className="size-4" />} label="Settings" />
              <ProfileItem href="/profile/support" icon={<LifeBuoy className="size-4" />} label="Support" />
              <div className="my-1 h-px bg-divider" />
              <ProfileItem
                href="/welcome"
                icon={<LogOut className="size-4" />}
                label="Log out"
                tone="danger"
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function ProfileItem({
  href,
  icon,
  label,
  tone = "default",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tone?: "default" | "danger";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-input px-3 py-2 text-sm font-semibold hover:bg-chip",
        tone === "danger" ? "text-danger-fg" : "text-fg",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
