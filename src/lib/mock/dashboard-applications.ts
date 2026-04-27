import type { ApplicationExtended } from "@/lib/types-dashboard";

const daysAgo = (n: number, hour = 9) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

/* ---- Incoming applications: students applying to MY school ----
 * studentId references the existing students mock (Carlo, Matthis, Sofia, …)
 * schoolId is always the dashboard's "school_my_lic_salvini". */
export const incomingApplications: ApplicationExtended[] = [
  {
    id: "inc_app_matthis",
    studentId: "student_matthis",
    schoolId: "school_my_lic_salvini",
    status: "under_review",
    lifecycleState: "new_application",
    flow: "incoming",
    mobilityDurationMonths: 10,
    reportCardFilename: "matthis_report_card.pdf",
    letterOfMotivation:
      "I want to discover Italian culture, the food and the language. I plan to study art history while abroad.",
    appliedAt: "2025-10-22T08:00:00.000Z",
    hostFamiliesInterested: [],
  },
  {
    id: "inc_app_sofia",
    studentId: "student_sofia",
    schoolId: "school_my_lic_salvini",
    status: "under_review",
    lifecycleState: "new_application",
    flow: "incoming",
    mobilityDurationMonths: 6,
    reportCardFilename: "sofia_report_card.pdf",
    letterOfMotivation:
      "Italy has been my dream since I was a child. I would love to spend a semester in Milan.",
    appliedAt: "2025-10-18T11:00:00.000Z",
    hostFamiliesInterested: [],
  },
  {
    id: "inc_app_amelie",
    studentId: "student_amelie",
    schoolId: "school_my_lic_salvini",
    status: "under_review",
    lifecycleState: "new_application",
    flow: "incoming",
    mobilityDurationMonths: 3,
    reportCardFilename: "amelie_report_card.pdf",
    letterOfMotivation:
      "I want to live a quieter pace abroad and improve my Italian.",
    appliedAt: "2025-10-12T16:00:00.000Z",
    hostFamiliesInterested: [],
  },
  {
    id: "inc_app_giorgio",
    studentId: "student_giorgio",
    schoolId: "school_my_lic_salvini",
    status: "accepted",
    lifecycleState: "host_family_requests",
    flow: "incoming",
    mobilityDurationMonths: 6,
    reportCardFilename: "giorgio_report_card.pdf",
    letterOfMotivation: "Looking forward to playing football for your school.",
    appliedAt: daysAgo(8, 10),
    acceptedAt: daysAgo(3, 12),
    hostFamiliesInterested: ["family_bianchi", "family_schmidt"],
    hostFamilyRequestIds: ["family_bianchi", "family_schmidt"],
  },
  {
    id: "inc_app_carlo",
    studentId: "student_carlo",
    schoolId: "school_my_lic_salvini",
    status: "accepted",
    lifecycleState: "host_family_match",
    flow: "incoming",
    mobilityDurationMonths: 6,
    reportCardFilename: "carlo_report_card.pdf",
    letterOfMotivation:
      "I want to play sports, meet new friends and live a different life for six months.",
    appliedAt: daysAgo(20, 9),
    acceptedAt: daysAgo(14, 14),
    hostFamiliesInterested: ["family_bianchi"],
    hostFamilyMatchId: "family_bianchi",
  },
];

/* ---- Outgoing: students of MY school applying abroad ---- */
export const outgoingApplications: ApplicationExtended[] = [
  {
    id: "out_app_giorgia",
    studentId: "student_giorgia",
    schoolId: "school_thiers",
    status: "under_review",
    lifecycleState: "new_application",
    flow: "outgoing",
    mobilityDurationMonths: 6,
    reportCardFilename: "giorgia_report_card.pdf",
    letterOfMotivation:
      "I'm excited to spend six months in Rostock to improve my German.",
    appliedAt: "2025-10-08T14:00:00.000Z",
    hostFamiliesInterested: [],
  },
  {
    id: "out_app_giorgia_under_review",
    studentId: "student_jonas",
    schoolId: "school_thiers",
    status: "under_review",
    lifecycleState: "under_review",
    flow: "outgoing",
    mobilityDurationMonths: 6,
    reportCardFilename: "giorgia_report_card.pdf",
    letterOfMotivation:
      "I'm excited to spend six months in Rostock to improve my German.",
    appliedAt: "2025-09-25T14:00:00.000Z",
    hostFamiliesInterested: [],
  },
  {
    id: "out_app_carlo",
    studentId: "student_lukas",
    schoolId: "school_thiers",
    status: "accepted",
    lifecycleState: "host_family_match",
    flow: "outgoing",
    mobilityDurationMonths: 6,
    reportCardFilename: "carlo_report_card.pdf",
    letterOfMotivation:
      "Looking forward to studying abroad in Germany and improving my German.",
    appliedAt: "2025-09-15T09:00:00.000Z",
    acceptedAt: "2025-10-05T12:00:00.000Z",
    hostFamiliesInterested: ["family_rath"],
    hostFamilyMatchId: "family_rath",
  },
];

export const allDashboardApplications: ApplicationExtended[] = [
  ...incomingApplications,
  ...outgoingApplications,
];
