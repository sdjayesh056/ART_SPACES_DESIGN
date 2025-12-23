"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
            {/* Ambient Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-700/20 rounded-full blur-[120px]" />
                <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-green-500/10 blur-[160px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* ================= LEFT CONTENT ================= */}
                <div>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 bg-white/80 backdrop-blur-xl border border-emerald-900/10 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-emerald-900">
                            Luxury Interior & Architectural Design Studio
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
                    >
                        Design Spaces That <br />
                        <span className="bg-gradient-to-r from-emerald-800 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                            Inspire Modern Living
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="mt-6 max-w-xl text-lg text-slate-600 leading-relaxed"
                    >
                        We craft timeless, functional and elegant interiors using
                        modern design principles, sustainable materials and
                        human-centric planning.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <Link href="#lead-form">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-xl bg-gradient-to-r from-emerald-800 to-green-500"
                            >
                                Get Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        <Link href="#portfolio">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 border-emerald-800 text-emerald-900 bg-white/70 backdrop-blur-xl"
                            >
                                <Play className="w-4 h-4" />
                                View Portfolio
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 flex items-center gap-6 text-sm text-slate-600"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-700 to-green-500 border-2 border-white flex items-center justify-center text-white font-bold"
                                >
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <span>
                            Trusted by <strong className="text-slate-900">500+</strong> clients worldwide
                        </span>
                    </motion.div>
                </div>

                {/* ================= RIGHT 3D ILLUSTRATION ================= */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative flex justify-center items-center"
                >
                    {/* Glass Frame */}
                    <div className="relative w-full max-w-lg aspect-square rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl overflow-hidden">
                        <Image src="/Logos/Home_Right_Visuals.png" alt="home-right-visuals" width={512} height={612} className="h-128" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
