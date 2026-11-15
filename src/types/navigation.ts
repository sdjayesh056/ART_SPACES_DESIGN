import type { LucideIcon } from "lucide-react";

/**
 * The three top-level sections that open a mega menu. Keys are the route
 * segment, so `/spaces`, `/consultation` and `/portfolio` need no translation
 * layer between the nav and the data.
 */
export const MENU_KEYS = ["spaces", "consultation", "portfolio"] as const;

export type MenuKey = (typeof MENU_KEYS)[number];

export type MenuItem = {
    id: string;
    title: string;
    description: string;
    href: string;
    /** Background shown in the mega menu's visual stage. */
    image: string;
    badge?: string;
    /** Component reference, not an element — keeps this module JSX-free. */
    icon: LucideIcon;
};

export type MenuSection = {
    /** Label shown above the item list, and the nav trigger's own label. */
    title: string;
    items: MenuItem[];
};

/** A top-level nav entry. Entries with a `menuKey` open a mega menu. */
export type NavItem = {
    label: string;
    href: string;
    menuKey?: MenuKey;
};

export type FooterLink = {
    label: string;
    href: string;
};

/** Every room the footer's plan draws; `MenuKey` plus the studio's own. */
export type FooterRoomId = MenuKey | "studio";

/**
 * A section of the site as the footer shows it: one room on the plan, and one
 * list in the schedule beside it.
 */
export type FooterRoom = {
    id: FooterRoomId;
    heading: string;
    /** What the room is on the plan, e.g. "Living room". Decoration, not navigation. */
    drawnAs: string;
    /** Where the drawn room leads. */
    href: string;
    /** True when `href` is an overview of this list, so the heading links there too. */
    hasOverview: boolean;
    links: FooterLink[];
};
