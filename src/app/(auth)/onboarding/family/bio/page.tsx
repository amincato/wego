"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";

export default function FamilyBioStep() {
  const router = useRouter();
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const [bio, setBio] = useState(familyProfile.bio ?? "");

  return (
    <WizardShell
      variant="family"
      backHref="/onboarding/family/pets"
      progress={0.6}
      title="Tell students about your family"
      primaryDisabled={bio.trim().length < 30}
      primaryOnClick={() => {
        setFamilyProfile({ bio: bio.trim() });
        router.push("/onboarding/family/photo");
      }}
    >
      <textarea
        rows={8}
        maxLength={500}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Share what makes your family special, your lifestyle, traditions, favorite places…"
        className="w-full rounded-lg bg-surface p-4 text-[14px] text-fg placeholder:text-fg-subtle ring-1 ring-divider focus:outline-none focus:ring-2 focus:ring-family resize-none"
      />
      <div className="mt-2 text-right text-[12px] text-fg-muted">
        {bio.length}/500
      </div>
    </WizardShell>
  );
}
