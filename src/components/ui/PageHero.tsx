import React from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    /** Rendered in the brand gradient after the title. */
    highlight?: string;
    lede?: string;
    breadcrumbs?: Crumb[];
    children?: React.ReactNode;
};

/**
 * Masthead for every page below the home page: one h1, optional breadcrumb
 * trail, and room for a call to action underneath.
 *
 * Deliberately unanimated above the fold, for the same reason HeroSection is —
 * an entrance from opacity 0 is baked into the prerendered HTML and holds LCP
 * hostage to hydration.
 */
export function PageHero({
    eyebrow,
    eyebrowIcon,
    title,
    highlight,
    lede,
    breadcrumbs,
    children,
}: PageHeroProps) {
    return (
        <section className="relative overflow-hidden bg-surface-muted pb-16 pt-32 md:pb-20 md:pt-40">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -left-24 -top-24 h-[min(28rem,65vw)] w-[min(28rem,65vw)] rounded-full bg-brand-100/60 blur-[120px]" />
                <div className="absolute -right-24 top-10 h-[min(24rem,60vw)] w-[min(24rem,60vw)] rounded-full bg-accent-100/50 blur-[120px]" />
            </div>

            {/* Structured data mirrors the visible trail — one source, no drift. */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
            )}

            <Container className="relative z-10">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex list-none flex-wrap items-center gap-1 p-0 text-sm text-ink-subtle">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={crumb.label} className="flex items-center gap-1">
                                    {index > 0 && (
                                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    )}
                                    {crumb.href ? (
                                        <Link
                                            href={crumb.href}
                                            className="rounded px-1 py-2 hover:text-brand-900"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span aria-current="page" className="px-1 py-2 text-ink">
                                            {crumb.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                <div className="max-w-3xl">
                    {eyebrow && (
                        <Eyebrow icon={eyebrowIcon} className="mb-6">
                            {eyebrow}
                        </Eyebrow>
                    )}

                    <h1 className="text-display font-extrabold text-balance text-ink">
                        {title}
                        {highlight && <> <span className="brand-gradient-text">{highlight}</span></>}
                    </h1>

                    {lede && (
                        <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-muted">
                            {lede}
                        </p>
                    )}

                    {children && <Reveal className="mt-10">{children}</Reveal>}
                </div>
            </Container>
        </section>
    );
}
