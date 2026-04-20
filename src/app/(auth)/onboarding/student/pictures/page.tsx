"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";

const DEMO_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
];

export default function PicturesStep() {
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const [profilePicture, setProfilePicture] = useState(
    studentProfile.photoUrl ?? "",
  );
  const [gallery, setGallery] = useState<string[]>(
    studentProfile.galleryUrls ?? [],
  );

  const addProfile = () => {
    if (!profilePicture) setProfilePicture(DEMO_AVATARS[0]);
  };
  const addGallery = (idx: number) => {
    setGallery((prev) => {
      const next = [...prev];
      next[idx] = DEMO_AVATARS[(idx + 1) % DEMO_AVATARS.length];
      return next.slice(0, 5);
    });
  };

  return (
    <WizardShell
      backHref="/onboarding/student/bio"
      progress={0.82}
      title="Add your pictures"
      primaryDisabled={!profilePicture}
      primaryOnClick={() => {
        setStudentProfile({ photoUrl: profilePicture, galleryUrls: gallery });
        router.push("/onboarding/student/video");
      }}
    >
      <div className="grid grid-cols-3 gap-3">
        {/* Profile picture — takes 2 columns */}
        <button
          type="button"
          onClick={addProfile}
          className="col-span-2 row-span-2 flex flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-student bg-student/10 aspect-square overflow-hidden"
        >
          {profilePicture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profilePicture} alt="profile" className="size-full object-cover" />
          ) : (
            <>
              <div className="flex size-12 items-center justify-center rounded-full bg-student text-white">
                <Plus size={22} />
              </div>
              <span className="text-[13px] text-fg-muted">Profile picture</span>
            </>
          )}
        </button>

        {[0, 1].map((i) => (
          <GallerySlot
            key={i}
            dashed
            value={gallery[i]}
            onAdd={() => addGallery(i)}
          />
        ))}
        {[2, 3, 4].map((i) => (
          <GallerySlot
            key={i}
            value={gallery[i]}
            onAdd={() => addGallery(i)}
          />
        ))}
      </div>
    </WizardShell>
  );
}

function GallerySlot({
  value,
  onAdd,
  dashed,
}: {
  value?: string;
  onAdd: () => void;
  dashed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className={
        dashed
          ? "flex aspect-square items-center justify-center rounded-[14px] border-2 border-dashed border-student bg-student/10 overflow-hidden"
          : "flex aspect-square items-center justify-center rounded-[14px] bg-surface shadow-sm ring-1 ring-divider overflow-hidden"
      }
    >
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="size-full object-cover" />
      ) : dashed ? (
        <div className="flex size-8 items-center justify-center rounded-full bg-student text-white">
          <Plus size={16} />
        </div>
      ) : (
        <div className="flex size-8 items-center justify-center rounded-full bg-student/20 text-student">
          <Plus size={16} />
        </div>
      )}
    </button>
  );
}
