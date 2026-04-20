"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  OnboardingFamilyDraft,
  OnboardingStudentDraft,
  SignupDraft,
} from "@/lib/types";

interface SignupState {
  account: SignupDraft;
  studentProfile: OnboardingStudentDraft;
  familyProfile: OnboardingFamilyDraft;
  setAccount: (patch: Partial<SignupDraft>) => void;
  setStudentProfile: (patch: Partial<OnboardingStudentDraft>) => void;
  setFamilyProfile: (patch: Partial<OnboardingFamilyDraft>) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      account: {},
      studentProfile: {},
      familyProfile: {},
      setAccount: (patch) =>
        set((s) => ({ account: { ...s.account, ...patch } })),
      setStudentProfile: (patch) =>
        set((s) => ({ studentProfile: { ...s.studentProfile, ...patch } })),
      setFamilyProfile: (patch) =>
        set((s) => ({ familyProfile: { ...s.familyProfile, ...patch } })),
      reset: () =>
        set({ account: {}, studentProfile: {}, familyProfile: {} }),
    }),
    { name: "wego_signup" },
  ),
);
