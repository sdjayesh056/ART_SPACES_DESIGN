"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Users, Building2, Globe2, Trophy, Zap } from "lucide-react";

const stats = [
    {
        id: 1,
        icon: Building2,
        value: 500,
        suffix: "+",
        label: "Projects Delivered",
        description: "Transforming visions into reality",
        color: "#3b82f6", // Blue
        gradient: "from-blue-500 to-cyan-400"
    },
    {
        id: 2,
        icon: Users,
        value: 1200,
        suffix: "+",
        label: "Happy Clients",
        description: "Building lasting relationships globally",
        color: "#8b5cf6", // Violet
        gradient: "from-violet-500 to-fuchsia-400"
    },
    {
        id: 3,
        icon: Trophy,
        value: 45,
        suffix: "+",
        label: "Industry Awards",
        description: "Recognized design excellence",
        color: "#f59e0b", // Amber
        gradient: "from-amber-500 to-orange-400"
    },
    {
        id: 4,
        icon: Globe2,
        value: 12,
        suffix: "",
        label: "Countries Served",
        description: "International design footprint",
        color: "#10b981", // Emerald
        gradient: "from-emerald-500 to-teal-400"
    },
];

function AnimatedCounter({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (inView && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = duration / end > 20 ? duration / end : 20; // limit tick speed

            const timer = setInterval(() => {
                start += Math.ceil(end / (duration / incrementTime));
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, value]);

    return (
        <span className="tabular-nums font-bold text-4xl tracking-tight text-slate-800">
            {count}
            <span className="text-3xl md:text-4xl text-slate-400 ml-1 font-bold">{suffix}</span>
        </span>
    );
}

const StatCard = ({ stat, index, inView }: { stat: any; index: number; inView: boolean }) => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
            {/* Background Gradient Blob */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient} rounded-[2rem]`}
            />

            <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: "translateZ(20px)" }}>
                {/* Icon Circle */}
                <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${stat.gradient}`}
                >
                    <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Counter */}
                <div className="mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    {stat.label}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {stat.description}
                </p>

                {/* Bottom decorative bar */}
                <div
                    className={`h-1.5 w-12 rounded-full mt-6 bg-gradient-to-r ${stat.gradient} opacity-30 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`}
                />
            </div>
        </motion.div>
    );
};

export function StatsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="py-24 relative overflow-hidden bg-slate-50"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-38 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
                        <Zap size={14} className="text-amber-500" fill="currentColor" />
                        <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">Proven Excellence</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        Milestones That Define <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-500 to-yellow-500">Our Legacy</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        With years of dedication and a passion for perfection, we have set new benchmarks in the design industry.
                        Our numbers speak for the trust and satisfaction we deliver.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.id} stat={stat} index={index} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
