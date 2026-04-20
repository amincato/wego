"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActiveView, Role } from "@/lib/types";

/**
 * With Supabase handling authentication, this store keeps only UI-level state:
 * - `role` chosen at /role-select (used by the signup wizard before the user
 *   exists in auth)
 * - `activeView` toggle for the "both" profile (Profile page switch)
 *
 * User identity / session is read from Supabase via hooks / server queries.
 */
interface AuthUiState {
  role: Role | null;
  activeView: ActiveView;
  setRole: (role: Role) => void;
  setActiveView: (view: ActiveView) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthUiState>()(
  persist(
    (set) => ({
      role: null,
      activeView: "student",
      setRole: (role) =>
        set({
          role,
          activeView: role === "family" ? "family" : "student",
        }),
      setActiveView: (view) => set({ activeView: view }),
      reset: () => set({ role: null, activeView: "student" }),
    }),
    { name: "wego_auth_ui" },
  ),
);
