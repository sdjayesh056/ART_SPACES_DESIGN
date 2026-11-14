import { Elevation, HotelSuitePlan, RetailPlan, WorkplacePlan } from "@/components/illustrations";
import type { Fact, Faq, Feature, Illustration, Vertical } from "@/types/content";

import { menuData } from "./navigation";

/**
 * Long-form content for /spaces/[vertical].
 *
 * ⚠️ PLACEHOLDER — realistic studio copy written ahead of the client's own.
 * Timelines are typical ranges, not commitments; confirm before launch.
 *
 * Title, short description, icon, image and href stay in navigation.ts (the
 * one source for the IA) and are joined on `id` by `getVertical`.
 */
export type VerticalContent = {
    id: string;
    name: Vertical;
    /** 140–160 characters. */
    metaDescription: string;
    intro: string[];
    spaceTypes: string[];
    approach: Feature[];
    timeline: Fact[];
    faqs: Faq[];
    /** Slugs from SERVICES, most relevant first. */
    services: string[];
    illustration: Illustration;
    illustrationTitle: string;
};

export const VERTICAL_CONTENT: VerticalContent[] = [
    {
        id: "residential",
        name: "Residential",
        metaDescription:
            "Residential interior designers in Mumbai for apartments, duplexes, villas and penthouses. Layout, joinery, lighting and turnkey execution by one studio.",
        intro: [
            "Homes are where we do our most careful work. Every household is different, so every plan starts from a long conversation about mornings, guests, storage and the things you already own and love.",
            "We design and deliver complete homes across Mumbai and its weekend towns — from compact city apartments where every inch is planned, to villas where the garden is part of the living room.",
        ],
        spaceTypes: ["2, 3 and 4 BHK apartments", "Duplexes and penthouses", "Villas and bungalows", "Weekend homes", "Kitchens and wardrobes", "Single-room makeovers"],
        approach: [
            { title: "Designed for the way you live", body: "The plan follows your routines: where bags land, where the children study, where the pooja space faces. Finishes come after the plan works." },
            { title: "Materials that survive the coast", body: "Marine-grade ply, sealed stone and treated veneers that hold up to humidity and four months of rain." },
            { title: "Storage you never see", body: "Full-height, built-in and counted in litres, so the home stays calm after you have moved in." },
            { title: "One team to handover", body: "Design, procurement and site supervision under one roof, with a weekly note so you always know where things stand." },
        ],
        timeline: [
            { label: "Design", value: "4–6 weeks" },
            { label: "Execution, 3 BHK", value: "12–16 weeks" },
            { label: "Site reports", value: "Weekly" },
            { label: "Budget", value: "On request" },
        ],
        faqs: [
            { question: "Do you design homes outside Mumbai?", answer: "Yes. We regularly work in Pune, Alibaug, Lonavala and Goa, and take projects in other cities where the scope justifies site travel." },
            { question: "Can we live in the home during the work?", answer: "For a single room or kitchen, usually yes. For a full renovation we recommend moving out; it is faster, cleaner and safer." },
            { question: "Can you reuse furniture we already own?", answer: "Of course. We survey what you want to keep and design around it, re-upholstering or refinishing where it helps." },
        ],
        services: ["residential-interior-design", "space-planning", "lighting-design", "landscape-design"],
        illustration: Elevation,
        illustrationTitle: "Interior elevation of a living-room media wall with fluted oak panel, console and dimension lines",
    },
    {
        id: "commercial",
        name: "Commercial",
        metaDescription:
            "Commercial interior designers in Mumbai for offices, studios and clinics. Workplace strategy, test fits and turnkey fit-outs delivered on a fixed programme.",
        intro: [
            "A workplace is a business tool. It should help people concentrate, make meetings easier to run and tell a visitor in ten seconds what kind of company this is.",
            "We work with founders, facilities heads and developers on offices from a first twenty-person floor to multi-level headquarters, with programme and cost reported every week.",
        ],
        spaceTypes: ["Corporate offices", "Startup and studio floors", "Co-working spaces", "Clinics and consulting rooms", "Experience centres", "Boardrooms and reception areas"],
        approach: [
            { title: "Strategy before style", body: "We measure how space is used today and plan the ratio of desks, rooms and shared areas from evidence." },
            { title: "Built for acoustics", body: "Meeting rooms, phone booths and ceilings specified so a call in one room is not heard in the next." },
            { title: "Ready for growth", body: "Modular furniture and planned expansion zones, so adding twenty people does not mean a second fit-out." },
            { title: "A programme you can hold us to", body: "Design, landlord approvals, build and IT handover on one dated schedule." },
        ],
        timeline: [
            { label: "Test fit", value: "5 working days" },
            { label: "Design", value: "4–5 weeks" },
            { label: "Fit-out, 10,000 sq ft", value: "10–12 weeks" },
            { label: "Budget", value: "On request" },
        ],
        faqs: [
            { question: "Can you help before we sign a lease?", answer: "Yes. A test fit shows whether a floor plate suits your headcount and what it will cost to fit out, before you commit." },
            { question: "Do you provide turnkey delivery?", answer: "We do, under one design-and-build contract, or design-only with your appointed contractor if you prefer." },
            { question: "How do you control cost?", answer: "A priced bill of quantities is agreed before work starts, and any variation is approved in writing before it is built." },
        ],
        services: ["commercial-interior-design", "space-planning", "lighting-design", "3d-visualisation"],
        illustration: WorkplacePlan,
        illustrationTitle: "Workplace zoning plan showing focus desks, meeting rooms, a collaboration area and a café",
    },
    {
        id: "hospitality",
        name: "Hospitality",
        metaDescription:
            "Hospitality interior designers in Mumbai for boutique hotels, restaurants, cafés and spas. Guest-first planning, durable finishes and phased delivery.",
        intro: [
            "Hospitality design is judged by strangers in the first minute. The arrival, the light, the acoustics and the chair they sit in decide whether they stay, return and tell someone.",
            "We design hotels, restaurants, cafés and wellness spaces with the operator at the table from day one, because a beautiful room that is hard to service does not stay beautiful.",
        ],
        spaceTypes: ["Boutique hotels and suites", "Restaurants and bars", "Cafés and bakeries", "Spas and wellness centres", "Clubhouses and lounges", "Serviced residences"],
        approach: [
            { title: "The guest journey, mapped", body: "Arrival, wait, seat, service and exit planned as one sequence, front of house and back." },
            { title: "Finishes that take a beating", body: "Contract-grade fabrics, sealed stone and edges detailed for trolleys, luggage and nightly cleaning." },
            { title: "Atmosphere by lighting", body: "Day, evening and late scenes programmed so the room changes with the service." },
            { title: "Phased around trading", body: "Refurbishments scheduled floor by floor or outside service hours to protect revenue." },
        ],
        timeline: [
            { label: "Concept", value: "3–4 weeks" },
            { label: "Design development", value: "6–8 weeks" },
            { label: "Restaurant fit-out", value: "10–14 weeks" },
            { label: "Budget", value: "On request" },
        ],
        faqs: [
            { question: "Do you work with kitchen and MEP consultants?", answer: "Yes. We coordinate the kitchen planner, MEP engineer and lighting from concept so services never compromise the room." },
            { question: "Can you design a mock-up room first?", answer: "For hotels we recommend it. One built room resolves details and cost before the design is repeated across the property." },
            { question: "Do you handle FF&E procurement?", answer: "We specify and schedule all furniture, fixtures and equipment, and can manage procurement or hand over to your purchasing team." },
        ],
        services: ["lighting-design", "3d-visualisation", "landscape-design", "space-planning"],
        illustration: HotelSuitePlan,
        illustrationTitle: "Hotel suite plan showing entry, bathroom, king bed, lounge seating and a balcony",
    },
    {
        id: "retail",
        name: "Retail",
        metaDescription:
            "Retail interior designers in Mumbai for boutiques, showrooms and flagship stores. Customer flow, display and lighting designed to lift dwell time and sales.",
        intro: [
            "A store is the one place a brand is experienced in three dimensions. Layout decides what customers see first, how long they stay and whether they reach the back wall.",
            "We design boutiques, showrooms and flagship stores on high streets and in malls, working to mall fit-out guidelines and the opening date you have promised your landlord.",
        ],
        spaceTypes: ["Fashion and lifestyle boutiques", "Jewellery showrooms", "Flagship stores", "Mall kiosks and shop-in-shops", "Furniture and design showrooms", "Experience centres"],
        approach: [
            { title: "Circulation first", body: "A deliberate customer loop that leads past every category and ends at the cash desk, not the door." },
            { title: "Display as architecture", body: "Fixtures designed for your product's size, weight and price point, and for quick seasonal change." },
            { title: "Lighting that sells", body: "Accent on product, comfort in fitting rooms, and a window that works at night." },
            { title: "A roll-out kit", body: "For brands with more than one store, a documented kit of parts that keeps every site consistent." },
        ],
        timeline: [
            { label: "Concept", value: "2–3 weeks" },
            { label: "Design and approvals", value: "3–4 weeks" },
            { label: "Store fit-out", value: "6–8 weeks" },
            { label: "Budget", value: "On request" },
        ],
        faqs: [
            { question: "Do you handle mall design approvals?", answer: "Yes. We prepare the submission to the mall's retail design team and revise it through to approval." },
            { question: "Can you meet a fixed opening date?", answer: "We plan backwards from the opening date and tell you honestly at the start whether it is achievable." },
            { question: "Can one design be rolled out to several stores?", answer: "That is often the brief. We design the first store as a prototype and document it as a kit for the next ones." },
        ],
        services: ["commercial-interior-design", "space-planning", "lighting-design", "3d-visualisation"],
        illustration: RetailPlan,
        illustrationTitle: "Retail store plan with window displays, gondolas, fitting rooms, cash desk and a dashed customer loop",
    },
];

/** The vertical's long-form content joined with its navigation entry. */
export function getVertical(id: string) {
    const content = VERTICAL_CONTENT.find((entry) => entry.id === id);
    const nav = menuData.spaces.items.find((item) => item.id === id);
    return content && nav ? { ...nav, ...content } : undefined;
}

export const VERTICALS_FULL = VERTICAL_CONTENT.flatMap((entry) => getVertical(entry.id) ?? []);
