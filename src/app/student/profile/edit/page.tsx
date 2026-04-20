import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/queries";
import { EditProfileClient } from "./edit-client";

export default async function EditStudentProfilePage() {
  const { user, profile, studentProfile } = await getCurrentProfile();
  if (!user || !profile) redirect("/welcome");

  return (
    <EditProfileClient profile={profile} studentProfile={studentProfile} />
  );
}
