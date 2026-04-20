"use client";

import { useRouter } from "next/navigation";
import {
  Globe,
  CalendarDays,
  Cake,
  Pencil,
  LogOut,
  Play,
  Settings,
} from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useAuthStore } from "@/lib/store/auth";
import { StatusBar } from "@/components/shared/status-bar";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import type { Lifestyle } from "@/lib/types";
import {
  normalizeLanguages,
  LANGUAGE_META,
  LEVEL_LABEL,
  lookupHobby,
  LIFESTYLE_GROUPS,
  lifestyleSummary,
} from "@/lib/profile-options";
import { cn } from "@/lib/utils";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type StudentProfileRow =
  Database["public"]["Tables"]["student_profiles"]["Row"];

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80";

export function StudentProfileClient({
  profile,
  studentProfile,
}: {
  profile: Profile;
  studentProfile: StudentProfileRow | null;
}) {
  const router = useRouter();
  const { activeView, setActiveView } = useAuthStore();
  const role = profile.role;

  const age = studentProfile?.birthday
    ? Math.floor(
        (Date.now() - new Date(studentProfile.birthday).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000),
      )
    : null;

  const languages = normalizeLanguages(studentProfile?.languages);
  const hobbies = (studentProfile?.hobbies ?? []).map(lookupHobby);
  const lifestyle = (studentProfile?.lifestyle ?? {}) as Partial<Lifestyle>;
  const heroPhoto = studentProfile?.photo_url ?? FALLBACK_PHOTO;
  const gallery = Array.isArray(studentProfile?.gallery)
    ? (studentProfile?.gallery as string[]).filter(
        (u): u is string => typeof u === "string",
      )
    : [];
  const heroImages = [heroPhoto, ...gallery].slice(0, 5);

  const mobilityMonths = studentProfile?.mobility_duration_months;

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    useAuthStore.getState().reset();
    router.push("/welcome");
    router.refresh();
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <StatusBar />

      {/* Hero photo */}
      <div className="relative h-[430px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImages[0]}
          alt={profile.first_name}
          className="absolute inset-0 size-full object-cover"
        />
        <button
          onClick={() => router.push("/student/profile/edit")}
          aria-label="Edit profile"
          className="absolute right-4 top-[54px] flex size-[35px] items-center justify-center rounded-full bg-bg/95 text-fg shadow-md transition active:scale-95"
        >
          <Pencil size={16} />
        </button>
        {heroImages.length > 1 && (
          <div className="absolute left-1/2 top-[395px] flex -translate-x-1/2 items-center gap-[5px]">
            <span className="h-[5px] w-5 rounded-full bg-white/80" />
            {heroImages.slice(1).map((_, i) => (
              <span key={i} className="size-[5px] rounded-full bg-white/80" />
            ))}
          </div>
        )}
      </div>

      {/* Name */}
      <h1 className="h-title px-4 pt-[10px] text-fg">
        {profile.first_name} {profile.last_name}
      </h1>

      {/* Info rows */}
      <div className="mt-1 flex flex-col gap-1 px-4">
        {studentProfile?.city && (
          <InfoRow
            icon={<Globe size={16} />}
            label={studentProfile.city}
          />
        )}
        {mobilityMonths != null && (
          <InfoRow
            icon={<CalendarDays size={16} />}
            label={`Mobility ${mobilityMonths} months`}
          />
        )}
        {age !== null && (
          <InfoRow icon={<Cake size={16} />} label={`${age} years old`} />
        )}
      </div>

      {/* Language chips */}
      {languages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 px-4">
          {languages.map((l) => {
            const meta = LANGUAGE_META[l.code];
            if (!meta) return null;
            return (
              <span
                key={l.code}
                className="inline-flex items-center gap-2 rounded-full bg-chip px-3 py-[6px] shadow-[0_0_1px_0_rgba(0,0,0,0.15)]"
              >
                <span className="text-[18px] leading-none">{meta.flag}</span>
                <span className="t-body-strong text-fg">
                  {LEVEL_LABEL[l.level]}
                </span>
              </span>
            );
          })}
        </div>
      )}

      <hr className="mx-4 my-5 border-t border-divider" />

      {/* Bio */}
      {studentProfile?.bio && (
        <p className="px-4 text-[16px] font-medium leading-[24px] text-fg">
          {studentProfile.bio}
        </p>
      )}

      {/* Presentation video */}
      <section className="mt-6 px-4">
        <p className="t-label">PRESENTATION VIDEO</p>
        {studentProfile?.video_url ? (
          <video
            src={studentProfile.video_url}
            controls
            className="mt-3 aspect-[361/432] w-full rounded-[22px] object-cover"
          />
        ) : (
          <div className="mt-3 flex aspect-[361/432] w-full items-center justify-center rounded-[22px] bg-chip">
            <div className="flex size-14 items-center justify-center rounded-full bg-bg/90 shadow">
              <Play size={22} className="ml-0.5 text-fg" fill="currentColor" />
            </div>
          </div>
        )}
      </section>

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mt-6 px-4">
          <p className="t-label">HOBBIES &amp; FREE TIME</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {hobbies.map((h) => (
              <span
                key={h.slug}
                className="inline-flex items-center gap-[6px] rounded-full bg-chip px-[10px] py-[5px] shadow-[0_0_1px_0_rgba(0,0,0,0.15)]"
              >
                <span className="text-[16px] leading-none">{h.emoji}</span>
                <span className="t-body-strong text-fg">{h.label}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Lifestyle */}
      <section className="mt-6 px-4">
        <p className="t-label">LIFESTYLE</p>
        <div className="mt-3 overflow-hidden rounded-[18px] bg-surface ring-1 ring-divider">
          {LIFESTYLE_GROUPS.map((g, idx) => {
            const summary = lifestyleSummary(g.key, lifestyle[g.key]);
            return (
              <div
                key={g.key}
                className={cn(
                  "flex items-start gap-3 px-4 py-3",
                  idx > 0 && "border-t border-divider",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center text-[26px] leading-none">
                  {g.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold text-fg">
                    {g.label}
                  </div>
                  <div className="mt-0.5 text-[13px] text-fg-muted">
                    {summary?.summary ?? "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Account */}
      <section className="mt-6 px-4">
        <p className="t-label">ACCOUNT</p>

        {role === "both" && (
          <div className="mt-3 flex items-center justify-between rounded-[16px] bg-surface p-4 ring-1 ring-divider">
            <div>
              <div className="text-[14px] font-bold text-fg">Viewing as</div>
              <div className="text-[12px] text-fg-muted">
                Switch between student and host family
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-fg-muted">
                Student
              </span>
              <Switch.Root
                checked={activeView === "family"}
                onCheckedChange={async (checked) => {
                  const next = checked ? "family" : "student";
                  setActiveView(next);
                  const supabase = createClient();
                  await supabase
                    .from("profiles")
                    .update({ active_view: next })
                    .eq("id", profile.id);
                  router.push(
                    checked ? "/family/discover" : "/student/discover",
                  );
                }}
                className="relative h-6 w-11 rounded-full bg-divider data-[state=checked]:bg-family transition"
              >
                <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-bg shadow transition data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
              <span className="text-[11px] font-semibold text-fg-muted">
                Family
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/student/profile/edit")}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-student py-3 text-[14px] font-semibold text-white"
        >
          <Pencil size={16} />
          Edit profile
        </button>

        <button
          onClick={() => router.push("/settings")}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-surface py-3 text-[14px] font-semibold text-fg ring-1 ring-divider"
        >
          <Settings size={16} />
          Settings
        </button>

        <button
          onClick={signOut}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold text-fg-muted"
        >
          <LogOut size={16} />
          Log out
        </button>
      </section>
    </div>
  );
}

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-[6px]">
      <span className="flex size-5 items-center justify-center text-fg">
        {icon}
      </span>
      <span className="text-[14px] font-medium text-fg-muted">{label}</span>
    </div>
  );
}
