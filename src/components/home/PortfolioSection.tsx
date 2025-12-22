"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "Modern Luxury Living Room",
        category: "Residential",
        image: "/portfolio-1.png",
        description: "A stunning transformation of a contemporary living space with warm neutral tones.",
    },
    {
        id: 2,
        title: "Contemporary Office Space",
        category: "Commercial",
        image: "/portfolio-2.png",
        description: "An inspiring work environment designed to boost productivity and creativity.",
    },
    {
        id: 3,
        title: "Elegant Master Suite",
        category: "Residential",
        image: "/portfolio-1.png",
        description: "A serene bedroom retreat featuring luxury hotel-style design.",
    },
    {
        id: 4,
        title: "Boutique Restaurant",
        category: "Hospitality",
        image: "/portfolio-2.png",
        description: "An intimate dining space with sophisticated ambiance.",
    },
    {
        id: 5,
        title: "Urban Penthouse",
        category: "Residential",
        image: "/portfolio-1.png",
        description: "A breathtaking penthouse featuring panoramic views and modern luxury.",
    },
    {
        id: 6,
        title: "Creative Studio",
        category: "Commercial",
        image: "/portfolio-2.png",
        description: "A dynamic workspace designed to inspire innovation.",
    },
];

const categories = ["All", "Residential", "Commercial", "Hospitality"];

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#ffffff' }}>
            {/* Background Decoration */}
            <div
                className="absolute top-1/4 left-0 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(20, 83, 45, 0.05) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
            <div
                className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(226, 157, 8, 0.05) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: '#14532d',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: '1rem',
                        }}
                    >
                        Our Portfolio
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0f172a' }}>
                        Featured{" "}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Projects
                        </span>
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto' }}>
                        Explore our collection of stunning spaces that showcase our commitment
                        to excellence and innovative design.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            style={{
                                padding: '0.625rem 1.5rem',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                transition: 'all 0.3s',
                                background: activeCategory === category
                                    ? 'linear-gradient(135deg, #14532d 0%, #22c55e 100%)'
                                    : '#f1f5f9',
                                color: activeCategory === category ? 'white' : '#334155',
                                boxShadow: activeCategory === category
                                    ? '0 4px 15px rgba(20, 83, 45, 0.3)'
                                    : 'none',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <motion.div
                                style={{
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    background: '#f8fafc',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                whileHover={{
                                    y: -8,
                                    boxShadow: '0 20px 40px rgba(20, 83, 45, 0.15)',
                                }}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)',
                                            opacity: 0,
                                            transition: 'opacity 0.4s',
                                        }}
                                        className="group-hover:opacity-100"
                                    />

                                    {/* View Button */}
                                    <motion.div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.4s',
                                        }}
                                        className="group-hover:opacity-100"
                                    >
                                        <motion.button
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: '50%',
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                backdropFilter: 'blur(10px)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                border: '2px solid rgba(255, 255, 255, 0.4)',
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <ExternalLink style={{ width: 24, height: 24 }} />
                                        </motion.button>
                                    </motion.div>

                                    {/* Category Badge */}
                                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                                        <span
                                            style={{
                                                padding: '0.375rem 0.875rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                color: '#14532d',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem' }}>
                                    <h3
                                        style={{
                                            fontSize: '1.125rem',
                                            fontWeight: 700,
                                            color: '#0f172a',
                                            marginBottom: '0.5rem',
                                            transition: 'color 0.3s',
                                        }}
                                        className="group-hover:text-brand-green"
                                    >
                                        {project.title}
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="#">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'transparent',
                                color: '#14532d',
                                fontWeight: 600,
                                padding: '1rem 2rem',
                                borderRadius: '9999px',
                                border: '2px solid #14532d',
                                fontSize: '1rem',
                                transition: 'all 0.3s',
                            }}
                        >
                            View All Projects
                            <ArrowRight style={{ width: 20, height: 20 }} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
