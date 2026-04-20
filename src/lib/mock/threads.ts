import { ChatThread } from "@/lib/types";

/**
 * Demo chat threads.
 * The current logged-in demo user is `user_giorgia` for the student view and
 * `user_rath` for the family view (fallbacks in `useUser`).
 * Timestamps are staggered so the list shows a believable "recent activity".
 */
export const threads: ChatThread[] = [
  /* ---- Giorgia (student) ↔ Family Rath ---- */
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
        id: "msg_rath_1",
        threadId: "thread_rath_giorgia",
        from: "user_rath",
        text: "Hallo Giorgia 😊, wir sind die Familie Rath und wir würden uns sehr freuen, dich während deines Aufenthalts bei uns aufzunehmen.\n\nWe are an open and friendly family. We love spending time together on trips and dinners, but we also respect your space. Can't wait to meet you! 🌍",
        timestamp: "2026-04-25T10:23:00Z",
      },
      {
        id: "msg_rath_2",
        threadId: "thread_rath_giorgia",
        from: "user_giorgia",
        text: "Hi Family Rath! Thank you so much for the warm welcome 💙 I'm really excited about this experience.",
        timestamp: "2026-04-25T11:02:00Z",
      },
      {
        id: "msg_rath_3",
        threadId: "thread_rath_giorgia",
        from: "user_rath",
        text: "Our daughter Lena is looking forward to showing you around Rostock — she's your age and goes to Friedrich Schiller too!",
        timestamp: "2026-04-25T11:08:00Z",
      },
      {
        id: "msg_rath_4",
        threadId: "thread_rath_giorgia",
        from: "user_giorgia",
        text: "That sounds amazing. Is there anything I should bring from Italy? I'd love to cook a pasta dinner for you one night 🍝",
        timestamp: "2026-04-25T11:15:00Z",
      },
      {
        id: "msg_rath_5",
        threadId: "thread_rath_giorgia",
        from: "user_rath",
        text: "We'd love that! Just bring yourself and a smile. The kitchen is yours ✨",
        timestamp: "2026-04-25T11:20:00Z",
      },
    ],
    lastMessageAt: "2026-04-25T11:20:00Z",
  },

  /* ---- Giorgia (student) ↔ School coordinator Anna Schmidt ---- */
  {
    id: "thread_coord_anna_giorgia",
    participants: [
      {
        userId: "user_coord_anna",
        name: "Anna Schmidt · F. Schiller Gym.",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
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
        id: "msg_coord_1",
        threadId: "thread_coord_anna_giorgia",
        from: "user_coord_anna",
        text: "Hi Giorgia, Anna from the exchange office at Friedrich Schiller Gymnasium 👋 Your application landed on my desk this morning!",
        timestamp: "2026-04-24T09:00:00Z",
      },
      {
        id: "msg_coord_2",
        threadId: "thread_coord_anna_giorgia",
        from: "user_coord_anna",
        text: "I'll schedule a short interview with our principal next week — just the usual: why Rostock, language level, interests. Does Wednesday at 15:00 CET work?",
        timestamp: "2026-04-24T09:01:00Z",
      },
      {
        id: "msg_coord_3",
        threadId: "thread_coord_anna_giorgia",
        from: "user_giorgia",
        text: "Hi Anna! Wednesday 15:00 is perfect for me 🙌 Should I prepare anything specific?",
        timestamp: "2026-04-24T10:15:00Z",
      },
      {
        id: "msg_coord_4",
        threadId: "thread_coord_anna_giorgia",
        from: "user_coord_anna",
        text: "Just your motivation letter and a couple of questions you'd like to ask us. See you Wednesday!",
        timestamp: "2026-04-24T10:40:00Z",
      },
    ],
    lastMessageAt: "2026-04-24T10:40:00Z",
  },

  /* ---- Giorgia ↔ Lucas Martinez (peer, already abroad) ---- */
  {
    id: "thread_lucas_giorgia",
    participants: [
      {
        userId: "user_lucas",
        name: "Lucas Martinez",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        role: "student",
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
        id: "msg_lucas_1",
        threadId: "thread_lucas_giorgia",
        from: "user_lucas",
        text: "Hey! Saw you applied to Friedrich Schiller — I was there last year from Madrid. Ask me anything 😎",
        timestamp: "2026-04-22T16:30:00Z",
      },
      {
        id: "msg_lucas_2",
        threadId: "thread_lucas_giorgia",
        from: "user_giorgia",
        text: "Oh wow, thanks! How was the German at first? I'm B1.",
        timestamp: "2026-04-22T17:00:00Z",
      },
      {
        id: "msg_lucas_3",
        threadId: "thread_lucas_giorgia",
        from: "user_lucas",
        text: "B1 is more than enough. People switch to English when they see you struggle, but by month 2 you'll be dreaming in German 😂",
        timestamp: "2026-04-22T17:05:00Z",
      },
    ],
    lastMessageAt: "2026-04-22T17:05:00Z",
  },

  /* ---- Family Rath ↔ Marco (incoming student candidate) ---- */
  {
    id: "thread_rath_marco",
    participants: [
      {
        userId: "user_rath",
        name: "Family Rath",
        avatarUrl:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
        role: "family",
      },
      {
        userId: "user_marco",
        name: "Marco Bianchi",
        avatarUrl:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
        role: "student",
      },
    ],
    messages: [
      {
        id: "msg_marco_1",
        threadId: "thread_rath_marco",
        from: "user_marco",
        text: "Hi! I saw your host family profile — loved the photos of the lake trips. I'd be coming in September for 6 months.",
        timestamp: "2026-04-23T12:10:00Z",
      },
      {
        id: "msg_marco_2",
        threadId: "thread_rath_marco",
        from: "user_rath",
        text: "Hi Marco, nice to e-meet you! September works perfectly. Do you play any instrument? Our son Felix would be thrilled — he's on the guitar 🎸",
        timestamp: "2026-04-23T12:22:00Z",
      },
      {
        id: "msg_marco_3",
        threadId: "thread_rath_marco",
        from: "user_marco",
        text: "I play the piano! We could do duets 🎹",
        timestamp: "2026-04-23T12:25:00Z",
      },
    ],
    lastMessageAt: "2026-04-23T12:25:00Z",
  },

  /* ---- Family Rath ↔ Family Miller (fellow host family, community) ---- */
  {
    id: "thread_rath_miller",
    participants: [
      {
        userId: "user_rath",
        name: "Family Rath",
        avatarUrl:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
        role: "family",
      },
      {
        userId: "user_miller",
        name: "Family Miller",
        avatarUrl:
          "https://images.unsplash.com/photo-1521410608884-1e7c8cfb3bfe?auto=format&fit=crop&w=200&q=80",
        role: "family",
      },
    ],
    messages: [
      {
        id: "msg_miller_1",
        threadId: "thread_rath_miller",
        from: "user_miller",
        text: "Hi Rath family 👋 We're thinking of doing a welcome dinner for all exchange students in Rostock in September. In?",
        timestamp: "2026-04-20T18:00:00Z",
      },
      {
        id: "msg_miller_2",
        threadId: "thread_rath_miller",
        from: "user_rath",
        text: "Absolutely in! Let's coordinate a date once everyone has confirmed arrival.",
        timestamp: "2026-04-20T18:45:00Z",
      },
    ],
    lastMessageAt: "2026-04-20T18:45:00Z",
  },
];
