import { Building2, Globe2, Trophy, Users } from "lucide-react";

import type { CompanyStat } from "@/types/content";

/**
 * THE headline figures. One array, one place.
 *
 * ⚠️ UNVERIFIED — these numbers are invented and must be confirmed with the
 * studio before launch. They are load-bearing trust signals on a high-ticket
 * purchase; publishing figures nobody has checked is a liability, not a
 * placeholder.
 *
 * Two problems were resolved here and must not be reintroduced:
 *
 * 1. PortfolioSection declared a SECOND stats array rendered on the same page,
 *    contradicting this one at three of four slots (250+ vs 500+ projects,
 *    100% vs 98% satisfaction, 15+ vs 45+ awards) and measuring something else
 *    entirely at the fourth ("SYSTEM_UPTIME 24/7" — a SaaS metric on a design
 *    studio). That dashboard has been deleted; this is the only source.
 *
 * 2. "Countries Served: 12" still sits against "a leading interior design firm
 *    in India" and a city list of Mumbai/Delhi/Bangalore. Reconcile the
 *    geography claim with the positioning, or drop this slot.
 *
 * HeroSection also renders "Trusted by 500+ clients worldwide", which reuses
 * the projects figure for a different metric. Decide which is true.
 */
export const COMPANY_STATS: CompanyStat[] = [
    {
        id: "projects",
        icon: Building2,
        value: 500,
        suffix: "+",
        label: "Projects Completed",
        description:
            "Luxury residential, commercial, and hospitality interiors delivered across India.",
    },
    {
        id: "satisfaction",
        icon: Users,
        value: 98,
        suffix: "%",
        label: "Client Satisfaction",
        description:
            "Consistently rated 5-stars for premium interior design consultation services.",
    },
    {
        id: "awards",
        icon: Trophy,
        value: 45,
        suffix: "+",
        label: "Design Awards",
        description:
            "Recognized by leading architecture and interior design associations worldwide.",
    },
    {
        id: "countries",
        icon: Globe2,
        value: 12,
        suffix: "",
        label: "Countries Served",
        description:
            "Expanding our signature aesthetic to international residential and commercial projects.",
    },
];
