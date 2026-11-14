import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { COMPANY_STATS } from "@/data/company-stats";
import { breadcrumbJsonLd } from "@/lib/seo";

import { Container } from "./Container";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
    eyebrow?: string;
    /** Kept for call-site compatibility; the kicker is typographic and shows no icon. */
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    /** Rendered in the gradient after the title. */
    highlight?: string;
    lede?: string;
    breadcrumbs?: Crumb[];
    /** Calls to action under the lede. */
    children?: React.ReactNode;
    /** IMMERSIVE: a full-bleed photograph with the type set over it. */
    image?: string;
    imageAlt?: string;
    /** IMMERSIVE: a frosted card beside the headline, from lg up. */
    aside?: React.ReactNode;
    /** IMMERSIVE: the studio's headline figures along the bottom edge. */
    stats?: boolean;
    /** SPLIT: an illustration or composed visual beside the headline. */
    visual?: React.ReactNode;
};

const KICKER = "font-mono text-xs font-medium uppercase tracking-[0.22em]";

function Crumbs({ items, inverse = false }: { items: Crumb[]; inverse?: boolean }) {
    const rest = inverse ? "text-ink-inverse/75" : "text-ink-subtle";
    const current = inverse ? "text-ink-inverse" : "text-ink";
    const hover = inverse ? "hover:text-ink-inverse" : "hover:text-brand-900";

    return (
        <nav aria-label="Breadcrumb" className="mb-3">
            <ol className={`flex list-none flex-wrap items-center gap-1 p-0 text-sm ${rest}`}>
                {items.map((crumb, index) => (
                    <li key={crumb.label} className="flex items-center gap-1">
                        {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                        {crumb.href ? (
                            <Link href={crumb.href} className={`inline-flex min-h-11 items-center px-1 ${hover}`}>
                                {crumb.label}
                            </Link>
                        ) : (
                            <span aria-current="page" className={`inline-flex min-h-11 items-center px-1 ${current}`}>
                                {crumb.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

/**
 * Masthead for every page below the home page. One h1, always. Three forms:
 *
 * - `image`  → immersive: one photograph, edge to edge, exactly one screen tall.
 *               The headline is sized against viewport height as well as width
 *               so the calls to action always land above the fold.
 * - `visual` → split: headline beside an illustration.
 * - neither  → compact: type only, for utility pages.
 *
 * The display type is large, light and tight rather than heavy — size carries
 * the hierarchy, so the weight can stay elegant. Nothing here animates in:
 * an entrance from opacity 0 is baked into the HTML and holds LCP hostage.
 */
export function PageHero({
    eyebrow,
    title,
    highlight,
    lede,
    breadcrumbs,
    children,
    image,
    imageAlt = "",
    aside,
    stats = false,
    visual,
}: PageHeroProps) {
    const crumbs = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : null;
    const jsonLd = crumbs && <JsonLd data={breadcrumbJsonLd(crumbs)} />;

    if (image) {
        return (
            <section className="bg-brand-950">
                {jsonLd}
                <div className="relative flex min-h-[100svh] flex-col justify-end overflow-clip">
                    <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/40 to-scrim/25" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-scrim/55 to-transparent" />

                    <Container size="wide" className="relative z-10 pb-6 pt-24 text-ink-inverse md:pb-9 md:pt-28">
                        {crumbs && <Crumbs items={crumbs} inverse />}
                        <div className={`grid items-end gap-10 lg:gap-16 ${aside ? "lg:grid-cols-[1.6fr_1fr]" : ""}`}>
                            <div className="max-w-4xl">
                                {eyebrow && (
                                    <p className={`${KICKER} mb-5 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md`}>
                                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-on-brand" />
                                        {eyebrow}
                                    </p>
                                )}
                                <h1 className="text-[clamp(2.125rem,min(4.6vw,8svh),4.25rem)] font-medium leading-[1.03] tracking-[-0.035em] text-balance">
                                    {title}
                                    {highlight && (
                                        <>
                                            {" "}
                                            <span className="bg-gradient-to-r from-accent-300 to-brand-300 bg-clip-text text-transparent">
                                                {highlight}
                                            </span>
                                        </>
                                    )}
                                </h1>
                                {lede && (
                                    <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-pretty text-ink-inverse/85 md:text-lg">
                                        {lede}
                                    </p>
                                )}
                                {children && <div className="mt-7">{children}</div>}
                            </div>
                            {aside && (
                                <div className="hidden rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-xl lg:block">
                                    {aside}
                                </div>
                            )}
                        </div>

                        {stats && (
                            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/20 pt-5 md:mt-9 md:max-w-2xl">
                                {COMPANY_STATS.slice(0, 3).map((stat) => (
                                    <div key={stat.id} className="flex flex-col-reverse">
                                        <dt className="mt-1 text-xs text-ink-inverse/70 sm:text-sm">{stat.label}</dt>
                                        <dd className="text-3xl font-medium tracking-tight sm:text-4xl">
                                            {stat.value}
                                            <span className="text-accent-on-brand">{stat.suffix}</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </Container>
                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-clip bg-surface-muted pb-16 pt-32 md:pb-24 md:pt-40">
            {jsonLd}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-brand-200/45 blur-[140px]" />
                <div className="absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent-100/70 blur-[140px]" />
            </div>

            <Container size="wide" className={`relative z-10 ${visual ? "grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20" : ""}`}>
                <div className="max-w-4xl">
                    {crumbs && <Crumbs items={crumbs} />}
                    {eyebrow && (
                        <p className={`${KICKER} mb-6 flex items-center gap-3 text-accent-600`}>
                            <span aria-hidden="true" className="h-px w-10 bg-accent-500" />
                            {eyebrow}
                        </p>
                    )}
                    <h1 className="text-[clamp(2.5rem,5.6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance text-ink">
                        {title}
                        {highlight && <> <span className="brand-gradient-text">{highlight}</span></>}
                    </h1>
                    {lede && (
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted md:text-xl">{lede}</p>
                    )}
                    {children && <div className="mt-9">{children}</div>}
                </div>
                {visual}
            </Container>
        </section>
    );
}
