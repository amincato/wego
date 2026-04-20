"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSignupStore } from "@/lib/store/signup";
import type { LanguageSkill, Lifestyle } from "@/lib/types";

/**
 * On first render of the onboarding wizard, if the user is authenticated and
 * already has a student_profile / family_profile row, pull those values into
 * the Zustand signup draft so the wizard renders as "edit" pre-filled.
 * Skips if the draft already has meaningful data (user just entered the flow).
 */
export function useStudentProfileBootstrap() {
  const { studentProfile, setStudentProfile } = useSignupStore();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const hasDraft = Object.keys(studentProfile).length > 0;
    if (hasDraft) return;

    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!data) return;

      setStudentProfile({
        birthday: data.birthday ?? undefined,
        city: data.city ?? undefined,
        languages: data.languages as unknown as LanguageSkill[],
        lifestyle: data.lifestyle as unknown as Partial<Lifestyle>,
        hobbies: data.hobbies ?? undefined,
        bio: data.bio ?? undefined,
        photoUrl: data.photo_url ?? undefined,
        galleryUrls: data.gallery as unknown as string[],
        videoUrl: data.video_url ?? undefined,
        mobilityDurationMonths: data.mobility_duration_months ?? undefined,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useFamilyProfileBootstrap() {
  const { familyProfile, setFamilyProfile } = useSignupStore();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const hasDraft = Object.keys(familyProfile).length > 0;
    if (hasDraft) return;

    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("family_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!data) return;

      setFamilyProfile({
        familyName: data.family_name ?? undefined,
        city: data.city ?? undefined,
        homeType: data.home_type ?? undefined,
        spareRooms: data.spare_rooms ?? undefined,
        hasPets: data.has_pets ?? undefined,
        bio: data.bio ?? undefined,
        photoUrl: data.photo_url ?? undefined,
        members: data.members ?? undefined,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
