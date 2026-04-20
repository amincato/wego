"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  schoolIds: string[];
  studentIds: string[];
  toggleSchool: (id: string) => void;
  toggleStudent: (id: string) => void;
  hasSchool: (id: string) => boolean;
  hasStudent: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      schoolIds: [],
      studentIds: [],
      toggleSchool: (id) =>
        set({
          schoolIds: get().schoolIds.includes(id)
            ? get().schoolIds.filter((x) => x !== id)
            : [...get().schoolIds, id],
        }),
      toggleStudent: (id) =>
        set({
          studentIds: get().studentIds.includes(id)
            ? get().studentIds.filter((x) => x !== id)
            : [...get().studentIds, id],
        }),
      hasSchool: (id) => get().schoolIds.includes(id),
      hasStudent: (id) => get().studentIds.includes(id),
    }),
    { name: "wego_wishlist" },
  ),
);
