/**
 * Shared metadata for profile display + editing (student side).
 * All options are derived from the Figma flows so that the profile view,
 * the edit view, and the onboarding wizard render the exact same strings.
 */

import type {
  LanguageCode,
  LanguageLevel,
  LanguageSkill,
  Lifestyle,
} from "./types";

/* ---------------- Hobbies ---------------- */

export type HobbyMeta = { slug: string; label: string; emoji: string };

export const HOBBY_CATEGORIES: { title: string; items: HobbyMeta[] }[] = [
  {
    title: "Sports",
    items: [
      { slug: "football", label: "Football", emoji: "⚽️" },
      { slug: "basket", label: "Basket", emoji: "🏀" },
      { slug: "swimming", label: "Swimming", emoji: "🏊" },
      { slug: "tennis", label: "Tennis", emoji: "🎾" },
      { slug: "volley", label: "Volley", emoji: "🏐" },
      { slug: "running", label: "Running", emoji: "🏃" },
      { slug: "yoga", label: "Yoga", emoji: "🧘" },
      { slug: "fitness", label: "Fitness", emoji: "🏋️" },
      { slug: "ski", label: "Ski", emoji: "⛷️" },
      { slug: "dance", label: "Dance", emoji: "💃" },
      { slug: "cycling", label: "Cycling", emoji: "🚴" },
      { slug: "skating", label: "Skating", emoji: "⛸️" },
    ],
  },
  {
    title: "Entertainment",
    items: [
      { slug: "drawing", label: "Drawing", emoji: "🎨" },
      { slug: "music", label: "Music", emoji: "🎶" },
      { slug: "photography", label: "Photography", emoji: "📷" },
      { slug: "acting", label: "Acting", emoji: "🎭" },
      { slug: "movies_tv", label: "Movies - TV series", emoji: "🎬" },
      { slug: "reading", label: "Reading", emoji: "📚" },
    ],
  },
  {
    title: "Social & Outdoor",
    items: [
      { slug: "travelling", label: "Travelling", emoji: "✈️" },
      { slug: "shopping", label: "Shopping", emoji: "🛍️" },
      { slug: "hanging_out", label: "Hanging out with friends", emoji: "☕️" },
      { slug: "try_new_foods", label: "Try new foods", emoji: "🍔" },
    ],
  },
];

export const HOBBY_META: Record<string, HobbyMeta> = Object.fromEntries(
  HOBBY_CATEGORIES.flatMap((c) => c.items).map((h) => [h.slug, h]),
);

export function lookupHobby(slug: string): HobbyMeta {
  return HOBBY_META[slug] ?? { slug, label: slug, emoji: "🎯" };
}

/* ---------------- Languages ---------------- */

export const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] =
  [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
  ];

export const LANGUAGE_META: Record<
  LanguageCode,
  { label: string; flag: string }
> = Object.fromEntries(LANGUAGES.map((l) => [l.code, l])) as unknown as Record<
  LanguageCode,
  { label: string; flag: string }
>;

export const LANGUAGE_LEVELS: LanguageLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
  "native",
];

export const LEVEL_LABEL: Record<LanguageLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  native: "Native",
};

/**
 * The stored `languages` JSON in Supabase follows the `LanguageSkill` shape:
 * `{ code: LanguageCode; level: LanguageLevel }`.
 * Some legacy/demo records may use `{ language, level }` with a full name — we
 * try to recover in that case.
 */
export function normalizeLanguages(raw: unknown): LanguageSkill[] {
  if (!Array.isArray(raw)) return [];
  const nameToCode: Record<string, LanguageCode> = {
    english: "en",
    italian: "it",
    french: "fr",
    german: "de",
    spanish: "es",
  };
  const levelMap: Record<string, LanguageLevel> = {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "advanced",
    native: "native",
    a1: "beginner",
    a2: "beginner",
    b1: "intermediate",
    b2: "advanced",
    c1: "advanced",
    c2: "native",
  };
  return raw
    .map((item): LanguageSkill | null => {
      if (!item || typeof item !== "object") return null;
      const o = item as Record<string, unknown>;
      let code: LanguageCode | undefined;
      if (typeof o.code === "string" && o.code in LANGUAGE_META)
        code = o.code as LanguageCode;
      else if (typeof o.language === "string")
        code = nameToCode[o.language.toLowerCase()];
      const levelRaw = typeof o.level === "string" ? o.level.toLowerCase() : "";
      const level: LanguageLevel = levelMap[levelRaw] ?? "intermediate";
      if (!code) return null;
      return { code, level };
    })
    .filter((x): x is LanguageSkill => x !== null);
}

/* ---------------- Lifestyle ---------------- */

export type LifestyleGroup<K extends keyof Lifestyle> = {
  key: K;
  icon: string;
  label: string; // section title ("At home", "Social life", ...)
  options: {
    value: Lifestyle[K];
    label: string; // long form shown in edit radio list
    summary: string; // short form shown in profile view list
  }[];
};

export const LIFESTYLE_GROUPS: [
  LifestyleGroup<"atHome">,
  LifestyleGroup<"socialLife">,
  LifestyleGroup<"pets">,
  LifestyleGroup<"dailyHabits">,
  LifestyleGroup<"foodDiet">,
] = [
  {
    key: "atHome",
    icon: "🏠",
    label: "At home",
    options: [
      {
        value: "time_with_family",
        label: "I spend a lot of time with my family",
        summary: "I spend a lot of time with my family",
      },
      {
        value: "often_out",
        label: "I am often out of the house",
        summary: "I am often out of the house",
      },
      {
        value: "invite_people",
        label: "I like inviting people over",
        summary: "I like inviting people over",
      },
      {
        value: "quiet_private",
        label: "I keep things quiet and private",
        summary: "I keep things quiet and private",
      },
    ],
  },
  {
    key: "socialLife",
    icon: "👥",
    label: "Social life",
    options: [
      {
        value: "social_outgoing",
        label: "I'm very social and outgoing",
        summary: "I'm very social and outgoing",
      },
      {
        value: "small_circles",
        label: "I prefer small, closed circles",
        summary: "I prefer small, closed circles",
      },
      {
        value: "on_my_own",
        label: "I like being on my own",
        summary: "I like being on my own",
      },
    ],
  },
  {
    key: "pets",
    icon: "🐾",
    label: "Pets",
    options: [
      { value: "has_pet_ok", label: "I have a pet", summary: "I have a pet" },
      {
        value: "no_pets",
        label: "I don't have pets but I like them",
        summary: "I like pets, none at home",
      },
      {
        value: "no_pets_please",
        label: "I prefer not living with pets",
        summary: "I prefer not living with pets",
      },
    ],
  },
  {
    key: "dailyHabits",
    icon: "🌱",
    label: "Daily life",
    options: [
      {
        value: "structured",
        label: "I have a structured routine",
        summary: "I have a structured daily routine",
      },
      {
        value: "flexible",
        label: "I have a flexible daily routine",
        summary: "I have a flexible daily routine",
      },
      {
        value: "no_schedule",
        label: "I prefer not having regular schedules",
        summary: "I prefer not having regular schedules",
      },
    ],
  },
  {
    key: "foodDiet",
    icon: "🍕",
    label: "Food & diet",
    options: [
      {
        value: "not_specific",
        label: "Not specific diet",
        summary: "Not specific diet",
      },
      {
        value: "vegetarian",
        label: "Vegetarian diet",
        summary: "Vegetarian diet",
      },
      { value: "vegan", label: "Vegan diet", summary: "Vegan diet" },
    ],
  },
];

export function lifestyleSummary<K extends keyof Lifestyle>(
  key: K,
  value: Lifestyle[K] | undefined,
): { icon: string; label: string; summary: string } | null {
  const g = LIFESTYLE_GROUPS.find((x) => x.key === key) as
    | LifestyleGroup<K>
    | undefined;
  if (!g) return null;
  const opt = g.options.find((o) => o.value === value);
  if (!opt) return null;
  return { icon: g.icon, label: g.label, summary: opt.summary };
}
