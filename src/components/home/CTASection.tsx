import React from "react";
import { CheckCircle } from "lucide-react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { slideIn } from "@/lib/motion";

const TRUST_POINTS = [
    "Expert Design Consultation",
    "Personalized Space Planning",
    "Sustainable & Smart Solutions",
    "24/7 Dedicated Support",
];

/**
 * Server Component. Only <LeadCaptureForm> crosses the client boundary.
 *
 * This section owns the canonical #lead-form anchor — every "free
 * consultation" call to action on the page scrolls here.
 *
 * Previously it carried around forty inline `style` objects, two
 * always-running blurred blobs, and a <style jsx> block whose `@keyframes
 * pulse` escaped its scope and overrode the pulse Tailwind emits for
 * `animate-pulse` across the whole page. All three are gone.
 */
export function CTASection() {
    return (
        <section
            id="lead-form"
            aria-labelledby="cta-heading"
            className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 py-20 md:py-28"
        >
            {/* Dot pattern. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />

            <Container className="relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left: pitch */}
                    <Reveal variants={slideIn("left")}>
                        <Eyebrow tone="inverse" className="mb-8">
                            <span
                                className="h-2 w-2 rounded-full bg-accent-400 animate-dot-pulse"
                                aria-hidden="true"
                            />
                            Free Design Consultation
                        </Eyebrow>

                        <h2
                            id="cta-heading"
                            className="text-section font-bold text-balance text-ink-inverse"
                        >
                            Ready to Create Your{" "}
                            <span className="text-accent-on-brand">Dream Space?</span>
                        </h2>

                        <p className="mb-10 mt-6 max-w-lg text-lg leading-relaxed text-pretty text-ink-inverse/90">
                            Transform your vision into reality with our expert design team.
                            Schedule your free consultation today and take the first step towards a
                            space that inspires.
                        </p>

                        <ul className="list-none space-y-4 p-0">
                            {TRUST_POINTS.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-center gap-3 font-medium text-ink-inverse"
                                >
                                    <span className="rounded-full bg-white/20 p-1">
                                        <CheckCircle
                                            size={16}
                                            className="text-accent-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* Right: the form */}
                    <Reveal variants={slideIn("right", 0.15)} className="relative">
                        <div className="rounded-panel border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10">
                            <LeadCaptureForm />
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
