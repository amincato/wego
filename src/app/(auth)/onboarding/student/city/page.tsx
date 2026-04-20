"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { TextInput } from "@/components/auth/text-input";
import { useSignupStore } from "@/lib/store/signup";

export default function CityStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [city, setCity] = useState(studentProfile.city ?? "");

  return (
    <WizardShell
      backHref="/onboarding/student/birthday"
      progress={0.2}
      title="Where do you live?"
      primaryDisabled={city.trim().length === 0}
      primaryOnClick={() => {
        setStudentProfile({ city: city.trim() });
        router.push("/onboarding/student/languages");
      }}
    >
      <TextInput
        label="City"
        placeholder="Write the name of your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </WizardShell>
  );
}
