"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignupStore } from "@/lib/store/signup";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingDonePage() {
  const router = useRouter();
  const { studentProfile, reset } = useSignupStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedRef = useRef(false);

  // Persist the draft to Supabase on mount.
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
        birthday: studentProfile.birthday ?? null,
        city: studentProfile.city ?? null,
        languages: (studentProfile.languages ?? []) as unknown as never,
        lifestyle: (studentProfile.lifestyle ?? {}) as unknown as never,
        hobbies: studentProfile.hobbies ?? [],
        bio: studentProfile.bio ?? null,
        photo_url: studentProfile.photoUrl ?? null,
        gallery: (studentProfile.galleryUrls ?? []) as unknown as never,
        video_url: studentProfile.videoUrl ?? null,
        mobility_duration_months:
          studentProfile.mobilityDurationMonths ?? null,
      };
      const { error: upErr } = await supabase
        .from("student_profiles")
        .upsert(payload, { onConflict: "id" });
      if (upErr) setError(upErr.message);
      setBusy(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-dvh bg-student flex flex-col items-center justify-center px-6 text-center">
      <div className="relative size-[160px]">
        <div className="absolute inset-0 rounded-full border-[6px] border-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-[72px] items-center justify-center rounded-full bg-white">
            <Check size={36} className="text-student" strokeWidth={3} />
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-[28px] font-bold leading-tight text-white">
        Great!
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
          onClick={() => {
            reset();
            router.push("/student/discover");
          }}
        >
          {busy ? "Saving…" : "Access the platform"}
        </Button>
      </div>
    </div>
  );
}
