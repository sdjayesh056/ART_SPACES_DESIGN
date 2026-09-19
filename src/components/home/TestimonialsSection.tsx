import React from "react";
import { Sparkles } from "lucide-react";

import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Server Component; only the marquee's pause control needs the client.
 *
 * The previous version rendered twelve cards, each with its own
 * useMotionValue/useSpring/useTransform 3D-tilt rig running mouse-move
 * handlers — a lot of machinery for a five-degree tilt on content that is
 * already scrolling past. Dropped in favour of the scroll itself.
 */
export function TestimonialsSection() {
    return (
        <Section id="testimonials" labelledBy="testimonials-heading">
            <Container>
                <SectionHeading
                    id="testimonials-heading"
                    eyebrow="Voices of Satisfaction"
                    eyebrowIcon={Sparkles}
                    title="Trusted by"
                    highlight="Visionaries"
                    lede="Hear from the homeowners, founders and developers who have experienced the ArtSpaces transformation."
                    className="mb-16"
                />
            </Container>

            {/* Full-bleed: the marquee runs edge to edge. */}
            <TestimonialMarquee />
        </Section>
    );
}
