import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

import { PlanLight } from "@/components/footer/PlanLight";
import { SitePlan } from "@/components/footer/SitePlan";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SHEET_LABEL, two } from "@/components/home/sheet";
import { Container } from "@/components/ui/Container";
import { FOOTER_ROOMS, LEGAL_LINKS, PRIMARY_CTA } from "@/data/navigation";
import { REASSURANCES } from "@/data/process";
import { SOCIAL_LINKS, STUDIO } from "@/data/studio";

/*
 * The footer is the last sheet of the site: the house drawn in plan. Each
 * room is a section, the schedule beside the drawing lists its pages, and the
 * front door is the free consultation. Under it sits the title block — who
 * the studio is, where it works and how to reach it.
 *
 * Every page already ends on its own call to action, so there is no banner
 * here; the door is the footer's one action.
 */

const LABEL = `${SHEET_LABEL} text-ink-inverse/60`;
const CELL_LABEL = `${LABEL} mb-3`;
const CELL_TEXT = "text-[0.9375rem] leading-relaxed";
/** A hover for small text links: gold, and a step to the right. */
const TEXT_LINK = "transition-[color,translate] duration-300 ease-brand hover:translate-x-1 hover:text-accent-on-brand";
/** Wording for a mouse or trackpad, and its counterpart for a finger. */
const FINE_POINTER = "[@media(pointer:coarse)]:hidden";
const COARSE_POINTER = "hidden [@media(pointer:coarse)]:inline";
/** White while the room is dark, gold while it is lit: see the --lit rule in globals.css. */
const LIT_INK = "text-[color:color-mix(in_srgb,var(--color-accent-on-brand)_calc(var(--lit)*100%),var(--color-ink-inverse))] transition-colors duration-500";

const CITIES = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" }).format(STUDIO.servedCities);

export function Footer() {
    /*
        No year in the copyright line. This page is statically prerendered, so
        a build-time getFullYear() freezes until the next deploy, and computing
        it on the client either mismatches hydration or needs a setState effect.
        A yearless notice is legally sufficient and can never go stale.
    */
    return (
        <footer className="relative overflow-clip border-t border-accent-500/75 bg-surface-ground text-ink-inverse">
            {/* A pool of lighter green under the drawing, so the plan sits in light rather than on a flat fill. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute right-0 top-20 h-[30rem] w-[min(52rem,100%)] rounded-full bg-brand-800/35 blur-[140px]" />
                <div className="absolute -left-40 -top-40 h-[24rem] w-[min(40rem,100%)] rounded-full bg-brand-900/55 blur-[120px]" />
            </div>

            <Container size="wide" className="relative">
                <div className={`${LABEL} flex items-center justify-between gap-6 pt-5 md:pt-7`}>
                    <p>
                        <span className="text-accent-on-brand">A—09</span>
                        <span aria-hidden="true" className="mx-3 inline-block h-px w-6 bg-current align-middle" />
                        Site plan
                    </p>
                    <p className="max-md:hidden">
                        {STUDIO.address.locality} · {STUDIO.address.coordinates}
                    </p>
                </div>

                {/*
                    Three blocks, in reading order: the invitation, the schedule, the plan.
                    Below lg the plan is lifted above the schedule, where it is the key to
                    the lists under it; from xl it stands beside both.
                */}
                <PlanLight
                    initial={FOOTER_ROOMS[0].id}
                    className="grid grid-cols-1 gap-y-8 pt-7 md:gap-y-10 md:pt-9 lg:grid-cols-2 lg:gap-x-12 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] xl:grid-rows-[auto_1fr] xl:gap-x-14 xl:gap-y-8"
                >
                    <div className="lg:col-span-2 lg:max-xl:flex lg:max-xl:items-end lg:max-xl:justify-between lg:max-xl:gap-12 xl:col-span-1">
                        <h2 className="text-[clamp(2.5rem,0.6rem+9.5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.045em] xl:text-[4.25rem]">
                            Where to <span className="text-accent-on-brand">next?</span>
                        </h2>
                        <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-pretty text-ink-inverse/80 md:text-[1.0625rem] lg:max-xl:mt-0 lg:max-xl:max-w-[26rem] xl:max-w-[30rem]">
                            Every room on this plan is a part of the site. <span className={FINE_POINTER}>Point at one to light it,</span>
                            <span className={COARSE_POINTER}>Tap one to step inside,</span> or come straight in by the front door.
                        </p>
                    </div>

                    {/* ── The room schedule: the navigation itself ─────────────────── */}
                    <nav aria-label="Footer" className="max-lg:order-3 xl:col-start-1 xl:row-start-2">
                        <p aria-hidden="true" className={`${LABEL} mb-2.5`}>
                            Room schedule
                        </p>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4 md:gap-x-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 xl:grid-cols-4 xl:gap-x-5">
                            {FOOTER_ROOMS.map((room, index) => (
                                <div key={room.id} data-room={room.id}>
                                    <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 border-b border-white/25 pb-0.5">
                                        <span aria-hidden="true" className="relative grid h-6 w-6 place-items-center rounded-full border border-white/25 font-mono text-[10px] tracking-[0.04em] text-ink-inverse/80">
                                            {two(index + 1)}
                                            {/* The same number on gold, faded in over it while the room is lit. */}
                                            <span className="absolute -inset-px grid place-items-center rounded-full bg-accent-400 font-semibold text-brand-950 opacity-[var(--lit)] transition-opacity duration-500">
                                                {two(index + 1)}
                                            </span>
                                        </span>
                                        <span aria-hidden="true" className={`${LABEL} whitespace-nowrap tracking-[0.16em] max-[359px]:tracking-[0.08em]`}>
                                            {room.drawnAs}
                                        </span>
                                        <h3 className="col-span-2 text-xl font-medium leading-none tracking-[-0.03em] lg:max-xl:text-[1.375rem]">
                                            {room.hasOverview ? (
                                                <Link href={room.href} id={`footer-${room.id}`} className={`group/title inline-flex min-h-11 items-center gap-1.5 ${LIT_INK}`}>
                                                    {room.heading}
                                                    <ArrowUpRight
                                                        className="h-3.5 w-3.5 opacity-60 transition-[opacity,translate] duration-300 ease-brand group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:opacity-100 max-[359px]:hidden"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            ) : (
                                                <span id={`footer-${room.id}`} className={`inline-flex min-h-11 items-center ${LIT_INK}`}>
                                                    {room.heading}
                                                </span>
                                            )}
                                        </h3>
                                        {/* The rule under the heading draws itself in gold while the room is lit. */}
                                        <span aria-hidden="true" className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-[var(--lit)] bg-accent-400 transition-[scale] duration-700 ease-brand" />
                                    </div>
                                    <ul aria-labelledby={`footer-${room.id}`} className={`list-none p-0 pt-1.5 ${room.links.length > 4 ? "lg:max-xl:grid lg:max-xl:grid-cols-2 lg:max-xl:gap-x-4" : ""}`}>
                                        {room.links.map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} className={`flex min-h-11 items-center text-[0.9375rem] text-ink-inverse/85 ${TEXT_LINK}`}>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* ── The plan, and the front door under it ────────────────────── */}
                    <div className="max-lg:order-2 xl:col-start-2 xl:row-span-2 xl:row-start-1">
                        {/* The caption describes the drawing, which assistive technology does not see. */}
                        <div aria-hidden="true" className={`${LABEL} mb-3 flex items-center justify-between gap-4 max-md:tracking-[0.14em]`}>
                            <p className="max-sm:hidden">Plan · {two(FOOTER_ROOMS.length)} rooms</p>
                            <p className="flex items-center gap-2.5 whitespace-nowrap text-ink-inverse/80">
                                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                                <span className={FINE_POINTER}>Point at a room to light it</span>
                                <span className={COARSE_POINTER}>Tap a room to enter</span>
                            </p>
                        </div>

                        <SitePlan />

                        {/* The path from the door ends on the one action, which stands on the last of the lawn. */}
                        <div className="relative -mt-3 grid gap-y-3.5 md:-mt-6 md:justify-items-center">
                            <Link
                                href={PRIMARY_CTA.href}
                                data-room="door"
                                className="group/door inline-flex min-h-14 items-center justify-between gap-4 whitespace-nowrap rounded-full bg-accent-400 py-2 pl-6 pr-2 font-semibold text-brand-950 shadow-[0_18px_44px_-18px_var(--color-accent-500)] transition-[background-color,translate] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-accent-300 min-[360px]:pl-7"
                            >
                                Book a free consultation
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-950 text-accent-on-brand transition-[rotate] duration-300 ease-brand group-hover/door:-rotate-45">
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </span>
                            </Link>
                            <ul className="flex list-none flex-col gap-2 p-0 pl-1 text-sm text-ink-inverse/80 md:flex-row md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-1 md:pl-0">
                                {REASSURANCES.map((line) => (
                                    <li key={line} className="flex items-center gap-2.5">
                                        <span aria-hidden="true" className="h-[0.3125rem] w-[0.3125rem] shrink-0 rounded-full bg-accent-400" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </PlanLight>

                {/* ── The title block: who drew it, where, and how to reach them ──── */}
                <div className="mt-10 grid grid-cols-1 border-y border-white/25 md:grid-cols-2 xl:mt-9 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)]">
                    <div className="py-6 md:pr-8 xl:py-5">
                        <Link href="/" aria-label={`${STUDIO.name}, home`} className="inline-flex min-h-11 items-center gap-3.5">
                            <Image src="/Logos/ART_SPACES_DESIGN_LOGO.png" alt="" width={2240} height={1888} sizes="48px" className="h-[2.375rem] w-auto" />
                            {/* The wordmark file is 2816 by 682 with the letters at x 118–2712, y 252–424; this shows the letters alone. */}
                            <span className="relative block aspect-[2595/173] w-[clamp(11.5rem,16vw,15rem)] overflow-hidden">
                                <Image src="/Logos/ART_SPACES_DESIGN_DARK.png" alt="" width={2816} height={682} sizes="280px" className="absolute left-[-4.55%] top-[-145.7%] h-auto w-[108.52%] max-w-none" />
                            </span>
                        </Link>
                        <p className={`${CELL_TEXT} mt-2 text-ink-inverse/80`}>{STUDIO.tagline}</p>
                        <ul className="mt-4 flex list-none gap-2.5 p-0">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                        className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-[background-color,border-color,color,translate] duration-300 ease-brand hover:-translate-y-0.5 hover:border-accent-400 hover:bg-accent-400 hover:text-brand-950"
                                    >
                                        <social.icon className="h-[1.0625rem] w-[1.0625rem]" strokeWidth={1.8} aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-white/15 py-6 md:border-l md:border-t-0 md:pl-8 xl:py-5 xl:pr-8">
                        <p className={CELL_LABEL}>Studio</p>
                        <address className={`${CELL_TEXT} not-italic`}>
                            {STUDIO.address.locality}, {STUDIO.address.region}, {STUDIO.address.country}
                        </address>
                        <p className={`${CELL_TEXT} text-ink-inverse/80`}>{STUDIO.hours.display}</p>
                        <p className={`${CELL_TEXT} mt-3 max-w-72 text-ink-inverse/80`}>Working in {CITIES}.</p>
                    </div>

                    <div className="border-t border-white/15 py-6 md:pr-8 xl:border-l xl:border-t-0 xl:py-5 xl:pl-8">
                        <p className={`${LABEL} mb-1`}>Talk to us</p>
                        <ul className="list-none p-0 text-lg font-medium tracking-[-0.02em]">
                            <li>
                                <a href={STUDIO.phone.href} className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent-on-brand">
                                    {STUDIO.phone.display}
                                </a>
                            </li>
                            <li>
                                <a href={STUDIO.email.href} className="inline-flex min-h-11 items-center wrap-anywhere transition-colors duration-300 hover:text-accent-on-brand">
                                    {STUDIO.email.display}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="border-t border-white/15 py-6 md:border-l md:pl-8 xl:border-t-0 xl:py-5">
                        <p className={CELL_LABEL}>Newsletter</p>
                        <p className={`${CELL_TEXT} text-ink-inverse/80`}>Curated architectural trends delivered to your inbox.</p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1 pb-4 pt-3 text-sm text-ink-inverse/60 max-md:flex-col max-md:items-start max-md:pt-4">
                    <p>© {STUDIO.name}. All rights reserved.</p>
                    <ul className="flex list-none flex-wrap items-center gap-x-6 p-0 md:gap-x-7">
                        {LEGAL_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="inline-flex min-h-11 items-center text-ink-inverse/80 transition-colors duration-300 hover:text-accent-on-brand">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href="#main-content" className="group/top inline-flex min-h-11 items-center gap-2.5 text-ink-inverse/80 transition-colors duration-300 hover:text-accent-on-brand">
                                Back to top
                                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 transition-[border-color,translate] duration-300 ease-brand group-hover/top:-translate-y-0.5 group-hover/top:border-accent-400">
                                    <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}
