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
    title: "Site visit by Family Rath",
    priority: "high",
    dueAt: today(0, 11, 0),
    completed: false,
    relatedTo: { kind: "family", id: "family_rath" },
  },
  {
    id: "task_2",
    title: "Send mid-term report to Lilly Louise Jacob",
    priority: "low",
    dueAt: today(0, 14, 30),
    completed: false,
    relatedTo: { kind: "student", id: "student_lilly_jacob" },
  },
  {
    id: "task_3",
    title: "Send payment information to Carlo Liberti",
    priority: "low",
    dueAt: today(0, 17, 0),
    completed: false,
    relatedTo: { kind: "student", id: "student_carlo" },
  },
];

export const emergencyNotifications: EmergencyNotification[] = [
  {
    id: "emrg_1",
    kind: "host_family_issue",
    title: "Host family change requested by Linda Rossi",
    body: "Host student is asking to be reassigned from Family Russeldort.",
    createdAt: today(0, 8, 12),
    acknowledged: false,
    studentId: "student_linda_rossi",
  },
];

export const upcomingReminders: Reminder[] = [
  {
    id: "rem_1",
    title: "Application deadline",
    dueDate: today(3, 23, 59),
    category: "deadline",
  },
  {
    id: "rem_2",
    title: "Midterm coordinators meeting",
    dueDate: today(5, 10, 0),
    category: "meeting",
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
