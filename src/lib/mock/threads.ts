import { ChatThread } from "@/lib/types";

export const threads: ChatThread[] = [
  {
    id: "thread_rath_giorgia",
    participants: [
      {
        userId: "user_rath",
        name: "Family Rath",
        avatarUrl:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
        role: "family",
      },
      {
        userId: "user_giorgia",
        name: "Giorgia Arnoldi",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        role: "student",
      },
    ],
    messages: [
      {
        id: "msg_1",
        threadId: "thread_rath_giorgia",
        from: "user_rath",
        text: "Hallo Giorgia 😊, wir sind die Familie Rath und wir würden uns sehr freuen, dich während deines Aufenthalts bei uns aufzunehmen.\n\nWir sind eine offene und freundliche Familie und verbringen gerne Zeit zusammen, zum Beispiel bei gemeinsamen Ausflügen oder Abendessen. Gleichzeitig respektieren wir auch deinen Freiraum. Wir sind neugierig, dich kennenzulernen und dir unsere Kultur näherzubringen 🌍",
        timestamp: "2026-04-25T10:23:00Z",
      },
    ],
    lastMessageAt: "2026-04-25T10:23:00Z",
  },
];
