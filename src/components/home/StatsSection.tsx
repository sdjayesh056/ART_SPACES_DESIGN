"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Home, Star } from "lucide-react";

const stats = [
    {
        icon: Home,
        value: 500,
        suffix: "+",
        label: "Projects Completed",
        description: "Successful transformations",
    },
    {
        icon: Users,
        value: 250,
        suffix: "+",
        label: "Happy Clients",
        description: "Satisfied customers",
    },
    {
        icon: Star,
        value: 98,
        suffix: "%",
        label: "Client Satisfaction",
        description: "Positive reviews",
    },
    {
        icon: Award,
        value: 15,
        suffix: "+",
        label: "Design Awards",
        description: "Industry recognition",
    },
];

function AnimatedCounter({
    value,
    suffix = "",
    inView
}: {
    value: number;
    suffix?: string;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (inView && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [inView, value]);

    return (
        <span
            style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
            }}
        >
            {count}{suffix}
        </span>
    );
}

export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.03) 0%, rgba(226, 157, 8, 0.03) 100%)',
            }}
        >
            {/* Decorative Lines */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(20, 83, 45, 0.2), transparent)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(226, 157, 8, 0.2), transparent)',
                }}
            />

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                style={{
                                    width: 72,
                                    height: 72,
                                    margin: '0 auto 1rem',
                                    borderRadius: '1.25rem',
                                    background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.1) 0%, rgba(226, 157, 8, 0.1) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.3s',
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <stat.icon style={{ width: 32, height: 32, color: '#14532d' }} />
                            </motion.div>

                            {/* Counter */}
                            <div style={{ marginBottom: '0.5rem' }}>
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    inView={isInView}
                                />
                            </div>

                            {/* Label */}
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                                {stat.label}
                            </h3>

                            {/* Description */}
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
