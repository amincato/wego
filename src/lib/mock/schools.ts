import { School } from "@/lib/types";

/* School cover photos are the ones from the Figma file, stored under /public/schools.
 * Gallery, coordinator and testimonial avatars still come from Unsplash Source
 * (stable & royalty-free) since Figma does not expose them. */

export const schools: School[] = [
  {
    id: "school_fsg",
    name: "Friedrich Schiller Gymnasium",
    shortName: "F. S. Gymnasium",
    city: "Rostock",
    country: "Germany",
    description:
      "Founded in 1890, Alexander von Humboldt Gymnasium is one of Berlin's most prestigious academic institutions. We offer a comprehensive international program with a strong focus on languages and international relations.",
    imageUrl: "/schools/friedrich-schiller.png",
    galleryItems: [
      {
        id: "g_fsg_1",
        imageUrl:
          "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
        caption: "Giulia from France",
      },
      {
        id: "g_fsg_2",
        imageUrl:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        caption: "Lily from Spain",
      },
      {
        id: "g_fsg_3",
        imageUrl:
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      },
    ],
    spotsLeft: 15,
    orientation: "scientific",
    language: "de",
    destinationType: "medium_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2900 },
      { durationMonths: 6, priceEur: 2300 },
      { durationMonths: 10, priceEur: 2500 },
    ],
    highlights: {
      admission: [
        "Report card from the last school year",
        "Letter of motivation (max 500 chars)",
        "Interview with the school coordinator",
      ],
      schoolSchedule: [
        "Monday – Friday, 8:00 – 15:30",
        "Two-week orientation program in September",
        "After-school clubs available on Tuesdays and Thursdays",
      ],
      subjectsAndActivities: [
        "German language, literature & culture",
        "Math, Physics, Chemistry",
        "Music, Art, Sports (basketball, volleyball, swimming)",
      ],
    },
    coordinator: {
      name: "Anna Schmidt",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [
      {
        id: "t_fsg_1",
        studentName: "Lucas Martinez",
        year: 2026,
        origin: "Spain",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text:
          "My experience was amazing. I made many new friends and I'm still in contact with them. I improved the language and I got the C1 level at Goethe Institut. I'm very proud of my self.",
      },
      {
        id: "t_fsg_2",
        studentName: "Ulrike Werkstoff",
        year: 2026,
        origin: "Germany",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text:
          "My experience at Schiller Gymnasium was wonderful. Professors and classmates made me feel welcomed from the beginning. I felt fully integrated into the community and quickly at home in a new environment.",
      },
    ],
  },
  {
    id: "school_thiers",
    name: "Lycée Thiers",
    shortName: "Lycée Thiers",
    city: "Marseille",
    country: "France",
    description:
      "Lycée Thiers is one of the oldest and most prestigious high schools in southern France, with a strong tradition in literature, arts and sciences.",
    imageUrl: "/schools/lycee-thiers.png",
    galleryItems: [
      {
        id: "g_thiers_1",
        imageUrl:
          "https://images.unsplash.com/photo-1491841651911-c44c30c34548?auto=format&fit=crop&w=800&q=80",
      },
    ],
    spotsLeft: 15,
    orientation: "classic",
    language: "fr",
    destinationType: "large_city",
    exchangeStudentsPresence: "medium",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2700 },
      { durationMonths: 6, priceEur: 2400 },
    ],
    highlights: {
      admission: [
        "Report card from the last two years",
        "Letter of motivation in French (preferred) or English",
      ],
      schoolSchedule: ["Monday – Friday, 8:30 – 17:00", "Wednesday half-day"],
      subjectsAndActivities: [
        "French literature, philosophy, history",
        "Mathematics, physics, biology",
        "Theater, debate club",
      ],
    },
    coordinator: {
      name: "Marie Dubois",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_goethe",
    name: "Goethe Gymnasium",
    shortName: "Goethe Gym.",
    city: "Kempten",
    country: "Germany",
    description:
      "A Bavarian high school with a humanistic tradition and a strong international exchange program.",
    imageUrl: "/schools/goethe-gymnasium.png",
    galleryItems: [],
    spotsLeft: 15,
    orientation: "linguistic",
    language: "de",
    destinationType: "small_town",
    exchangeStudentsPresence: "medium",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2800 },
      { durationMonths: 6, priceEur: 2200 },
      { durationMonths: 10, priceEur: 2400 },
    ],
    highlights: {
      admission: [
        "Report card from the last school year",
        "Basic German A2 level required",
      ],
      schoolSchedule: ["Monday – Friday, 8:00 – 15:00"],
      subjectsAndActivities: [
        "German, Latin, English",
        "Music and arts program",
        "Alpine sports club",
      ],
    },
    coordinator: {
      name: "Klaus Weber",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_kollwitz",
    name: "Käthe Kollwitz Gymnasium",
    shortName: "K. K. Gymnasium",
    city: "Stuttgart",
    country: "Germany",
    description:
      "Modern Gymnasium in Stuttgart with a focus on sustainability and the arts.",
    imageUrl: "/schools/kathe-kollwitz.png",
    galleryItems: [],
    spotsLeft: 5,
    orientation: "artistic",
    language: "de",
    destinationType: "large_city",
    exchangeStudentsPresence: "low",
    mobilityOptions: [{ durationMonths: 3, priceEur: 3000 }],
    highlights: {
      admission: ["Portfolio of personal artwork", "Letter of motivation"],
      schoolSchedule: ["Monday – Friday, 8:15 – 16:00"],
      subjectsAndActivities: ["Art history, painting, sculpture", "Drama"],
    },
    coordinator: {
      name: "Lena Bauer",
      avatarUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_faidherbe",
    name: "Lycée Faidherbe",
    shortName: "Lycée Faidherbe",
    city: "Lille",
    country: "France",
    description:
      "Historic lycée in Lille with a strong focus on scientific preparatory classes.",
    imageUrl: "/schools/lycee-faidherbe.png",
    galleryItems: [],
    spotsLeft: 15,
    orientation: "scientific",
    language: "fr",
    destinationType: "large_city",
    exchangeStudentsPresence: "medium",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2600 },
      { durationMonths: 6, priceEur: 2300 },
      { durationMonths: 10, priceEur: 2400 },
    ],
    highlights: {
      admission: ["French level B1 recommended"],
      schoolSchedule: ["Monday – Friday, 8:00 – 17:30"],
      subjectsAndActivities: ["Mathematics, physics, chemistry", "Debate club"],
    },
    coordinator: {
      name: "Pierre Laurent",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_clemenceau",
    name: "Lycée Clemenceau",
    shortName: "Lycée Clemenceau",
    city: "Nantes",
    country: "France",
    description:
      "Large lycée in Nantes known for its multicultural environment and sports programs.",
    imageUrl: "/schools/lycee-clemenceau.png",
    galleryItems: [],
    spotsLeft: 15,
    orientation: "musical",
    language: "fr",
    destinationType: "large_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2500 },
      { durationMonths: 6, priceEur: 2200 },
      { durationMonths: 10, priceEur: 2300 },
    ],
    highlights: {
      admission: ["Musical audition optional"],
      schoolSchedule: ["Monday – Friday, 8:00 – 16:30"],
      subjectsAndActivities: ["Music conservatory program", "Orchestra, choir"],
    },
    coordinator: {
      name: "Jean Moreau",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
];

export const countriesAvailable = ["France", "Germany", "Spain"] as const;
