"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star, MapPin, Sparkles } from "lucide-react";

// SEO-Optimized Testimonials Data
const testimonials = [
    {
        id: 1,
        content: "ArtSpaces transformed our villa into a sustainable sanctuary. Their integration of biophilic design and smart home technology is simply world-class. A truly visionary team.",
        author: "Sarah Johnson",
        role: "Eco-Conscious Homeowner",
        location: "Mumbai, India",
        rating: 5,
        color: "#10b981", // Emerald
        gradient: "from-emerald-500 to-teal-400"
    },
    {
        id: 2,
        content: "Our corporate headquarters needed a complete overhaul to foster collaboration. The result is a stunning, high-performance workspace that our team absolutely loves.",
        author: "Rajesh Sharma",
        role: "CEO, TechStart Innovations",
        location: "Bangalore, India",
        rating: 5,
        color: "#3b82f6", // Blue
        gradient: "from-blue-500 to-indigo-400"
    },
    {
        id: 3,
        content: "The attention to detail in our boutique hotel renovation was impeccable. They seamlessly blended heritage architecture with modern luxury. Our guests are amazed.",
        author: "Priya Menon",
        role: "Owner, The Heritage Stay",
        location: "Kochi, India",
        rating: 5,
        color: "#f59e0b", // Amber
        gradient: "from-amber-500 to-orange-400"
    },
    {
        id: 4,
        content: "We wanted a minimalist, zen-inspired living space, and ArtSpaces delivered perfection. The play of light and material is unlike anything I've seen before.",
        author: "Amit Patel",
        role: "Real Estate Developer",
        location: "Ahmedabad, India",
        rating: 5,
        color: "#8b5cf6", // Violet
        gradient: "from-violet-500 to-purple-400"
    },
    {
        id: 5,
        content: "Their futuristic approach to retail design has significantly boosted our footfall. The immersive customer experience they created is a game-changer for our brand.",
        author: "Neha Gupta",
        role: "Director, Luxe Retail",
        location: "New Delhi, India",
        rating: 5,
        color: "#ec4899", // Pink
        gradient: "from-pink-500 to-rose-400"
    },
    {
        id: 6,
        content: "From the initial concept to the final reveal, the process was seamless. ArtSpaces doesn't just design spaces; they curate lifestyles. Highly recommended!",
        author: "Vikram Malhotra",
        role: "Luxury Apartment Owner",
        location: "Pune, India",
        rating: 5,
        color: "#06b6d4", // Cyan
        gradient: "from-cyan-500 to-blue-400"
    }
];

// Duplicate testimonials for infinite loop
const marqueeTestimonials = [...testimonials, ...testimonials];

// 3D Tilt Card Component for Testimonials
const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[number] }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className="group relative bg-white/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-[400px] w-[350px] md:w-[400px] shrink-0 mx-4"
        >
            {/* Gradient Overlay on Hover */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${testimonial.gradient} rounded-[2rem] pointer-events-none`}
            />

            {/* Quote Icon */}
            <div className="relative z-10 mb-6" style={{ transform: "translateZ(30px)" }}>
                <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${testimonial.gradient}`}
                >
                    <Quote className="w-6 h-6 text-white fill-white" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 grow" style={{ transform: "translateZ(20px)" }}>
                <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium italic mb-6 line-clamp-4">
                    &quot;{testimonial.content}&quot;
                </p>
            </div>

            {/* Author Info */}
            <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex items-center gap-4" style={{ transform: "translateZ(25px)" }}>
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                    style={{ background: testimonial.color }}
                >
                    {testimonial.author.charAt(0)}
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold text-base leading-tight">
                        {testimonial.author}
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: testimonial.color }}>
                        {testimonial.role}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-400 text-xs">
                        <MapPin size={12} />
                        {testimonial.location}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export function TestimonialsSection() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section
            id="testimonials"
            className="py-24 lg:py-32 relative overflow-hidden bg-white"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-100 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-4xl mx-auto px-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-4">
                        <Sparkles size={14} className="text-emerald-500" fill="currentColor" />
                        <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">Voices of Satisfaction</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        Trusted by <span className="brand-gradient-text">Visionaries</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Hear from the homeowners, CEOs, and developers who have experienced the ArtSpaces transformation.
                    </p>
                </motion.div>

                {/* Marquee Slider */}
                <div
                    className="relative w-full overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Gradient Masks for smooth fade out at edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                    <motion.div
                        className="flex py-10"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            }
                        }}
                        style={{
                            width: "max-content",
                            animationPlayState: isHovered ? "paused" : "running"
                        }}
                    >
                        {marqueeTestimonials.map((testimonial, index) => (
                            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
