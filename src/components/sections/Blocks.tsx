import React from "react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPANY_STATS } from "@/data/company-stats";
import { accentAt } from "@/lib/accents";
import type { Project } from "@/types/content";

/** A grid of project cards. Shared so every page lists work the same way. */
export function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={Math.min(index * 0.08, 0.3)}>
                    <ProjectCard project={project} accent={accentAt(index)} />
                </Reveal>
            ))}
        </ul>
    );
}

/**
 * The studio's headline figures as a full-bleed brand band. Reads
 * COMPANY_STATS — pages must not write their own numbers.
 */
export function StatBand({ id, title }: { id: string; title: string }) {
    return (
        <Section surface="brand" labelledBy={id}>
            <Container>
                <h2 id={id} className="sr-only">
                    {title}
                </h2>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
                    {COMPANY_STATS.map((stat) => (
                        <div key={stat.id} className="flex flex-col-reverse border-l border-white/20 pl-5 sm:pl-8">
                            <dt className="mt-3 text-sm font-medium text-ink-inverse/85">{stat.label}</dt>
                            <dd className="text-5xl font-extrabold leading-none tracking-tight text-accent-on-brand md:text-6xl">
                                {stat.value}
                                {stat.suffix}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </Section>
    );
}

/** The enquiry form on the brand surface it was designed for. Form logic is untouched. */
export function EnquiryPanel() {
    return (
        <div
            id="lead-form"
            className="scroll-mt-28 rounded-panel bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 p-6 shadow-2xl sm:p-8 md:p-10"
        >
            <LeadCaptureForm />
        </div>
    );
}

/** A small titled card for the supporting column beside the enquiry form. */
export function AsideCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="text-xl font-medium tracking-tight text-ink">{title}</h3>
            <div className="mt-5">{children}</div>
        </section>
    );
}
