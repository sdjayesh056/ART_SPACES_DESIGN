import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { NEXT_STEPS, RESPONSE_FACTS } from "@/data/process";
import { STUDIO } from "@/data/studio";

import { AsideCard } from "./Blocks";
import { FactList } from "./FactList";

/** What happens after the form is sent — the reassurance beside both enquiry forms. */
export function NextSteps() {
    return (
        <AsideCard title="What happens next">
            <ol className="list-none space-y-5 p-0">
                {NEXT_STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-900 font-mono text-xs font-medium text-accent-on-brand">
                            {index + 1}
                        </span>
                        <span>
                            <span className="block font-semibold text-ink">{step.title}</span>
                            <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{step.body}</span>
                        </span>
                    </li>
                ))}
            </ol>
        </AsideCard>
    );
}

/** Response time, hours and the cities the studio travels to. */
export function StudioFacts() {
    return (
        <AsideCard title="Response and reach">
            <FactList facts={RESPONSE_FACTS} />
            <p className="mt-6 text-eyebrow uppercase text-ink-subtle">Cities we serve</p>
            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0 text-sm">
                {STUDIO.servedCities.map((city) => (
                    <li key={city} className="rounded-full border border-line bg-surface-muted px-3 py-1.5 font-medium text-ink">
                        {city}
                    </li>
                ))}
            </ul>
        </AsideCard>
    );
}

const CHANNELS = [
    { icon: Phone, label: "Call the studio", value: STUDIO.phone.display, href: STUDIO.phone.href },
    { icon: Mail, label: "Email us", value: STUDIO.email.display, href: STUDIO.email.href },
];

/** Direct phone and email links, and the studio's address. */
export function ContactChannels() {
    return (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
            {CHANNELS.map((channel) => (
                <li key={channel.label}>
                    <a
                        href={channel.href}
                        className="group flex h-full flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-card transition-all duration-500 hover:border-brand-900 hover:bg-brand-950"
                    >
                        <channel.icon className="h-7 w-7 text-brand-700 transition-colors group-hover:text-accent-on-brand" strokeWidth={1.25} aria-hidden="true" />
                        <span>
                            <span className="block text-eyebrow uppercase text-ink-subtle transition-colors group-hover:text-ink-inverse/70">{channel.label}</span>
                            <span className="mt-1 block text-lg font-medium text-ink transition-colors group-hover:text-ink-inverse">{channel.value}</span>
                        </span>
                    </a>
                </li>
            ))}
            <li className="flex gap-5 rounded-card border border-line bg-surface p-6 shadow-card sm:col-span-2">
                <MapPin className="h-7 w-7 shrink-0 text-brand-700" strokeWidth={1.25} aria-hidden="true" />
                <span>
                    <span className="block text-eyebrow uppercase text-ink-subtle">Studio</span>
                    <address className="mt-1 text-lg font-medium not-italic text-ink">
                        {STUDIO.address.locality}, {STUDIO.address.region}, {STUDIO.address.country}
                    </address>
                </span>
            </li>
        </ul>
    );
}
