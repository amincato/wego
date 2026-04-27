import type { HostFamily } from "@/lib/types";
import type {
  FamilyApplication,
  FamilyApplicationState,
} from "@/lib/types-dashboard";

const daysAgo = (n: number, hour = 9) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

/* ---- Italian host families that work with MY school ---- */
export const dashboardHostFamilies: HostFamily[] = [
  {
    id: "family_bianchi",
    userId: "user_bianchi",
    familyName: "Family Bianchi",
    city: "Milan",
    country: "Italy",
    nationality: "it",
    photoUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
    bio: "A welcoming Milanese family with two teenagers, used to host exchange students every year.",
    members: ["Mother Elena, 44", "Father Marco, 46", "Daughter Chiara, 16"],
    homeType: "apartment",
    hasPets: false,
    spareRooms: 1,
  },
  {
    id: "family_schmidt",
    userId: "user_schmidt",
    familyName: "Family Schmidt",
    city: "Berlin",
    country: "Germany",
    nationality: "de",
    photoUrl:
      "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=600&q=80",
    bio: "First-time host family, parents work in academia and love languages.",
    members: ["Mother Petra, 41", "Father Klaus, 43", "Son Max, 12"],
    homeType: "house",
    hasPets: true,
    spareRooms: 2,
  },
  {
    id: "family_weber",
    userId: "user_weber",
    familyName: "Family Weber",
    city: "Hamburg",
    country: "Germany",
    nationality: "de",
    photoUrl:
      "https://images.unsplash.com/photo-1602407294553-6ac9170de9eb?auto=format&fit=crop&w=600&q=80",
    bio: "Empty nesters with a spacious home and lots of free time.",
    members: ["Mother Gisela, 52", "Father Helmut, 55", "Daughter Lena, 17"],
    homeType: "house",
    hasPets: false,
    spareRooms: 2,
  },
  {
    id: "family_mueller",
    userId: "user_mueller",
    familyName: "Family Müller",
    city: "Rostock",
    country: "Germany",
    nationality: "de",
    photoUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
    bio: "Energetic family of four, very interested in cultural exchange.",
    members: [
      "Mother Anna, 39",
      "Father Lukas, 41",
      "Son Jonas, 14",
      "Daughter Mia, 11",
    ],
    homeType: "apartment",
    hasPets: true,
    spareRooms: 1,
  },
];

const FAMILY_STATES: FamilyApplicationState[] = [
  "new_request",
  "site_visit_scheduled",
  "site_visit_completed",
  "allowed_to_host",
  "matched_with_student",
];

export const familyApplications: FamilyApplication[] = [
  {
    id: "famapp_bianchi",
    familyId: "family_bianchi",
    state: "matched_with_student",
    submittedAt: daysAgo(35),
    siteVisitDate: daysAgo(20),
    matchedStudentId: "student_carlo",
    notes: "Excellent fit. Already met Carlo in person.",
  },
  {
    id: "famapp_schmidt",
    familyId: "family_schmidt",
    state: "allowed_to_host",
    submittedAt: "2025-09-05T09:00:00.000Z",
    siteVisitDate: "2025-10-10T09:00:00.000Z",
    notes: "Approved. Waiting for student match.",
  },
  {
    id: "famapp_weber",
    familyId: "family_weber",
    state: "site_visit_scheduled",
    submittedAt: "2025-09-21T09:00:00.000Z",
    siteVisitDate: daysAgo(-3),
    notes: "Visit scheduled for next Wednesday at 4 PM.",
  },
  {
    id: "famapp_mueller",
    familyId: "family_mueller",
    state: "new_request",
    submittedAt: "2025-09-15T09:00:00.000Z",
  },
];

export const getDashboardHostFamily = (id: string) =>
  dashboardHostFamilies.find((f) => f.id === id);

export { FAMILY_STATES };
