"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronDown, Plus, X, Upload } from "lucide-react";
import { StatusBar } from "@/components/shared/status-bar";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import type {
  LanguageCode,
  LanguageLevel,
  LanguageSkill,
  Lifestyle,
} from "@/lib/types";
import {
  normalizeLanguages,
  LANGUAGES,
  LANGUAGE_META,
  LANGUAGE_LEVELS,
  LEVEL_LABEL,
  HOBBY_CATEGORIES,
  lookupHobby,
  LIFESTYLE_GROUPS,
} from "@/lib/profile-options";
import { cn } from "@/lib/utils";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type StudentProfileRow =
  Database["public"]["Tables"]["student_profiles"]["Row"];

const DEMO_PHOTO_POOL = [
  "/carlo-liberti.png",
  "https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
];

const BIO_MAX = 400;

export function EditProfileClient({
  profile,
  studentProfile,
}: {
  profile: Profile;
  studentProfile: StudentProfileRow | null;
}) {
  const router = useRouter();

  // ---- photos (main + gallery as a single ordered array; first is profile) ----
  const initialPhotos = useMemo(() => {
    const head = studentProfile?.photo_url ? [studentProfile.photo_url] : [];
    const rest = Array.isArray(studentProfile?.gallery)
      ? (studentProfile?.gallery as string[]).filter(
          (u): u is string => typeof u === "string",
        )
      : [];
    return [...head, ...rest];
  }, [studentProfile?.photo_url, studentProfile?.gallery]);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [videoUrl, setVideoUrl] = useState<string | null>(
    studentProfile?.video_url ?? null,
  );

  const addPhoto = () => {
    const used = new Set(photos);
    const candidate =
      DEMO_PHOTO_POOL.find((u) => !used.has(u)) ??
      DEMO_PHOTO_POOL[photos.length % DEMO_PHOTO_POOL.length];
    setPhotos((p) => [...p, candidate]);
  };
  const removePhoto = (idx: number) =>
    setPhotos((p) => p.filter((_, i) => i !== idx));
  const toggleVideo = () => {
    if (videoUrl) setVideoUrl(null);
    else setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4"); // mock
  };

  // ---- form fields ----
  const [city, setCity] = useState(studentProfile?.city ?? "");
  const [bio, setBio] = useState(studentProfile?.bio ?? "");
  const [hobbies, setHobbies] = useState<string[]>(
    studentProfile?.hobbies ?? [],
  );
  const [languages, setLanguages] = useState<LanguageSkill[]>(() =>
    normalizeLanguages(studentProfile?.languages),
  );
  const [lifestyle, setLifestyle] = useState<Partial<Lifestyle>>(
    (studentProfile?.lifestyle ?? {}) as Partial<Lifestyle>,
  );
  const [mobilityMonths, setMobilityMonths] = useState<number | null>(
    studentProfile?.mobility_duration_months ?? null,
  );

  const [hobbiesOpen, setHobbiesOpen] = useState(false);
  const [langsOpen, setLangsOpen] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const photoUrl = photos[0] ?? null;
      const gallery = photos.slice(1);
      const payload = {
        id: profile.id,
        city: city.trim() || null,
        bio: bio.trim() || null,
        hobbies,
        languages: languages as unknown as string[],
        lifestyle: lifestyle as unknown as Record<string, unknown>,
        photo_url: photoUrl,
        gallery,
        video_url: videoUrl,
        mobility_duration_months: mobilityMonths ?? undefined,
      };
      const { error: upErr } = await supabase
        .from("student_profiles")
        .upsert(payload);
      if (upErr) throw upErr;
      router.push("/student/profile");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to save";
      setError(msg);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <StatusBar />

      {/* Header */}
      <div className="px-4 pt-[54px]">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="flex size-[35px] items-center justify-center rounded-full bg-surface text-fg shadow-sm ring-1 ring-divider"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="h-title mt-4 text-fg">Profile</h1>
        <p className="mt-1 text-[14px] leading-[21px] text-fg-muted">
          <span className="mr-1">✨</span>
          Upload <span className="font-bold">at least 3 photos</span>, feel
          free to include photos with your family or friends.
        </p>
      </div>

      {/* Photo carousel */}
      <div className="mt-4 flex gap-3 overflow-x-auto px-4 pb-3 no-scrollbar">
        {photos.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative shrink-0 rounded-[20px] border-4 border-surface shadow-[0_0_5px_rgba(0,0,0,0.25)]"
            style={{ width: 139, height: 151 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`photo ${idx + 1}`}
              className="size-full rounded-[16px] object-cover"
            />
            {idx === 0 && (
              <span className="absolute bottom-2 left-2 rounded-full border border-student bg-surface px-3 py-[3px] text-[11px] font-semibold text-student">
                profile
              </span>
            )}
            <button
              onClick={() => removePhoto(idx)}
              aria-label="Remove photo"
              className="absolute -right-2 -top-2 flex size-[22px] items-center justify-center rounded-full bg-black/70 text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={addPhoto}
          aria-label="Add photo"
          className="flex shrink-0 items-center justify-center rounded-[20px] border border-dashed border-student bg-student/10"
          style={{ width: 139, height: 151 }}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-student text-white">
            <Plus size={22} />
          </span>
        </button>
      </div>

      {/* Video card */}
      <div className="mt-2 px-4">
        <button
          onClick={toggleVideo}
          className="relative flex items-center justify-center rounded-[22px] border-4 border-surface shadow-[0_0_5px_rgba(0,0,0,0.25)]"
          style={{ width: 139, height: 187 }}
        >
          {videoUrl ? (
            <>
              <video
                src={videoUrl}
                muted
                className="absolute inset-0 size-full rounded-[18px] object-cover"
              />
              <span className="absolute bottom-2 left-2 rounded-full border border-student bg-surface px-3 py-[3px] text-[11px] font-semibold text-student">
                video
              </span>
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center rounded-[18px] bg-chip text-fg-muted">
              <Upload size={20} />
              <span className="mt-1 text-[12px] font-medium">Add video</span>
            </div>
          )}
        </button>
      </div>

      {/* City */}
      <div className="mt-6 px-4">
        <Field label="City">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City, Country"
            className="w-full bg-transparent text-[14px] font-semibold text-fg outline-none placeholder:text-fg-subtle"
          />
        </Field>
      </div>

      {/* Bio */}
      <div className="mt-5 px-4">
        <div className="mb-1 flex items-end justify-between">
          <span className="text-[14px] text-fg">
            Introduce yourself in a few words
          </span>
          <span className="text-[12px] text-fg-muted">
            {bio.length}/{BIO_MAX}
          </span>
        </div>
        <textarea
          value={bio}
          maxLength={BIO_MAX}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
          className="w-full resize-none rounded-[10px] bg-surface p-3 text-[14px] font-semibold leading-[22px] text-fg outline-none placeholder:text-fg-subtle ring-1 ring-divider"
          placeholder="Hi! I'm…"
        />
      </div>

      {/* Hobbies */}
      <div className="mt-5 px-4">
        <span className="text-[14px] text-fg">Hobbies &amp; freetime</span>
        <button
          onClick={() => setHobbiesOpen(true)}
          className="mt-1 flex min-h-[52px] w-full items-center gap-2 rounded-[8px] bg-surface pl-3 pr-8 py-2 text-left relative ring-1 ring-divider"
        >
          <div className="flex flex-1 flex-wrap gap-[6px]">
            {hobbies.length === 0 && (
              <span className="text-[13px] text-fg-subtle">
                Tap to add hobbies
              </span>
            )}
            {hobbies.map((slug) => {
              const h = lookupHobby(slug);
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 rounded-full bg-chip px-[10px] py-[4px] text-[13px] text-fg shadow-[0_0_1px_0_rgba(0,0,0,0.25)]"
                >
                  <span>{h.emoji}</span>
                  {h.label}
                </span>
              );
            })}
          </div>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted"
          />
        </button>
      </div>

      {/* Languages */}
      <div className="mt-5 px-4">
        <span className="text-[14px] text-fg">Languages</span>
        <button
          onClick={() => setLangsOpen(true)}
          className="mt-1 flex min-h-[52px] w-full items-center gap-2 rounded-[8px] bg-surface pl-3 pr-8 py-2 text-left relative ring-1 ring-divider"
        >
          <div className="flex flex-1 flex-wrap gap-[6px]">
            {languages.length === 0 && (
              <span className="text-[13px] text-fg-subtle">
                Tap to add languages
              </span>
            )}
            {languages.map((l) => {
              const meta = LANGUAGE_META[l.code];
              if (!meta) return null;
              return (
                <span
                  key={l.code}
                  className="inline-flex items-center gap-1 rounded-full bg-chip px-[10px] py-[4px] text-[13px] text-fg shadow-[0_0_1px_0_rgba(0,0,0,0.25)]"
                >
                  <span>{meta.flag}</span>
                  {LEVEL_LABEL[l.level]}
                </span>
              );
            })}
          </div>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted"
          />
        </button>
      </div>

      {/* Mobility duration */}
      <div className="mt-5 px-4">
        <span className="text-[14px] text-fg">Mobility duration</span>
        <div className="mt-2 flex gap-2">
          {[3, 6, 10].map((m) => (
            <button
              key={m}
              onClick={() => setMobilityMonths(m)}
              className={cn(
                "flex-1 rounded-full border py-[10px] text-[13px] font-semibold",
                mobilityMonths === m
                  ? "border-student bg-student text-white"
                  : "border-divider bg-surface text-fg",
              )}
            >
              {m} months
            </button>
          ))}
        </div>
      </div>

      {/* Lifestyle */}
      <div className="mt-6 flex flex-col gap-5 px-4">
        {LIFESTYLE_GROUPS.map((g) => (
          <div key={g.key}>
            <div className="mb-1 text-[14px] text-fg">{g.label}</div>
            <div className="flex flex-col">
              {g.options.map((opt) => {
                const active = lifestyle[g.key] === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    onClick={() =>
                      setLifestyle((prev) => ({
                        ...prev,
                        [g.key]: opt.value,
                      }))
                    }
                    className="flex items-center gap-3 py-[5px] text-left"
                  >
                    <span
                      className={cn(
                        "flex size-[17px] shrink-0 items-center justify-center rounded-full border",
                        active ? "border-student" : "border-divider",
                      )}
                    >
                      {active && (
                        <span className="size-[9px] rounded-full bg-student" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-[14px]",
                        active
                          ? "font-bold text-student"
                          : "font-normal text-fg",
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 px-4 text-[13px] text-danger-fg">{error}</p>
      )}

      {/* Save (sticky) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[393px] px-4 pb-6">
        <div className="pointer-events-auto">
          <button
            onClick={onSave}
            disabled={saving}
            className={cn(
              "flex h-[45px] w-full items-center justify-center rounded-full bg-student px-6 text-[16px] font-semibold text-white shadow-lg",
              saving && "opacity-60",
            )}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {/* Hobbies sheet */}
      <LightSheet
        open={hobbiesOpen}
        onOpenChange={setHobbiesOpen}
        title="Hobbies & freetime"
        subtitle={`${hobbies.length}/5`}
      >
        <div className="flex flex-col gap-5">
          {HOBBY_CATEGORIES.map((c) => (
            <div key={c.title}>
              <div className="mb-2 text-[15px] font-semibold text-fg">
                {c.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.items.map((it) => {
                  const active = hobbies.includes(it.slug);
                  return (
                    <button
                      key={it.slug}
                      onClick={() =>
                        setHobbies((prev) => {
                          if (prev.includes(it.slug))
                            return prev.filter((x) => x !== it.slug);
                          if (prev.length >= 5) return prev;
                          return [...prev, it.slug];
                        })
                      }
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold",
                        active
                          ? "border-student bg-student text-white"
                          : "border-divider bg-surface text-fg",
                      )}
                    >
                      <span>{it.emoji}</span>
                      {it.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </LightSheet>

      {/* Languages sheet */}
      <LightSheet
        open={langsOpen}
        onOpenChange={setLangsOpen}
        title="Languages"
        subtitle=""
      >
        <div className="flex flex-col gap-5">
          {LANGUAGES.map(({ code, label, flag }) => {
            const current = languages.find((l) => l.code === code);
            return (
              <div key={code}>
                <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-fg">
                  <span className="text-xl">{flag}</span>
                  {label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_LEVELS.map((lv) => {
                    const active = current?.level === lv;
                    return (
                      <button
                        key={lv}
                        onClick={() => {
                          setLanguages((prev) => {
                            const without = prev.filter(
                              (l) => l.code !== code,
                            );
                            if (current && current.level === lv) return without;
                            return [...without, { code, level: lv }];
                          });
                        }}
                        className={cn(
                          "inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-semibold capitalize",
                          active
                            ? "border-student bg-student text-white"
                            : "border-divider bg-surface text-fg",
                        )}
                      >
                        {lv}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </LightSheet>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[14px] text-fg">{label}</span>
      <div className="flex h-[52px] items-center rounded-[8px] bg-surface px-3 ring-1 ring-divider">
        {children}
      </div>
    </label>
  );
}

function LightSheet({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[393px]",
            "max-h-[85vh] flex flex-col",
            "rounded-t-[28px] bg-bg px-5 pt-5 pb-0 text-fg",
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-[18px] font-bold">
                {title}
              </Dialog.Title>
              {subtitle && (
                <p className="mt-0.5 text-[12px] text-fg-muted">{subtitle}</p>
              )}
            </div>
            <Dialog.Close
              aria-label="Close"
              className="flex size-9 items-center justify-center rounded-full bg-chip"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="mt-4 flex-1 overflow-y-auto no-scrollbar pb-6">
            {children}
          </div>
          <div className="sticky bottom-0 bg-bg pb-6 pt-3">
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-[45px] w-full items-center justify-center rounded-full bg-student text-[16px] font-semibold text-white"
            >
              Done
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
