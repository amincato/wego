"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Fetches the current user's profile first_name (or a fallback) for display
 * purposes in client components. Keeps the component simple and side-effect
 * local.
 */
export function useCurrentProfileName(fallback = "") {
  const [name, setName] = useState(fallback);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .maybeSingle();
      if (mounted && data?.first_name) setName(data.first_name);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return name;
}
