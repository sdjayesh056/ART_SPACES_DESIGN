"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        content: "ArtSpaces transformed our home beyond our wildest dreams. Their attention to detail and creative vision brought every room to life. We couldn't be happier with the results!",
        author: "Sarah Johnson",
        role: "Homeowner",
        location: "Mumbai",
    },
    {
        id: 2,
        content: "Working with ArtSpaces was an absolute pleasure. They understood our brand identity perfectly and created an office space that inspires our team every day.",
        author: "Rajesh Sharma",
        role: "CEO, TechStart",
        location: "Bangalore",
    },
    {
        id: 3,
        content: "The team's professionalism and creativity exceeded our expectations. They delivered our restaurant design on time and within budget. Highly recommend!",
        author: "Priya Menon",
        role: "Restaurant Owner",
        location: "Chennai",
    },
    {
        id: 4,
        content: "From concept to completion, ArtSpaces demonstrated exceptional skill and dedication. Our new living space is both functional and stunningly beautiful.",
        author: "Amit Patel",
        role: "Property Developer",
        location: "Delhi",
    },
    {
        id: 5,
        content: "I was amazed by how well they captured our vision. The modern yet cozy bedroom design they created is exactly what we wanted. True professionals!",
        author: "Neha Gupta",
        role: "Interior Enthusiast",
        location: "Pune",
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(goToNext, 5000);
        return () => clearInterval(timer);
    }, [isPaused, goToNext]);

    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
    };

    return (
        <section
            id="testimonials"
            className="py-24 lg:py-32 relative overflow-hidden"
            style={{ background: '#ffffff' }}
        >
            {/* Background */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(20, 83, 45, 0.03) 0%, transparent 70%)' }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#14532d',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '1rem',
                    }}>
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: '#0f172a' }}>
                        What Our Clients{" "}
                        <span style={{
                            background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Say
                        </span>
                    </h2>
                </motion.div>

                {/* Carousel */}
                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Quote Icon */}
                    <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                        <Quote style={{ width: 64, height: 64, color: 'rgba(20, 83, 45, 0.1)', fill: 'currentColor' }} />
                    </div>

                    {/* Content */}
                    <div style={{ position: 'relative', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                                style={{ position: 'absolute', width: '100%' }}
                            >
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '1.5rem',
                                    padding: '3rem',
                                    border: '1px solid rgba(0, 0, 0, 0.05)',
                                    boxShadow: '0 10px 40px rgba(20, 83, 45, 0.08)',
                                    textAlign: 'center',
                                }}>
                                    <p style={{ fontSize: '1.25rem', color: '#334155', lineHeight: 1.8, marginBottom: '2rem' }}>
                                        &ldquo;{testimonials[currentIndex].content}&rdquo;
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                            boxShadow: '0 4px 15px rgba(20, 83, 45, 0.3)',
                                        }}>
                                            {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.125rem' }}>
                                                {testimonials[currentIndex].author}
                                            </h4>
                                            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                                {testimonials[currentIndex].role}, {testimonials[currentIndex].location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <motion.button
                            onClick={goToPrev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#334155',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                        >
                            <ChevronLeft style={{ width: 20, height: 20 }} />
                        </motion.button>
                        <motion.button
                            onClick={goToNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#334155',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                        >
                            <ChevronRight style={{ width: 20, height: 20 }} />
                        </motion.button>
                    </div>

                    {/* Dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                                style={{
                                    width: index === currentIndex ? 32 : 10,
                                    height: 10,
                                    borderRadius: 9999,
                                    background: index === currentIndex ? 'linear-gradient(135deg, #14532d 0%, #22c55e 100%)' : 'rgba(20, 83, 45, 0.2)',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                    border: 'none',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
