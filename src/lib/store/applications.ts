"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application, ApplicationStatus } from "@/lib/types";
import { initialApplications } from "@/lib/mock/applications";

interface ApplicationsState {
  items: Application[];
  draftFileName: string | null;
  setDraftFileName: (name: string | null) => void;
  create: (input: Omit<Application, "id" | "appliedAt" | "status" | "hostFamiliesInterested"> & { status?: ApplicationStatus }) => Application;
  updateStatus: (id: string, status: ApplicationStatus) => void;
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
      clear: () => set({ items: [] }),
    }),
    { name: "wego_applications" },
  ),
);
