"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { MenuItem } from "@/types/navigation";

interface MegaMenuProps {
    title: string;
    items: MenuItem[];
}

export function MegaMenu({ title, items }: MegaMenuProps) {
    /*
        No reset effect needed: Navbar keys this panel's wrapper on the active
        menu, so switching sections remounts the subtree and this initialiser
        runs fresh. Previously the id lingered and no row read as active.
    */
    const [hoveredId, setHoveredId] = useState<string>(items[0]?.id ?? "");

    const activeItem = items.find((item) => item.id === hoveredId) ?? items[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden shadow-2xl rounded-b-3xl border-t border-white/10 bg-slate-200"
        >
            <div className="max-w-7xl mx-auto flex min-h-[450px]">
                {/* LEFT COLUMN: Navigation & List */}
                <div className="w-1/3 py-10 pl-8 pr-12 flex flex-col justify-between border-r border-slate-300/60 relative z-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-slate-500">
                            {title}
                        </p>

                        <ul className="space-y-2">
                            {items.map((item) => {
                                const isActive = hoveredId === item.id;

                                return (
                                    <li key={item.id} onMouseEnter={() => setHoveredId(item.id)}>
                                        <Link
                                            href={item.href}
                                            // onFocus so tabbing through the panel updates the
                                            // visual stage exactly as hovering does.
                                            onFocus={() => setHoveredId(item.id)}
                                            className="group flex items-center justify-between py-3"
                                        >
                                            <div className="flex items-baseline gap-3">
                                                <span
                                                    className={`text-xl font-medium transition-all duration-300 ${
                                                        isActive
                                                            ? "text-accent-on-brand bg-brand-900 translate-x-2 py-2 px-6 rounded-2xl"
                                                            : "text-brand-900"
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>
                                                {item.badge && (
                                                    <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest border border-slate-400/50 rounded-full text-slate-600">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>

                                            <ArrowRight
                                                aria-hidden="true"
                                                className={`w-4 h-4 transition-all duration-300 ${
                                                    isActive
                                                        ? "opacity-100 translate-x-0"
                                                        : "opacity-0 -translate-x-4"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Footer / Context */}
                    <div className="mt-8">
                        <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed">
                            {activeItem?.description}
                        </p>
                        {activeItem && (
                            <Link
                                href={activeItem.href}
                                className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-slate-800 hover:text-brand-900 transition-colors"
                            >
                                View Details
                            </Link>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Visual Stage */}
                <div className="w-2/3 relative overflow-hidden bg-slate-300/40" aria-hidden="true">
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
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${activeItem.image})` }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-8 left-8 right-8 text-white"
                                >
                                    <h3 className="text-3xl font-light mb-2">{activeItem.title}</h3>
                                    <div className="h-px w-24 bg-white/50 mb-4" />
                                    <p className="text-white/90 text-sm max-w-md">
                                        {activeItem.description}
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
