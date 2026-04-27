import type { CommunityEntry } from "@/lib/types-dashboard";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

const daysAhead = (n: number, hour = 18, min = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

export const communityEntries: CommunityEntry[] = [
  {
    id: "ev_welcome_party",
    kind: "event",
    title: "Welcome party for spring exchange students",
    body: "Open to all incoming students, host families and coordinators. Light dinner and live music in the school garden.",
    authorName: "Anna Ricci",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(2),
    eventDate: daysAhead(7),
    eventLocation: "Liceo Salvini · School garden, Milan",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ev_orientation_day",
    kind: "event",
    title: "Orientation day for outgoing students",
    body: "Mandatory briefing on visas, insurance and on-site logistics. Q&A with the coordinator and a former exchange student.",
    authorName: "Anna Ricci",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(5),
    eventDate: daysAhead(14, 10),
    eventLocation: "Auditorium · 2nd floor",
  },
  {
    id: "post_welcome_carlo",
    kind: "post",
    title: "Carlo's first week in Rostock",
    body: "Carlo shared a quick update from Friedrich Schiller Gymnasium: classes are intense but the host family is amazing. Photos in the gallery!",
    authorName: "Carlo Liberti",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(3),
    imageUrl:
      "https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "post_thanks",
    kind: "post",
    title: "Thanks to the Bianchi family",
    body: "A heartfelt thank-you message from one of our incoming students to their host family for the warm welcome and patience during the first weeks.",
    authorName: "Matthis Bernard",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(8),
  },
  {
    id: "upd_calendar",
    kind: "update",
    title: "Updated 2026/2027 academic calendar",
    body: "The calendar has been published with confirmed dates for exam sessions and breaks. Please consult it before approving any new applications.",
    authorName: "Headmaster's office",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(12),
  },
  {
    id: "upd_partner_added",
    kind: "update",
    title: "New partner: Lycée Faidherbe (Lille)",
    body: "Lycée Faidherbe in Lille has joined our partner network. Spots will open for the next semester.",
    authorName: "Coordination office",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    createdAt: daysAgo(18),
  },
];
