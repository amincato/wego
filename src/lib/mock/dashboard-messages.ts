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
  withRole:
    | "hosted_student"
    | "incoming_student"
    | "outgoing_student"
    | "abroad_student"
    | "hosting_family"
    | "future_family"
    | "partner_school";
  lastMessage: string;
  lastAt: string;
  unread: number;
  pinned?: boolean;
}

export const inboxConversations: InboxConversation[] = [
  /* ---- Hosted students ---- */
  {
    id: "conv_carlo",
    withName: "Carlo Liberti",
    withAvatarUrl: "/carlo-liberti.png",
    withRole: "hosted_student",
    lastMessage: "Just submitted my mid-term report card — let me know!",
    lastAt: minsAgo(12),
    unread: 2,
    pinned: true,
  },
  {
    id: "conv_alessandro",
    withName: "Alessandro Greco",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=200&q=80",
    withRole: "hosted_student",
    lastMessage: "Could I get the schedule for next week's orientation?",
    lastAt: hoursAgo(2),
    unread: 1,
  },
  {
    id: "conv_sophie",
    withName: "Sophie Laurent",
    withAvatarUrl: "/students/confirmed/p6.png",
    withRole: "hosted_student",
    lastMessage: "Thanks for the welcome packet, see you Monday!",
    lastAt: hoursAgo(6),
    unread: 0,
  },
  {
    id: "conv_carmen",
    withName: "Carmen Ruiz",
    withAvatarUrl: "/students/confirmed/p7.png",
    withRole: "hosted_student",
    lastMessage: "Quick question about the bus pass paperwork.",
    lastAt: daysAgo(1),
    unread: 0,
  },
  /* ---- Incoming students ---- */
  {
    id: "conv_lily",
    withName: "Lily Louise Jacob",
    withAvatarUrl: "/students/confirmed/p8.png",
    withRole: "incoming_student",
    lastMessage: "What's the deadline for the housing preferences form?",
    lastAt: hoursAgo(5),
    unread: 1,
  },
  /* ---- Outgoing students ---- */
  {
    id: "conv_jonas",
    withName: "Jonas Weber",
    withAvatarUrl: "/lukas-weber.png",
    withRole: "outgoing_student",
    lastMessage: "My visa appointment is confirmed for next Tuesday.",
    lastAt: hoursAgo(8),
    unread: 0,
  },
  /* ---- Students currently abroad ---- */
  {
    id: "conv_giorgia",
    withName: "Giorgia Bernardi",
    withAvatarUrl: "/matthis-bernard.jpg",
    withRole: "abroad_student",
    lastMessage: "Settled in nicely at Lycée Thiers — sending photos soon!",
    lastAt: daysAgo(2),
    unread: 0,
  },
  /* ---- Hosting families ---- */
  {
    id: "conv_family_rath",
    withName: "Family Rath",
    withAvatarUrl: "/families/rath/avatar.png",
    withRole: "hosting_family",
    lastMessage: "Carlo settled in nicely — we'll send photos tonight!",
    lastAt: minsAgo(45),
    unread: 1,
  },
  {
    id: "conv_family_taununsanlage",
    withName: "Family Taununsanlage",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=200&q=80",
    withRole: "hosting_family",
    lastMessage: "Could we reschedule the site visit to next Wednesday?",
    lastAt: hoursAgo(4),
    unread: 0,
  },
  {
    id: "conv_family_lenz",
    withName: "Family Lenz",
    withAvatarUrl: "/families/lenz.jpg",
    withRole: "hosting_family",
    lastMessage: "Alessandro's room is ready, looking forward to it!",
    lastAt: hoursAgo(9),
    unread: 0,
  },
  {
    id: "conv_family_stiefel",
    withName: "Family Stiefel",
    withAvatarUrl: "/families/stiefel.jpg",
    withRole: "hosting_family",
    lastMessage: "We have a couple of house rules we'd like to share.",
    lastAt: daysAgo(2),
    unread: 0,
  },
  /* ---- Future host families ---- */
  {
    id: "conv_family_schmidt",
    withName: "Family Schmidt",
    withAvatarUrl:
      "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=200&q=80",
    withRole: "future_family",
    lastMessage: "We finished the paperwork — ready to be matched.",
    lastAt: daysAgo(3),
    unread: 0,
  },
  /* ---- Partner schools ---- */
  {
    id: "conv_thiers",
    withName: "Lycée Thiers",
    withAvatarUrl: "/schools/lycee-thiers.png",
    withRole: "partner_school",
    lastMessage: "Carlo's mid-term grades have just been uploaded.",
    lastAt: hoursAgo(3),
    unread: 0,
  },
  {
    id: "conv_goethe",
    withName: "Goethe Gymnasium",
    withAvatarUrl: "/schools/goethe-gymnasium.png",
    withRole: "partner_school",
    lastMessage: "Welcome to our partner network — looking forward!",
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
