"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignupStore } from "@/lib/store/signup";
import { createClient } from "@/lib/supabase/client";

export default function FamilyOnboardingDonePage() {
  const router = useRouter();
  const { familyProfile, reset } = useSignupStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    (async () => {
      setBusy(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Not authenticated.");
        setBusy(false);
        return;
      }
      const payload = {
        id: user.id,
        family_name: familyProfile.familyName ?? null,
        city: familyProfile.city ?? null,
        home_type: familyProfile.homeType ?? null,
        spare_rooms: familyProfile.spareRooms ?? null,
        has_pets: familyProfile.hasPets ?? null,
        bio: familyProfile.bio ?? null,
        photo_url: familyProfile.photoUrl ?? null,
        members: familyProfile.members ?? [],
      };
      const { error: upErr } = await supabase
        .from("family_profiles")
        .upsert(payload, { onConflict: "id" });
      if (upErr) setError(upErr.message);
      setBusy(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-dvh bg-family flex flex-col items-center justify-center px-6 text-center">
      <div className="relative size-[160px]">
        <div className="absolute inset-0 rounded-full border-[6px] border-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-[72px] items-center justify-center rounded-full bg-white">
            <Check size={36} className="text-family" strokeWidth={3} />
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-[28px] font-bold leading-tight text-white">
        Welcome home!
        <br />
        Your profile is saved
      </h1>
      {error && (
        <p className="mt-3 text-[12px] text-danger-bg">{error}</p>
      )}

      <div className="absolute inset-x-0 bottom-8 px-4">
        <Button
          variant="whitePill"
          size="lg"
          width="full"
          disabled={busy}
          className="!text-family"
          onClick={() => {
            reset();
            router.push("/family/discover");
          }}
        >
          {busy ? "Saving…" : "Access the platform"}
        </Button>
      </div>
    </div>
  );
}
