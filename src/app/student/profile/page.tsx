import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/queries";
import { StudentProfileClient } from "./profile-client";

export default async function StudentProfilePage() {
  const { user, profile, studentProfile } = await getCurrentProfile();
  if (!user || !profile) redirect("/welcome");

  return (
    <StudentProfileClient
      profile={profile}
      studentProfile={studentProfile}
    />
  );
}
