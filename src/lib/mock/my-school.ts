import type { SchoolExtended } from "@/lib/types-dashboard";

export const mySchool: SchoolExtended = {
  id: "school_my_lic_salvini",
  name: "Liceo Tommaso Salvini",
  shortName: "Liceo Salvini",
  city: "Milan",
  country: "Italy",
  description:
    "Founded in 1923, Liceo Salvini is a public high school with a long tradition of international exchange. Our linguistic and scientific tracks welcome students from across Europe every year.",
  imageUrl: "/schools/friedrich-schiller.png",
  galleryItems: [
    {
      id: "ms_g1",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      caption: "Main building",
    },
    {
      id: "ms_g2",
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      caption: "Library",
    },
    {
      id: "ms_g3",
      imageUrl:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
      caption: "Campus garden",
    },
  ],
  spotsLeft: 7,
  orientation: "linguistic",
  language: "it",
  destinationType: "large_city",
  exchangeStudentsPresence: "high",
  mobilityOptions: [
    { durationMonths: 3, priceEur: 4500 },
    { durationMonths: 6, priceEur: 7800 },
    { durationMonths: 10, priceEur: 11500 },
  ],
  highlights: {
    admission: [
      "Average grade of B+ or higher in the previous school year",
      "Intermediate level in Italian or strong commitment to learn",
      "Motivation letter and one teacher recommendation",
    ],
    schoolSchedule: [
      "Monday to Saturday, 8:00 — 13:30",
      "Optional afternoon labs on Tuesday and Thursday",
    ],
    subjectsAndActivities: [
      "Italian literature, History, Philosophy",
      "Mathematics, Physics, Biology",
      "English, French, Spanish, German",
      "Theatre lab, Robotics club, Football team",
    ],
  },
  coordinator: {
    name: "Anna Ricci",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  testimonials: [],
  hostingCapacity: {
    totalSpots: 24,
    filledSpots: 17,
    reservedSpots: 4,
    perDuration: [
      { months: 3, total: 8, filled: 5 },
      { months: 6, total: 10, filled: 7 },
      { months: 10, total: 6, filled: 5 },
    ],
  },
  academicInfo: {
    schoolYearStart: "2026-09-14",
    schoolYearEnd: "2027-06-08",
    examPeriods: [
      { name: "Mid-year exams", from: "2027-01-12", to: "2027-01-23" },
      { name: "Final exams", from: "2027-05-25", to: "2027-06-05" },
    ],
    holidays: [
      { name: "Christmas break", from: "2026-12-23", to: "2027-01-06" },
      { name: "Easter break", from: "2027-04-01", to: "2027-04-08" },
    ],
    subjectsOffered: [
      "Italian",
      "Latin",
      "Mathematics",
      "Physics",
      "History",
      "Philosophy",
      "English",
      "French",
      "Spanish",
      "Art history",
    ],
    averageClassSize: 22,
  },
  studentsHostedIds: ["student_matthis", "student_giorgio"],
  studentsAbroadIds: ["student_carlo"],
};
