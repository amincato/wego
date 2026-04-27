import type {
  DashboardTask,
  EmergencyNotification,
  HomeStatPair,
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
];

export const emergencyNotifications: EmergencyNotification[] = [
  {
    id: "emrg_1",
    kind: "host_family_issue",
    title: "Host family change requested by Matthis",
    body: "Student is asking to be reassigned from family Rossi. Reason: persistent conflicts on house rules.",
    createdAt: today(0, 8, 12),
    acknowledged: false,
    studentId: "student_matthis",
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

export const homeStats: HomeStatPair[] = [
  {
    label: "Incoming students",
    primary: { value: 10, label: "Confirmed places" },
    secondary: { value: 5, label: "Available places" },
  },
  {
    label: "Host families",
    primary: { value: 8, label: "Confirmed" },
    secondary: { value: 2, label: "Pending acceptance" },
  },
];
