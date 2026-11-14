import { Building2, Cuboid, Lightbulb, Palette, Scan, Trees } from "lucide-react";

import {
    FloorPlan,
    IsometricRoom,
    LandscapeSection,
    LightingLayers,
    WireframeRender,
    WorkplacePlan,
} from "@/components/illustrations";
import type { Service } from "@/types/content";

/**
 * Services offered, in the order they appear on the home page.
 *
 * ⚠️ PLACEHOLDER — the long-form fields (heading onward) are realistic studio
 * copy written ahead of the client's own. Replace wording freely; the shape is
 * what the /services pages depend on.
 *
 * ⚠️ COPY — `title` and `description` are what the HOME PAGE renders and are
 * still in the sci-fi register. They are deliberately untouched here: the home
 * wording is a pending content decision. Everything below them is written in
 * the searched form (Residential Interior Design, Architectural Lighting
 * Design, …) and is what /services uses.
 */
export const SERVICES: Service[] = [
    {
        slug: "residential-interior-design",
        title: "Residential Interior Ecosystems",
        description:
            "Curating bespoke living environments that blend ergonomic comfort with high-end aesthetic precision. Experience personalized luxury.",
        icon: Palette,
        keywords: ["Luxury Interiors", "Home Styling", "Bespoke Design"],
        heading: "Residential Interior Design",
        metaDescription:
            "Residential interior design in Mumbai for apartments, villas and penthouses. One studio from layout and materials to site execution and handover.",
        summary:
            "Complete interiors for apartments, villas and penthouses — planned around how your household actually lives, and built to last through Mumbai's monsoons.",
        overview: [
            "A home is the most personal thing we design. We start with how you live — who cooks, who works from home, where the children study, how often family stays — and let that decide the plan before a single finish is chosen.",
            "From a 2 BHK in Bandra to a duplex in Worli or a villa in Alibaug, one team carries the project from first sketch to the day you move in: layout, joinery, lighting, materials, furniture and site supervision.",
        ],
        includes: [
            { title: "A plan built around your routines", body: "Storage, circulation and furniture are resolved on plan first, so the finished home works on an ordinary Tuesday and not only in photographs." },
            { title: "Custom joinery", body: "Wardrobes, kitchens, vanities and media walls detailed in-house and built by workshops we have used for years." },
            { title: "Material and finish curation", body: "Stone, veneer, fabric and metal chosen for how they age in a humid coastal climate, not just how they look on day one." },
            { title: "Vastu-aware planning", body: "Offered as an option. Where it matters to you, we plan for it from the first layout rather than correcting later." },
            { title: "Site execution", body: "A dedicated site supervisor, a weekly progress note and one point of contact until handover." },
        ],
        deliverables: [
            "Furniture layout and working drawings",
            "Material board and finish schedule",
            "3D views of every principal room",
            "Itemised bill of quantities",
            "Weekly site reports during execution",
            "Snag list and handover file",
        ],
        verticals: ["Residential"],
        faqs: [
            { question: "How long does a full home interior take?", answer: "A typical 3 BHK takes four to six weeks to design and twelve to sixteen weeks to execute. Larger villas and duplexes run longer; we give you a dated programme before work starts." },
            { question: "Can you work with my building's renovation rules?", answer: "Yes. We prepare the society submission, plan noisy work within permitted hours and coordinate lift and debris logistics as part of the project." },
            { question: "Do you take design-only projects?", answer: "We do. You receive the full drawing set and specification, and can add periodic site visits if you are using your own contractor." },
        ],
        illustration: IsometricRoom,
        illustrationTitle: "Isometric cutaway of a living room showing sofa, rug, sideboard and pendant light",
    },
    {
        slug: "space-planning",
        title: "Smart Space Optimization",
        description:
            "Utilizing data-driven layouts to maximize utility and flow. We engineer spaces that breathe and adapt to your modern lifestyle.",
        icon: Scan,
        keywords: ["Floor Planning", "Spatial Logic", "Efficiency"],
        heading: "Space Planning & Layout Design",
        metaDescription:
            "Space planning and layout design in Mumbai. Measured surveys, furniture layouts and option studies that make compact apartments and offices work harder.",
        summary:
            "Measured surveys, option studies and furniture layouts that make every square foot earn its place — the foundation every other decision rests on.",
        overview: [
            "In Mumbai, space is the most expensive material in the project. A good plan finds the storage wall nobody noticed, the dining table that seats eight on Diwali, and the desk that does not live in the bedroom.",
            "We survey the space ourselves, draw it accurately, and test two or three genuinely different layouts with you before committing. It is the cheapest stage of a project to change your mind in.",
        ],
        includes: [
            { title: "Measured site survey", body: "We measure and photograph the space ourselves, including beams, shafts and services that builder plans routinely get wrong." },
            { title: "Option studies", body: "Two or three distinct layouts, each with its trade-offs explained, so the choice is yours and informed." },
            { title: "Furniture and storage plan", body: "Every piece drawn to scale, with clearances checked and storage volume counted." },
            { title: "Services coordination", body: "Electrical points, plumbing and air-conditioning positioned to suit the layout rather than fight it." },
        ],
        deliverables: [
            "As-built survey drawing",
            "Two to three layout options",
            "Final furniture layout",
            "Electrical and plumbing point plans",
            "Area and storage statement",
        ],
        verticals: ["Residential", "Commercial", "Retail"],
        faqs: [
            { question: "Can I commission space planning on its own?", answer: "Yes. Many clients start here, then decide whether to continue to full interior design once they have a layout they are confident in." },
            { question: "Can walls be moved in an apartment?", answer: "Non-structural partitions usually can. We identify what is structural during the survey and never propose changes to columns, beams or shear walls." },
            { question: "How long does it take?", answer: "Typically two to three weeks from survey to an agreed layout for a home, and three to four for an office floor." },
        ],
        illustration: FloorPlan,
        illustrationTitle: "Annotated floor plan of a two-bedroom apartment with furniture and overall dimensions",
    },
    {
        slug: "commercial-interior-design",
        title: "Commercial & Tech Hubs",
        description:
            "Future-proof office architectures designed for collaboration and productivity. Redefining the corporate workspace experience.",
        icon: Building2,
        keywords: ["Office Design", "Corporate Branding", "Workspaces"],
        heading: "Office & Commercial Interior Design",
        metaDescription:
            "Office and commercial interior design in Mumbai. Workplace strategy, test fits and turnkey fit-outs for teams from twenty to five hundred people.",
        summary:
            "Workplaces designed around how your team really works — focus, meetings, collaboration and hospitality in the right proportions, delivered on a fixed programme.",
        overview: [
            "An office has to do more than seat people. It should make focused work easy, meetings short and visitors confident in who they are dealing with. We begin by studying how your team uses space today, then plan for where the headcount is going.",
            "For landlords and occupiers in BKC, Lower Parel, Andheri and Powai we provide test fits, full design and turnkey fit-out, with programme and cost reported weekly.",
        ],
        includes: [
            { title: "Workplace strategy", body: "Headcount, adjacency and utilisation studied first, so the mix of desks, rooms and shared space is based on evidence." },
            { title: "Test fits", body: "A quick layout on a shortlisted floor plate, so you know it works before you sign the lease." },
            { title: "Brand expression", body: "Reception, client areas and graphics that carry your identity without turning the office into a showroom." },
            { title: "Acoustics and lighting", body: "Meeting rooms you can hold a call in and desks without glare — specified, not left to chance." },
            { title: "Turnkey delivery", body: "One contract for design and build, with MEP, IT and furniture coordinated under a single programme." },
        ],
        deliverables: [
            "Workplace brief and area programme",
            "Test fit and zoning plan",
            "Full design and tender drawings",
            "MEP and IT coordination drawings",
            "Fixed-price bill of quantities",
            "Handover documents and as-built set",
        ],
        verticals: ["Commercial", "Retail"],
        faqs: [
            { question: "How long does an office fit-out take?", answer: "A 10,000 sq ft floor typically takes four to five weeks to design and ten to twelve weeks to build, subject to landlord approvals." },
            { question: "Can you work while the office stays open?", answer: "Yes. We phase the work floor by floor or zone by zone and schedule noisy activity outside working hours." },
            { question: "Do you handle landlord and fire approvals?", answer: "We prepare the drawings and submissions required by the building and coordinate with your liaison consultant for statutory approvals." },
        ],
        illustration: WorkplacePlan,
        illustrationTitle: "Workplace zoning plan showing focus desks, meeting rooms, a collaboration area and a café",
    },
    {
        slug: "landscape-design",
        title: "Sustainable Landscapes",
        description:
            "Eco-conscious outdoor designs that harmonize nature with architecture. Create a serene, green sanctuary right at your doorstep.",
        icon: Trees,
        keywords: ["Landscape Arch", "Eco-Design", "Outdoor Living"],
        heading: "Landscape & Terrace Garden Design",
        metaDescription:
            "Landscape and terrace garden design in Mumbai. Monsoon-proof planting, decks, pergolas, drainage and lighting for terraces, villas and podium gardens.",
        summary:
            "Terraces, balconies, villa gardens and podiums designed as rooms without ceilings — planted for the coast and drained for the monsoon.",
        overview: [
            "Outdoor space in the city is rare, and most of it is wasted. We treat a terrace or garden as another room: somewhere to sit, eat and entertain, with planting that survives salt air, hard sun and four months of rain.",
            "Waterproofing, drainage and structural loading are resolved before a single pot is placed, which is what separates a garden that lasts from one that leaks into the flat below.",
        ],
        includes: [
            { title: "Planting design", body: "Native and climate-adapted species chosen for sun, wind and maintenance, with a seasonal care schedule." },
            { title: "Decks, pergolas and seating", body: "Built elements detailed in materials that tolerate monsoon exposure without warping or rusting." },
            { title: "Drainage and waterproofing", body: "Falls, outlets and membrane protection coordinated with your structural engineer." },
            { title: "Garden lighting and irrigation", body: "Low-glare lighting and automated drip irrigation so the garden looks after itself." },
        ],
        deliverables: [
            "Landscape layout and sections",
            "Planting plan and species list",
            "Hardscape and drainage details",
            "Lighting and irrigation layout",
            "Maintenance schedule",
        ],
        verticals: ["Residential", "Hospitality"],
        faqs: [
            { question: "Can a terrace garden damage the slab below?", answer: "Not if it is built correctly. We check loading with a structural engineer and specify waterproofing, root barriers and drainage before any planting." },
            { question: "Which plants survive a Mumbai terrace?", answer: "Hardy, wind-tolerant species do best. We select for your exact sun and wind exposure rather than from a standard list." },
            { question: "Do you maintain the garden afterwards?", answer: "We hand over a maintenance schedule and can introduce a maintenance contractor; the first seasonal review is included." },
        ],
        illustration: LandscapeSection,
        illustrationTitle: "Garden section showing a deck with pergola, planting beds, a tree and a water rill",
    },
    {
        slug: "lighting-design",
        title: "Intelligent Lighting Systems",
        description:
            "Automated and mood-adaptive lighting solutions. Transform atmospheres instantly with our cutting-edge photonics engineering.",
        icon: Lightbulb,
        keywords: ["Smart Lighting", "Ambiance", "Energy Saving"],
        heading: "Architectural Lighting Design",
        metaDescription:
            "Architectural lighting design in Mumbai. Layered ambient, task and accent lighting with scene control for homes, offices, hotels and retail stores.",
        summary:
            "Layered lighting — ambient, task and accent — planned with the interior rather than added after it, with scenes you can change at a touch.",
        overview: [
            "Lighting decides how a room feels more than any finish in it. The same space can be flat and tiring or warm and composed, depending on where the light comes from and what it lands on.",
            "We design in three layers on separate circuits, specify colour temperature and beam angles fitting by fitting, and programme scenes for morning, evening and entertaining.",
        ],
        includes: [
            { title: "Three-layer lighting plan", body: "Ambient for the room, task for what you do in it, accent for what deserves attention." },
            { title: "Fixture specification", body: "Every fitting scheduled with output, colour temperature, beam angle and driver type." },
            { title: "Scene and control design", body: "Dimming groups and preset scenes, with or without home automation." },
            { title: "Daylight and glare control", body: "Blinds, sheers and fitting positions planned so screens and artwork stay readable all day." },
        ],
        deliverables: [
            "Reflected ceiling and lighting layout",
            "Circuit and control schedule",
            "Fixture schedule with specifications",
            "Scene programming guide",
            "Site aiming and commissioning visit",
        ],
        verticals: ["Residential", "Commercial", "Hospitality", "Retail"],
        faqs: [
            { question: "Do I need home automation for scene lighting?", answer: "No. Simple dimming modules give you preset scenes at a fraction of the cost; full automation is an option, not a requirement." },
            { question: "Can lighting be redesigned in a finished home?", answer: "Partly. Without opening the ceiling we can change fittings, add lamps and track, and rebalance circuits; a full scheme needs false-ceiling access." },
            { question: "Does good lighting use more power?", answer: "Usually less. Layered LED schemes on dimmers consume well under a single-layer scheme that is always fully on." },
        ],
        illustration: LightingLayers,
        illustrationTitle: "Room section showing ambient cove light, a task pendant over a table and an accent spotlight on artwork",
    },
    {
        slug: "3d-visualisation",
        title: "3D Visualization & VR",
        description:
            "Immersive virtual reality walkthroughs and hyper-realistic renders. Visualize your dream project before the first brick is laid.",
        icon: Cuboid,
        keywords: ["3D Rendering", "VR Walkthrough", "Digital Twin"],
        heading: "3D Visualisation & Walkthroughs",
        metaDescription:
            "3D visualisation and walkthroughs in Mumbai. Photoreal renders and guided virtual tours of your interior, so decisions are made before site work begins.",
        summary:
            "Photoreal views and guided walkthroughs of the finished space, so you approve what you are paying for before anything is built.",
        overview: [
            "Most people cannot read a drawing, and should not have to. A render shows you the room you will actually stand in: the real stone, the real light at five in the evening, the real height of the headboard.",
            "We model every project in three dimensions as we design it. Changes made at this stage cost an afternoon; the same change on site costs weeks.",
        ],
        includes: [
            { title: "Photoreal still views", body: "Key views of each principal room, lit and furnished as specified." },
            { title: "Guided walkthrough", body: "A recorded or live walk through the model with your designer, room by room." },
            { title: "Material and lighting studies", body: "Side-by-side options for a finish or a lighting scene, so you choose by seeing." },
            { title: "Revision rounds", body: "Two rounds of changes are built into the stage, with turnaround agreed in advance." },
        ],
        deliverables: [
            "Still renders of principal rooms",
            "Walkthrough recording",
            "Material option studies",
            "Marked-up revision set",
            "Final approved view pack",
        ],
        verticals: ["Residential", "Commercial", "Hospitality", "Retail"],
        faqs: [
            { question: "How close is the render to the finished room?", answer: "Very close on layout, proportion and lighting. Natural materials such as stone and veneer vary slab to slab, so we approve physical samples alongside the views." },
            { question: "Is the walkthrough included in the design fee?", answer: "Yes for full-service projects. It is also available as a standalone service for developers and architects." },
            { question: "Do I need a headset?", answer: "No. The walkthrough runs on a laptop or phone; a headset session at the studio is optional." },
        ],
        illustration: WireframeRender,
        illustrationTitle: "A living room drawn half as a perspective wireframe and half as a finished render",
    },
];

export function findService(slug: string): Service | undefined {
    return SERVICES.find((service) => service.slug === slug);
}
