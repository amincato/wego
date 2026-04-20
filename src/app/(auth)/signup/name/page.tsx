"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { TextInput } from "@/components/auth/text-input";
import { useSignupStore } from "@/lib/store/signup";

export default function NameStep() {
  const router = useRouter();
  const { account, setAccount } = useSignupStore();
  const [name, setName] = useState(account.name ?? "");
  const [surname, setSurname] = useState(account.surname ?? "");

  const canContinue = name.trim().length > 0 && surname.trim().length > 0;

  return (
    <WizardShell
      backHref="/role-select"
      progress={0.15}
      title="What's your name?"
      primaryDisabled={!canContinue}
      primaryOnClick={() => {
        setAccount({ name: name.trim(), surname: surname.trim() });
        router.push("/signup/id-upload");
      }}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Surname"
          placeholder="Enter surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
    </WizardShell>
  );
}
