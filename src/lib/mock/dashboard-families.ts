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
    id: "family_rossi",
    userId: "user_rossi",
    familyName: "Family Rossi",
    city: "Milan",
    country: "Italy",
    nationality: "it",
    photoUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
    bio: "First-time host family, parents work in academia and love languages.",
    members: ["Mother Paola, 41", "Father Luca, 43", "Son Tommaso, 12"],
    homeType: "house",
    hasPets: true,
    spareRooms: 2,
  },
  {
    id: "family_conti",
    userId: "user_conti",
    familyName: "Family Conti",
    city: "Milan",
    country: "Italy",
    nationality: "it",
    photoUrl:
      "https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&fit=crop&w=600&q=80",
    bio: "Empty nesters with a spacious home and lots of free time.",
    members: ["Mother Anna, 52", "Father Giorgio, 55"],
    homeType: "house",
    hasPets: false,
    spareRooms: 2,
  },
  {
    id: "family_ferrari",
    userId: "user_ferrari",
    familyName: "Family Ferrari",
    city: "Milan",
    country: "Italy",
    nationality: "it",
    photoUrl:
      "https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&w=600&q=80",
    bio: "Energetic family of four, very interested in cultural exchange.",
    members: [
      "Mother Sara, 39",
      "Father Davide, 41",
      "Son Filippo, 14",
      "Daughter Greta, 11",
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
    id: "famapp_rossi",
    familyId: "family_rossi",
    state: "allowed_to_host",
    submittedAt: daysAgo(22),
    siteVisitDate: daysAgo(8),
    notes: "Approved. Waiting for student match.",
  },
  {
    id: "famapp_conti",
    familyId: "family_conti",
    state: "site_visit_scheduled",
    submittedAt: daysAgo(6),
    siteVisitDate: daysAgo(-3),
    notes: "Visit scheduled for next Wednesday at 4 PM.",
  },
  {
    id: "famapp_ferrari",
    familyId: "family_ferrari",
    state: "new_request",
    submittedAt: daysAgo(1),
  },
];

export const getDashboardHostFamily = (id: string) =>
  dashboardHostFamilies.find((f) => f.id === id);

export { FAMILY_STATES };
