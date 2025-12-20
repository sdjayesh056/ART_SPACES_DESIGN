"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronDown, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { menuData } from "./MegaMenu";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

type MenuSection = "spaces" | "consultation" | "portfolio" | null;

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const [expandedSection, setExpandedSection] = useState<MenuSection>(null);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setExpandedSection(null); // Reset when closing
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Keep original animation - DO NOT CHANGE
    const menuVariants = {
        closed: {
            clipPath: "circle(30px at calc(100% - 40px) 40px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            } as const
        },
        open: {
            clipPath: "circle(150% at calc(100% - 40px) 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            } as const
        }
    };

    const containerVariants = {
        open: {
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    const subMenuVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" as const }
        },
        open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" as const }
        }
    };

    const menuSections = [
        { key: "spaces" as MenuSection, label: "Spaces", data: menuData.explore },
        { key: "consultation" as MenuSection, label: "Consultation", data: menuData.artists },
        { key: "portfolio" as MenuSection, label: "Portfolio", data: menuData.resources },
    ];

    const toggleSection = (section: MenuSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-2xl"
                        onClick={onClose}
                    />
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-[70] bg-slate-900 text-white overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
                            <div className="flex items-center">
                                <Image src="/Logos/ART_SPACES_DESIGN_LOGO.png" alt="Logo" width={40} height={40} className="h-12 w-10 md:h-16 md:w-14 object-contain" />
                                <Image src="/Logos/ART_SPACES_DESIGN_LIGHT.png" alt="Logo" width={150} height={50} className="h-16 w-48 md:h-20 md:w-64 object-contain" />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="px-4 py-6">
                            <motion.div
                                variants={containerVariants}
                                className="space-y-2"
                            >
                                {menuSections.map((section, index) => (
                                    <motion.div
                                        key={section.key}
                                        variants={itemVariants}
                                        className="border-b border-white/10"
                                    >
                                        {/* Main Menu Item */}
                                        <button
                                            onClick={() => toggleSection(section.key)}
                                            className="w-full flex items-center justify-between py-4 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-mono text-emerald-400">0{index + 1}</span>
                                                <span className="text-2xl font-bold tracking-tight">{section.label}</span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: expandedSection === section.key ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-6 h-6 text-white/60" />
                                            </motion.div>
                                        </button>

                                        {/* Expandable Submenu */}
                                        <AnimatePresence>
                                            {expandedSection === section.key && (
                                                <motion.div
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                    variants={subMenuVariants}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pb-4 pl-10 space-y-1">
                                                        {section.data.items.map((item, itemIndex) => (
                                                            <Link
                                                                key={itemIndex}
                                                                href={item.href}
                                                                onClick={onClose}
                                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                                            >
                                                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                                                                    {item.icon}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                                                            {item.title}
                                                                        </span>
                                                                        {item.badge && (
                                                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500 text-white">
                                                                                {item.badge}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-white/50 line-clamp-1">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}

                                {/* Pricing - Direct Link */}
                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="/pricing"
                                        onClick={onClose}
                                        className="flex items-center justify-between py-4 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-mono text-amber-400">04</span>
                                            <span className="text-2xl font-bold tracking-tight group-hover:text-amber-400 transition-colors">Pricing</span>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </motion.div>
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
                                {/* CTA Button */}
                                <Link
                                    href="/signup"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                                >
                                    Start Your Journey
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Social Links */}
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Follow Us</p>
                                    <div className="flex gap-2">
                                        {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                                            <a key={i} href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                                <Icon className="w-4 h-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}