"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  Bell,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Users,
  Home as HomeIcon,
} from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useAuthStore } from "@/lib/store/auth";
import { StatusBar } from "@/components/shared/status-bar";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type FamilyProfile = Database["public"]["Tables"]["family_profiles"]["Row"];

export function FamilyProfileClient({
  profile,
  familyProfile,
}: {
  profile: Profile;
  familyProfile: FamilyProfile | null;
}) {
  const router = useRouter();
  const { activeView, setActiveView } = useAuthStore();
  const role = profile.role;

  const fallbackPhoto =
    "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&auto=format&fit=crop&q=60";

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    useAuthStore.getState().reset();
    router.push("/welcome");
    router.refresh();
  };

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">Profile</h1>

        <div className="mt-5 overflow-hidden rounded-[24px] bg-surface ring-1 ring-divider">
          <div className="relative h-[180px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={familyProfile?.photo_url ?? fallbackPhoto}
              alt={familyProfile?.family_name ?? profile.last_name}
              className="size-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="h-section text-fg">
              {familyProfile?.family_name ?? `${profile.last_name} family`}
            </h2>
            <p className="mt-1 flex items-center gap-2 text-[13px] text-fg-muted">
              <HomeIcon size={12} />
              {familyProfile?.city ?? "—"}
              {familyProfile?.country && `, ${familyProfile.country}`}
              {familyProfile?.spare_rooms !== null &&
                familyProfile?.spare_rooms !== undefined &&
                ` · ${familyProfile.spare_rooms} spare room${
                  familyProfile.spare_rooms !== 1 ? "s" : ""
                }`}
            </p>
            {familyProfile?.bio && (
              <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                {familyProfile.bio}
              </p>
            )}
            {familyProfile?.members && familyProfile.members.length > 0 && (
              <div className="mt-3 text-[12px] text-fg-muted">
                Members: {familyProfile.members.join(" · ")}
              </div>
            )}
            <button
              onClick={() => router.push("/onboarding/family/home")}
              className="mt-4 h-10 rounded-full bg-family px-4 text-[13px] font-semibold text-white"
            >
              Edit profile
            </button>
          </div>
        </div>

        {role === "both" && (
          <div className="mt-5 flex items-center justify-between rounded-[16px] bg-surface p-4 ring-1 ring-divider">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-both text-white">
                <Users size={18} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-fg">Viewing as</div>
                <div className="text-[12px] text-fg-muted">
                  Switch to the student experience
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-fg-muted">
                Student
              </span>
              <Switch.Root
                checked={activeView === "family"}
                onCheckedChange={async (checked) => {
                  const next = checked ? "family" : "student";
                  setActiveView(next);
                  const supabase = createClient();
                  await supabase
                    .from("profiles")
                    .update({ active_view: next })
                    .eq("id", profile.id);
                  router.push(
                    checked ? "/family/discover" : "/student/discover",
                  );
                }}
                className="relative h-6 w-11 rounded-full bg-divider data-[state=checked]:bg-family transition"
              >
                <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-bg shadow transition data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
              <span className="text-[12px] font-semibold text-fg-muted">
                Family
              </span>
            </div>
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-[16px] bg-surface ring-1 ring-divider">
          <Row
            icon={<Settings size={16} />}
            label="Account settings"
            onClick={() => router.push("/settings")}
          />
          <Row icon={<Bell size={16} />} label="Notifications" />
          <Row icon={<ShieldCheck size={16} />} label="Privacy & security" />
          <Row icon={<HelpCircle size={16} />} label="Help center" />
        </div>

        <button
          onClick={signOut}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-divider py-3 text-[14px] font-semibold text-fg-muted"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </>
  );
}

function Row({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-divider px-4 py-3.5 text-left last:border-b-0"
    >
      <span className="text-family">{icon}</span>
      <span className="flex-1 text-[14px] text-fg">{label}</span>
      <ChevronRight size={18} className="text-fg-subtle" />
    </button>
  );
}
