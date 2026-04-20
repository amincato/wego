import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/queries";
import { FamilyProfileClient } from "./profile-client";

export default async function FamilyProfilePage() {
  const { user, profile, familyProfile } = await getCurrentProfile();
  if (!user || !profile) redirect("/welcome");

  return <FamilyProfileClient profile={profile} familyProfile={familyProfile} />;
}
