"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
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
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '25%',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(40px)',
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto' }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
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
                    </motion.div>

                    {/* Headline */}
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
                        style={{ color: 'white', lineHeight: 1.2 }}
                    >
                        Ready to Create Your{" "}
                        <span style={{ color: '#fbbf24' }}>Dream Space?</span>
                    </h2>

                    {/* Subtitle */}
                    <p
                        className="text-lg lg:text-xl mb-10"
                        style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '42rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}
                    >
                        Let&apos;s bring your vision to life. Schedule a free consultation with our
                        expert designers and take the first step towards your perfect space.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }} className="sm:flex-row">
                        <Link href="#lead-form">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem 2rem',
                                    background: 'white',
                                    color: '#14532d',
                                    fontWeight: 700,
                                    borderRadius: '9999px',
                                    fontSize: '1rem',
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <Calendar style={{ width: 20, height: 20 }} />
                                Schedule Free Consultation
                                <ArrowRight style={{ width: 20, height: 20 }} />
                            </motion.button>
                        </Link>

                        <motion.a
                            href="tel:+919876543210"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 2rem',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                fontWeight: 700,
                                borderRadius: '9999px',
                                fontSize: '1rem',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            <Phone style={{ width: 20, height: 20 }} />
                            Call Us Now
                        </motion.a>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        style={{
                            marginTop: '3rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2rem',
                            color: 'rgba(255, 255, 255, 0.75)',
                            fontSize: '0.875rem',
                        }}
                    >
                        {['No Obligation', 'Expert Advice', 'Response in 24 Hours'].map((text) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg style={{ width: 20, height: 20, color: '#fbbf24' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
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
