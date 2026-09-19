"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export function CTASection() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden" id="lead-form">
            {/* Background - Preserved */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #22c55e 100%)',
                }}
            />

            {/* Pattern Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Floating Shapes */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)',
                }}
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(226, 157, 8, 0.2)',
                    filter: 'blur(80px)',
                }}
                animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Content Container */}
            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-4">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                marginBottom: '2rem',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <span style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#fbbf24',
                                animation: 'pulse 2s infinite',
                            }} />
                            Limited Time Offer: Free Design Consultation
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                            Ready to Create Your <br />
                            <span className="text-amber-400">Dream Space?</span>
                        </h2>

                        <p className="text-lg text-slate-100 mb-10 leading-relaxed opacity-90 max-w-lg">
                            Transform your vision into reality with our expert design team.
                            Schedule your free consultation today and take the first step
                            towards a space that inspires.
                        </p>

                        {/* Trust Points */}
                        <div className="space-y-4">
                            {[
                                "Expert Design Consultation",
                                "Personalized Space Planning",
                                "Sustainable & Smart Solutions",
                                "24/7 Dedicated Support"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-3 text-white font-medium"
                                >
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <CheckCircle size={16} className="text-amber-400" />
                                    </div>
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl" />
                        <div
                            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl"
                        >
                            <LeadCaptureForm />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Pulse Animation Keyframes */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }
            `}</style>
        </section>
    );
}
