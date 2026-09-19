import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/**
 * Studio identity: name, address, phone, email, social profiles.
 *
 * ⚠️ PLACEHOLDER CONTENT — every value flagged `isPlaceholder` below is
 * invented and must be replaced with the studio's real details before launch.
 * `+91 98765 43210` in particular is the canonical Indian dummy number, and
 * all social hrefs are "#". These block the local-SEO work in Phase 5:
 * ProfessionalService JSON-LD needs a real street address, postal code, geo
 * coordinates and opening hours, none of which exist yet.
 *
 * Grep for `isPlaceholder: true` to find everything still outstanding.
 */

export type SocialLink = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export const STUDIO = {
    name: "ArtSpaces Design",
    legalName: "ArtSpaces Design",
    tagline: "Luxury Interior & Architectural Design Studio",

    address: {
        locality: "Mumbai",
        region: "Maharashtra",
        country: "India",
        /** Street, postal code and geo are still missing — required for local SEO. */
        isPlaceholder: true,
    },

    phone: {
        display: "+91 98765 43210",
        href: "tel:+919876543210",
        isPlaceholder: true,
    },

    email: {
        display: "hello@artspaces.design",
        href: "mailto:hello@artspaces.design",
        isPlaceholder: true,
    },

    /** Cities the studio actively serves — used in body copy and, later, local SEO. */
    servedCities: ["Mumbai", "Delhi", "Bangalore", "Pune", "Ahmedabad"],
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
    { label: "Instagram", href: "#", icon: Instagram },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "Facebook", href: "#", icon: Facebook },
    { label: "LinkedIn", href: "#", icon: Linkedin },
];

/** True while any social profile still points at "#". */
export const SOCIAL_LINKS_ARE_PLACEHOLDERS = SOCIAL_LINKS.every((link) => link.href === "#");
