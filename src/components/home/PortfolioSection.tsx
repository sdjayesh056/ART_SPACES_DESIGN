"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, TrendingUp, Zap, Crown, Globe, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// SEO-Optimized Project Data
const projects = [
    {
        id: 1,
        title: "Eco-Futuristic Smart Villa",
        category: "Residential",
        image: "/portfolio-1.png",
        description: "A sustainable masterpiece featuring automated climate control, biophilic interiors, and energy-efficient lighting systems designed for the modern eco-conscious homeowner.",
        color: "#10b981", // Emerald
        stats: "35% Energy Saved"
    },
    {
        id: 2,
        title: "Avant-Garde Tech HQs",
        category: "Commercial",
        image: "/portfolio-2.png",
        description: "A hyper-collaborative workspace engineered for productivity, featuring sound-proof pods, modular meeting zones, and an ergonomic infrastructure.",
        color: "#3b82f6", // Blue
        stats: "500+ Workstations"
    },
    {
        id: 3,
        title: "Minimalist Zen Spa Retreat",
        category: "Hospitality",
        image: "/portfolio-1.png",
        description: "An ultra-luxury wellness sanctuary emphasizing negative space, natural stone textures, and therapeutic lighting design to curate an immersive relaxation experience.",
        color: "#d946ef", // Fuchsia
        stats: "5-Star Rated"
    },
    {
        id: 4,
        title: "Urban Industrial Loft",
        category: "Residential",
        image: "/portfolio-2.png",
        description: "Transforming a raw warehouse into a sophisticated living space with exposed brick, steel beams, and smart glass partitions for a seamless open-concept flow.",
        color: "#f59e0b", // Amber
        stats: "Award Winner"
    },
    {
        id: 5,
        title: "Next-Gen Retail Experience",
        category: "Commercial",
        image: "/portfolio-1.png",
        description: "A futuristic retail showroom integrating AR mirrors, interactive displays, and dynamic flow layouts to maximize customer engagement and dwell time.",
        color: "#8b5cf6", // Violet
        stats: "200% Footfall"
    },
    {
        id: 6,
        title: "Neoclassical Boutique Hotel",
        category: "Hospitality",
        image: "/portfolio-2.png",
        description: "A seamless blend of historical grandeur and contemporary luxury, featuring restored architectural details matched with state-of-the-art guest amenities.",
        color: "#ef4444", // Red
        stats: "Heritage Site"
    },
];

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const stats = [
    { icon: Crown, value: "250+", label: "Premium Projects", color: "#f43f5e" }, // Rose
    { icon: Users, value: "100%", label: "Client Satisfaction", color: "#8b5cf6" }, // Violet
    { icon: Globe, value: "15+", label: "Global Awards", color: "#06b6d4" }, // Cyan
    { icon: Zap, value: "24/7", label: "Support & Maintenance", color: "#eab308" }  // Yellow
];

// 3D Tilt Card Component
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            whileHover={{ scale: 1.02, z: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden bg-white">
            {/* Subtle Futuristic Background Mesh */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ perspective: "2000px" }}>
                {/* Header with 3D Enter Animation */}
                <motion.div
                    initial={{ opacity: 0, rotateX: -30, y: 50 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="text-center mb-16"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold tracking-wider mb-4 border border-slate-200">
                        OUR MASTERPIECES
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-500 to-yellow-500">Spaces</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Explore our curated selection of high-impact designs where aesthetics meet functionality.
                        Each project is a testament to our commitment to innovation, sustainability, and luxury.
                    </p>
                </motion.div>

                {/* Stats Section - Responsive Grid with 3D Pop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                            whileHover={{ y: -10, rotateX: 10, z: 20 }}
                            className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div
                                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-white shadow-lg"
                                style={{ backgroundColor: stat.color, transform: "translateZ(20px)" }}
                            >
                                <stat.icon size={20} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-1" style={{ transform: "translateZ(10px)" }}>{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide" style={{ transform: "translateZ(5px)" }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === category
                                ? "bg-slate-900 text-white shadow-lg scale-110"
                                : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Portfolio Grid with 3D Tilt Cards */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <TiltCard className="group h-full relative bg-white rounded-[2rem] border border-slate-100 shadow-md hover:shadow-2xl">
                                    <div
                                        className="h-full w-full rounded-[2rem] overflow-hidden"
                                        style={{ transform: "translateZ(0px)" }} // Base plane
                                    >
                                        {/* Image Wrapper */}
                                        <div className="relative h-80 w-full overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                                            {/* Floating Action Button - 3D Pop */}
                                            <div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                style={{ transform: "translateZ(40px)" }}
                                            >
                                                <button className="bg-white text-slate-900 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                                                    <ExternalLink size={24} />
                                                </button>
                                            </div>

                                            {/* Top Badge - 3D Pop */}
                                            <div
                                                className="absolute top-4 left-4"
                                                style={{ transform: "translateZ(30px)" }}
                                            >
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm backdrop-blur-md"
                                                    style={{ backgroundColor: project.color }}
                                                >
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Stats Badge - 3D Pop */}
                                            <div
                                                className="absolute top-4 right-4"
                                                style={{ transform: "translateZ(30px)" }}
                                            >
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-800 shadow-sm backdrop-blur-md flex items-center gap-1">
                                                    <TrendingUp size={12} className="text-green-500" />
                                                    {project.stats}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Details */}
                                        <div className="p-6 relative z-10 bg-white" style={{ transform: "translateZ(20px)" }}>
                                            <div className="mb-3">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* Animated Bottom Border */}
                                            <div
                                                className="h-1 rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out"
                                                style={{ backgroundColor: project.color }}
                                            />
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-green)] text-[var(--brand-yellow)] font-bold hover:bg-slate-800 transition-all hover:gap-4 shadow-lg hover:shadow-xl"
                    >
                        View Full Portfolio <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
