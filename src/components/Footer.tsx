"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/navigation";
import { SOCIAL_LINKS, STUDIO } from "@/data/studio";

export function Footer() {
    /*
        No year in the copyright line. This page is statically prerendered, so
        a build-time getFullYear() freezes until the next deploy, and computing
        it on the client either mismatches hydration or needs a setState effect.
        A yearless notice is legally sufficient and can never go stale.
    */
    return (
        <footer className="relative bg-slate-50">
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* CTA BANNER */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,var(--brand-green)_0%,transparent_100%)]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green)]/90 to-emerald-900/90" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

                        <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
                                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                                    Start Your Journey
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                                    Ready to Transform Your Space?
                                </h2>
                                <p className="text-white/90 text-base max-w-lg font-light leading-relaxed">
                                    Let&apos;s create something extraordinary together. Expert
                                    consultation for visionary spaces.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="group flex items-center gap-4 px-8 py-5 rounded-full bg-white text-[var(--brand-green)] font-bold text-sm uppercase tracking-wider hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-green)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Get Started
                                <ArrowUpRight
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* MAIN FOOTER */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-200" />
                    <div className="absolute right-1/4 top-0 bottom-0 w-px bg-slate-200" />
                </div>

                {/* 1. NEWSLETTER STRIP */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="py-12 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
                >
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
                            Join Our Design Newsletter
                        </h2>
                        <p className="text-slate-600 text-sm font-medium">
                            Curated architectural trends delivered to your inbox.
                        </p>
                    </div>
                    <NewsletterForm />
                </motion.div>

                {/* 2. MAIN GRID */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-200 relative z-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 lg:pr-12">
                        <Link href="/" className="inline-flex items-center mb-8">
                            <Image
                                src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                                alt="ArtSpaces Design"
                                width={48}
                                height={48}
                                className="w-12 h-10 drop-shadow-sm"
                            />
                            <Image
                                src="/Logos/ART_SPACES_DESIGN_LIGHT.png"
                                alt=""
                                width={200}
                                height={200}
                                className="w-56 h-20"
                            />
                        </Link>
                        <p className="text-slate-700 text-sm font-medium leading-7 mb-8">
                            A forward-thinking design studio reimagining residential and commercial
                            spaces through structure, light, and material innovation.
                        </p>
                        <ul className="flex gap-4 list-none p-0">
                            {SOCIAL_LINKS.map((social, idx) => (
                                <li key={social.label}>
                                    <motion.a
                                        href={social.href}
                                        aria-label={social.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
                                    >
                                        <social.icon className="w-4 h-4" aria-hidden="true" />
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Link Columns */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                        {FOOTER_COLUMNS.map((column, columnIndex) => (
                            <motion.nav
                                key={column.heading}
                                aria-label={column.heading}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (columnIndex + 1) }}
                                className="md:px-8 md:border-l border-slate-200"
                            >
                                <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                    <span className="w-2 h-0.5 bg-[var(--brand-green)] rounded-full" />
                                    {column.heading}
                                </h2>
                                <ul className="space-y-2">
                                    {column.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 group"
                                            >
                                                <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-[var(--brand-green)] group-hover:scale-150 transition-all duration-300" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.nav>
                        ))}

                        {/* Studio contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="md:px-8 md:border-l border-slate-200"
                        >
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="w-2 h-0.5 bg-[var(--brand-green)] rounded-full" />
                                Studio
                            </h2>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 mb-4">
                                    <span className="w-8 h-8 shrink-0 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm">
                                        <MapPin className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    <address className="not-italic mt-1">
                                        {STUDIO.address.locality}, {STUDIO.address.region}
                                        <br />
                                        {STUDIO.address.country}
                                    </address>
                                </li>
                                <li>
                                    <a
                                        href={STUDIO.phone.href}
                                        className="py-2 flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
                                    >
                                        <span className="w-8 h-8 shrink-0 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm group-hover:scale-110 transition-transform">
                                            <Phone className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                        {STUDIO.phone.display}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={STUDIO.email.href}
                                        className="py-2 flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
                                    >
                                        <span className="w-8 h-8 shrink-0 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm group-hover:scale-110 transition-transform">
                                            <Mail className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                        {STUDIO.email.display}
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                    <p className="text-xs text-slate-600 font-bold">
                        © {STUDIO.name}. All rights reserved.
                    </p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 list-none p-0">
                        {LEGAL_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="py-2 inline-block text-xs text-slate-600 hover:text-[var(--brand-green)] transition-all uppercase tracking-wider font-bold relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
