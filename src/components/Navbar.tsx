"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { MegaMenu, menuData } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

type MenuKey = string;

const NAV_ITEMS: { key: Exclude<MenuKey, null>; label: string }[] = [
    { key: "spaces", label: "Spaces" },
    { key: "consultation", label: "Consultation" },
    { key: "portfolio", label: "Portfolio" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
];

export function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuKey>("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const closeTimer = useRef<NodeJS.Timeout | null>(null);
    const reduceMotion = useReducedMotion();

    /* ------------------------------
    Scroll awareness
    -------------------------------- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ------------------------------
    Menu handlers (debounced close)
    -------------------------------- */
    const openMenu = useCallback((key: MenuKey) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveMenu(key);
    }, []);

    const closeMenu = useCallback(() => {
        closeTimer.current = setTimeout(() => {
            setActiveMenu("");
        }, 180);
    }, []);

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <motion.nav
                initial={reduceMotion ? false : { y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div
                    className={`
                pointer-events-auto relative flex items-center justify-between
                w-full max-w-6xl
                rounded-full p-1.5
                border border-white/10 dark:border-white/5
                bg-slate-200
                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]
                transition-all duration-500
                ${scrolled ? "max-w-4xl" : ""}
            `}
                >
                    {/* subtle gradient edge */}
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />

                    {/* ========== LEFT : Brand ========== */}
                    <Link
                        href="/"
                        className="relative z-10 flex items-center pl-4 pr-6 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                        <Image
                            src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                            alt="Art Spaces Design"
                            width={40}
                            height={40}
                            priority
                        />
                        <Image
                            src="/Logos/ART_SPACES_DESIGN_LIGHT.png"
                            alt="Art Spaces Design"
                            width={250}
                            height={60}
                            className="opacity-90"
                        />
                    </Link>

                    {/* ========== CENTER : Desktop Nav ========== */}
                    <div
                        onMouseLeave={closeMenu}
                        className="relative hidden lg:flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/5 p-1 ring-1 ring-white/10"
                    >
                        {NAV_ITEMS.map(({ key, label }) => {
                            const isMegaMenu = ["spaces", "consultation", "portfolio"].includes(key);
                            const active = activeMenu === key && isMegaMenu;

                            if (!isMegaMenu) {
                                return (
                                    <Link
                                        key={key}
                                        href={`/${key}`}
                                        onMouseEnter={() => setActiveMenu("")}
                                        className="relative z-10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-[var(--brand-yellow)] transition-colors"
                                    >
                                        {label}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={key}
                                    onMouseEnter={() => openMenu(key)}
                                    aria-expanded={active}
                                    className={`
                        relative z-10 px-5 py-2 rounded-full
                        text-xs font-semibold uppercase tracking-wider
                        transition-colors
                        ${active
                                            ? " bg-[var(--brand-green)] text-[var(--brand-yellow)]"
                                            : "text-[var(--brand-green)] hover:text-foreground"}
                    `}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-white dark:bg-[var(--brand-green)] shadow-sm"
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 22,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ========== RIGHT : Actions ========== */}
                    <div className="relative z-10 flex items-center gap-2 pr-3">

                        {/* CTA */}
                        <Link
                            href="/signup"
                            className="
                    hidden md:flex items-center gap-2
                    rounded-full px-5 py-2
                    bg-[var(--brand-green)]
                    text-[var(--brand-yellow)] text-xs font-bold uppercase tracking-wider
                    shadow-lg hover:shadow-xl
                    hover:scale-[1.03] active:scale-[0.97]
                    transition
                "
                        >
                            Connect
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/20">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                        </Link>

                        {/* mobile */}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Open Menu"
                            className="lg:hidden p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition"
                        >
                            {mobileOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {/* ========== MEGA MENU ========== */}
                    <div className="absolute top-full inset-x-0 pt-4 flex justify-center pointer-events-none">
                        <AnimatePresence>
                            {activeMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onMouseEnter={() => {
                                        if (closeTimer.current) clearTimeout(closeTimer.current);
                                    }}
                                    onMouseLeave={closeMenu}
                                    className="pointer-events-auto w-[92vw] max-w-5xl"
                                >
                                    <MegaMenu
                                        isOpen
                                        title={
                                            menuData[
                                                activeMenu === "spaces"
                                                    ? "explore"
                                                    : activeMenu === "consultation"
                                                        ? "artists"
                                                        : "resources"
                                            ].title
                                        }
                                        items={
                                            menuData[
                                                activeMenu === "spaces"
                                                    ? "explore"
                                                    : activeMenu === "consultation"
                                                        ? "artists"
                                                        : "resources"
                                            ].items
                                        }
                                        featured={
                                            menuData[
                                                activeMenu === "spaces"
                                                    ? "explore"
                                                    : activeMenu === "consultation"
                                                        ? "artists"
                                                        : "resources"
                                            ].featured
                                        }
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.nav>

            {/* ================= MOBILE NAV ================= */}
            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}