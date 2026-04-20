"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";
import type { LanguageCode, LanguageLevel, LanguageSkill } from "@/lib/types";
import { cn } from "@/lib/utils";

const languages: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
];

const levels: LanguageLevel[] = ["beginner", "intermediate", "advanced", "native"];

export default function LanguagesStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [selected, setSelected] = useState<LanguageSkill[]>(
    studentProfile.languages ?? [],
  );

  const setLevel = (code: LanguageCode, level: LanguageLevel) => {
    setSelected((prev) => {
      const without = prev.filter((l) => l.code !== code);
      const current = prev.find((l) => l.code === code);
      if (current && current.level === level) return without;
      return [...without, { code, level }];
    });
  };

  return (
    <WizardShell
      backHref="/onboarding/student/city"
      progress={0.3}
      title="Which languages do you speak?"
      primaryDisabled={selected.length === 0}
      primaryOnClick={() => {
        setStudentProfile({ languages: selected });
        router.push("/onboarding/student/lifestyle");
      }}
    >
      <div className="flex flex-col gap-6">
        {languages.map(({ code, label, flag }) => {
          const current = selected.find((l) => l.code === code);
          return (
            <div key={code} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-fg">
                <span className="text-xl">{flag}</span>
                {label}
              </div>
              <div className="flex flex-wrap gap-2">
                {levels.map((lv) => {
                  const active = current?.level === lv;
                  return (
                    <button
                      key={lv}
                      type="button"
                      onClick={() => setLevel(code, lv)}
                      className={cn(
                        "h-9 px-4 rounded-full border text-[13px] font-semibold capitalize",
                        active
                          ? "bg-student text-white border-student"
                          : "bg-surface text-fg border-divider",
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
    </WizardShell>
  );
}
