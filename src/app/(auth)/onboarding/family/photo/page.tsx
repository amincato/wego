"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { UploadBox } from "@/components/auth/upload-box";
import { useSignupStore } from "@/lib/store/signup";

const DEMO_PHOTO =
  "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&auto=format&fit=crop&q=60";

export default function FamilyPhotoStep() {
  const router = useRouter();
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const [uploaded, setUploaded] = useState(
    Boolean(familyProfile.photoUrl),
  );

  return (
    <WizardShell
      variant="family"
      backHref="/onboarding/family/bio"
      progress={0.8}
      title="Add a family photo"
      primaryDisabled={!uploaded}
      primaryOnClick={() => {
        setFamilyProfile({ photoUrl: DEMO_PHOTO });
        router.push("/onboarding/family/done");
      }}
    >
      <p className="mb-4 text-[13px] text-fg-muted">
        A warm, friendly picture helps students feel at home.
      </p>
      <UploadBox
        accept="JPG, PNG"
        accentColor="#ff7834"
        onUploaded={() => setUploaded(true)}
        onCleared={() => setUploaded(false)}
      />
    </WizardShell>
  );
}
