"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  GraduationCap,
  Home,
  PlaneTakeoff,
  Users,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Tailwind hue class for the active accent (matches the schemas). */
  accent: string;
}

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    icon: <Home className="size-5" strokeWidth={2} />,
    accent: "text-student",
  },
  {
    href: "/incoming",
    label: "Incoming students",
    icon: <GraduationCap className="size-5" strokeWidth={2} />,
    accent: "text-student",
  },
  {
    href: "/outgoing",
    label: "Outgoing students",
    icon: <PlaneTakeoff className="size-5" strokeWidth={2} />,
    accent: "text-student",
  },
  {
    href: "/families",
    label: "Host families",
    icon: <Users className="size-5" strokeWidth={2} />,
    accent: "text-family",
  },
  {
    href: "/partners",
    label: "Partner schools",
    icon: <Building2 className="size-5" strokeWidth={2} />,
    accent: "text-school",
  },
  {
    href: "/my-school",
    label: "My school",
    icon: <School className="size-5" strokeWidth={2} />,
    accent: "text-school",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-divider bg-surface px-4 py-6 lg:flex">
      <div className="px-2 pb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-student text-white">
            <span className="font-bold">w</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-fg">wego</span>
            <span className="text-[11px] uppercase tracking-wider text-fg-subtle">
              Coordinator console
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-input px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-chip text-fg"
                  : "text-fg-muted hover:bg-chip hover:text-fg",
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  active ? item.accent : "text-fg-subtle group-hover:text-fg",
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {active ? (
                <span
                  className={cn(
                    "ml-auto h-5 w-1 rounded-full",
                    item.accent.replace("text-", "bg-"),
                  )}
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
