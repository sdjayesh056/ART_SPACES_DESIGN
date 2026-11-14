import { Armchair, Box, ClipboardCheck, Compass, HardHat, Lightbulb, PencilRuler, Ruler, Sofa, Sprout, type LucideIcon } from "lucide-react";

import type { Feature } from "@/types/content";

/**
 * Team, about and careers copy.
 *
 * ⚠️ PLACEHOLDER — the studio has not supplied its story, people or open
 * roles. Team entries are ROLES, deliberately not named individuals, and
 * nothing here states a founding year, headcount or client name. Replace
 * with the studio's own before launch.
 */
export type Role = { role: string; discipline: string; body: string; icon: LucideIcon };

export const TEAM_ROLES: Role[] = [
    { role: "Principal Designer", discipline: "Design direction", body: "Sets the concept, attends the key reviews and signs off every drawing before it leaves the studio.", icon: Compass },
    { role: "Project Lead", discipline: "Your point of contact", body: "Runs the project day to day, from the first layout to the last snag. The person you call.", icon: ClipboardCheck },
    { role: "Interior Architect", discipline: "Planning and detail", body: "Resolves the plan, the joinery and the junctions, and produces the working drawings.", icon: PencilRuler },
    { role: "3D Visualiser", discipline: "Renders and walkthroughs", body: "Builds the model as the design develops, so you can see every decision before it is made.", icon: Box },
    { role: "Lighting Designer", discipline: "Light and control", body: "Plans the three layers of light, specifies each fitting and commissions the scenes on site.", icon: Lightbulb },
    { role: "Site Supervisor", discipline: "Execution", body: "On site daily. Checks quality at each stage and writes your weekly progress note.", icon: HardHat },
    { role: "Procurement Lead", discipline: "Materials and furniture", body: "Sources, samples, orders and tracks every material and piece of furniture to delivery.", icon: Sofa },
    { role: "Landscape Designer", discipline: "Terraces and gardens", body: "Joins projects with outdoor space: planting, drainage, decks and garden lighting.", icon: Sprout },
];

export const TEAM_FORMATION: Feature[] = [
    { title: "Sized to the project", body: "A single apartment gets a lead, an interior architect and a supervisor. A hotel gets the full bench. You never pay for a team you do not need." },
    { title: "The same faces throughout", body: "The people who present the concept are the people who hand over the keys. Nothing is passed to a junior team after sign-off." },
    { title: "Specialists when it matters", body: "Lighting, landscape and visualisation join at the stage they are needed, and stay until their part is built." },
    { title: "Trusted trades", body: "Carpenters, stone fabricators and electricians we have worked with for years, on site under our supervisor." },
];

/* ── About ─────────────────────────────────────────────────────────────── */

export const STORY: string[] = [
    "ArtSpaces Design is a Mumbai studio of interior designers, architects and makers. We design and build homes, workplaces, hotels and stores for people who care how a space works as much as how it looks.",
    "We began with apartments, and with a simple frustration: beautiful drawings that fell apart on site. So we brought design, procurement and execution under one roof, and made one team answerable for all of it.",
    "That is still how every project runs. The designer who draws your home is in the room when the carpenter builds it.",
];

export const VALUES: Feature[] = [
    { title: "Plan before finish", body: "A room that does not work cannot be rescued by its marble. We resolve the layout first and choose materials second.", icon: Ruler },
    { title: "Honest about money", body: "You hear a realistic budget range at the first meeting, and the price you approve is the price of what is drawn.", icon: ClipboardCheck },
    { title: "Built to age well", body: "We specify for the tenth monsoon, not the photo shoot. Materials are chosen for how they wear.", icon: Sprout },
    { title: "Craft in the detail", body: "Edges, junctions and hardware get the same attention as the big moves, because that is what you touch every day.", icon: Armchair },
];

/* ── Careers ───────────────────────────────────────────────────────────── */

export const CULTURE: Feature[] = [
    { title: "Designers who build", body: "Everyone spends time on site. You will see your drawings become rooms, and learn what the drawing forgot." },
    { title: "Small teams, real ownership", body: "Projects are run by three or four people. You will present your own work to the client." },
    { title: "Time to get it right", body: "We take fewer projects than we could, so that details are resolved on paper rather than on site." },
    { title: "Learning as part of the week", body: "Material sessions, factory visits and reviews of finished projects are scheduled, not squeezed in." },
];

export const DISCIPLINES_HIRED: { title: string; body: string }[] = [
    { title: "Interior Designers", body: "Two or more years of residential or commercial experience, strong on planning and detail." },
    { title: "Interior Architects", body: "Working drawings, joinery details and services coordination." },
    { title: "3D Visualisers", body: "Photoreal stills and walkthroughs, built alongside the design team." },
    { title: "Site Supervisors", body: "Fit-out experience, a sharp eye for quality and clear written reports." },
    { title: "Project Managers", body: "Programme, cost and client communication across several live sites." },
    { title: "Interns", body: "Final-year design and architecture students, for a minimum of six months." },
];

export const APPLY_STEPS: Feature[] = [
    { title: "Write to us", body: "Send a short note through the contact form with the role you are interested in." },
    { title: "Share your portfolio", body: "A link or PDF. Five projects you are proud of tell us more than fifty you worked on." },
    { title: "Meet the team", body: "A conversation at the studio and a small paid exercise for design roles." },
];
