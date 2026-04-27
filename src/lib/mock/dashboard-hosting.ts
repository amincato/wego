import type {
  ClassAssignment,
  MobilityJourney,
  PaymentInstallment,
} from "@/lib/types-dashboard";

/* ---- Class assignments for currently hosted students ---- */
export const classAssignments: ClassAssignment[] = [
  {
    studentId: "student_giorgio",
    className: "4° L — Linguistic track",
    homeroomTeacher: "Prof.ssa Lucia Marini",
    schedule: [
      { day: "Mon", periods: ["Italian", "Math", "English", "PE"] },
      { day: "Tue", periods: ["History", "French", "Biology", "Italian"] },
      { day: "Wed", periods: ["English", "Spanish", "Philosophy", "Math"] },
      { day: "Thu", periods: ["Physics", "Italian", "Art", "French"] },
      { day: "Fri", periods: ["Latin", "English", "Math", "PE"] },
      { day: "Sat", periods: ["Lab", "Italian"] },
    ],
    classmates: [
      "Giulia Romano",
      "Matteo Greco",
      "Beatrice Costa",
      "Filippo Marino",
      "Alessia Vitale",
    ],
  },
  {
    studentId: "student_matthis",
    className: "5° S — Scientific track",
    homeroomTeacher: "Prof. Roberto Bianchi",
    schedule: [
      { day: "Mon", periods: ["Math", "Physics", "Italian", "English"] },
      { day: "Tue", periods: ["Chemistry", "Biology", "Math", "Latin"] },
      { day: "Wed", periods: ["Italian", "History", "Physics", "PE"] },
      { day: "Thu", periods: ["Math", "Chemistry", "English", "Philosophy"] },
      { day: "Fri", periods: ["Physics", "Latin", "Math", "Art"] },
      { day: "Sat", periods: ["Lab", "Italian"] },
    ],
    classmates: [
      "Luca Esposito",
      "Sara De Luca",
      "Andrea Rinaldi",
      "Chiara Lombardi",
    ],
  },
  {
    studentId: "student_carlo",
    className: "11. Klasse — Naturwissenschaftlich",
    homeroomTeacher: "Frau Schmidt",
    schedule: [
      { day: "Mon", periods: ["Mathe", "Physik", "Deutsch", "Englisch"] },
      { day: "Tue", periods: ["Biologie", "Chemie", "Mathe", "Geschichte"] },
      { day: "Wed", periods: ["Deutsch", "Sport", "Physik", "Kunst"] },
      { day: "Thu", periods: ["Mathe", "Chemie", "Englisch", "Philosophie"] },
      { day: "Fri", periods: ["Physik", "Deutsch", "Mathe", "Sport"] },
    ],
    classmates: [
      "Lena Becker",
      "Tim Weber",
      "Hannah Fischer",
      "Jonas Wagner",
      "Mia Schulz",
    ],
  },
];

/* ---- Mobility journeys ---- */
export const mobilityJourneys: MobilityJourney[] = [
  {
    studentId: "student_carlo",
    steps: [
      {
        id: "j_carlo_1",
        label: "Application submitted",
        date: "2026-01-22",
        status: "completed",
      },
      {
        id: "j_carlo_2",
        label: "Application accepted by FSG",
        date: "2026-02-26",
        status: "completed",
      },
      {
        id: "j_carlo_3",
        label: "Host family matched",
        date: "2026-03-10",
        status: "completed",
        description: "Family Rath confirmed.",
      },
      {
        id: "j_carlo_4",
        label: "Departure from Milan",
        date: "2026-03-28",
        status: "completed",
      },
      {
        id: "j_carlo_5",
        label: "Arrival in Rostock",
        date: "2026-03-29",
        status: "completed",
      },
      {
        id: "j_carlo_6",
        label: "School integration at FSG",
        date: "2026-04-02",
        status: "current",
        description: "Currently attending classes at Friedrich-Schiller Gymnasium.",
      },
      {
        id: "j_carlo_7",
        label: "Mid-stay review",
        date: "2026-06-15",
        status: "upcoming",
      },
      {
        id: "j_carlo_8",
        label: "Return home to Milan",
        date: "2026-09-28",
        status: "upcoming",
      },
    ],
  },
  {
    studentId: "student_matthis",
    steps: [
      {
        id: "j_matthis_1",
        label: "Application submitted",
        date: "2025-11-20",
        status: "completed",
      },
      {
        id: "j_matthis_2",
        label: "Application accepted",
        date: "2025-12-12",
        status: "completed",
      },
      {
        id: "j_matthis_3",
        label: "Host family matched",
        date: "2026-01-20",
        status: "completed",
        description: "Family Rossi confirmed.",
      },
      {
        id: "j_matthis_4",
        label: "Arrival in Milan",
        date: "2026-02-05",
        status: "completed",
      },
      {
        id: "j_matthis_5",
        label: "School integration",
        date: "2026-02-10",
        status: "completed",
      },
      {
        id: "j_matthis_6",
        label: "Mid-stay review",
        date: "2026-05-12",
        status: "current",
        description: "Mediation in progress with host family.",
      },
      {
        id: "j_matthis_7",
        label: "Return home",
        date: "2026-12-05",
        status: "upcoming",
      },
    ],
  },
  {
    studentId: "student_giorgia",
    steps: [
      {
        id: "j_giorgia_1",
        label: "Application submitted",
        date: "2026-04-13",
        status: "completed",
      },
      {
        id: "j_giorgia_2",
        label: "Under review",
        date: "2026-04-25",
        status: "current",
      },
      {
        id: "j_giorgia_3",
        label: "Acceptance",
        date: "2026-05-15",
        status: "upcoming",
      },
      {
        id: "j_giorgia_4",
        label: "Host family match",
        date: "2026-06-30",
        status: "upcoming",
      },
      {
        id: "j_giorgia_5",
        label: "Departure",
        date: "2026-09-04",
        status: "upcoming",
      },
    ],
  },
];

/* ---- Payments ---- */
export const paymentInstallments: PaymentInstallment[] = [
  {
    id: "pay_carlo_1",
    studentId: "student_carlo",
    amountEur: 2600,
    dueDate: "2026-02-15",
    paidDate: "2026-02-12",
    status: "paid",
    description: "First installment — outgoing program enrollment",
  },
  {
    id: "pay_carlo_2",
    studentId: "student_carlo",
    amountEur: 2600,
    dueDate: "2026-04-15",
    paidDate: "2026-04-14",
    status: "paid",
    description: "Second installment — semester start",
  },
  {
    id: "pay_carlo_3",
    studentId: "student_carlo",
    amountEur: 2600,
    dueDate: "2026-06-15",
    status: "scheduled",
    description: "Third installment — mid stay",
  },
  {
    id: "pay_matthis_1",
    studentId: "student_matthis",
    amountEur: 2875,
    dueDate: "2026-01-20",
    paidDate: "2026-01-19",
    status: "paid",
    description: "First installment — application and onboarding fee",
  },
  {
    id: "pay_matthis_2",
    studentId: "student_matthis",
    amountEur: 2875,
    dueDate: "2026-04-20",
    status: "overdue",
    description: "Second installment — semester start",
  },
  {
    id: "pay_matthis_3",
    studentId: "student_matthis",
    amountEur: 2875,
    dueDate: "2026-07-20",
    status: "scheduled",
    description: "Third installment",
  },
  {
    id: "pay_matthis_4",
    studentId: "student_matthis",
    amountEur: 2875,
    dueDate: "2026-10-20",
    status: "scheduled",
    description: "Final installment",
  },
];

export const getJourney = (studentId: string) =>
  mobilityJourneys.find((j) => j.studentId === studentId);

export const getClassAssignment = (studentId: string) =>
  classAssignments.find((c) => c.studentId === studentId);

export const getPaymentsForStudent = (studentId: string) =>
  paymentInstallments.filter((p) => p.studentId === studentId);
