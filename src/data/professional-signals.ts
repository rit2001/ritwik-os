export type ProfessionalSignalRelationship =
  "current-base" | "engineering-experience" | "country-marker";

export type ProfessionalSignal = {
  id: string;
  label: string;
  relationship: ProfessionalSignalRelationship;
  detail: string;
  latitude: number;
  longitude: number;
  visibility: "public" | "withheld";
};

export const professionalSignals = [
  {
    id: "kolkata",
    label: "Kolkata",
    relationship: "current-base",
    detail: "Current base",
    latitude: 22.5726,
    longitude: 88.3639,
    visibility: "public",
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    relationship: "engineering-experience",
    detail: "Search-in",
    latitude: 12.9716,
    longitude: 77.5946,
    visibility: "public",
  },
  {
    id: "pune",
    label: "Pune",
    relationship: "engineering-experience",
    detail: "Pepcorns",
    latitude: 18.5204,
    longitude: 73.8567,
    visibility: "public",
  },
  {
    id: "toronto",
    label: "Toronto",
    relationship: "engineering-experience",
    detail: "Taskly Technologies · Remote engineering experience",
    latitude: 43.6532,
    longitude: -79.3832,
    visibility: "public",
  },
  {
    id: "usa",
    label: "USA",
    relationship: "country-marker",
    detail: "United States",
    latitude: 39.8283,
    longitude: -98.5795,
    visibility: "public",
  },
] as const satisfies readonly ProfessionalSignal[];
