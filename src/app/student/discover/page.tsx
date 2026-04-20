import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { schoolFromRow } from "@/lib/supabase/adapters";
import { DiscoverSchoolsClient } from "./discover-client";

export default async function DiscoverSchoolsPage() {
  const { user, profile } = await getCurrentProfile();
  if (!user || !profile) redirect("/welcome");

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("schools")
    .select("*")
    .order("name");

  const schools = (rows ?? []).map(schoolFromRow);

  return (
    <DiscoverSchoolsClient firstName={profile.first_name} schools={schools} />
  );
}
