"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, TrendingUp, Zap, Crown, Globe, Users, Activity, Layers, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// SEO-Optimized Project Data
const projects = [
    {
        id: 1,
        title: "Eco-Futuristic Smart Villa",
        category: "Residential",
        image: "/portfolio-1.png",
        description: "A sustainable masterpiece featuring automated climate control, biophilic interiors, and energy-efficient lighting systems.",
        color: "#10b981", // Emerald
        stats: "ENERGY: -35%",
        techId: "PRJ-01-ECO"
    },
    {
        id: 2,
        title: "Avant-Garde Tech HQs",
        category: "Commercial",
        image: "/portfolio-2.png",
        description: "A hyper-collaborative workspace engineered for productivity, featuring sound-proof pods and modular meeting zones.",
        color: "#3b82f6", // Blue
        stats: "CAPACITY: 500+",
        techId: "PRJ-02-HQ"
    },
    {
        id: 3,
        title: "Minimalist Zen Spa Retreat",
        category: "Hospitality",
        image: "/portfolio-1.png",
        description: "An ultra-luxury wellness sanctuary emphasizing negative space, natural stone textures, and therapeutic lighting design.",
        color: "#d946ef", // Fuchsia
        stats: "RATING: 5-STAR",
        techId: "PRJ-03-ZEN"
    },
    {
        id: 4,
        title: "Urban Industrial Loft",
        category: "Residential",
        image: "/portfolio-2.png",
        description: "Transforming a raw warehouse into a sophisticated living space with exposed brick, steel beams, and smart glass partitions.",
        color: "#f59e0b", // Amber
        stats: "AWARD: GOLD",
        techId: "PRJ-04-LOFT"
    },
    {
        id: 5,
        title: "Next-Gen Retail Experience",
        category: "Commercial",
        image: "/portfolio-1.png",
        description: "A futuristic retail showroom integrating AR mirrors, interactive displays, and dynamic flow layouts.",
        color: "#8b5cf6", // Violet
        stats: "TRAFFIC: +200%",
        techId: "PRJ-05-RTL"
    },
    {
        id: 6,
        title: "Neoclassical Boutique Hotel",
        category: "Hospitality",
        image: "/portfolio-2.png",
        description: "A seamless blend of historical grandeur and contemporary luxury, featuring restored architectural details.",
        color: "#ef4444", // Red
        stats: "STATUS: HERITAGE",
        techId: "PRJ-06-HTL"
    },
    {
        id: 7,
        title: "Smart Educational Hub",
        category: "Institutional",
        image: "/portfolio-1.png",
        description: "A smart campus designed for interactive learning, featuring digital classrooms, collaborative labs, and energy-efficient systems.",
        color: "#3b82f6", // Blue
        stats: "CAPACITY: 1000+",
        techId: "PRJ-07-EDU"
    },
    {
        id: 8,
        title: "Futuristic Health Center",
        category: "Healthcare",
        image: "/portfolio-2.png",
        description: "A state-of-the-art medical facility integrating advanced technology, patient-centric design, and biophilic elements for healing.",
        color: "#10b981", // Emerald
        stats: "BEDS: 200+",
        techId: "PRJ-08-MED"
    }
];

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const stats = [
    { icon: Crown, value: "250+", label: "PROJECTS_COMPLETED", color: "#f43f5e" },
    { icon: Users, value: "100%", label: "SATISFACTION_RATE", color: "#8b5cf6" },
    { icon: Globe, value: "15+", label: "GLOBAL_AWARDS", color: "#06b6d4" },
    { icon: Zap, value: "24/7", label: "SYSTEM_UPTIME", color: "#eab308" }
];

function HolographicCard({ project }: { project: typeof projects[0] }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative h-[450px] w-full perspective-card"
        >
            <div className="relative h-full w-full bg-slate-900/5 backdrop-blur-sm border border-white/40 rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] group-hover:border-white/80">

                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-400/50 rounded-tl-xl z-20 group-hover:border-current transition-colors duration-300" style={{ color: project.color }} />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-400/50 rounded-tr-xl z-20 group-hover:border-current transition-colors duration-300" style={{ color: project.color }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-400/50 rounded-bl-xl z-20 group-hover:border-current transition-colors duration-300" style={{ color: project.color }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-400/50 rounded-br-xl z-20 group-hover:border-current transition-colors duration-300" style={{ color: project.color }} />

                {/* Main Image Container */}
                <div className="absolute inset-2 rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:contrast-110"
                    />

                    {/* Scan Line Effect */}
                    <div
                        className="absolute inset-0 w-full h-[5px] bg-white/50 blur-sm z-10 opacity-0 group-hover:opacity-100 group-hover:animate-scan"
                        style={{ boxShadow: `0 0 10px ${project.color}, 0 0 20px ${project.color}` }}
                    />

                    {/* Dark Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Floating HUD Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">

                    {/* Top Status Bar */}
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded font-mono text-[10px] text-white tracking-widest uppercase">
                            {project.category}
                        </span>
                        <span className="font-mono text-[10px] text-white/70 tracking-widest">{project.techId}</span>
                    </div>

                    {/* Content Group */}
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <Activity size={14} style={{ color: project.color }} />
                            <span className="font-mono text-[10px] text-white font-bold tracking-wider" style={{ color: project.color }}>
                                {project.stats}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                            {project.title}
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-white transition-colors">
                            {project.description}
                        </p>

                        {/* Interactive Action */}
                        <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-accent-on-brand transition-colors">
                                [ INITIALIZE_VIEW ] <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden bg-white">
            {/* === ACTIVE BACKGROUND LAYER === */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* mesh grid */}
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Moving Aurora Blobs (lighter for white bg) */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/50 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-purple-100/50 to-transparent rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-2">
                            <ScanLine size={12} className="text-slate-500" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Architectural Database</span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-slate-900 tracking-tighter mb-6">
                        DESIGN <span className="brand-gradient-text">INNOVATION</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-slate-500 text-lg font-medium">
                        Selected works demonstrating the convergence of art, technology, and sustainable engineering.
                    </p>
                </motion.div>

                {/* Stats Dashboard - Professional Modernistic */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-24"
                >
                    <div className="relative max-w-6xl mx-auto">
                        {/* Glass Container */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] px-8 py-12 md:py-8 relative z-10 overflow-hidden">
                            {/* Subtle Texture */}
                            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 items-center">
                                {stats.map((stat, i) => (
                                    <div key={i} className={`relative flex flex-col items-center justify-center text-center group ${i !== stats.length - 1 ? 'md:border-r border-slate-200' : ''}`}>

                                        {/* Minimalist Icon & Label Row */}
                                        <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                            <stat.icon size={14} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                                                {stat.label.replace(/_/g, " ")}
                                            </span>
                                        </div>

                                        {/* High-End Typography Value */}
                                        <div className="relative">
                                            <h4 className="text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-none group-hover:-translate-y-1 transition-transform duration-500">
                                                {stat.value}
                                            </h4>
                                            {/* Subtle underline on hover */}
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                                        </div>

                                        {/* Mobile Divider (Horizontal) */}
                                        <div className="md:hidden absolute -bottom-4 left-10 right-10 h-px bg-slate-100 last:hidden" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Background Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-r from-slate-200 to-gray-200 blur-3xl opacity-30 -z-10 rounded-full" />
                    </div>
                </motion.div>
                {/* Filter Tabs - Tech Switch Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    <div className="p-1.5 bg-slate-100 rounded-full flex flex-wrap justify-center gap-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                                    ? "bg-white text-slate-900 shadow-md transform scale-105"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <HolographicCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 flex justify-center"
                >
                    <Link
                        href="/projects"
                        className="group relative px-8 py-4 bg-slate-900 rounded-lg overflow-hidden flex items-center gap-3 font-bold text-white tracking-widest uppercase text-sm hover:ring-4 hover:ring-slate-200 transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                            Access Full Database <Layers size={16} />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
