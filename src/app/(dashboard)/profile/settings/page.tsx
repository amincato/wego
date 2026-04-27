"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, ChevronLeft, Globe2, Lock, Moon, Palette, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { InfoCard } from "@/components/dashboard/info-card";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [language, setLanguage] = useState<"en" | "it">("en");

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences."
        action={
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
          >
            <ChevronLeft className="size-4" />
            Profile
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Notifications">
          <ul className="divide-y divide-divider">
            <ToggleRow
              icon={<Bell className="size-4" />}
              label="Email notifications"
              description="Daily digest of new applications and tickets."
              value={emailNotif}
              onChange={setEmailNotif}
            />
            <ToggleRow
              icon={<Bell className="size-4" />}
              label="Push notifications"
              description="Real-time alerts on this browser."
              value={pushNotif}
              onChange={setPushNotif}
            />
            <ToggleRow
              icon={<ShieldCheck className="size-4" />}
              label="Emergency alerts"
              description="Always-on alerts for emergency workflows."
              value={emergencyAlerts}
              onChange={setEmergencyAlerts}
            />
          </ul>
        </InfoCard>

        <InfoCard title="Appearance & language">
          <ul className="divide-y divide-divider">
            <li className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
                  <Palette className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-fg">Theme</div>
                  <div className="text-xs text-fg-muted">
                    Dashboard always uses the light palette.
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-chip px-2.5 py-0.5 text-[11px] font-bold text-fg-muted">
                Light
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
                  <Globe2 className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-fg">Language</div>
                  <div className="text-xs text-fg-muted">
                    Used across the dashboard interface.
                  </div>
                </div>
              </div>
              <div className="flex gap-1 rounded-full bg-chip p-1">
                {(["en", "it"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
                      language === l ? "bg-bg text-fg" : "text-fg-muted",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </li>
            <li className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
                  <Moon className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-fg">Mobile app theme</div>
                  <div className="text-xs text-fg-muted">
                    Affects the mobile app linked to your account.
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-chip px-2.5 py-0.5 text-[11px] font-bold text-fg-muted">
                Auto
              </span>
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="Security" className="lg:col-span-2">
          <ul className="divide-y divide-divider">
            <li className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
                  <Lock className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-fg">Password</div>
                  <div className="text-xs text-fg-muted">
                    Last changed 4 months ago.
                  </div>
                </div>
              </div>
              <button className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                Change password
              </button>
            </li>
            <li className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
                  <ShieldCheck className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-fg">
                    Two-factor authentication
                  </div>
                  <div className="text-xs text-fg-muted">Disabled.</div>
                </div>
              </div>
              <button className="rounded-full bg-school px-4 py-2 text-xs font-bold text-white hover:bg-school-accent">
                Enable 2FA
              </button>
            </li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-chip text-fg-muted">
          {icon}
        </span>
        <div>
          <div className="text-sm font-bold text-fg">{label}</div>
          <div className="text-xs text-fg-muted">{description}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          value ? "bg-school" : "bg-chip",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
            value ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </li>
  );
}
