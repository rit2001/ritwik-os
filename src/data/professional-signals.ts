export type ProfessionalSignalRelationship =
  "current-base" | "engineering-experience";

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
    id: "canada",
    label: "Canada",
    relationship: "engineering-experience",
    detail: "Taskly Technologies",
    latitude: 56.1304,
    longitude: -106.3468,
    visibility: "public",
  },
] as const satisfies readonly ProfessionalSignal[];
