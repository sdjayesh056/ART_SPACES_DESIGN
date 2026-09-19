/**
 * Service options offered in the enquiry form's dropdown.
 *
 * Plain module — no "use client", no JSX — so it can be imported from Server
 * Components, server actions and (later) sitemap generation alike.
 */
export const SERVICE_OPTIONS = [
    "Interior Design",
    "Space Planning",
    "Office Design",
    "Landscape Design",
    "Lighting Design",
    "Custom Furniture",
    "Full Renovation",
    "Consultation Only",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
