"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Instagram,
    Twitter,
    Facebook,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

const footerLinks = {
    spaces: [
        { label: "Residential", href: "/spaces/residential" },
        { label: "Commercial", href: "/spaces/commercial" },
        { label: "Hospitality", href: "/spaces/hospitality" },
        { label: "Retail", href: "/spaces/retail" },
    ],
    consultation: [
        { label: "Design Process", href: "/consultation/process" },
        { label: "Virtual Tours", href: "/consultation/virtual-tours" },
        { label: "Booking", href: "/consultation/booking" },
        { label: "Our Team", href: "/consultation/team" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="relative bg-slate-50">
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* CTA BANNER (Preserved Dark Theme Accent) */}
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
                                    <Sparkles className="w-3 h-3" />
                                    Start Your Journey
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                                    Ready to Transform Your Space?
                                </h3>
                                <p className="text-white/90 text-base max-w-lg font-light leading-relaxed">
                                    Let&apos;s create something extraordinary together. Expert consultation for visionary spaces.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="group flex items-center gap-4 px-8 py-5 rounded-full bg-white text-[var(--brand-green)] font-bold text-sm uppercase tracking-wider hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-green)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Get Started
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* LIGHT THEME "ARCHITECTURAL" FOOTER */}
            {/* ═══════════════════════════════════════════════════════════ */}

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                {/* Background Architectural Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-200" />
                    <div className="absolute right-1/4 top-0 bottom-0 w-px bg-slate-200" />
                </div>

                {/* 1. NEWSLETTER STRIP (The "Top Board") */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="py-12 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
                >
                    <div>
                        <h4 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">Join Our Design Newsletter</h4>
                        <p className="text-slate-600 text-sm font-medium">Curated architectural trends delivered to your inbox.</p>
                    </div>
                    <form className="flex w-full md:w-auto max-w-md bg-white rounded-full p-1.5 border border-slate-200 shadow-sm hover:shadow-md focus-within:border-[var(--brand-green)] focus-within:ring-1 focus-within:ring-[var(--brand-green)] transition-all duration-300">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 bg-transparent rounded-full md:px-5 text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
                        />
                        <button type="submit" className="px-2 md:px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--brand-green)] transition-all duration-300">
                            Subscribe
                        </button>
                    </form>
                </motion.div>

                {/* 2. MAIN "BLUEPRINT" GRID */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-200 relative z-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 pr-12">
                        <Link href="/" className="inline-flex items-center mb-8">
                            <Image
                                src="/Logos/ART_SPACES_DESIGN_LOGO.png"
                                alt="logo"
                                width={48}
                                height={48}
                                className="w-12 h-10 drop-shadow-sm"
                            />
                            <Image src="/Logos/ART_SPACES_DESIGN_LIGHT.png" alt="logo" width={200} height={200} className="w-56 h-20" />
                        </Link>
                        <p className="text-slate-700 text-sm font-medium leading-7 mb-8">
                            A forward-thinking design studio reimagining residential and commercial spaces through structure, light, and material innovation.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 shadow-sm hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid with Vertical Borders on Desktop */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                        {/* Column 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:px-8 md:border-l border-slate-200"
                        >
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="w-2 h-0.5 bg-[var(--brand-green)] rounded-full"></span>
                                Spaces
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.spaces.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-[var(--brand-green)] group-hover:scale-150 transition-all duration-300"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:px-8 md:border-l border-slate-200"
                        >
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="w-2 h-0.5 bg-[var(--brand-green)] rounded-full"></span>
                                Expertise
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.consultation.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-[var(--brand-green)] group-hover:scale-150 transition-all duration-300"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="md:px-8 md:border-l border-slate-200"
                        >
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="w-2 h-0.5 bg-[var(--brand-green)] rounded-full"></span>
                                Studio
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 mb-6 group cursor-default">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm group-hover:scale-110 transition-transform">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="mt-1">Mumbai, Maharashtra<br />India</span>
                                </li>
                                <li>
                                    <a href="tel:+919876543210" className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm group-hover:scale-110 transition-transform">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        +91 98765 43210
                                    </a>
                                </li>
                                <li className="mt-4">
                                    <a href="mailto:hello@artspaces.design" className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[var(--brand-green)] shadow-sm group-hover:scale-110 transition-transform">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        hello@artspaces.design
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                    <p className="text-xs text-slate-500 font-bold">
                        © {new Date().getFullYear()} ArtSpaces Design. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        {["Privacy Policy", "Terms of Service", "Sitemap"].map(item => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-slate-500 hover:text-[var(--brand-green)] transition-all uppercase tracking-wider font-bold relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
