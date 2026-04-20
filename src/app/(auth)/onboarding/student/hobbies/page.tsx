"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";
import { cn } from "@/lib/utils";

const categories: { title: string; items: { slug: string; label: string; emoji: string }[] }[] = [
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
      { slug: "fitness", label: "Fitness", emoji: "💪" },
      { slug: "ski", label: "Ski", emoji: "🎿" },
      { slug: "dance", label: "Dance", emoji: "💃" },
      { slug: "cycling", label: "Cycling", emoji: "🚴" },
      { slug: "skating", label: "Skating", emoji: "⛸️" },
    ],
  },
  {
    title: "Entertainment",
    items: [
      { slug: "drawing", label: "Drawing", emoji: "🎨" },
      { slug: "music", label: "Music", emoji: "🎵" },
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

export default function HobbiesStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [selected, setSelected] = useState<string[]>(
    studentProfile.hobbies ?? [],
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 5) return prev;
      return [...prev, slug];
    });
  };

  return (
    <WizardShell
      backHref="/onboarding/student/lifestyle"
      progress={0.55}
      title="Hobbies and freetime"
      primaryDisabled={selected.length === 0}
      primaryOnClick={() => {
        setStudentProfile({ hobbies: selected });
        router.push("/onboarding/student/bio");
      }}
    >
      <p className="-mt-4 mb-5 text-[13px] text-fg-muted">{selected.length}/5</p>
      <div className="flex flex-col gap-6">
        {categories.map((c) => (
          <div key={c.title}>
            <div className="mb-2 text-[15px] font-semibold text-fg">
              {c.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {c.items.map((it) => {
                const active = selected.includes(it.slug);
                return (
                  <button
                    key={it.slug}
                    onClick={() => toggle(it.slug)}
                    className={cn(
                      "h-10 px-4 inline-flex items-center gap-1.5 rounded-full border text-[13px] font-semibold",
                      active
                        ? "bg-student text-white border-student"
                        : "bg-surface text-fg border-divider",
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
    </WizardShell>
  );
}
