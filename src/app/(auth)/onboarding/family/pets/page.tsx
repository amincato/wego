"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";
import { cn } from "@/lib/utils";

export default function FamilyPetsStep() {
  const router = useRouter();
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const [hasPets, setHasPets] = useState<boolean | undefined>(
    familyProfile.hasPets,
  );

  return (
    <WizardShell
      variant="family"
      backHref="/onboarding/family/members"
      progress={0.45}
      title="Do you have pets?"
      primaryDisabled={hasPets === undefined}
      primaryOnClick={() => {
        setFamilyProfile({ hasPets });
        router.push("/onboarding/family/bio");
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Choice
          selected={hasPets === true}
          label="Yes, we do"
          onClick={() => setHasPets(true)}
        />
        <Choice
          selected={hasPets === false}
          label="No pets"
          onClick={() => setHasPets(false)}
        />
      </div>
    </WizardShell>
  );
}

function Choice({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[72px] items-center justify-center rounded-lg border-2 bg-surface text-[14px] font-semibold text-fg transition",
        selected ? "border-family text-family" : "border-transparent",
      )}
    >
      {label}
    </button>
  );
}
