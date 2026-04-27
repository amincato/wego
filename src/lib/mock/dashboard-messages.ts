import type {
  EmergencyWorkflow,
  SupportTicket,
} from "@/lib/types-dashboard";

const minsAgo = (m: number) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - m);
  return d.toISOString();
};
const hoursAgo = (h: number) => minsAgo(h * 60);
const daysAgo = (d: number) => hoursAgo(d * 24);

export interface InboxConversation {
  id: string;
  withName: string;
  withAvatarUrl: string;
  withRole: "student" | "family" | "school";
  lastMessage: string;
  lastAt: string;
  unread: number;
  pinned?: boolean;
}

export const inboxConversations: InboxConversation[] = [
  {
    id: "conv_matthis",
    withName: "Matthis Bernard",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    withRole: "student",
    lastMessage: "Thanks for the welcome packet!",
    lastAt: minsAgo(8),
    unread: 2,
    pinned: true,
  },
  {
    id: "conv_bianchi",
    withName: "Family Bianchi",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=200&q=80",
    withRole: "family",
    lastMessage: "Could we reschedule the site visit?",
    lastAt: minsAgo(45),
    unread: 1,
  },
  {
    id: "conv_fsg",
    withName: "Friedrich Schiller Gymnasium",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    withRole: "school",
    lastMessage: "Carlo's mid-term grades have been uploaded.",
    lastAt: hoursAgo(3),
    unread: 0,
  },
  {
    id: "conv_sofia",
    withName: "Sofia Garcia",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    withRole: "student",
    lastMessage: "Quick question about the report card upload",
    lastAt: hoursAgo(8),
    unread: 0,
  },
  {
    id: "conv_rossi",
    withName: "Family Rossi",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
    withRole: "family",
    lastMessage: "We have some house rules we'd like to share.",
    lastAt: daysAgo(1),
    unread: 0,
  },
  {
    id: "conv_thiers",
    withName: "Lycée Thiers",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    withRole: "school",
    lastMessage: "Welcome to our partner network!",
    lastAt: daysAgo(3),
    unread: 0,
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "tk_001",
    subject: "Cannot upload report card (PDF too large)",
    category: "technical",
    status: "open",
    openedAt: hoursAgo(2),
    openedBy: {
      name: "Sofia Garcia",
      avatarUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
      role: "student",
    },
    lastMessage: "I keep getting an error when trying to upload my report card.",
    unread: true,
  },
  {
    id: "tk_002",
    subject: "Missing health insurance document",
    category: "documents",
    status: "in_progress",
    openedAt: daysAgo(1),
    openedBy: {
      name: "Lily Martinez",
      avatarUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
      role: "student",
    },
    lastMessage: "We've reached out to her family for the new policy.",
    unread: false,
  },
  {
    id: "tk_003",
    subject: "House rules clarification request",
    category: "host_family",
    status: "in_progress",
    openedAt: daysAgo(2),
    openedBy: {
      name: "Family Rossi",
      avatarUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
      role: "family",
    },
    lastMessage: "Awaiting agreement template from coordinator.",
    unread: true,
  },
  {
    id: "tk_004",
    subject: "Question about end-of-semester exams",
    category: "academic",
    status: "resolved",
    openedAt: daysAgo(8),
    openedBy: {
      name: "Matthis Bernard",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "student",
    },
    lastMessage: "Resolved — exam schedule shared.",
    unread: false,
  },
];

export const emergencyWorkflows: EmergencyWorkflow[] = [
  {
    id: "ew_001",
    title: "Mediation between Matthis and Family Rossi",
    studentId: "student_matthis",
    status: "active",
    startedAt: hoursAgo(6),
    steps: [
      { label: "Issue reported by family", done: true },
      { label: "Acknowledge & schedule call", done: true },
      { label: "Mediation call (3-way)", done: false },
      { label: "Action plan agreed", done: false },
      { label: "Follow-up after 1 week", done: false },
    ],
  },
  {
    id: "ew_002",
    title: "Lily — missing insurance",
    studentId: "student_lily",
    status: "monitoring",
    startedAt: daysAgo(1),
    steps: [
      { label: "Coordinator notified", done: true },
      { label: "Family contacted", done: true },
      { label: "New policy uploaded", done: false },
      { label: "Verified with school nurse", done: false },
    ],
  },
  {
    id: "ew_003",
    title: "Carlo — visa renewal",
    studentId: "student_carlo",
    status: "closed",
    startedAt: daysAgo(10),
    steps: [
      { label: "Issue identified", done: true },
      { label: "Documents collected", done: true },
      { label: "Visa renewed", done: true },
      { label: "Closed", done: true },
    ],
  },
];
