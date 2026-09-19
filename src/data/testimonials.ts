import type { Testimonial } from "@/types/content";

/**
 * Client testimonials.
 *
 * ⚠️ INVENTED — every name, role and quote below is fabricated. Publishing
 * fabricated reviews is a legal and reputational risk, not just a content gap.
 * Phase 4 replaces all six with consented quotes from real clients.
 *
 * Do NOT attach AggregateRating or Review structured data to these, or to the
 * business entity at all: self-serving reviews have been ineligible for rich
 * results since 2019 and risk a manual action.
 *
 * Per-item `color`/`gradient` have been dropped in favour of the shared accent
 * rotation in src/lib/accents.ts.
 */
export const TESTIMONIALS: Testimonial[] = [
    {
        id: "sarah-johnson",
        quote:
            "ArtSpaces transformed our villa into a sustainable sanctuary. Their integration of biophilic design and smart home technology is simply world-class. A truly visionary team.",
        author: "Sarah Johnson",
        role: "Eco-Conscious Homeowner",
        location: "Mumbai, India",
        rating: 5,
    },
    {
        id: "rajesh-sharma",
        quote:
            "Our corporate headquarters needed a complete overhaul to foster collaboration. The result is a stunning, high-performance workspace that our team absolutely loves.",
        author: "Rajesh Sharma",
        role: "CEO, TechStart Innovations",
        location: "Bangalore, India",
        rating: 5,
    },
    {
        id: "priya-menon",
        quote:
            "The attention to detail in our boutique hotel renovation was impeccable. They seamlessly blended heritage architecture with modern luxury. Our guests are amazed.",
        author: "Priya Menon",
        role: "Owner, The Heritage Stay",
        location: "Kochi, India",
        rating: 5,
    },
    {
        id: "amit-patel",
        quote:
            "We wanted a minimalist, zen-inspired living space, and ArtSpaces delivered perfection. The play of light and material is unlike anything I have seen before.",
        author: "Amit Patel",
        role: "Real Estate Developer",
        location: "Ahmedabad, India",
        rating: 5,
    },
    {
        id: "neha-gupta",
        quote:
            "Their futuristic approach to retail design has significantly boosted our footfall. The immersive customer experience they created is a game-changer for our brand.",
        author: "Neha Gupta",
        role: "Director, Luxe Retail",
        location: "New Delhi, India",
        rating: 5,
    },
    {
        id: "vikram-malhotra",
        quote:
            "From the initial concept to the final reveal, the process was seamless. ArtSpaces does not just design spaces; they curate lifestyles. Highly recommended!",
        author: "Vikram Malhotra",
        role: "Luxury Apartment Owner",
        location: "Pune, India",
        rating: 5,
    },
];
