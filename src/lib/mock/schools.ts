import { School } from "@/lib/types";

/* School cover photos are the ones from the Figma file, stored under /public/schools.
 * Gallery, coordinator and testimonial avatars still come from Unsplash Source
 * (stable & royalty-free) since Figma does not expose them. */

export const schools: School[] = [
  {
    id: "school_thiers",
    name: "Lycée Thiers",
    shortName: "Lycée Thiers",
    city: "Marseille",
    country: "France",
    description:
      "Lycée Thiers is one of the oldest and most prestigious high schools in southern France, with a strong tradition in literature, arts and sciences.",
    imageUrl: "/schools/friedrich-schiller.png",
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
  {
    id: "school_galilei",
    name: "Liceo Galileo Galilei",
    shortName: "Liceo Galilei",
    city: "Florence",
    country: "Italy",
    description:
      "Historic Tuscan liceo with a strong scientific and humanistic tradition, set in the heart of Renaissance Florence.",
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    galleryItems: [],
    spotsLeft: 12,
    orientation: "classic",
    language: "it",
    destinationType: "medium_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2600 },
      { durationMonths: 6, priceEur: 2200 },
      { durationMonths: 10, priceEur: 2300 },
    ],
    highlights: {
      admission: [
        "Italian level A2 recommended",
        "Letter of motivation in Italian or English",
      ],
      schoolSchedule: ["Monday – Saturday, 8:00 – 14:00"],
      subjectsAndActivities: [
        "Latin, Greek, Italian literature",
        "Mathematics, physics, philosophy",
        "Visits to local museums and Renaissance landmarks",
      ],
    },
    coordinator: {
      name: "Francesca Romano",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_cervantes",
    name: "Instituto Cervantes",
    shortName: "Inst. Cervantes",
    city: "Madrid",
    country: "Spain",
    description:
      "Vibrant high school in the heart of Madrid with a strong linguistic program and a rich cultural exchange tradition.",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    galleryItems: [],
    spotsLeft: 8,
    orientation: "linguistic",
    language: "es",
    destinationType: "large_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2400 },
      { durationMonths: 6, priceEur: 2000 },
      { durationMonths: 10, priceEur: 2100 },
    ],
    highlights: {
      admission: [
        "Spanish level A2 required",
        "Interview with the school coordinator",
      ],
      schoolSchedule: ["Monday – Friday, 8:30 – 15:30"],
      subjectsAndActivities: [
        "Spanish language and literature",
        "History, philosophy, social studies",
        "Flamenco club, football, theatre",
      ],
    },
    coordinator: {
      name: "Carlos Fernández",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_manzoni",
    name: "Liceo Alessandro Manzoni",
    shortName: "Liceo Manzoni",
    city: "Milan",
    country: "Italy",
    description:
      "Renowned Milanese liceo classico with a long humanistic tradition and a vibrant international exchange program.",
    imageUrl:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=800&q=80",
    galleryItems: [],
    spotsLeft: 10,
    orientation: "linguistic",
    language: "it",
    destinationType: "large_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2700 },
      { durationMonths: 6, priceEur: 2300 },
      { durationMonths: 10, priceEur: 2400 },
    ],
    highlights: {
      admission: [
        "Italian level A2 recommended",
        "Letter of motivation in Italian or English",
      ],
      schoolSchedule: ["Monday – Saturday, 8:00 – 14:00"],
      subjectsAndActivities: [
        "Latin, Greek, Italian literature",
        "Philosophy and history of art",
        "Theatre, choir, debate club",
      ],
    },
    coordinator: {
      name: "Giulia Conti",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
  {
    id: "school_gaudi",
    name: "IES Antoni Gaudí",
    shortName: "IES Gaudí",
    city: "Barcelona",
    country: "Spain",
    description:
      "Catalan high school in central Barcelona with a strong artistic curriculum inspired by the city's modernist heritage.",
    imageUrl:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80",
    galleryItems: [],
    spotsLeft: 7,
    orientation: "artistic",
    language: "es",
    destinationType: "large_city",
    exchangeStudentsPresence: "high",
    mobilityOptions: [
      { durationMonths: 3, priceEur: 2500 },
      { durationMonths: 6, priceEur: 2100 },
      { durationMonths: 10, priceEur: 2200 },
    ],
    highlights: {
      admission: [
        "Spanish level A2 required",
        "Portfolio of personal artwork",
      ],
      schoolSchedule: ["Monday – Friday, 8:30 – 15:30"],
      subjectsAndActivities: [
        "Spanish and Catalan language",
        "Visual arts, painting, sculpture",
        "Architecture and design workshops",
      ],
    },
    coordinator: {
      name: "Marta Vidal",
      avatarUrl:
        "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=80",
    },
    testimonials: [],
  },
];

export const countriesAvailable = [
  "France",
  "Germany",
  "Italy",
  "Spain",
] as const;
