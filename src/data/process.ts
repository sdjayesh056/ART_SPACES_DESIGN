import type { Fact, Feature, Phase } from "@/types/content";

import { STUDIO } from "./studio";

/**
 * The studio's project phases, the enquiry sequence and the virtual-tour copy.
 *
 * ⚠️ PLACEHOLDER — a realistic, industry-standard process written ahead of
 * the client's own. Durations are typical ranges for a mid-size home; confirm
 * every figure (including "one working day" and "45 minutes") before launch.
 */
export const PHASES: Phase[] = [
    {
        id: "brief",
        title: "Consultation and brief",
        duration: "Week 1",
        summary: "We meet, walk the space if we can, and listen. You leave with an honest view of scope, a realistic timeline and a budget range — before any fee is discussed.",
        deliverables: ["Written design brief", "Budget range and programme outline", "Fee proposal"],
    },
    {
        id: "survey",
        title: "Site survey and space planning",
        duration: "Weeks 2–3",
        summary: "We measure the space ourselves and draw it accurately, then test two or three genuinely different layouts with you until one is clearly right.",
        deliverables: ["Measured survey drawing", "Two to three layout options", "Agreed furniture layout"],
    },
    {
        id: "concept",
        title: "Concept and material direction",
        duration: "Weeks 3–5",
        summary: "The look and feel is set: a physical material board, reference imagery and the first three-dimensional views of the principal rooms.",
        deliverables: ["Concept presentation", "Physical material board", "First 3D views"],
    },
    {
        id: "development",
        title: "Design development and walkthrough",
        duration: "Weeks 5–8",
        summary: "Every room is resolved in detail and modelled. You walk through the finished design on screen and request changes while they are still free.",
        deliverables: ["Photoreal renders", "Guided 3D walkthrough", "Lighting and electrical layouts", "Two revision rounds"],
    },
    {
        id: "documentation",
        title: "Working drawings and costing",
        duration: "Weeks 8–10",
        summary: "The design becomes a buildable set of drawings and an itemised bill of quantities, so the price you approve is the price of what is drawn.",
        deliverables: ["Full working drawing set", "Joinery and detail drawings", "Itemised bill of quantities", "Execution programme"],
    },
    {
        id: "execution",
        title: "Execution and site supervision",
        duration: "12–16 weeks on site",
        summary: "Our site supervisor runs the work day to day. You receive a short progress note every week with photographs, what was done and what comes next.",
        deliverables: ["Weekly site reports", "Sample approvals before installation", "Quality checks at each stage", "Variation log"],
    },
    {
        id: "handover",
        title: "Styling, snagging and handover",
        duration: "Final 2 weeks",
        summary: "Furniture, art and soft furnishings are placed, every defect is listed and closed, and we hand over the keys with a file of drawings, warranties and care guides.",
        deliverables: ["Styled and cleaned home", "Closed snag list", "As-built drawings and warranties", "Twelve-month aftercare visit"],
    },
];

/** What stays constant across every phase. */
export const PROCESS_PRINCIPLES: Feature[] = [
    { title: "One point of contact", body: "The designer you meet at the first consultation stays with the project to handover." },
    { title: "A dated programme", body: "Every phase has a date. The programme is reissued each week so you always know where things stand." },
    { title: "Nothing built unapproved", body: "You sign off a drawing and a physical sample before anything is made or installed." },
    { title: "Fixed fees, written variations", body: "Our fee is fixed at the start, and any change on site is priced and agreed in writing first." },
];

/** The enquiry-to-proposal sequence shown beside the booking and contact forms. */
export const NEXT_STEPS: Feature[] = [
    { title: "We read your brief", body: "A designer, not a call centre, reads what you send and replies within one working day." },
    { title: "A 45-minute conversation", body: "By phone, video or at the studio. Free, and with no obligation to proceed." },
    { title: "An honest view of scope", body: "You hear what the space needs, how long it should take and a realistic budget range." },
    { title: "A written proposal", body: "Only if it is a good fit both ways. Scope, fee and programme on two pages." },
];

export const RESPONSE_FACTS: Fact[] = [
    { label: "First reply", value: "Within 1 working day" },
    { label: "Studio hours", value: STUDIO.hours.display },
    { label: "Consultation", value: "Free, 45 minutes" },
];

/** The three promises set beside every route to the consultation: the CTA band and the footer's front door. */
export const REASSURANCES: string[] = ["Free 45-minute consultation", "Reply within one working day", "No obligation to proceed"];

export const CONSULTATION_COVERS: string[] = [
    "How you use the space today, and what is not working",
    "A walk through the plans, or the site if it is in Mumbai",
    "Style direction, from photographs you bring or ones we show",
    "What is realistic for your budget, said plainly",
    "A likely timeline, including society or landlord approvals",
    "The next step, if there is one",
];

/* ── Virtual tours ─────────────────────────────────────────────────────── */

export const TOUR_RECEIVES: Feature[] = [
    { title: "A guided walkthrough of every room", body: "Your designer walks you through the model live, room by room, at eye level — on a laptop, a phone or a headset at the studio." },
    { title: "Photoreal still views", body: "Key views of each principal room, lit and furnished exactly as specified." },
    { title: "Day and evening lighting", body: "The same room at noon and at eight in the evening, so the lighting scheme is approved by seeing it." },
    { title: "Side-by-side options", body: "Two stones, two veneers or two layouts compared in the same view." },
    { title: "A recording to share", body: "A link you can send to family or colleagues who could not join." },
];

export const TOUR_STEPS: Feature[] = [
    { title: "We model as we design", body: "The three-dimensional model is built alongside the drawings, not after them, so it is always current." },
    { title: "You walk through it", body: "A sixty-minute session with your designer. You stop wherever you like and ask for whatever you want changed." },
    { title: "We revise and re-issue", body: "Two rounds of changes are included. Each comes back as updated views within the agreed turnaround." },
    { title: "You approve what gets built", body: "The approved views become the reference on site. The contractor builds to them." },
];

export const TOUR_FACTS: Fact[] = [
    { label: "Session length", value: "About 60 minutes" },
    { label: "Revision rounds", value: "Two, included" },
    { label: "Runs on", value: "Laptop, phone or headset" },
    { label: "Cost on full-service projects", value: "Included" },
];
