"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { TextInput } from "@/components/auth/text-input";
import { useSignupStore } from "@/lib/store/signup";

export default function FamilyMembersStep() {
  const router = useRouter();
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const [members, setMembers] = useState<string[]>(
    familyProfile.members ?? [],
  );
  const [draft, setDraft] = useState("");

  return (
    <WizardShell
      variant="family"
      backHref="/onboarding/family/home"
      progress={0.3}
      title="Who lives at home?"
      primaryDisabled={members.length === 0}
      primaryOnClick={() => {
        setFamilyProfile({ members });
        router.push("/onboarding/family/pets");
      }}
    >
      <div className="flex gap-2">
        <TextInput
          label="Add a member"
          placeholder="e.g. Mark, 42 — Father"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              e.preventDefault();
              setMembers([...members, draft.trim()]);
              setDraft("");
            }
          }}
          className="flex-1"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (draft.trim()) {
            setMembers([...members, draft.trim()]);
            setDraft("");
          }
        }}
        className="mt-3 flex h-10 items-center justify-center gap-1 rounded-full bg-family px-4 text-[13px] font-semibold text-white"
      >
        <Plus size={16} />
        Add
      </button>

      <div className="mt-5 flex flex-col gap-2">
        {members.map((m, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-[14px] text-fg ring-1 ring-divider"
          >
            <span>{m}</span>
            <button
              type="button"
              onClick={() => setMembers(members.filter((_, j) => j !== i))}
              className="text-fg-muted"
              aria-label="Remove"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </WizardShell>
  );
}
