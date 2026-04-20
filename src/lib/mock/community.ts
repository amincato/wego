import type { ActiveView } from "@/lib/types";

export type AuthorRole = ActiveView | "school" | "alumni";

export interface CommunityPost {
  id: string;
  author: {
    userId: string;
    name: string;
    handle: string;
    avatarUrl: string;
    role: AuthorRole;
    verified?: boolean;
  };
  content: string;
  imageUrl?: string;
  tags?: string[];
  /** Hours ago at seed time — the feed displays it relative to now. */
  hoursAgo: number;
  likes: number;
  replies: number;
  reposts: number;
  /** If true the post appears on the "Schools" tab. */
  audience?: "all" | "students" | "families";
}

export const communityPosts: CommunityPost[] = [
  {
    id: "post_1",
    author: {
      userId: "user_lucas",
      name: "Lucas Martinez",
      handle: "@lucasfromspain",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "alumni",
      verified: true,
    },
    content:
      "Year abroad at Friedrich Schiller Gym → C1 German in 9 months, 2 best friends for life, and a serious addiction to Fischbrötchen.\n\nIf you're hesitating: just apply. Future-you will thank present-you 💙",
    tags: ["#Germany", "#Rostock", "#AlumniStory"],
    hoursAgo: 2,
    likes: 214,
    replies: 38,
    reposts: 26,
    audience: "all",
  },
  {
    id: "post_2",
    author: {
      userId: "user_coord_anna",
      name: "Friedrich Schiller Gymnasium",
      handle: "@schiller_rostock",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      role: "school",
      verified: true,
    },
    content:
      "Applications for the 2026/27 exchange are open! 🎒\n\nWe have 15 spots for international students across our scientific, humanistic and linguistic tracks. Deadline: June 15.",
    imageUrl: "/schools/friedrich-schiller.png",
    tags: ["#Applications2627", "#Germany"],
    hoursAgo: 5,
    likes: 89,
    replies: 12,
    reposts: 34,
    audience: "students",
  },
  {
    id: "post_3",
    author: {
      userId: "user_miller",
      name: "Family Miller",
      handle: "@millerhostfam",
      avatarUrl:
        "https://images.unsplash.com/photo-1521410608884-1e7c8cfb3bfe?auto=format&fit=crop&w=200&q=80",
      role: "family",
    },
    content:
      "Hosting for the 3rd year in a row. Still the best decision we ever made as a family 🙏\n\nTo new host families: don't overthink it. Your home is already enough. The rest follows naturally.",
    hoursAgo: 9,
    likes: 156,
    replies: 22,
    reposts: 8,
    audience: "families",
  },
  {
    id: "post_4",
    author: {
      userId: "user_giulia",
      name: "Giulia Conti",
      handle: "@giulia_conti",
      avatarUrl:
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=200&q=80",
      role: "student",
    },
    content:
      "Packing question for anyone who did a 10-month exchange: how many pairs of shoes is *too* many? 👟👠🥾\n\nAsking for a friend. (The friend is me.)",
    hoursAgo: 14,
    likes: 67,
    replies: 43,
    reposts: 3,
    audience: "students",
  },
  {
    id: "post_5",
    author: {
      userId: "user_paul",
      name: "Paul Weber",
      handle: "@paul_hosted",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      role: "alumni",
    },
    content:
      "One year in Marseille taught me more French than 10 years of school ever did. The trick? Bakery every morning + zero English friends for the first 2 months.",
    tags: ["#France", "#LanguageTips"],
    hoursAgo: 19,
    likes: 98,
    replies: 14,
    reposts: 12,
    audience: "all",
  },
  {
    id: "post_6",
    author: {
      userId: "user_lycee",
      name: "Lycée Thiers",
      handle: "@lyceethiers",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      role: "school",
      verified: true,
    },
    content:
      "Reminder: our welcome week for incoming international students kicks off September 7 ☀️\n\nCity tour, beach day, and the famous bouillabaisse dinner at Marie's 🍲",
    imageUrl: "/schools/lycee-thiers.png",
    hoursAgo: 28,
    likes: 72,
    replies: 6,
    reposts: 15,
    audience: "students",
  },
  {
    id: "post_7",
    author: {
      userId: "user_sofia",
      name: "Sofia Rossi",
      handle: "@sofiarossi",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      role: "student",
    },
    content:
      "Day 43 in Stuttgart and I dreamt in German for the first time last night 🧠🇩🇪\n\nIt was a nightmare about missing a train, but still — progress is progress!",
    hoursAgo: 36,
    likes: 342,
    replies: 29,
    reposts: 41,
    audience: "all",
  },
  {
    id: "post_8",
    author: {
      userId: "user_rath",
      name: "Family Rath",
      handle: "@familyrath",
      avatarUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
      role: "family",
    },
    content:
      "Planning a weekend trip to the Baltic coast with our incoming exchange student in September. Any host family here done Warnemünde with kids? Tips welcome 🌊",
    hoursAgo: 44,
    likes: 28,
    replies: 11,
    reposts: 1,
    audience: "families",
  },
];
