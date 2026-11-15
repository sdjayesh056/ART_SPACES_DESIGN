import {
    Award,
    Building2,
    Calendar,
    ClipboardList,
    Coffee,
    FolderOpen,
    Home,
    MessageSquare,
    Palette,
    ShoppingBag,
    Users,
    Video,
} from "lucide-react";

import type { FooterRoom, MenuKey, MenuSection, NavItem } from "@/types/navigation";

/**
 * THE information architecture. Navbar, MegaMenu, MobileNav, Footer and
 * (from Phase 5) sitemap.ts all render from this module, so the desktop nav,
 * the mobile drawer and the sitemap can never drift apart again.
 *
 * Plain module: no "use client", no JSX. Icons are component references, which
 * is already the house pattern in services/stats/socials. That keeps this
 * importable from Server Components.
 *
 * ROUTE STATUS: every route below now resolves. `LIVE_ROUTES` records which
 * ones exist so sitemap.ts can never advertise a page that does not — keep it
 * in step when adding or removing a route.
 */

/** Routes that actually resolve. /privacy and /terms are noindex until their text is reviewed. */
export const LIVE_ROUTES = new Set<string>([
    "/",
    "/about",
    "/careers",
    "/contact",
    "/faq",
    "/journal",
    "/services",
    "/consultation",
    "/consultation/booking",
    "/consultation/process",
    "/consultation/team",
    "/consultation/virtual-tours",
    "/portfolio",
    "/portfolio/awards",
    "/portfolio/styles",
    "/portfolio/testimonials",
    "/privacy",
    "/spaces",
    "/spaces/commercial",
    "/spaces/hospitality",
    "/spaces/residential",
    "/spaces/retail",
    "/terms",
]);

export function isLiveRoute(href: string): boolean {
    return LIVE_ROUTES.has(href);
}

export const menuData: Record<MenuKey, MenuSection> = {
    spaces: {
        title: "Spaces",
        items: [
            {
                id: "residential",
                title: "Residential",
                description:
                    "Luxurious homes, villas, and personal living spaces crafted for comfort and style.",
                href: "/spaces/residential",
                image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
                icon: Home,
            },
            {
                id: "commercial",
                title: "Commercial",
                description:
                    "Functional and inspiring offices designed to boost productivity and innovation.",
                href: "/spaces/commercial",
                badge: "Popular",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
                icon: Building2,
            },
            {
                id: "hospitality",
                title: "Hospitality",
                description:
                    "Elegant hotels, resorts, and vacation stays that offer unforgettable experiences.",
                href: "/spaces/hospitality",
                image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2671&auto=format&fit=crop",
                icon: Coffee,
            },
            {
                id: "retail",
                title: "Retail",
                description:
                    "Engaging retail stores and boutiques designed to captivate customers.",
                href: "/spaces/retail",
                badge: "New",
                image: "https://images.unsplash.com/photo-1542614471-001ccf2b449c?q=80&w=2670&auto=format&fit=crop",
                icon: ShoppingBag,
            },
        ],
    },
    consultation: {
        title: "Consultation",
        items: [
            {
                id: "process",
                title: "Design Process",
                description:
                    "Learn how we transform your vision into reality through our proven methodology.",
                href: "/consultation/process",
                image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=2670&auto=format&fit=crop",
                icon: ClipboardList,
            },
            {
                id: "virtual-tours",
                title: "Virtual Tours",
                description:
                    "Experience your future space with immersive 3D walkthroughs before we build.",
                href: "/consultation/virtual-tours",
                badge: "Free",
                // A rendered dining room. The previous photo id (1628151016006-…)
                // had been removed from Unsplash and returned 404.
                image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2670&auto=format&fit=crop",
                icon: Video,
            },
            {
                id: "booking",
                title: "Booking",
                description:
                    "Schedule a one-on-one session with our lead designers to discuss your project.",
                href: "/consultation/booking",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
                icon: Calendar,
            },
            {
                id: "team",
                title: "Our Team",
                description: "Meet the award-winning experts behind ArtSpaces designs.",
                href: "/consultation/team",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
                icon: Users,
            },
        ],
    },
    portfolio: {
        title: "Portfolio",
        items: [
            {
                id: "recent",
                title: "Recent Projects",
                description: "A collection of our most recently completed works across the globe.",
                href: "/portfolio",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
                icon: FolderOpen,
            },
            {
                id: "awards",
                title: "Award Winning",
                description: "Designs that have set us apart in the international design industry.",
                href: "/portfolio/awards",
                badge: "Top",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
                icon: Award,
            },
            {
                id: "styles",
                title: "Style Gallery",
                description: "Filter projects by style: Modern, Rustic, Industrial, and more.",
                href: "/portfolio/styles",
                image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
                icon: Palette,
            },
            {
                id: "testimonials",
                title: "Testimonials",
                description: "Hear what our clients say about their transformed spaces.",
                href: "/portfolio/testimonials",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
                icon: MessageSquare,
            },
        ],
    },
};

/**
 * Top-level navigation. Derived from `menuData` for the three mega-menu
 * entries so a new section cannot be added in one place and forgotten in the
 * other, then extended with the flat links.
 */
export const NAV_ITEMS: NavItem[] = [
    ...(Object.keys(menuData) as MenuKey[]).map((menuKey) => ({
        label: menuData[menuKey].title,
        href: `/${menuKey}`,
        menuKey,
    })),
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

/** The header's primary call to action. */
export const PRIMARY_CTA = {
    label: "Book a Consultation",
    shortLabel: "Connect",
    href: "/consultation/booking",
} as const;

/**
 * The studio's own pages. They are the footer's fourth room, and the footer
 * is the only place every page links to /services, /journal, /careers and /faq.
 */
export const COMPANY_LINKS = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
];

/** What each menu section is drawn as on the footer's plan. */
const DRAWN_AS: Record<MenuKey, string> = {
    spaces: "Living room",
    consultation: "Meeting room",
    portfolio: "Gallery",
};

/**
 * The footer's plan and schedule. The three menu sections are derived from
 * `menuData`, so the footer cannot drift from the header; the studio's own
 * pages make the fourth room.
 */
export const FOOTER_ROOMS: FooterRoom[] = [
    ...(Object.keys(menuData) as MenuKey[]).map((menuKey) => ({
        id: menuKey,
        heading: menuData[menuKey].title,
        drawnAs: DRAWN_AS[menuKey],
        href: `/${menuKey}`,
        hasOverview: true,
        links: menuData[menuKey].items.map(({ title, href }) => ({ label: title, href })),
    })),
    {
        id: "studio",
        heading: "Studio",
        drawnAs: "Workroom",
        href: "/about",
        hasOverview: false,
        links: COMPANY_LINKS,
    },
];

export const LEGAL_LINKS = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
];

/** Every internal route the navigation advertises, deduped. Phase 3's work list. */
export function allRoutes(): string[] {
    const hrefs = [
        ...NAV_ITEMS.map((item) => item.href),
        ...Object.values(menuData).flatMap((section) => section.items.map((item) => item.href)),
        ...COMPANY_LINKS.map((link) => link.href),
        ...LEGAL_LINKS.map((link) => link.href),
        PRIMARY_CTA.href,
    ].filter((href) => href.startsWith("/") && !href.includes("."));

    return [...new Set(hrefs)].sort();
}
