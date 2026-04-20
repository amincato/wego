"use client";

import { ChevronLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StatusBar } from "@/components/shared/status-bar";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <StatusBar />

      <div className="flex items-center gap-3 px-4 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="h-title text-fg">Settings</h1>
      </div>

      <section className="mt-6 px-4">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-fg-muted">
          Appearance
        </p>
        <div className="overflow-hidden rounded-[16px] bg-surface ring-1 ring-divider">
          <div className="px-4 pb-3 pt-4">
            <div className="t-body-strong">Theme</div>
            <p className="t-caption mt-1 text-fg-muted">
              Choose how wego looks to you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4 pb-4">
            <ThemeOption
              active={!isDark}
              onClick={() => setTheme("light")}
              icon={<Sun size={18} />}
              label="Light"
            />
            <ThemeOption
              active={isDark}
              onClick={() => setTheme("dark")}
              icon={<Moon size={18} />}
              label="Dark"
            />
          </div>
        </div>
      </section>

      <section className="mt-6 px-4">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-fg-muted">
          Account
        </p>
        <div className="overflow-hidden rounded-[16px] bg-surface ring-1 ring-divider">
          <LinkRow label="Notifications" href="/settings" />
          <LinkRow label="Privacy" href="/settings" />
          <LinkRow label="Help & support" href="/settings" last />
        </div>
      </section>
    </div>
  );
}

function ThemeOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[72px] flex-col items-center justify-center gap-1 rounded-[12px] text-[13px] font-semibold transition",
        active
          ? "bg-bg text-fg ring-2 ring-student"
          : "bg-chip text-fg-muted ring-1 ring-divider",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function LinkRow({
  label,
  href,
  last,
}: {
  label: string;
  href: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between px-4 py-3.5 text-[14px] text-fg",
        !last && "border-b border-divider",
      )}
    >
      <span>{label}</span>
      <span className="text-fg-subtle">›</span>
    </Link>
  );
}
