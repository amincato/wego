"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";
import type { Lifestyle } from "@/lib/types";
import { cn } from "@/lib/utils";

type Group<K extends keyof Lifestyle> = {
  key: K;
  icon: string;
  label: string;
  options: { value: Lifestyle[K]; label: string }[];
};

const groups: [
  Group<"atHome">,
  Group<"socialLife">,
  Group<"pets">,
  Group<"dailyHabits">,
  Group<"foodDiet">,
] = [
  {
    key: "atHome",
    icon: "🏠",
    label: "At home",
    options: [
      { value: "time_with_family", label: "I spend a lot of time with my family" },
      { value: "often_out", label: "I am often out of the house" },
      { value: "invite_people", label: "I like inviting people over" },
      { value: "quiet_private", label: "I keep things quiet and private" },
    ],
  },
  {
    key: "socialLife",
    icon: "👥",
    label: "Social life",
    options: [
      { value: "social_outgoing", label: "I'm very social and outgoing" },
      { value: "small_circles", label: "I prefer small, closed circles" },
      { value: "on_my_own", label: "I like being on my own" },
    ],
  },
  {
    key: "pets",
    icon: "🐾",
    label: "Pets",
    options: [
      { value: "has_pet_ok", label: "I have a pet and I'm fine with them" },
      { value: "no_pets", label: "I don't have pets" },
      { value: "no_pets_please", label: "I don't want to live with pets" },
    ],
  },
  {
    key: "dailyHabits",
    icon: "🌱",
    label: "Daily habits",
    options: [
      { value: "structured", label: "I have a structured routine" },
      { value: "flexible", label: "I have a flexible daily routine" },
      { value: "no_schedule", label: "I prefer not having regular schedules" },
    ],
  },
  {
    key: "foodDiet",
    icon: "🍕",
    label: "Food & diet",
    options: [
      { value: "not_specific", label: "Not specific diet" },
      { value: "vegetarian", label: "Vegetarian diet" },
      { value: "vegan", label: "Vegan diet" },
    ],
  },
];

export default function LifestyleStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [value, setValue] = useState<Partial<Lifestyle>>(
    studentProfile.lifestyle ?? {},
  );

  const complete = groups.every((g) => value[g.key] !== undefined);

  return (
    <WizardShell
      backHref="/onboarding/student/languages"
      progress={0.45}
      title="Which is your lifestyle?"
      primaryDisabled={!complete}
      primaryOnClick={() => {
        setStudentProfile({ lifestyle: value });
        router.push("/onboarding/student/hobbies");
      }}
    >
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-fg">
              <span className="text-xl">{g.icon}</span>
              {g.label}
            </div>
            <div className="rounded-[16px] bg-surface p-3 shadow-sm ring-1 ring-divider">
              {g.options.map((opt) => {
                const active = value[g.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setValue((prev) => ({
                        ...prev,
                        [g.key]: opt.value,
                      }))
                    }
                    className="flex w-full items-center gap-3 py-2 text-left"
                  >
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full border",
                        active ? "border-student" : "border-divider",
                      )}
                    >
                      {active && (
                        <span className="size-2.5 rounded-full bg-student" />
                      )}
                    </span>
                    <span className="text-[14px] text-fg">
                      {opt.label}
                    </span>
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
