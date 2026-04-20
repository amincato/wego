import { HostFamily } from "@/lib/types";

export const hostFamilies: HostFamily[] = [
  {
    id: "family_rath",
    userId: "user_rath",
    familyName: "Family Rath",
    city: "Rostock",
    country: "Germany",
    nationality: "de",
    photoUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
    bio: "A warm Bavarian family excited to welcome an international student into their home.",
    members: ["Mother Anna, 45", "Father Klaus, 47", "Daughter Lena, 15"],
    homeType: "house",
    hasPets: true,
    spareRooms: 1,
  },
  {
    id: "family_muller",
    userId: "user_muller",
    familyName: "Family Müller",
    city: "Rostock",
    country: "Germany",
    nationality: "de",
    photoUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
    bio: "An active, outdoorsy family from northern Germany, hikers and sailors.",
    members: ["Mother Petra, 42", "Father Hans, 44"],
    homeType: "house",
    hasPets: false,
    spareRooms: 1,
  },
];

/** The family used for demo: Rath is the default host family. */
export const DEMO_FAMILY_ID = "family_rath";
