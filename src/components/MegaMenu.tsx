"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Home,
    Building2,
    Coffee,
    ShoppingBag,
    ClipboardList,
    Video,
    Calendar,
    Users,
    FolderOpen,
    Award,
    Palette,
    MessageSquare
} from "lucide-react";

interface MegaMenuProps {
    isOpen: boolean;
    title: string;
    items: MenuItem[];
    featured?: FeaturedItem;
}

interface MenuItem {
    title: string;
    description: string;
    href: string;
    image: string; // URL for the hover reveal image
    badge?: string;
    id: string; // Unique ID for animation keys
    icon?: React.ReactNode; // Added back for MobileNav compatibility
}

interface FeaturedItem {
    title: string;
    description: string;
    image: string;
    href: string;
    cta: string;
}

export function MegaMenu({ isOpen, title, items, featured }: MegaMenuProps) {
    const [hoveredId, setHoveredId] = useState<string>(items[0]?.id || "");

    if (!isOpen) return null;

    // Find the currently hovered item data to display
    const activeItem = items.find((item) => item.id === hoveredId) || items[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden shadow-2xl rounded-b-3xl border-t border-white/10"
            style={{
                backgroundColor: "var(--background)", // Strict theme usage
                color: "var(--foreground)",
            }}
        >
            <div className="max-w-7xl mx-auto flex min-h-[450px]">
                {/* LEFT COLUMN: Navigation & List */}
                <div className="w-1/3 py-10 pl-8 pr-12 flex flex-col justify-between border-r border-foreground/5 relative z-10">

                    {/* Header */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-foreground/40">
                            {title}
                        </p>

                        {/* Interactive List */}
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item.id} onMouseEnter={() => setHoveredId(item.id)}>
                                    <a
                                        href={item.href}
                                        className="group flex items-center justify-between py-3 cursor-pointer"
                                    >
                                        <div className="flex items-baseline gap-3">
                                            <span
                                                className={`text-2xl font-medium transition-all duration-300 ${hoveredId === item.id
                                                    ? "text-foreground translate-x-2"
                                                    : "text-foreground/40 group-hover:text-foreground/70"
                                                    }`}
                                            >
                                                {item.title}
                                            </span>
                                            {item.badge && (
                                                <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest border border-foreground/20 rounded-full text-foreground/60">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>

                                        <ArrowRight
                                            className={`w-4 h-4 transition-all duration-300 ${hoveredId === item.id
                                                ? "opacity-100 translate-x-0"
                                                : "opacity-0 -translate-x-4"
                                                }`}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer / Context */}
                    <div className="mt-8">
                        <p className="text-sm text-foreground/50 max-w-[280px] leading-relaxed">
                            {activeItem?.description}
                        </p>
                        <a
                            href={activeItem?.href}
                            className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-foreground hover:text-[var(--brand-green)] transition-colors"
                        >
                            View Details
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN: Visual Stage (Hover Reveal) */}
                <div className="w-2/3 relative overflow-hidden bg-foreground/5">
                    <AnimatePresence mode="popLayout">
                        {activeItem && (
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${activeItem.image})` }}
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                {/* Floating Caption */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-8 left-8 right-8 text-white"
                                >
                                    <h3 className="text-3xl font-light mb-2">{activeItem.title}</h3>
                                    <div className="h-px w-24 bg-white/50 mb-4" />
                                    <p className="text-white/80 text-sm max-w-md">
                                        Experience our award-winning approach to modern {activeItem.title.toLowerCase()} design.
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

// ----------------------------------------------------------------------
// MENU DATA EXPORT
// ----------------------------------------------------------------------

export const menuData: Record<string, { title: string, items: MenuItem[], featured: FeaturedItem }> = {
    explore: {
        title: "Spaces",
        items: [
            {
                id: "res",
                title: "Residential",
                description: "Luxurious homes, villas, and personal living spaces crafted for comfort and style.",
                href: "/spaces/residential",
                image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
                icon: <Home className="w-5 h-5" />,
            },
            {
                id: "com",
                title: "Commercial",
                description: "Functional and inspiring offices designed to boost productivity and innovation.",
                href: "/spaces/commercial",
                badge: "Popular",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
                icon: <Building2 className="w-5 h-5" />,
            },
            {
                id: "hos",
                title: "Hospitality",
                description: "Elegant hotels, resorts, and vacation stays that offer unforgettable experiences.",
                href: "/spaces/hospitality",
                image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2671&auto=format&fit=crop",
                icon: <Coffee className="w-5 h-5" />,
            },
            {
                id: "ret",
                title: "Retail",
                description: "Engaging retail stores and boutiques designed to captivate customers.",
                href: "/spaces/retail",
                badge: "New",
                image: "https://images.unsplash.com/photo-1542614471-001ccf2b449c?q=80&w=2670&auto=format&fit=crop",
                icon: <ShoppingBag className="w-5 h-5" />,
            },
        ],
        featured: {
            title: "Featured Project",
            description: "",
            image: "",
            href: "",
            cta: ""
        }
    },
    artists: {
        title: "Consultation",
        items: [
            {
                id: "proc",
                title: "Design Process",
                description: "Learn how we transform your vision into reality through our proven methodology.",
                href: "/consultation/process",
                image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=2670&auto=format&fit=crop",
                icon: <ClipboardList className="w-5 h-5" />,
            },
            {
                id: "tour",
                title: "Virtual Tours",
                description: "Experience your future space with immersive 3D walkthroughs before we build.",
                href: "/consultation/virtual-tours",
                badge: "Free",
                image: "https://images.unsplash.com/photo-1628151016006-27a988d447a1?q=80&w=2670&auto=format&fit=crop",
                icon: <Video className="w-5 h-5" />,
            },
            {
                id: "book",
                title: "Booking",
                description: "Schedule a one-on-one session with our lead designers to discuss your project.",
                href: "/consultation/booking",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
                icon: <Calendar className="w-5 h-5" />,
            },
            {
                id: "team",
                title: "Our Team",
                description: "Meet the award-winning experts behind ArtSpaces designs.",
                href: "/consultation/team",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
                icon: <Users className="w-5 h-5" />,
            },
        ],
        featured: { title: "", description: "", image: "", href: "", cta: "" }
    },
    resources: {
        title: "Portfolio",
        items: [
            {
                id: "recent",
                title: "Recent Projects",
                description: "A collection of our most recently completed works across the globe.",
                href: "/portfolio/recent",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
                icon: <FolderOpen className="w-5 h-5" />,
            },
            {
                id: "awards",
                title: "Award Winning",
                description: "Designs that have set us apart in the international design industry.",
                href: "/portfolio/awards",
                badge: "Top",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
                icon: <Award className="w-5 h-5" />,
            },
            {
                id: "styles",
                title: "Style Gallery",
                description: "Filter projects by style: Modern, Rustic, Industrial, and more.",
                href: "/portfolio/styles",
                image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
                icon: <Palette className="w-5 h-5" />,
            },
            {
                id: "test",
                title: "Testimonials",
                description: "Hear what our clients say about their transformed spaces.",
                href: "/portfolio/testimonials",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
                icon: <MessageSquare className="w-5 h-5" />,
            },
        ],
        featured: { title: "", description: "", image: "", href: "", cta: "" }
    },
};