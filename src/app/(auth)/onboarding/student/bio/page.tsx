"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";

const MAX = 400;

export default function BioStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [bio, setBio] = useState(studentProfile.bio ?? "");

  return (
    <WizardShell
      backHref="/onboarding/student/hobbies"
      progress={0.7}
      title="Bio"
      primaryOnClick={() => {
        setStudentProfile({ bio });
        router.push("/onboarding/student/pictures");
      }}
    >
      <p className="-mt-4 mb-4 text-[14px] text-fg">
        Introduce yourself in a few words
      </p>
      <div className="rounded-[16px] bg-surface p-4 shadow-sm ring-1 ring-divider">
        <textarea
          value={bio}
          maxLength={MAX}
          onChange={(e) => setBio(e.target.value)}
          rows={7}
          placeholder="Feel free to share something about yourself, what inspired you to join this experience, what motivates you…."
          className="w-full resize-none bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
        />
      </div>
      <div className="mt-2 text-right text-[12px] text-fg-muted">
        {bio.length}/{MAX}
      </div>
    </WizardShell>
  );
}
