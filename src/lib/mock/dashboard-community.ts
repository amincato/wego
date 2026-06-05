import type { CommunityEntry } from "@/lib/types-dashboard";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const communityEntries: CommunityEntry[] = [
  {
    id: "ev_welcome_day",
    kind: "event",
    title: "Welcome Day for Exchange Students",
    body: "Hey everyone! 🌍✨\nI'm excited to invite you to our Welcome Day for Exchange Students at school! 🎉 Come meet students from around the world, make new friends, and kick off this amazing international experience together 💙",
    authorName: "You",
    authorAvatarUrl: "/hans-coordinator.png",
    createdAt: daysAgo(1),
    eventDate: "2026-09-12T13:00:00.000Z",
    eventLocation: "Friedrich Schiller Gymnasium · School hall",
    imageUrls: [
      "/community/event-welcome-day-1.png",
      "/community/event-welcome-day-2.png",
    ],
    likeCount: 5,
  },
  {
    id: "ev_host_family_day",
    kind: "event",
    title: "Host Family Day",
    body: "We are excited to invite all our host families to this year's Host Family Day 🤍🌍\n\nThis special event will be a wonderful opportunity to meet other host families, connect with the school community, and prepare together to welcome our incoming exchange students in the best possible way ✈️🏡\n\nDuring the day, families will have the chance to share experiences, ask questions, and learn more about the exchange journey ahead. Hosting a student is not only about opening your home, but also about creating meaningful cultural connections and unforgettable memories 💫\n\nWe can't wait to spend this day together and officially begin a new year of international experiences and friendships 🎓✨",
    authorName: "You",
    authorAvatarUrl: "/hans-coordinator.png",
    createdAt: daysAgo(2),
    eventDate: "2026-09-05T10:00:00.000Z",
    eventLocation: "Friedrich Schiller Gymnasium · Auditorium",
    imageUrls: [
      "/community/event-host-family-day-1.png",
      "/community/event-host-family-day-2.jpg",
    ],
    likeCount: 8,
  },
  {
    id: "post_welcome_carlo",
    kind: "post",
    title: "",
    body: "We are happy to announce that Carlo has officially started his year abroad in Germany 🇩🇪✨ We can't wait to share this amazing experience with him! Picking him up at the airport was such a special and emotional moment 🥹✈️❤️",
    authorName: "Host family Rath",
    authorAvatarUrl: "/families/rath/avatar.png",
    createdAt: daysAgo(3),
    imageUrl: "/community/post-rath-carlo-arrival.png",
    comments: [
      {
        id: "c_carlo_welcome",
        authorName: "Carlo Liberti",
        authorAvatarUrl: "/carlo-liberti.png",
        body: "Hello everyone! 😊 I'm very exhited to start this new chapter of my life here at Friedrich Schiller Gymnasium. I'm looking forward to meet you at school!",
        createdAt: daysAgo(2),
      },
    ],
  },
  {
    id: "post_julie_departure",
    kind: "post",
    title: "",
    body: "Yesterday I left for the experience I've been dreaming about since I was little ✈️🌍\nSaying goodbye to my family was such an emotional moment… a mix of sadness, excitement, fear, and happiness all at the same time 🤍\nIt still feels unreal to know that I'm finally starting this new chapter of my life. Leaving home is not easy, but I know this journey will help me grow, discover new things, and create memories I'll carry forever 🫶\nThis is only the beginning of my adventure, and I truly can't wait to experience everything that's waiting for me: new friendships, a new culture, new places, and so many unforgettable moments ✨\nSee you soon, world 🌎💫",
    authorName: "Julie Martin",
    authorAvatarUrl: "/community/julie-martin-avatar.jpg",
    createdAt: daysAgo(4),
    imageUrls: [
      "/community/post-julie-departure-1.jpg",
      "/community/post-julie-departure-2.jpg",
    ],
    comments: [
      {
        id: "c_julie_welcome_coord",
        authorName: "You",
        authorAvatarUrl: "/hans-coordinator.png",
        body: "We are so happy to welcome you to our school and to be part of this amazing journey with you ✨. We wish you the best of luck for this new chapter and can't wait to see you grow, learn, and create beautiful memories here with us. Welcome to our school community! 🎓",
        createdAt: daysAgo(3),
      },
    ],
  },
];
