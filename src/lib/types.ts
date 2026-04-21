/* ============================================================
 * Domain types for wego
 * All entities align with what the Figma screens display.
 * ============================================================ */

export type Role = "student" | "family" | "both";
export type ActiveView = "student" | "family";

export type LanguageCode = "en" | "fr" | "de" | "it" | "es";
export type LanguageLevel = "beginner" | "intermediate" | "advanced" | "native";

export interface LanguageSkill {
  code: LanguageCode;
  level: LanguageLevel;
}

export type MobilityDurationMonths = 3 | 6 | 10;

export type SchoolOrientation =
  | "scientific"
  | "classic"
  | "musical"
  | "linguistic"
  | "artistic";

export type DestinationType =
  | "large_city"
  | "medium_city"
  | "small_town"
  | "rural_area";

export type ExchangeStudentsPresence = "all" | "low" | "medium" | "high";

export type Gender = "male" | "female" | "other";
export type Nationality = "it" | "fr" | "de" | "es" | "gb";

/* ---- User account (post-signup) ---- */
export interface UserAccount {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  idDocumentFilename?: string;
  createdAt: string;
}

/* ---- Student profile ---- */
export interface Lifestyle {
  atHome:
    | "time_with_family"
    | "often_out"
    | "invite_people"
    | "quiet_private";
  socialLife: "social_outgoing" | "small_circles" | "on_my_own";
  pets: "has_pet_ok" | "no_pets" | "no_pets_please";
  dailyHabits: "structured" | "flexible" | "no_schedule";
  foodDiet: "not_specific" | "vegetarian" | "vegan";
}

export type HobbyCategory = "sports" | "entertainment" | "social_outdoor";

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  birthday: string; // ISO yyyy-mm-dd
  age: number;
  city: string;
  nationality: Nationality;
  gender: Gender;
  languages: LanguageSkill[];
  lifestyle: Lifestyle;
  hobbies: string[]; // up to 5 slugs (e.g. 'football','basket','music')
  bio: string;
  photoUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  mobilityDurationMonths: MobilityDurationMonths;
}

/* ---- Host family ---- */
export interface HostFamily {
  id: string;
  userId: string;
  familyName: string; // e.g. "Family Rath"
  city: string;
  country: string;
  nationality: Nationality;
  photoUrl: string;
  bio: string;
  members: string[]; // e.g. ["Mother Anna, 45", "Father Klaus, 47", ...]
  homeType: "apartment" | "house";
  hasPets: boolean;
  spareRooms: number;
}

/* ---- School ---- */
export interface MobilityOption {
  durationMonths: MobilityDurationMonths;
  priceEur: number;
}

export interface Testimonial {
  id: string;
  studentName: string;
  year: number;
  origin: string;
  avatarUrl: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
  galleryItems: GalleryItem[];
  spotsLeft: number;
  orientation: SchoolOrientation;
  language: LanguageCode;
  destinationType: DestinationType;
  exchangeStudentsPresence: ExchangeStudentsPresence;
  mobilityOptions: MobilityOption[];
  highlights: {
    admission: string[];
    schoolSchedule: string[];
    subjectsAndActivities: string[];
  };
  coordinator: {
    name: string;
    avatarUrl: string;
  };
  testimonials: Testimonial[];
}

/* ---- Application ---- */
/**
 * The application journey has five visible steps for the student:
 *   1. `under_review`        — waiting for the school to respond
 *   2. `accepted`            — school said yes, no host-family interest yet
 *   3. `accepted`            — school said yes AND one or more host families
 *                              have expressed interest (→ step 3 when
 *                              `hostFamiliesInterested.length > 0` and no
 *                              `matchedFamilyId` has been chosen yet)
 *   4. `student_confirmed`   — student chose a family, awaiting the family's
 *                              final confirmation
 *   5. `ready`               — both sides confirmed, mobility is ready to go
 */
export type ApplicationStatus =
  | "draft"
  | "under_review"
  | "accepted"
  | "student_confirmed"
  | "ready"
  | "rejected";

export interface Application {
  id: string;
  studentId: string;
  schoolId: string;
  status: ApplicationStatus;
  mobilityDurationMonths: MobilityDurationMonths;
  reportCardFilename?: string;
  letterOfMotivation: string;
  appliedAt: string;
  acceptedAt?: string;
  hostFamiliesInterested: string[]; // family ids that reached out
  /** Deadline for the student to confirm a match after the first family interest. */
  familyInterestDeadline?: string;
  /** Family the student chose (step 4+). */
  matchedFamilyId?: string;
  /** When the student clicked "Confirm match". */
  studentConfirmedAt?: string;
  /** When the family gave final confirmation. */
  readyAt?: string;
}

/* ---- Messaging ---- */
export interface Message {
  id: string;
  threadId: string;
  from: string; // userId
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  participants: {
    userId: string;
    name: string;
    avatarUrl: string;
    role: ActiveView;
  }[];
  messages: Message[];
  lastMessageAt: string;
}

/* ---- Signup wizard (draft state) ---- */
export interface SignupDraft {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  idDocumentFilename?: string;
  idDocumentUrl?: string;
  role?: Role;
}

export interface OnboardingStudentDraft {
  birthday?: string;
  city?: string;
  languages?: LanguageSkill[];
  lifestyle?: Partial<Lifestyle>;
  hobbies?: string[];
  bio?: string;
  photoUrl?: string;
  galleryUrls?: string[];
  videoUrl?: string;
  mobilityDurationMonths?: number;
}

export interface OnboardingFamilyDraft {
  familyName?: string;
  city?: string;
  homeType?: "apartment" | "house";
  spareRooms?: number;
  hasPets?: boolean;
  bio?: string;
  photoUrl?: string;
  members?: string[];
}
