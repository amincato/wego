/* ============================================================
 * Domain types for the web control dashboard.
 *
 * The dashboard is the back-office used by the mobility coordinator
 * of a partner school. All entities here are mock-only and live
 * alongside (not on top of) the mobile app domain types in `types.ts`.
 * ============================================================ */

import type {
  Application,
  HostFamily,
  School,
  StudentProfile,
} from "./types";

/* ---- The coordinator currently logged in ---- */
export interface MobilityCoordinator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: "head_coordinator" | "coordinator" | "assistant";
  schoolId: string;
}

/* ---- Extended school info for "My school" / "Partner schools" ---- */
export interface SchoolHostingCapacity {
  totalSpots: number;
  filledSpots: number;
  reservedSpots: number;
  perDuration: { months: 3 | 6 | 10; total: number; filled: number }[];
}

export interface AcademicInfo {
  schoolYearStart: string;
  schoolYearEnd: string;
  examPeriods: { name: string; from: string; to: string }[];
  holidays: { name: string; from: string; to: string }[];
  subjectsOffered: string[];
  averageClassSize: number;
}

export interface SchoolExtended extends School {
  hostingCapacity: SchoolHostingCapacity;
  academicInfo: AcademicInfo;
  /** Foreign students currently hosted at this school. */
  studentsHostedIds: string[];
  /** This school's own students currently abroad. */
  studentsAbroadIds: string[];
}

/* ---- Application lifecycle (extends Application from types.ts) ---- */
export type ApplicationLifecycleState =
  | "new_application"
  | "under_review"
  | "accepted"
  | "confirmed"
  | "host_family_requests"
  | "host_family_match"
  | "rejected";

export type FamilyApplicationState =
  | "new_request"
  | "site_visit_scheduled"
  | "site_visit_completed"
  | "allowed_to_host"
  | "matched_with_student"
  | "rejected";

export interface ApplicationExtended extends Application {
  lifecycleState: ApplicationLifecycleState;
  hostFamilyMatchId?: string;
  hostFamilyRequestIds?: string[];
  /** "incoming" → student coming to my school. "outgoing" → student of mine going abroad. */
  flow: "incoming" | "outgoing";
}

export interface FamilyApplication {
  id: string;
  familyId: string;
  state: FamilyApplicationState;
  submittedAt: string;
  siteVisitDate?: string;
  matchedStudentId?: string;
  notes?: string;
}

/* ---- Class assignment (currently hosted students) ---- */
export interface ClassAssignment {
  studentId: string;
  className: string;
  homeroomTeacher: string;
  schedule: { day: string; periods: string[] }[];
  classmates: string[];
}

/* ---- Mobility journey (timeline of a student's stay) ---- */
export type JourneyStepStatus = "completed" | "current" | "upcoming";

export interface JourneyStep {
  id: string;
  label: string;
  date: string;
  status: JourneyStepStatus;
  description?: string;
}

export interface MobilityJourney {
  studentId: string;
  steps: JourneyStep[];
}

/* ---- Payments ---- */
export type PaymentStatus = "paid" | "pending" | "overdue" | "scheduled";

export interface PaymentInstallment {
  id: string;
  studentId: string;
  amountEur: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  description: string;
}

/* ---- Home: tasks, notifications, deadlines ---- */
export type TaskPriority = "low" | "medium" | "high";

export interface DashboardTask {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueAt: string;
  completed: boolean;
  relatedTo?: { kind: "student" | "family" | "school"; id: string };
}

export type EmergencyKind =
  | "health"
  | "host_family_issue"
  | "school_issue"
  | "documents_missing"
  | "other";

export interface EmergencyNotification {
  id: string;
  kind: EmergencyKind;
  title: string;
  body: string;
  createdAt: string;
  acknowledged: boolean;
  studentId?: string;
}

export interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  category: "deadline" | "meeting" | "report" | "payment";
}

/* ---- KPI snapshots (Home & Incoming) ---- */
export interface CapacityKpi {
  label: string;
  value: number;
  total: number;
  delta?: number; // percent vs previous period
}

export interface HomeStatPair {
  label: string;
  primary: { value: number; label: string };
  secondary: { value: number; label: string };
}

/* ---- Community (My school) ---- */
export type CommunityKind = "event" | "post" | "update";

export interface CommunityEntry {
  id: string;
  kind: CommunityKind;
  title: string;
  body: string;
  authorName: string;
  authorAvatarUrl: string;
  createdAt: string;
  imageUrl?: string;
  eventDate?: string;
  eventLocation?: string;
}

/* ---- Top bar utilities ---- */
export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketCategory =
  | "technical"
  | "academic"
  | "host_family"
  | "documents"
  | "other";

export interface SupportTicket {
  id: string;
  subject: string;
  category: TicketCategory;
  status: TicketStatus;
  openedAt: string;
  openedBy: { name: string; avatarUrl: string; role: "student" | "family" };
  lastMessage: string;
  unread: boolean;
}

export type EmergencyWorkflowStatus = "active" | "monitoring" | "closed";

export interface EmergencyWorkflow {
  id: string;
  title: string;
  studentId?: string;
  status: EmergencyWorkflowStatus;
  startedAt: string;
  steps: { label: string; done: boolean }[];
}

/* ---- Re-exports for convenience ---- */
export type {
  Application,
  HostFamily,
  School,
  StudentProfile,
};
