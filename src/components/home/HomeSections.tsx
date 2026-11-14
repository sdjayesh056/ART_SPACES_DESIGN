import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ServiceSchedule } from "@/components/home/ServiceSchedule";
import { FloorPlan } from "@/components/illustrations";
import { IllustrationFrame } from "@/components/sections/FeatureSplit";
import { Heading, KICKER } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ARTICLES } from "@/data/journal";
import { menuData } from "@/data/navigation";
import { PROCESS_PRINCIPLES } from "@/data/process";
import { TESTIMONIALS } from "@/data/testimonials";

/*
 * The home page below the hero. Each section is numbered like a sheet in a
 * drawing set and uses the inner pages' type system, so the site reads as one
 * piece of work. All Server Components; ServiceSchedule is the only island.
 */

const TEXT_LINK = "inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900 underline underline-offset-4";
const SHEET_LABEL = "font-mono text-[11px] uppercase tracking-[0.18em]";
const two = (value: number) => String(value).padStart(2, "0");

/** 01 — what the studio is, beside the drawing every project starts as. */
export function StudioStatement() {
    return (
        <Section labelledBy="studio-heading">
            <Container size="wide">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
                    <div>
                        <Heading
                            id="studio-heading"
                            eyebrow="01 — The studio"
                            title="We plan before"
                            highlight="we decorate"
                            lede="ArtSpaces is an interior architecture studio in Mumbai. Every project begins as a measured drawing, becomes a 3D model you can walk through, and reaches site only after you have approved each room."
                        />
                        <Reveal delay={0.1} className="mt-6">
                            <Link href="/about" className={TEXT_LINK}>
                                About the studio
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                        <IllustrationFrame caption="Every room starts as a measured plan">
                            <FloorPlan title="Annotated floor plan of a two-bedroom apartment with furniture and overall dimensions" />
                        </IllustrationFrame>
                    </Reveal>
                </div>

                <ol className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
                    {PROCESS_PRINCIPLES.map((principle, index) => (
                        <li key={principle.title}>
                            <p className={`${KICKER} text-brand-800`}>{two(index + 1)}</p>
                            <h3 className="mt-3 text-xl font-medium tracking-tight text-ink">{principle.title}</h3>
                            <p className="mt-2 leading-relaxed text-ink-muted">{principle.body}</p>
                        </li>
                    ))}
                </ol>
            </Container>
        </Section>
    );
}

/** 02 — the services, as a schedule of drawings. */
export function ServicesBand() {
    return (
        <Section id="services" surface="muted" labelledBy="services-heading">
            <Container size="wide">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
                    <Heading id="services-heading" eyebrow="02 — Scope of work" title="Six disciplines," highlight="one studio" />
                    <Link href="/services" className={TEXT_LINK}>
                        All services
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
                <ServiceSchedule />
            </Container>
        </Section>
    );
}

/** 03 — the four sectors, as panels that open under the pointer. */
export function SectorPanels() {
    return (
        <Section labelledBy="sectors-heading">
            <Container size="wide">
                <Heading
                    id="sectors-heading"
                    eyebrow="03 — Sectors"
                    title="Four kinds of space,"
                    highlight="one standard"
                    lede="Homes, workplaces, hotels and shops ask different questions. The drawing discipline behind the answers is the same."
                    className="mb-12"
                />
                <ul className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
                    {menuData.spaces.items.map((sector, index) => (
                        <li
                            key={sector.id}
                            className="group relative h-60 overflow-clip rounded-card lg:h-auto lg:flex-1 lg:transition-[flex-grow] lg:duration-500 lg:ease-out lg:hover:flex-[2.6] lg:focus-within:flex-[2.6]"
                        >
                            <Image src={sector.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-brand-950/10" />
                            <Link href={sector.href} className="absolute inset-0 flex flex-col justify-between p-5 text-ink-inverse md:p-6">
                                <span className={`${SHEET_LABEL} flex items-center justify-between`}>
                                    A-{two(index + 1)}
                                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span>
                                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{sector.title}</h3>
                                    <span className="mt-2 block max-w-sm text-sm leading-relaxed text-ink-inverse/85 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-within:max-h-24 lg:group-focus-within:opacity-100">
                                        {sector.description}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}

/** 06 — one client quote set large, three more ruled beside it. */
export function ClientVoices() {
    const [lead, ...others] = TESTIMONIALS;

    return (
        <Section id="testimonials" labelledBy="voices-heading">
            <Container size="wide">
                <Heading id="voices-heading" eyebrow="06 — Clients" title="In our" highlight="clients' words" className="mb-14" />
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
                    <Reveal>
                        <figure className="border-t-2 border-brand-900 pt-8">
                            <blockquote className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.02em] text-pretty text-ink">“{lead.quote}”</blockquote>
                            <figcaption className="mt-8 text-sm text-ink-muted">
                                <span className="font-semibold text-ink">{lead.author}</span> — {lead.role}, {lead.location}
                            </figcaption>
                        </figure>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="divide-y divide-line border-y border-line">
                            {others.slice(0, 3).map((item) => (
                                <li key={item.id} className="py-6">
                                    <figure>
                                        <blockquote className="leading-relaxed text-ink-muted">“{item.quote}”</blockquote>
                                        <figcaption className="mt-3 text-sm text-ink-subtle">
                                            <span className="font-semibold text-ink">{item.author}</span> — {item.role}
                                        </figcaption>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                        <Link href="/portfolio/testimonials" className={`${TEXT_LINK} mt-6`}>
                            More client stories
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}

/** 07 — the three latest journal articles. */
export function JournalTeaser() {
    return (
        <Section surface="muted" labelledBy="journal-heading">
            <Container size="wide">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                    <Heading id="journal-heading" eyebrow="07 — Journal" title="Notes from" highlight="the drawing board" />
                    <Link href="/journal" className={TEXT_LINK}>
                        All articles
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
                <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
                    {ARTICLES.slice(0, 3).map((article) => (
                        <li key={article.slug}>
                            <Link href={`/journal/${article.slug}`} className="group block">
                                <span className="relative block aspect-[4/3] overflow-clip rounded-card">
                                    <Image src={article.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </span>
                                <span className={`${KICKER} mt-5 block text-brand-800`}>{article.category}</span>
                                <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-900">{article.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}
