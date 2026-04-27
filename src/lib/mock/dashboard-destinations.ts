/**
 * Real-world coordinates for the Destinations OpenStreetMap.
 *
 * Lat/lng are taken from each city's "city hall / centre" on OSM
 * and are accurate enough to render a recognisable pin in town.
 */
export const schoolCoordinates: Record<
  string,
  { lat: number; lng: number }
> = {
  school_thiers: { lat: 43.2965, lng: 5.3698 }, // Marseille
  school_goethe: { lat: 47.7267, lng: 10.3147 }, // Kempten
  school_kollwitz: { lat: 48.7758, lng: 9.1829 }, // Stuttgart
  school_faidherbe: { lat: 50.6292, lng: 3.0573 }, // Lille
  school_clemenceau: { lat: 47.2184, lng: -1.5536 }, // Nantes
  school_galilei: { lat: 43.7696, lng: 11.2558 }, // Florence
  school_cervantes: { lat: 40.4168, lng: -3.7038 }, // Madrid
  school_manzoni: { lat: 45.4642, lng: 9.19 }, // Milan
  school_gaudi: { lat: 41.3851, lng: 2.1734 }, // Barcelona
};

export const mySchoolCoordinates = { lat: 54.0887, lng: 12.1438 }; // Rostock
