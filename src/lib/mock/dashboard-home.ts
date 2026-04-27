import type {
  CapacityKpi,
  DashboardTask,
  EmergencyNotification,
  Reminder,
} from "@/lib/types-dashboard";

const today = (offsetDays = 0, hour = 9, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const todaysTasks: DashboardTask[] = [
  {
    id: "task_1",
    title: "Review 3 new incoming applications",
    description: "Friedrich, Lily and Matthis are waiting for first review.",
    priority: "high",
    dueAt: today(0, 11, 0),
    completed: false,
    relatedTo: { kind: "student", id: "student_matthis" },
  },
  {
    id: "task_2",
    title: "Confirm site visit with Family Bianchi",
    description: "Slot proposed: Wednesday 4:00 PM.",
    priority: "medium",
    dueAt: today(0, 14, 30),
    completed: false,
    relatedTo: { kind: "family", id: "family_bianchi" },
  },
  {
    id: "task_3",
    title: "Send mid-term report to Carlo's family",
    priority: "medium",
    dueAt: today(0, 17, 0),
    completed: false,
    relatedTo: { kind: "student", id: "student_carlo" },
  },
  {
    id: "task_4",
    title: "Approve budget for spring orientation event",
    priority: "low",
    dueAt: today(1, 10, 0),
    completed: false,
  },
  {
    id: "task_5",
    title: "Sign welcome packet for Lily",
    priority: "low",
    dueAt: today(0, 9, 0),
    completed: true,
    relatedTo: { kind: "student", id: "student_lily" },
  },
];

export const emergencyNotifications: EmergencyNotification[] = [
  {
    id: "emrg_1",
    kind: "host_family_issue",
    title: "Conflict reported by host family Rossi",
    body: "Mismatch on house rules with student Matthis. Mediation requested.",
    createdAt: today(0, 8, 12),
    acknowledged: false,
    studentId: "student_matthis",
  },
  {
    id: "emrg_2",
    kind: "documents_missing",
    title: "Missing health insurance for Lily",
    body: "Insurance document expired on April 22. New copy not yet uploaded.",
    createdAt: today(-1, 16, 45),
    acknowledged: false,
    studentId: "student_lily",
  },
];

export const upcomingReminders: Reminder[] = [
  {
    id: "rem_1",
    title: "Spring semester applications close",
    dueDate: today(3, 23, 59),
    category: "deadline",
  },
  {
    id: "rem_2",
    title: "Mid-term coordinators meeting",
    dueDate: today(5, 10, 0),
    category: "meeting",
  },
  {
    id: "rem_3",
    title: "Quarterly mobility report due",
    dueDate: today(8, 18, 0),
    category: "report",
  },
  {
    id: "rem_4",
    title: "Tuition installment — outgoing students",
    dueDate: today(11, 12, 0),
    category: "payment",
  },
];

export const capacityKpis: CapacityKpi[] = [
  { label: "Incoming students", value: 17, total: 24, delta: +12 },
  { label: "Outgoing students", value: 9, total: 12, delta: +4 },
  { label: "Active host families", value: 21, total: 28, delta: +8 },
  { label: "Open applications", value: 14, total: 14, delta: -3 },
];
