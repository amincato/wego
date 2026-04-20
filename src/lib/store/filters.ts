"use client";

import { create } from "zustand";
import type {
  DestinationType,
  ExchangeStudentsPresence,
  Gender,
  LanguageCode,
  MobilityDurationMonths,
  Nationality,
  SchoolOrientation,
} from "@/lib/types";

interface StudentFiltersState {
  countries: string[]; // country filter chips
  languages: LanguageCode[];
  durations: MobilityDurationMonths[];
  orientations: SchoolOrientation[];
  exchangePresence: ExchangeStudentsPresence;
  destinationTypes: DestinationType[];
  toggleCountry: (c: string) => void;
  set: (patch: Partial<Omit<StudentFiltersState, "toggleCountry" | "set" | "reset">>) => void;
  reset: () => void;
}

export const useStudentFilters = create<StudentFiltersState>((set) => ({
  countries: [],
  languages: [],
  durations: [],
  orientations: [],
  exchangePresence: "all",
  destinationTypes: [],
  toggleCountry: (c) =>
    set((s) => ({
      countries: s.countries.includes(c)
        ? s.countries.filter((x) => x !== c)
        : [...s.countries, c],
    })),
  set: (patch) => set((s) => ({ ...s, ...patch })),
  reset: () =>
    set({
      countries: [],
      languages: [],
      durations: [],
      orientations: [],
      exchangePresence: "all",
      destinationTypes: [],
    }),
}));

interface FamilyFiltersState {
  genders: Gender[];
  durations: MobilityDurationMonths[];
  nationalities: Nationality[];
  toggle: <K extends "genders" | "durations" | "nationalities">(
    key: K,
    value: FamilyFiltersState[K][number],
  ) => void;
  reset: () => void;
}

export const useFamilyFilters = create<FamilyFiltersState>((set) => ({
  genders: [],
  durations: [],
  nationalities: [],
  toggle: (key, value) =>
    set((s) => {
      const list = s[key] as Array<typeof value>;
      const exists = list.includes(value);
      return {
        ...s,
        [key]: exists ? list.filter((x) => x !== value) : [...list, value],
      };
    }),
  reset: () => set({ genders: [], durations: [], nationalities: [] }),
}));
