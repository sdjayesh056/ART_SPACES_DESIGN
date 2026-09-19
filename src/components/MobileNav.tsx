"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";

import { menuData, NAV_ITEMS, PRIMARY_CTA } from "@/data/navigation";
import { SOCIAL_LINKS } from "@/data/studio";
import type { MenuKey } from "@/types/navigation";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/*
    Variants live at module scope so they are not rebuilt on every render.

    The circular reveal is unchanged in feel, but two things were fixed:

    1. Both radii are now percentages. The previous pair animated 30px -> 150%,
       which framer-motion cannot interpolate across units (the calc() centre
       made it worse), so the clip-path snapped instead of wiping.
    2. Tween with an explicit duration instead of a spring. The closed spring
       carried no restDelta and, on a value that could not interpolate, never
       resolved — so AnimatePresence never saw the exit finish. Because one
       stuck child pins the whole branch, the backdrop (fixed inset-0 z-[60])
       stayed mounted after closing and silently swallowed every click on the
       page. A tween always completes.
*/
const menuVariants = {
    closed: {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        transition: { type: "tween", duration: 0.4, ease: [0.4, 0, 1, 1] } as const,
    },
    open: {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        transition: { type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const,
    },
};

const containerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

const subMenuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" as const } },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as const } },
};

const MENU_SECTIONS = (Object.keys(menuData) as MenuKey[]).map((key) => ({
    key,
    label: menuData[key].title,
    items: menuData[key].items,
}));

/** Flat nav entries (About, Contact) so mobile exposes the same IA as desktop. */
const FLAT_ITEMS = NAV_ITEMS.filter((item) => !item.menuKey);

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const restoreFocusTo = useRef<HTMLElement | null>(null);

    /* Scroll lock. Saves and restores the previous value rather than clearing it. */
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    /* Remember what had focus before opening, and give it back on close. */
    useEffect(() => {
        if (isOpen) {
            restoreFocusTo.current = document.activeElement as HTMLElement | null;
            return;
        }

        restoreFocusTo.current?.focus();
        restoreFocusTo.current = null;
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Explicit keys so AnimatePresence tracks each child's exit. */}
                    <motion.div
                        key="mobile-nav-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-2xl"
                        onClick={onClose}
                    />
                    <MobileNavPanel key="mobile-nav-panel" onClose={onClose} />
                </>
            )}
        </AnimatePresence>
    );
}

/**
 * The drawer itself. Split out so its open/closed accordion state lives inside
 * the subtree that unmounts on close — no reset effect, and it cannot go stale
 * when the parent closes the drawer without routing through `onClose`.
 */
function MobileNavPanel({ onClose }: { onClose: () => void }) {
    const [expandedSection, setExpandedSection] = useState<MenuKey | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    /* Move focus into the drawer once it has mounted. */
    useEffect(() => {
        const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
        return () => cancelAnimationFrame(frame);
    }, []);

    /* Escape to close, and a focus trap so Tab cannot walk behind the overlay. */
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !panelRef.current) return;

            const focusable = Array.from(
                panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
            ).filter((node) => node.offsetParent !== null);

            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        },
        [onClose],
    );

    const toggleSection = (section: MenuKey) => {
        setExpandedSection((current) => (current === section ? null : section));
    };

    return (
        <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={handleKeyDown}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[70] bg-slate-900 text-white overflow-y-auto"
        >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center">
                    <Image
                        src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                        alt="ArtSpaces Design"
                        width={40}
                        height={40}
                        className="h-12 w-10 md:h-16 md:w-14 object-contain"
                    />
                    <Image
                        src="/Logos/ART_SPACES_DESIGN_DARK.png"
                        alt=""
                        width={150}
                        height={50}
                        className="h-16 w-48 md:h-20 md:w-64 object-contain"
                    />
                </div>
                <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label="Close menu"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-6">
                <motion.div variants={containerVariants} className="space-y-2">
                    {MENU_SECTIONS.map((section, index) => (
                        <motion.div
                            key={section.key}
                            variants={itemVariants}
                            className="border-b border-white/10"
                        >
                            <button
                                type="button"
                                onClick={() => toggleSection(section.key)}
                                aria-expanded={expandedSection === section.key}
                                aria-controls={`mobile-section-${section.key}`}
                                className="w-full flex items-center justify-between py-4 group"
                            >
                                <span className="flex items-center gap-4">
                                    <span className="text-sm font-mono text-emerald-400">
                                        0{index + 1}
                                    </span>
                                    <span className="text-2xl font-bold tracking-tight">
                                        {section.label}
                                    </span>
                                </span>
                                <motion.span
                                    animate={{ rotate: expandedSection === section.key ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-6 h-6 text-white/70" aria-hidden="true" />
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {expandedSection === section.key && (
                                    <motion.div
                                        id={`mobile-section-${section.key}`}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={subMenuVariants}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-4 pl-10 space-y-1">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                                >
                                                    <span className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                                                        <item.icon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                    <span className="flex-1 min-w-0">
                                                        <span className="flex items-center gap-2">
                                                            <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                                                {item.title}
                                                            </span>
                                                            {item.badge && (
                                                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500 text-white">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="block text-sm text-white/60 line-clamp-1">
                                                            {item.description}
                                                        </span>
                                                    </span>
                                                    <ArrowRight
                                                        className="w-4 h-4 text-white/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    {/* Flat entries — the same set the desktop nav shows. */}
                    {FLAT_ITEMS.map((item, index) => (
                        <motion.div key={item.href} variants={itemVariants}>
                            <Link
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center justify-between py-4 group border-b border-white/10"
                            >
                                <span className="flex items-center gap-4">
                                    <span className="text-sm font-mono text-amber-400">
                                        0{MENU_SECTIONS.length + index + 1}
                                    </span>
                                    <span className="text-2xl font-bold tracking-tight group-hover:text-amber-400 transition-colors">
                                        {item.label}
                                    </span>
                                </span>
                                <ArrowRight
                                    className="w-6 h-6 text-white/70 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"
                                    aria-hidden="true"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 p-4"
            >
                <div className="flex flex-col gap-4">
                    <Link
                        href={PRIMARY_CTA.href}
                        onClick={onClose}
                        className="flex items-center justify-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                    >
                        {PRIMARY_CTA.label}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>

                    <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                            Follow Us
                        </p>
                        <ul className="flex gap-2 list-none p-0">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                        className="inline-flex p-3.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <social.icon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
