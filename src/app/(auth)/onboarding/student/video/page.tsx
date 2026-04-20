"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Play } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";

const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function VideoStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [videoUrl, setVideoUrl] = useState(studentProfile.videoUrl ?? "");

  const onSubmit = () => {
    setStudentProfile({ videoUrl });
    router.push("/onboarding/student/done");
  };

  return (
    <WizardShell
      backHref="/onboarding/student/pictures"
      progress={0.92}
      title="Add a presentation video"
      primaryLabel={videoUrl ? "Continue" : "Skip"}
      primaryOnClick={onSubmit}
      secondaryLabel={videoUrl ? undefined : "Later"}
      secondaryOnClick={onSubmit}
    >
      <button
        type="button"
        onClick={() => setVideoUrl(DEMO_VIDEO)}
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[16px] border-2 border-dashed border-student bg-student/10"
      >
        {videoUrl ? (
          <div className="relative size-full bg-black">
            <video
              src={videoUrl}
              className="size-full object-cover"
              playsInline
              muted
              loop
              autoPlay
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-student">
                <Play size={22} fill="currentColor" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-14 items-center justify-center rounded-full bg-student text-white">
              <Plus size={24} />
            </div>
            <span className="text-[13px] text-fg-muted">Video</span>
          </div>
        )}
      </button>
    </WizardShell>
  );
}
