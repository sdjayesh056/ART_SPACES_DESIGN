"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { menuData, NAV_ITEMS, PRIMARY_CTA } from "@/data/navigation";
import type { MenuKey } from "@/types/navigation";

const PANEL_ID = "primary-mega-menu";

export function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
    const reduceMotion = useReducedMotion();

    /* ------------------------------------------------------------------
    Scroll awareness. Closing the panel is tied to the width TRANSITION, not
    to every scroll event: it is the pill shrinking from max-w-7xl to
    max-w-4xl that can move it out from under a stationary cursor without
    ever firing mouseleave, leaving the panel pinned open. Closing on every
    scroll would also break the keyboard path, because focusing a trigger
    scrolls it into view and would immediately close what focus just opened.
    ------------------------------------------------------------------ */
    useEffect(() => {
        let wasScrolled = false; // matches the initial `scrolled` state

        const onScroll = () => {
            const isScrolled = window.scrollY > 24;
            if (isScrolled === wasScrolled) return;
            wasScrolled = isScrolled;
            setScrolled(isScrolled);
            setActiveMenu(null);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Clear any pending close on unmount so we never setState on a dead component. */
    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    const cancelClose = useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    const openMenu = useCallback(
        (key: MenuKey) => {
            cancelClose();
            setActiveMenu(key);
        },
        [cancelClose],
    );

    const closeMenu = useCallback(() => {
        cancelClose();
        closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
    }, [cancelClose]);

    const closeMenuNow = useCallback(() => {
        cancelClose();
        setActiveMenu(null);
    }, [cancelClose]);

    const toggleMenu = useCallback(
        (key: MenuKey) => {
            cancelClose();
            setActiveMenu((current) => (current === key ? null : key));
        },
        [cancelClose],
    );

    /* Escape closes and returns focus to the trigger that opened the panel. */
    useEffect(() => {
        if (!activeMenu) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            const trigger = triggerRefs.current[activeMenu];
            closeMenuNow();
            // Restore focus after React has committed the close. Focusing
            // synchronously races the panel's unmount, which drops focus to
            // the body if the active element was still inside the panel.
            requestAnimationFrame(() => trigger?.focus());
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [activeMenu, closeMenuNow]);

    /* Pointer down anywhere outside the navbar closes the panel. */
    useEffect(() => {
        if (!activeMenu) return;

        const onPointerDown = (event: PointerEvent) => {
            if (containerRef.current?.contains(event.target as Node)) return;
            closeMenuNow();
        };

        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [activeMenu, closeMenuNow]);

    /* Tabbing out of the navbar entirely closes the panel. */
    const handleFocusOut = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            const next = event.relatedTarget as Node | null;
            if (next && containerRef.current?.contains(next)) return;
            closeMenuNow();
        },
        [closeMenuNow],
    );

    const activeSection = activeMenu ? menuData[activeMenu] : null;

    return (
        <>
            <motion.nav
                initial={reduceMotion ? false : { y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Primary"
                className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div
                    ref={containerRef}
                    onBlur={handleFocusOut}
                    className={`
                pointer-events-auto relative flex items-center justify-between
                w-full max-w-7xl
                rounded-full p-1.5
                border border-white/10
                bg-slate-200
                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]
                transition-all duration-500
                ${scrolled ? "max-w-4xl" : ""}
            `}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* ========== LEFT : Brand ========== */}
                    <Link
                        href="/"
                        className="relative z-10 flex min-w-0 items-center pl-2 pr-2 md:pl-4 md:pr-6 rounded-full hover:bg-black/5 transition"
                    >
                        <Image
                            src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                            alt="ArtSpaces Design"
                            width={40}
                            height={40}
                            priority
                            className="w-[32px] md:w-[40px]"
                        />
                        {/*
                            The wordmark has a hard 240px min-width floor. Rendered
                            below md it pushed the hamburger outside the pill and
                            off-screen at 320-375px, making all navigation
                            unreachable on the most common phone widths.
                        */}
                        <Image
                            src="/Logos/ART_SPACES_DESIGN_LIGHT.png"
                            alt=""
                            width={250}
                            height={60}
                            className="hidden md:block opacity-90 md:w-[250px]"
                        />
                    </Link>

                    {/* ========== CENTER : Desktop Nav ========== */}
                    <div
                        onMouseLeave={closeMenu}
                        className="relative hidden lg:flex items-center gap-1 rounded-full bg-black/5 p-1 ring-1 ring-white/10"
                    >
                        {NAV_ITEMS.map((item) => {
                            if (!item.menuKey) {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onMouseEnter={closeMenuNow}
                                        onFocus={closeMenuNow}
                                        className="relative z-10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-[var(--brand-yellow)] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            const menuKey = item.menuKey;
                            const isActive = activeMenu === menuKey;

                            return (
                                <button
                                    key={item.href}
                                    type="button"
                                    ref={(node) => {
                                        triggerRefs.current[menuKey] = node;
                                    }}
                                    onMouseEnter={() => openMenu(menuKey)}
                                    onFocus={() => openMenu(menuKey)}
                                    onClick={() => toggleMenu(menuKey)}
                                    aria-expanded={isActive}
                                    aria-haspopup="true"
                                    aria-controls={PANEL_ID}
                                    className={`
                        relative z-10 px-5 py-2 rounded-full cursor-pointer
                        text-xs font-semibold uppercase tracking-wider
                        transition-colors
                        ${isActive ? "text-[var(--brand-yellow)]" : "text-[var(--brand-green)]"}
                    `}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-[var(--brand-green)] shadow-sm"
                                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ========== RIGHT : Actions ========== */}
                    <div className="relative z-10 flex shrink-0 items-center gap-2 pr-1 md:pr-3">
                        <Link
                            href={PRIMARY_CTA.href}
                            className="
                    hidden md:flex items-center gap-2
                    rounded-full px-5 py-2.5
                    bg-[var(--brand-green)]
                    text-[var(--brand-yellow)] text-xs font-bold uppercase tracking-wider
                    shadow-lg hover:shadow-xl
                    hover:scale-[1.03] active:scale-[0.97]
                    transition
                "
                        >
                            {PRIMARY_CTA.shortLabel}
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMobileOpen((open) => !open)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation"
                            className="lg:hidden shrink-0 p-3 rounded-full bg-black/5 hover:bg-black/10 transition"
                        >
                            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                        </button>
                    </div>

                    {/* ========== MEGA MENU ========== */}
                    <div className="absolute top-full inset-x-0 pt-4 flex justify-center pointer-events-none">
                        <AnimatePresence>
                            {activeSection && (
                                <motion.div
                                    key={activeMenu}
                                    id={PANEL_ID}
                                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onMouseEnter={cancelClose}
                                    onMouseLeave={closeMenu}
                                    className="pointer-events-auto w-[92vw] max-w-5xl"
                                >
                                    <MegaMenu title={activeSection.title} items={activeSection.items} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.nav>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}
