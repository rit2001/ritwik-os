export type ProfessionalSignalRelationship =
  "current-base" | "engineering-experience" | "country-marker";

export type ProfessionalSignal = {
  id: string;
  label: string;
  country: string;
  organization?: string;
  context: string;
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
    country: "India",
    context: "Current base",
    relationship: "current-base",
    detail: "Current base",
    latitude: 22.5726,
    longitude: 88.3639,
    visibility: "public",
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    country: "India",
    organization: "Search-in",
    context: "Engineering experience",
    relationship: "engineering-experience",
    detail: "Search-in · Engineering experience",
    latitude: 12.9716,
    longitude: 77.5946,
    visibility: "public",
  },
  {
    id: "pune",
    label: "Pune",
    country: "India",
    organization: "Pepcorns",
    context: "Engineering experience",
    relationship: "engineering-experience",
    detail: "Pepcorns · Engineering experience",
    latitude: 18.5204,
    longitude: 73.8567,
    visibility: "public",
  },
  {
    id: "toronto",
    label: "Toronto",
    country: "Canada",
    organization: "Taskly Technologies",
    context: "Remote software-engineering experience",
    relationship: "engineering-experience",
    detail: "Taskly Technologies · Remote software-engineering experience",
    latitude: 43.6532,
    longitude: -79.3832,
    visibility: "public",
  },
  {
    id: "usa",
    label: "USA",
    country: "United States",
    organization: "Scale AI",
    context: "Freelance / part-time LLM evaluation work",
    relationship: "country-marker",
    detail: "Scale AI · Freelance / part-time LLM evaluation work",
    latitude: 39.8283,
    longitude: -98.5795,
    visibility: "public",
  },
] as const satisfies readonly ProfessionalSignal[];
