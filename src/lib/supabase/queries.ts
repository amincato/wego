import { createClient as createServerSupabase } from "./server";
import type { Database } from "./types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type StudentProfile = Database["public"]["Tables"]["student_profiles"]["Row"];
type FamilyProfile = Database["public"]["Tables"]["family_profiles"]["Row"];

export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<{
  user: Awaited<ReturnType<typeof getCurrentUser>>;
  profile: Profile | null;
  studentProfile: StudentProfile | null;
  familyProfile: FamilyProfile | null;
}> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      profile: null,
      studentProfile: null,
      familyProfile: null,
    };
  }

  const [{ data: profile }, { data: studentProfile }, { data: familyProfile }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase
        .from("student_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("family_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

  return { user, profile, studentProfile, familyProfile };
}
