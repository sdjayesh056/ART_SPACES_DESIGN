"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Building2, Users, Trophy, Globe2, Sparkles } from "lucide-react";

const stats = [
    {
        id: 1,
        icon: Building2,
        value: 500,
        suffix: "+",
        label: "Projects Completed",
        description: "Luxury residential, commercial, and hospitality interiors delivered across India.",
        color: "#2563eb",
        bgColor: "bg-blue-50",
        glowColor: "rgba(37, 99, 235, 0.15)",
    },
    {
        id: 2,
        icon: Users,
        value: 98,
        suffix: "%",
        label: "Client Satisfaction",
        description: "Consistently rated 5-stars for premium interior design consultation services.",
        color: "#7c3aed",
        bgColor: "bg-violet-50",
        glowColor: "rgba(124, 58, 237, 0.15)",
    },
    {
        id: 3,
        icon: Trophy,
        value: 45,
        suffix: "+",
        label: "Design Awards",
        description: "Recognized by leading architecture and interior design associations worldwide.",
        color: "#ea580c",
        bgColor: "bg-orange-50",
        glowColor: "rgba(234, 88, 12, 0.15)",
    },
    {
        id: 4,
        icon: Globe2,
        value: 12,
        suffix: "",
        label: "Countries Served",
        description: "Expanding our signature aesthetic to international residential and commercial projects.",
        color: "#0d9488",
        bgColor: "bg-teal-50",
        glowColor: "rgba(13, 148, 136, 0.15)",
    },
];

// Animated Counter
const AnimatedCounter = ({ value, suffix, inView, color }: { value: number; suffix: string; inView: boolean; color: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [inView, value]);

    return (
        <span className="tabular-nums">
            {count}
            <span style={{ color }} className="opacity-70">{suffix}</span>
        </span>
    );
};

// Futuristic Card - Light Theme
const FuturisticCard = ({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const spotlightX = useTransform(mouseX, (val) => `${val}px`);
    const spotlightY = useTransform(mouseY, (val) => `${val}px`);

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * index, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1"
            >
                {/* Animated Spotlight on Hover */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(400px circle at ${spotlightX.get()} ${spotlightY.get()}, ${stat.glowColor}, transparent 60%)`,
                    }}
                />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }} />

                {/* Top Corner Decoration */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: stat.color }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon with Glow Ring */}
                    <div className="relative mb-8 inline-block">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                            style={{
                                backgroundColor: `${stat.color}10`,
                                borderColor: `${stat.color}25`,
                            }}
                        >
                            <stat.icon size={28} style={{ color: stat.color }} />
                        </div>
                        {/* Orbiting Ring */}
                        <div
                            className="absolute -inset-3 border border-dashed rounded-full opacity-0 group-hover:opacity-40 transition-opacity animate-[spin_12s_linear_infinite]"
                            style={{ borderColor: stat.color }}
                        />
                    </div>

                    {/* Value */}
                    <div className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-none tracking-tight">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} color={stat.color} />
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {stat.label}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed">
                        {stat.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <div
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full"
                        style={{ backgroundColor: stat.color }}
                    />
                </div>
            </div>
        </motion.article>
    );
};

export function StatsSection() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-50 relative overflow-hidden"
            aria-label="Our Achievements and Industry Recognition"
        >
            {/* Futuristic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
                    >
                        <Sparkles size={14} className="text-amber-500" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Why Choose Art Spaces
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                    >
                        Delivering <span className="text-emerald-600">Results</span> That Inspire
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        As a leading interior design firm in India, we transform spaces into timeless experiences.
                        Our commitment to innovation and craftsmanship defines every project.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <FuturisticCard key={stat.id} stat={stat} index={index} inView={inView} />
                    ))}
                </div>

                {/* Bottom Trust Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 md:mt-20"
                >
                    <p className="text-slate-500 text-sm">
                        Trusted by homeowners, architects, and real estate developers across Mumbai, Delhi, Bangalore, and beyond.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
