import type { School, DestinationType, ExchangeStudentsPresence } from "@/lib/types";
import type { Database } from "./types";

type SchoolRow = Database["public"]["Tables"]["schools"]["Row"];

/**
 * Convert a Supabase schools row into the legacy `School` shape expected by
 * existing UI components (SchoolCard, detail page, …). Keeps the client
 * surface stable while the storage backend changes.
 */
export function schoolFromRow(row: SchoolRow): School {
  return {
    id: row.id,
    name: row.name,
    shortName: row.name,
    city: row.city,
    country: row.country,
    description: row.description,
    imageUrl: row.image_url,
    galleryItems: row.gallery,
    spotsLeft: row.spots_left,
    orientation: row.orientation as School["orientation"],
    language: row.language as School["language"],
    destinationType: "medium_city" as DestinationType,
    exchangeStudentsPresence: "medium" as ExchangeStudentsPresence,
    mobilityOptions: row.mobility_months.map((m) => ({
      durationMonths: m as 3 | 6 | 10,
      priceEur: row.price_per_month,
    })),
    highlights: {
      admission: row.highlights.admission ?? [],
      schoolSchedule: row.highlights.schoolSchedule ?? [],
      subjectsAndActivities: row.highlights.subjectsAndActivities ?? [],
    },
    coordinator: row.coordinator,
    testimonials: row.testimonials.map((t) => ({
      ...t,
      rating: t.rating as 1 | 2 | 3 | 4 | 5,
    })),
  };
}
