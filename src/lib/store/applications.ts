"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application, ApplicationStatus } from "@/lib/types";
import { initialApplications } from "@/lib/mock/applications";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

interface ApplicationsState {
  items: Application[];
  draftFileName: string | null;
  setDraftFileName: (name: string | null) => void;

  create: (
    input: Omit<
      Application,
      "id" | "appliedAt" | "status" | "hostFamiliesInterested"
    > & { status?: ApplicationStatus },
  ) => Application;

  /** Generic status setter (mostly used by demo tooling). */
  updateStatus: (id: string, status: ApplicationStatus) => void;

  /** Step 2 → 3: a host family has expressed interest in the student. */
  expressFamilyInterest: (id: string, familyId: string) => void;

  /** Step 3 → 4: student picks one of the interested families. */
  confirmMatch: (id: string, familyId: string) => void;

  /** Step 4 → 5: family gives final confirmation, mobility is ready. */
  familyConfirm: (id: string) => void;

  clear: () => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      items: initialApplications,
      draftFileName: null,
      setDraftFileName: (name) => set({ draftFileName: name }),

      create: (input) => {
        const application: Application = {
          id: `app_${Date.now()}`,
          appliedAt: new Date().toISOString(),
          status: input.status ?? "under_review",
          hostFamiliesInterested: [],
          ...input,
        };
        set({ items: [...get().items, application] });
        return application;
      },

      updateStatus: (id, status) =>
        set({
          items: get().items.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status,
                  acceptedAt:
                    status === "accepted"
                      ? a.acceptedAt ?? new Date().toISOString()
                      : a.acceptedAt,
                }
              : a,
          ),
        }),

      expressFamilyInterest: (id, familyId) =>
        set({
          items: get().items.map((a) => {
            if (a.id !== id) return a;
            const already = a.hostFamiliesInterested.includes(familyId);
            return {
              ...a,
              hostFamiliesInterested: already
                ? a.hostFamiliesInterested
                : [...a.hostFamiliesInterested, familyId],
              familyInterestDeadline:
                a.familyInterestDeadline ??
                new Date(Date.now() + WEEK_MS).toISOString(),
            };
          }),
        }),

      confirmMatch: (id, familyId) =>
        set({
          items: get().items.map((a) => {
            if (a.id !== id) return a;
            return {
              ...a,
              status: "student_confirmed",
              matchedFamilyId: familyId,
              studentConfirmedAt: new Date().toISOString(),
              hostFamiliesInterested: a.hostFamiliesInterested.includes(
                familyId,
              )
                ? a.hostFamiliesInterested
                : [...a.hostFamiliesInterested, familyId],
            };
          }),
        }),

      familyConfirm: (id) =>
        set({
          items: get().items.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: "ready",
                  readyAt: new Date().toISOString(),
                }
              : a,
          ),
        }),

      clear: () => set({ items: [] }),
    }),
    { name: "wego_applications" },
  ),
);
