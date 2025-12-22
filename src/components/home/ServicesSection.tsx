"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Palette,
    Home,
    Building2,
    Trees,
    Lightbulb,
    Ruler,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Palette,
        title: "Interior Design",
        description:
            "Transform your living spaces with bespoke interior designs that reflect your personality and lifestyle.",
        accent: "#38bdf8",
        iconBg: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    },
    {
        icon: Home,
        title: "Space Planning",
        description:
            "Optimize your floor plans for maximum functionality and aesthetic appeal with expert space planning.",
        accent: "#facc15",
        iconBg: "linear-gradient(135deg, #facc15, #eab308)",
    },
    {
        icon: Building2,
        title: "Office Design",
        description:
            "Create productive and inspiring work environments that boost creativity and employee satisfaction.",
        accent: "#22c55e",
        iconBg: "linear-gradient(135deg, #22c55e, #16a34a)",
    },
    {
        icon: Trees,
        title: "Landscape Design",
        description:
            "Beautiful outdoor spaces that seamlessly blend with nature and enhance your property value.",
        accent: "#a78bfa",
        iconBg: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
    },
    {
        icon: Lightbulb,
        title: "Lighting Design",
        description:
            "Create perfect ambiance with strategic lighting solutions that elevate every room.",
        accent: "#fb923c",
        iconBg: "linear-gradient(135deg, #fb923c, #f97316)",
    },
    {
        icon: Ruler,
        title: "Custom Furniture",
        description:
            "Bespoke furniture pieces designed and crafted to perfectly fit your space and style.",
        accent: "#f472b6",
        iconBg: "linear-gradient(135deg, #f472b6, #ec4899)",
    },
];

export function ServicesSection() {
    return (
        <section
            id="services"
            className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden"
        >
            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-sm font-bold tracking-widest uppercase text-emerald-700 block mb-4">
                        Our Services
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                        Future-Ready{" "}
                        <span style={{
                            background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Design Solutions
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                        Thoughtfully crafted interiors powered by modern aesthetics,
                        intelligent planning, and timeless execution.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                className="relative h-full rounded-3xl p-8 bg-white border border-slate-100 overflow-hidden"
                                style={{
                                    boxShadow: `0 30px 60px -20px ${service.accent}55`,
                                }}
                            >
                                {/* === Futuristic Animated Background Layers === */}

                                {/* Moving gradient mesh */}
                                <motion.div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        background: `
                                            radial-gradient(circle at 20% 20%, ${service.accent}, transparent 40%),
                                            radial-gradient(circle at 80% 80%, ${service.accent}, transparent 40%)
                                        `,
                                    }}
                                    animate={{
                                        backgroundPosition: [
                                            "0% 0%",
                                            "100% 100%",
                                            "0% 0%",
                                        ],
                                    }}
                                    transition={{
                                        duration: 12,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />

                                {/* Conic futuristic ring */}
                                <motion.div
                                    className="absolute -top-1/2 -right-1/2 w-[300px] h-[300px] rounded-full opacity-30"
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent, ${service.accent}, transparent)`,
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />

                                {/* Noise texture */}
                                <div
                                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\"/></svg>')",
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                        style={{ background: service.iconBg }}
                                    >
                                        <service.icon className="w-7 h-7 text-white" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <Link
                                        href="#"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:gap-4 transition-all"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-20"
                >
                    <Link href="#lead-form">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-600 via-sky-500 to-indigo-500 shadow-xl"
                        >
                            Discuss Your Project
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
