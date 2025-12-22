"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    CheckCircle2,
    User,
    Mail,
    Phone,
    MessageSquare,
    Palette,
    Check,
    ChevronDown
} from "lucide-react";

const benefits = [
    { title: "Expert Designers", description: "Award-winning team with 10+ years experience" },
    { title: "Premium Quality", description: "Only the finest materials and craftsmanship" },
    { title: "On-Time Delivery", description: "Projects completed within agreed timelines" },
    { title: "Best Value", description: "Competitive pricing without compromising quality" },
];

const serviceOptions = [
    "Interior Design",
    "Space Planning",
    "Office Design",
    "Landscape Design",
    "Lighting Design",
    "Custom Furniture",
    "Full Renovation",
    "Consultation Only",
];

export function LeadFormSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Lead Form Submitted:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const inputStyle = (field: string) => ({
        width: '100%',
        padding: '1rem 1rem 1rem 3rem',
        background: '#ffffff',
        border: focusedField === field ? '2px solid #14532d' : '2px solid #e2e8f0',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        color: '#0f172a',
        outline: 'none',
        transition: 'all 0.3s',
        boxShadow: focusedField === field ? '0 0 0 4px rgba(20, 83, 45, 0.1)' : 'none',
    });

    const iconStyle = (field: string) => ({
        position: 'absolute' as const,
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 20,
        height: 20,
        color: focusedField === field ? '#14532d' : '#94a3b8',
        transition: 'color 0.3s',
    });

    return (
        <section
            id="lead-form"
            className="py-24 lg:py-32 relative overflow-hidden"
            style={{ background: '#f8fafc' }}
        >
            {/* Background */}
            <div
                className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at 100% 50%, rgba(20, 83, 45, 0.05) 0%, transparent 50%)' }}
            />
            <div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(226, 157, 8, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
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
                            Get Started
                        </span>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0f172a' }}>
                            Ready to Transform{" "}
                            <span style={{
                                background: 'linear-gradient(135deg, #14532d 0%, #22c55e 50%, #e29d08 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                Your Space?
                            </span>
                        </h2>

                        <p style={{ color: '#64748b', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                            Get a free consultation and personalized quote for your project.
                            Our expert team is ready to bring your vision to life.
                        </p>

                        {/* Benefits List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '0.75rem',
                                        background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Check style={{ width: 20, height: 20, color: '#14532d' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>
                                            {benefit.title}
                                        </h4>
                                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 20px 50px rgba(20, 83, 45, 0.1)',
                        }}>
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                                                Get Your Free Quote
                                            </h3>
                                            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                                Fill out the form and we&apos;ll get back within 24 hours
                                            </p>
                                        </div>

                                        {/* Name */}
                                        <div style={{ position: 'relative' }}>
                                            <User style={iconStyle("name")} />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("name")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                style={inputStyle("name")}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div style={{ position: 'relative' }}>
                                            <Mail style={iconStyle("email")} />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                style={inputStyle("email")}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div style={{ position: 'relative' }}>
                                            <Phone style={iconStyle("phone")} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("phone")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                style={inputStyle("phone")}
                                            />
                                        </div>

                                        {/* Service */}
                                        <div style={{ position: 'relative' }}>
                                            <Palette style={iconStyle("service")} />
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("service")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                style={{ ...inputStyle("service"), appearance: 'none', cursor: 'pointer' }}
                                            >
                                                <option value="">Select Service</option>
                                                {serviceOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <ChevronDown style={{ ...iconStyle("service"), left: 'auto', right: 16 }} />
                                        </div>

                                        {/* Message */}
                                        <div style={{ position: 'relative' }}>
                                            <MessageSquare style={{ ...iconStyle("message"), top: 20, transform: 'none' }} />
                                            <textarea
                                                name="message"
                                                placeholder="Tell us about your project..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("message")}
                                                onBlur={() => setFocusedField(null)}
                                                rows={4}
                                                style={{ ...inputStyle("message"), resize: 'none' }}
                                            />
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                background: 'linear-gradient(135deg, #14532d 0%, #22c55e 100%)',
                                                color: 'white',
                                                fontWeight: 600,
                                                padding: '1rem 2rem',
                                                borderRadius: '0.75rem',
                                                fontSize: '1rem',
                                                boxShadow: '0 4px 20px rgba(20, 83, 45, 0.35)',
                                                opacity: isSubmitting ? 0.7 : 1,
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                border: 'none',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }}
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Request
                                                    <Send style={{ width: 18, height: 18 }} />
                                                </>
                                            )}
                                        </motion.button>

                                        <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                                            By submitting, you agree to our{" "}
                                            <a href="#" style={{ color: '#14532d', textDecoration: 'underline' }}>Privacy Policy</a>
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{ textAlign: 'center', padding: '3rem 0' }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.6 }}
                                            style={{
                                                width: 80,
                                                height: 80,
                                                margin: '0 auto 1.5rem',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CheckCircle2 style={{ width: 40, height: 40, color: '#14532d' }} />
                                        </motion.div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                                            Thank You!
                                        </h3>
                                        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                                            We&apos;ve received your request and will contact you within 24 hours.
                                        </p>
                                        <motion.button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({ name: "", email: "", phone: "", service: "", message: "" });
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                background: 'transparent',
                                                color: '#14532d',
                                                fontWeight: 600,
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '9999px',
                                                border: '2px solid #14532d',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Submit Another Request
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
