"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Cake,
  ChevronLeft,
  ChevronRight,
  Flag,
  LogOut,
  MapPin,
  Pencil,
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
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80";

/** Matches the Figma spec for 2175:20601 (profile/detail). */
const HERO_HEIGHT = 600;
/** Gradient reaches the background color at the bottom of the hero. */
const HERO_GRADIENT =
  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.15) 58%, var(--bg) 100%)";

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

  // Freeze "now" at mount so the age computation stays pure across renders
  // (keeps React 19 purity linter happy and avoids hydration drift).
  const [nowMs] = useState(() => Date.now());
  const age = studentProfile?.birthday
    ? Math.floor(
        (nowMs - new Date(studentProfile.birthday).getTime()) /
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
  const fullName = `${profile.first_name} ${profile.last_name}`.trim();
  const nativeLang = languages.find((l) => l.level === "native") ?? languages[0];
  const nativeLangLabel = nativeLang
    ? LANGUAGE_META[nativeLang.code]?.label
    : null;
  const nativeCountry = nativeLang ? COUNTRY_BY_LANG[nativeLang.code] : null;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== slide) setSlide(idx);
  };
  const nextSlide = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.min(heroImages.length - 1, slide + 1);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    useAuthStore.getState().reset();
    router.push("/welcome");
    router.refresh();
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      {/* ---------- HERO ---------- */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: HERO_HEIGHT }}
      >
        {/* Image carousel */}
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex size-full snap-x snap-mandatory overflow-x-auto no-scrollbar"
        >
          {heroImages.map((src, i) => (
            <div
              key={i}
              className="relative h-full w-full shrink-0 snap-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={fullName}
                className="size-full object-cover"
              />
              {/* Gradient that fades into the theme background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: HERO_GRADIENT }}
              />
            </div>
          ))}
        </div>

        {/* Top chrome (status bar + back + edit) */}
        <div className="absolute inset-x-0 top-0">
          <StatusBar color="text-white" />
        </div>

        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="absolute left-4 top-[62px] flex size-[35px] items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => router.push("/student/profile/edit")}
          aria-label="Edit profile"
          className="absolute right-4 top-[62px] flex size-[35px] items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition active:scale-95"
        >
          <Pencil size={16} />
        </button>

        {/* Carousel next arrow (only if more slides remain) */}
        {slide < heroImages.length - 1 && heroImages.length > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next photo"
            className="absolute right-2 top-[45%] flex size-[45px] items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition active:scale-95"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Dots */}
        {heroImages.length > 1 && (
          <div className="absolute left-1/2 top-[360px] flex -translate-x-1/2 items-center gap-[5px]">
            {heroImages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[5px] rounded-full transition-all",
                  i === slide ? "w-5 bg-white" : "w-[5px] bg-white/70",
                )}
              />
            ))}
          </div>
        )}

        {/* Overlay info (name + meta chips + language pills) */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.35)]">
          <h1 className="text-[28px] font-bold leading-[42px] text-fg">
            {fullName}
            {age !== null && <span>, {age}</span>}
          </h1>

          <div className="mt-[13px] flex flex-col gap-[7px]">
            {mobilityMonths != null && (
              <MetaChip
                icon={<Cake size={13} strokeWidth={2.2} />}
                label={`Mobility: ${mobilityMonths} months`}
              />
            )}
            <div className="flex flex-wrap gap-[7px]">
              {studentProfile?.city && (
                <MetaChip
                  icon={<MapPin size={13} strokeWidth={2.2} />}
                  label={
                    nativeCountry
                      ? `${studentProfile.city}, ${nativeCountry}`
                      : studentProfile.city
                  }
                />
              )}
              {nativeLangLabel && (
                <MetaChip
                  icon={<Flag size={13} strokeWidth={2.2} />}
                  label={nativeLangLabel}
                />
              )}
            </div>
          </div>

          {languages.length > 0 && (
            <div className="mt-[13px] flex flex-wrap gap-2">
              {languages.map((l) => {
                const meta = LANGUAGE_META[l.code];
                if (!meta) return null;
                return (
                  <span
                    key={l.code}
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-chip px-3 py-1.5 text-[13px] font-medium text-fg ring-1 ring-divider [text-shadow:none]"
                  >
                    <span className="text-[18px] leading-none">
                      {meta.flag}
                    </span>
                    {LEVEL_LABEL[l.level]}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ---------- ABOUT ---------- */}
      {studentProfile?.bio && (
        <section className="px-4 pt-4">
          <h2 className="text-[19px] font-bold leading-[25px] text-family">
            About
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-[16px] font-medium leading-[24px] text-fg">
            {studentProfile.bio}
          </p>
        </section>
      )}

      {/* ---------- PRESENTATION VIDEO ---------- */}
      <section className="mt-7 px-4">
        <h2 className="text-[19px] font-bold leading-[25px] text-family">
          Presentation video
        </h2>
        <div className="relative mt-3 aspect-[361/432] w-full overflow-hidden rounded-[22px] bg-chip">
          {studentProfile?.video_url ? (
            <video
              src={studentProfile.video_url}
              controls
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full" />
          )}
          {!studentProfile?.video_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-[60px] items-center justify-center rounded-full bg-bg/90 shadow-lg">
                <Play
                  size={24}
                  className="ml-0.5 text-fg"
                  fill="currentColor"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- HOBBIES ---------- */}
      {hobbies.length > 0 && (
        <section className="mt-7 px-4">
          <h2 className="text-[19px] font-bold leading-[25px] text-family">
            Hobbies &amp; free time
          </h2>
          <div className="mt-3 flex flex-wrap gap-[9px]">
            {hobbies.map((h) => (
              <span
                key={h.slug}
                className="inline-flex h-9 items-center gap-1 rounded-full bg-chip px-[10px] py-[5px] text-[14px] font-medium text-fg ring-1 ring-divider"
              >
                <span className="text-[18px] leading-none">{h.emoji}</span>
                {h.label}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ---------- LIFESTYLE ---------- */}
      <section className="mt-7 px-4">
        <h2 className="text-[19px] font-bold leading-[25px] text-family">
          Lifestyle
        </h2>
        <div className="mt-3 overflow-hidden rounded-[18px] bg-surface ring-1 ring-divider">
          {LIFESTYLE_GROUPS.map((g, idx) => {
            const summary = lifestyleSummary(g.key, lifestyle[g.key]);
            return (
              <div
                key={g.key}
                className={cn(
                  "flex items-start gap-3 px-4 py-3.5",
                  idx > 0 && "border-t border-divider",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center text-[28px] leading-none">
                  {g.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-bold text-fg">
                    {g.label}
                  </div>
                  <div className="mt-0.5 text-[14px] text-fg-muted">
                    {summary?.summary ?? "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- ACCOUNT ---------- */}
      <section className="mt-8 px-4 pb-6">
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
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-family py-3 text-[14px] font-semibold text-white"
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

function MetaChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex h-[31px] items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[13px] font-semibold text-white backdrop-blur-[2px] [text-shadow:none]">
      <span className="flex size-3.5 items-center justify-center">{icon}</span>
      {label}
    </span>
  );
}

const COUNTRY_BY_LANG: Record<string, string> = {
  it: "Italy",
  fr: "France",
  de: "Germany",
  es: "Spain",
  en: "UK",
};
