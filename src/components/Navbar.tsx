"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { MegaMenu, preloadMenuImages } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { menuData, NAV_ITEMS, PRIMARY_CTA } from "@/data/navigation";
import type { MenuKey } from "@/types/navigation";

const PANEL_ID = "primary-mega-menu";

/*
    Hover intent, in milliseconds. A panel opens only once the pointer has
    rested on its trigger, so sweeping the mouse across the bar opens nothing.
    Switching from one open panel to another waits a little longer: the
    straight line from a trigger to the far side of its panel crosses the
    neighbouring triggers, and without the wait the menu changes under the
    pointer on the way down. Leaving is the most forgiving of the three.
*/
const OPEN_DELAY = 90;
const SWITCH_DELAY = 140;
const CLOSE_DELAY = 220;

/* What Tab stops at inside a panel. The arcade's links repeat the schedule and are out of the tab order. */
const PANEL_STOPS = 'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])';

/*
    The panel opens from closed with a fade, a short drop and a slight scale.
    Moving between two triggers is different: the incoming panel fades in, in
    place, over the outgoing one, which stays solid underneath until it is
    covered and is then removed. Two panels fading against each other would
    let the page show through at the midpoint.

    `exit` is a function because AnimatePresence hands an exiting panel its
    `custom` value at the moment it leaves — true when another panel replaces
    it, false when the menu is simply closing.
*/
const PANEL_VARIANTS: Variants = {
    closed: { opacity: 0, y: -12, scale: 0.96 },
    swapIn: { opacity: 0, y: 0, scale: 1 },
    open: { opacity: 1, y: 0, scale: 1 },
    exit: (replaced: boolean) =>
        replaced
            ? { opacity: 0, transition: { delay: 0.35, duration: 0.01 } }
            : { opacity: 0, y: -8, scale: 0.98 },
};

export function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    /*
        Whether the current panel replaced another one, derived during render
        from the previous value so the incoming panel mounts with the right
        entrance on its very first frame.
    */
    const [lastMenu, setLastMenu] = useState<MenuKey | null>(null);
    const [swapped, setSwapped] = useState(false);
    if (lastMenu !== activeMenu) {
        setLastMenu(activeMenu);
        setSwapped(lastMenu !== null && activeMenu !== null);
    }

    /*
        Fetch each menu's opening image when a mouse first reaches the bar, so
        the room that is lit first is in the cache before its panel opens.
        Once per page, mouse only — touch and keyboard users never pay for
        images they may not see.

        Only the first of each menu: all twelve at once asked the image
        optimiser for twelve large originals in the same instant, and some of
        those requests timed out. The other three rooms of a panel are dim
        when it opens and fade in as they arrive.
    */
    const warmed = useRef(false);
    const warmMenus = useCallback((event: React.PointerEvent) => {
        if (warmed.current || event.pointerType !== "mouse") return;
        warmed.current = true;
        preloadMenuImages(Object.values(menuData).map((section) => section.items[0]));
    }, []);

    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    /* What last pressed a trigger: "mouse", "touch", "pen" or "keyboard". Decides what a click means. */
    const pointerKind = useRef("mouse");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navGroupRef = useRef<HTMLDivElement | null>(null);
    const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
    /* One slot per menu: while panels swap, two are mounted, and a single ref would be nulled by the one leaving. */
    const panelRefs = useRef<Partial<Record<MenuKey, HTMLDivElement | null>>>({});
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

    /* Clear any pending timers on unmount so we never setState on a dead component. */
    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            if (intentTimer.current) clearTimeout(intentTimer.current);
        };
    }, []);

    const cancelClose = useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    const cancelIntent = useCallback(() => {
        if (intentTimer.current) {
            clearTimeout(intentTimer.current);
            intentTimer.current = null;
        }
    }, []);

    const closeMenu = useCallback(() => {
        cancelClose();
        cancelIntent();
        closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
    }, [cancelClose, cancelIntent]);

    const closeMenuNow = useCallback(() => {
        cancelClose();
        cancelIntent();
        setActiveMenu(null);
    }, [cancelClose, cancelIntent]);

    /* ---------------- Pointer: hover opens, with intent ---------------- */

    /*
        Every hover handler here is a POINTER event, never a mouse event. The
        browser sends all of a move's pointer events before any of its mouse
        events, so a mouseleave on the panel used to arrive AFTER the
        pointerenter on the trigger the pointer had just moved to — and closed
        the menu the visitor was pointing at. Within one family the order is
        always leave, then enter.

        A finger "leaves" the moment it lifts, so only a mouse leaving counts.
    */
    const leaveByMouse = (event: React.PointerEvent) => {
        if (event.pointerType === "mouse") closeMenu();
    };

    const hoverTrigger = (key: MenuKey, event: React.PointerEvent) => {
        // A tap also reports a pointer entering. Touch and pen open with the click instead.
        if (event.pointerType !== "mouse") return;
        cancelClose();
        cancelIntent();
        if (activeMenu === key) return;
        intentTimer.current = setTimeout(() => setActiveMenu(key), activeMenu === null ? OPEN_DELAY : SWITCH_DELAY);
    };

    /* Resting on About or Contact closes the panel; brushing past them on the way down does not. */
    const hoverFlatLink = (event: React.PointerEvent) => {
        if (event.pointerType !== "mouse" || activeMenu === null) return;
        cancelIntent();
        intentTimer.current = setTimeout(() => setActiveMenu(null), SWITCH_DELAY);
    };

    const clickTrigger = (key: MenuKey) => {
        cancelClose();
        cancelIntent();
        /*
            A mouse has already opened the panel by hovering, so a click must
            not snap it shut again — it only makes sure the panel is open.
            Touch, pen and keyboard have no hover: for them the click toggles.
        */
        if (pointerKind.current === "mouse") setActiveMenu(key);
        else setActiveMenu((current) => (current === key ? null : key));
    };

    /* ---------------- Keyboard ---------------- */

    const focusInPanel = useCallback((key: MenuKey, edge: "first" | "last") => {
        const stops = panelRefs.current[key]?.querySelectorAll<HTMLElement>(PANEL_STOPS);
        if (!stops || stops.length === 0) return false;
        stops[edge === "first" ? 0 : stops.length - 1].focus();
        return true;
    }, []);

    /*
        Enter and Space toggle the panel (the button's own click). Focus alone
        does not open it: tabbing along the bar should not throw three large
        panels at the visitor. Once a panel is open, Tab goes into it and Down
        Arrow opens it and goes in at once — the panel sits at the end of the
        bar in the DOM, so this is what makes it follow its trigger.
    */
    const keyTrigger = (key: MenuKey, event: React.KeyboardEvent<HTMLButtonElement>) => {
        pointerKind.current = "keyboard";

        if (event.key === "ArrowDown") {
            event.preventDefault();
            cancelClose();
            setActiveMenu(key);
            // Two frames: one for React to mount the panel, one for it to be focusable.
            requestAnimationFrame(() => requestAnimationFrame(() => focusInPanel(key, "first")));
        } else if (event.key === "Tab" && !event.shiftKey && activeMenu === key && focusInPanel(key, "first")) {
            event.preventDefault();
        }
    };

    /* Leaving the panel by keyboard: back to its trigger, or on along the bar from it. */
    const keyPanel = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Tab" || !activeMenu) return;

        const stops = Array.from(panelRefs.current[activeMenu]?.querySelectorAll<HTMLElement>(PANEL_STOPS) ?? []);
        const trigger = triggerRefs.current[activeMenu];
        if (stops.length === 0 || !trigger) return;

        if (event.shiftKey && document.activeElement === stops[0]) {
            event.preventDefault();
            trigger.focus();
        } else if (!event.shiftKey && document.activeElement === stops[stops.length - 1]) {
            const bar = Array.from(navGroupRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
            const next = bar[bar.indexOf(trigger) + 1];
            if (!next) return;
            event.preventDefault();
            closeMenuNow();
            next.focus();
        }
    };

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

    /* Focus settling anywhere on the bar other than the open panel or its own trigger closes the panel. */
    const handleFocusIn = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!activeMenu) return;
        const target = event.target as Node;
        if (panelRefs.current[activeMenu]?.contains(target) || triggerRefs.current[activeMenu] === target) return;
        closeMenuNow();
    };

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
            {/*
                A veil over the page while a panel is open, so the panel is the
                one lit thing on screen. Purely visual: it takes no pointer
                events, and it is a plain colour rather than a backdrop blur,
                which would re-blur the whole viewport on every frame the page
                beneath it moves.
            */}
            <AnimatePresence>
                {activeMenu && (
                    <m.div
                        key="nav-veil"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none fixed inset-0 z-40 bg-brand-950/40"
                    />
                )}
            </AnimatePresence>

            <m.nav
                initial={reduceMotion ? false : { y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Primary"
                className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div
                    ref={containerRef}
                    onFocus={handleFocusIn}
                    onBlur={handleFocusOut}
                    onPointerEnter={warmMenus}
                    className={`
                pointer-events-auto relative flex items-center justify-between
                w-full max-w-7xl
                rounded-full p-1.5
                border border-white/10
                bg-surface-sunken
                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]
                transition-all duration-500
                ${scrolled ? "max-w-4xl" : ""}
            `}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* ========== LEFT : Brand ========== */}
                    <Link
                        href="/"
                        className="relative z-10 flex min-h-11 min-w-0 items-center pl-2 pr-2 md:pl-4 md:pr-6 rounded-full hover:bg-black/5 transition"
                    >
                        <Image
                            src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                            alt="ArtSpaces Design"
                            width={40}
                            height={40}
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
                            className="hidden md:block opacity-90 md:w-[250px] lg:h-auto lg:w-[200px] xl:w-[250px]"
                        />
                    </Link>

                    {/* ========== CENTER : Desktop Nav ========== */}
                    <div
                        ref={navGroupRef}
                        onPointerLeave={leaveByMouse}
                        className="relative hidden lg:flex items-center gap-1 rounded-full bg-black/5 p-1 ring-1 ring-white/10"
                    >
                        {NAV_ITEMS.map((item) => {
                            if (!item.menuKey) {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onPointerEnter={hoverFlatLink}
                                        onPointerLeave={cancelIntent}
                                        aria-current={pathname === item.href ? "page" : undefined}
                                        className="relative z-10 px-4 xl:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-900 hover:bg-brand-900 hover:text-accent-on-brand transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            const menuKey = item.menuKey;
                            const isActive = activeMenu === menuKey;
                            const inSection = pathname === item.href || pathname.startsWith(`${item.href}/`);

                            return (
                                <button
                                    key={item.href}
                                    type="button"
                                    ref={(node) => {
                                        triggerRefs.current[menuKey] = node;
                                    }}
                                    onPointerEnter={(event) => hoverTrigger(menuKey, event)}
                                    onPointerLeave={cancelIntent}
                                    onPointerDown={(event) => {
                                        pointerKind.current = event.pointerType;
                                    }}
                                    onKeyDown={(event) => keyTrigger(menuKey, event)}
                                    onClick={() => clickTrigger(menuKey)}
                                    aria-expanded={isActive}
                                    aria-controls={PANEL_ID}
                                    /*
                                        Plain CSS rather than a shared-layout
                                        `layoutId` pill. That was the only
                                        layout animation left in the app, and
                                        dropping it lets LazyMotion load
                                        `domAnimation` instead of `domMax` —
                                        roughly 12 KB less on every route,
                                        for a slide most visitors never see.
                                    */
                                    className={`
                        relative z-10 inline-flex items-center gap-1.5 pl-4 pr-3 xl:pl-5 xl:pr-4 py-2 rounded-full cursor-pointer
                        text-xs font-semibold uppercase tracking-wider
                        transition-colors duration-300
                        ${
                            isActive
                                ? "bg-brand-900 text-accent-on-brand shadow-sm"
                                : "text-brand-900 hover:bg-black/5"
                        }
                    `}
                                >
                                    {item.label}
                                    {/* The caret is what tells a panel trigger from a plain link. */}
                                    <ChevronDown
                                        aria-hidden="true"
                                        className={`h-3 w-3 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                                    />
                                    {/* A mark under the section the visitor is already in. */}
                                    {inSection && !isActive && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-600"
                                        />
                                    )}
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
                    bg-brand-900
                    text-accent-on-brand text-xs font-bold uppercase tracking-wider
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
                    {/*
                        A grid with every panel in the same cell, not a flex
                        row. While one panel exits and the next enters, both
                        exist; as flex siblings they sat side by side and
                        squeezed each other to about 640px, so the menu
                        visibly narrowed and snapped back on every switch.
                    */}
                    <div className="absolute top-full inset-x-0 grid justify-items-center pointer-events-none">
                        <AnimatePresence custom={activeMenu !== null}>
                            {activeSection && activeMenu && (
                                <m.div
                                    key={activeMenu}
                                    id={PANEL_ID}
                                    ref={(node) => {
                                        panelRefs.current[activeMenu] = node;
                                    }}
                                    variants={PANEL_VARIANTS}
                                    initial={swapped ? "swapIn" : "closed"}
                                    animate="open"
                                    exit="exit"
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onPointerEnter={cancelClose}
                                    onPointerLeave={leaveByMouse}
                                    onKeyDown={keyPanel}
                                    /*
                                        The gap under the bar is padding INSIDE
                                        the panel's own box, so the pointer
                                        never crosses dead space on its way
                                        down from a trigger.
                                    */
                                    className="pointer-events-auto col-start-1 row-start-1 w-[min(92vw,72rem)] pt-4"
                                >
                                    <MegaMenu menuKey={activeMenu} section={activeSection} onNavigate={closeMenuNow} />
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </m.nav>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}
