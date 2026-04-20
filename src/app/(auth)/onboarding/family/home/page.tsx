"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home as HouseIcon, Building2 } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { TextInput } from "@/components/auth/text-input";
import { useSignupStore } from "@/lib/store/signup";
import { useFamilyProfileBootstrap } from "@/lib/hooks/use-profile-bootstrap";
import { cn } from "@/lib/utils";

export default function FamilyHomeStep() {
  useFamilyProfileBootstrap();
  const router = useRouter();
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const [familyName, setFamilyName] = useState(familyProfile.familyName ?? "");
  const [city, setCity] = useState(familyProfile.city ?? "");
  const [homeType, setHomeType] = useState<"apartment" | "house" | undefined>(
    familyProfile.homeType,
  );
  const [rooms, setRooms] = useState<number>(familyProfile.spareRooms ?? 1);

  // Sync from draft after async bootstrap from Supabase.
  useEffect(() => {
    if (familyProfile.familyName && !familyName)
      setFamilyName(familyProfile.familyName);
    if (familyProfile.city && !city) setCity(familyProfile.city);
    if (familyProfile.homeType && !homeType) setHomeType(familyProfile.homeType);
    if (familyProfile.spareRooms && rooms === 1)
      setRooms(familyProfile.spareRooms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    familyProfile.familyName,
    familyProfile.city,
    familyProfile.homeType,
    familyProfile.spareRooms,
  ]);

  const canContinue =
    familyName.trim().length > 1 && city.trim().length > 1 && !!homeType;

  return (
    <WizardShell
      variant="family"
      backHref="/onboarding/family/intro"
      progress={0.15}
      title="Tell us about your home"
      primaryDisabled={!canContinue}
      primaryOnClick={() => {
        setFamilyProfile({
          familyName: familyName.trim(),
          city: city.trim(),
          homeType,
          spareRooms: rooms,
        });
        router.push("/onboarding/family/members");
      }}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="Family name"
          placeholder="e.g. The Miller family"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <TextInput
          label="City"
          placeholder="Where do you live?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div>
          <div className="mb-2 text-sm text-fg">Home type</div>
          <div className="grid grid-cols-2 gap-3">
            <TypeCard
              selected={homeType === "apartment"}
              onClick={() => setHomeType("apartment")}
              icon={<Building2 size={24} />}
              label="Apartment"
            />
            <TypeCard
              selected={homeType === "house"}
              onClick={() => setHomeType("house")}
              icon={<HouseIcon size={24} />}
              label="House"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 text-sm text-fg">Spare rooms</div>
          <div className="flex items-center gap-4 rounded-lg bg-surface px-4 py-3 ring-1 ring-divider">
            <button
              type="button"
              onClick={() => setRooms(Math.max(1, rooms - 1))}
              className="flex size-9 items-center justify-center rounded-full bg-chip text-xl font-bold text-fg"
            >
              −
            </button>
            <div className="flex-1 text-center text-[18px] font-bold text-fg">
              {rooms}
            </div>
            <button
              type="button"
              onClick={() => setRooms(Math.min(6, rooms + 1))}
              className="flex size-9 items-center justify-center rounded-full bg-family text-xl font-bold text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}

function TypeCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[80px] flex-col items-center justify-center gap-1.5 rounded-lg border-2 bg-surface text-fg transition",
        selected ? "border-family text-family" : "border-transparent",
      )}
    >
      {icon}
      <span className="text-[13px] font-semibold">{label}</span>
    </button>
  );
}
