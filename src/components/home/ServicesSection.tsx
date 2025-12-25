"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Palette,
    Building2,
    Trees,
    Lightbulb,
    Scan,
    Cuboid,
    ArrowRight,
    Loader2,
    Zap,
    Aperture
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Palette,
        title: "Residential Interior Ecosystems",
        description:
            "Curating bespoke living environments that blend ergonomic comfort with high-end aesthetic precision. Experience personalized luxury.",
        color: "#db2777", // Pink-600
        keywords: ["Luxury Interiors", "Home Styling", "Bespoke Design"],
        techId: "RES-INT-01"
    },
    {
        icon: Scan,
        title: "Smart Space Optimization",
        description:
            "Utilizing data-driven layouts to maximize utility and flow. We engineer spaces that breathe and adapt to your modern lifestyle.",
        color: "#7c3aed", // Violet-600
        keywords: ["Floor Planning", "Spatial Logic", "Efficiency"],
        techId: "SPC-OPT-02"
    },
    {
        icon: Building2,
        title: "Commercial & Tech Hubs",
        description:
            "Future-proof office architectures designed for collaboration and productivity. Redefining the corporate workspace experience.",
        color: "#2563eb", // Blue-600
        keywords: ["Office Design", "Corporate Branding", "Workspaces"],
        techId: "COM-HUB-03"
    },
    {
        icon: Trees,
        title: "Sustainable Landscapes",
        description:
            "Eco-conscious outdoor designs that harmonize nature with architecture. Create a serene, green sanctuary right at your doorstep.",
        color: "#16a34a", // Green-600
        keywords: ["Landscape Arch", "Eco-Design", "Outdoor Living"],
        techId: "ECO-LND-04"
    },
    {
        icon: Lightbulb,
        title: "Intelligent Lighting Systems",
        description:
            "Automated and mood-adaptive lighting solutions. Transform atmospheres instantly with our cutting-edge photonics engineering.",
        color: "#d97706", // Amber-600
        keywords: ["Smart Lighting", "Ambiance", "Energy Saving"],
        techId: "LGT-SYS-05"
    },
    {
        icon: Cuboid,
        title: "3D Visualization & VR",
        description:
            "Immersive virtual reality walkthroughs and hyper-realistic renders. Visualize your dream project before the first brick is laid.",
        color: "#0891b2", // Cyan-600
        keywords: ["3D Rendering", "VR Walkthrough", "Digital Twin"],
        techId: "VR-VIS-06"
    },
];

function Card({ service, index }: { service: typeof services[0], index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-full perspective-1000"
        >
            {/* Main Card Container */}
            <div className="relative h-full bg-white bg-opacity-80 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-opacity-90 hover:scale-[1.02]">

                {/* Animated Border Beam */}
                <span className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50 group-hover:opacity-100 animate-border-spin pointer-events-none" />

                {/* Top Glowing Strip */}
                <div
                    className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: service.color }}
                />

                <div className="p-8 relative z-10 flex flex-col h-full">

                    {/* Floating Holo-Badge */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="relative">
                            <div
                                className="absolute inset-0 bg-current blur-xl opacity-20 rounded-full animate-pulse"
                                style={{ color: service.color }}
                            />
                            <div className="relative w-12 h-12 flex items-center justify-center border border-slate-200 rounded-xl bg-white/50 backdrop-blur-md group-hover:rotate-12 transition-transform duration-500">
                                <service.icon className="w-6 h-6 text-slate-700" />
                            </div>
                            {/* Orbiting Ring */}
                            <div
                                className="absolute -inset-2 rounded-full border border-dashed border-slate-300 opacity-0 group-hover:opacity-100 animate-[spin_10s_linear_infinite]"
                                style={{ borderColor: service.color }}
                            />
                        </div>

                        {/* Tech ID Pill */}
                        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            {service.techId}
                        </div>
                    </div>

                    {/* Title Area */}
                    <div className="mb-4 relative">
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:translate-x-2 transition-transform duration-300">
                            {service.title}
                        </h3>
                        <div className="absolute -left-8 top-1 w-6 h-0.5 bg-current opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500" style={{ color: service.color }} />
                    </div>

                    {/* Description with reveal effect */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                        {service.description}
                    </p>

                    {/* Interactive Footer */}
                    <div className="mt-auto border-t border-slate-100 pt-6 flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Capabilities</span>
                            <div className="flex flex-wrap gap-1">
                                {service.keywords.slice(0, 2).map(k => (
                                    <span key={k} className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-600">{k}</span>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300 transform group-hover:rotate-[-45deg]"
                        >
                            <ArrowRight size={16} />
                        </div>
                    </div>

                    {/* Dynamic Background Gradient Blob on Hover */}
                    <div
                        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                        style={{ backgroundColor: service.color }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    return (
        <section
            id="services"
            className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden"
        >
            {/* === ACTIVE BACKGROUND LAYER === */}
            <div className="absolute inset-0 z-0">
                {/* mesh grid */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* Moving Aurora Blobs */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-indigo-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-emerald-100/40 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
                />
            </div>

            <div className="section-container relative z-10">
                {/* Futuristic Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-28"
                >
                    <div className="flex justify-center mb-6">
                        <div className="relative px-6 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-slate-800 uppercase">System Active</span>
                            <div className="w-px h-3 bg-slate-300" />
                            <span className="text-xs font-mono text-slate-500">v.4.0.0</span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-8 relative inline-block">
                        <span className="relative z-10">NEXT GEN</span>
                        <span className="mx-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-500 to-yellow-500 animate-gradient-x">DESIGN</span>
                        {/* <br /> */}
                        <span className="text-3xl md:text-5xl font-light text-slate-400">ARCHITECTURES</span>

                        {/* Decorative floating elements around header */}
                        <Aperture className="absolute -top-8 -right-14 w-12 h-12 text-[var(--brand-green)] animate-[spin_20s_linear_infinite]" />
                        <Zap className="absolute -bottom-4 -left-16 w-8 h-8 text-[var(--brand-yellow)] animate-[spin_5s_linear_infinite] rotate-12" />
                    </h2>

                    <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
                        Deploying advanced spatial algorithms and neural-aesthetic principles to construct the environments of tomorrow.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
                    {services.map((service, index) => (
                        <Card key={service.title} service={service} index={index} />
                    ))}
                </div>

                {/* CTA - Futuristic Pill (PRESERVED UNCHANGED) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 flex justify-center"
                >
                    <Link href="#lead-form" className="group">
                        <div className="relative px-1 py-1 rounded-full bg-slate-200 overflow-hidden">
                            <div className="absolute inset-0 bg-[var(--brand-green)] animate-[spin_4s_linear_infinite] group-hover:opacity-60 transition-opacity" />
                            <div className="relative bg-white rounded-full px-8 py-4 flex items-center gap-3 transition-transform group-hover:scale-[0.98]">
                                <span className="font-bold text-[var(--brand-green)]">Start Your Transformation</span>
                                <div className="w-8 h-8 rounded-full bg-[var(--brand-green)] flex items-center justify-center text-[var(--brand-yellow)] group-hover:bg-black transition-colors">
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
