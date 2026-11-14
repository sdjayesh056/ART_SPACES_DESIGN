import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

export type LinkCardItem = {
    title: string;
    description: string;
    href: string;
    icon?: LucideIcon;
    /** Small line above the title, e.g. a duration or category. */
    meta?: string;
    image?: string;
    imageAlt?: string;
};

type LinkCardsProps = {
    items: LinkCardItem[];
    columns?: 2 | 3 | 4;
    level?: "h2" | "h3" | "h4";
};

const COLUMNS = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Cards that are each one link — the internal-linking workhorse. With an
 * image they become picture cards; without, icon cards. The arrow is visible
 * at rest, so touch users get the same affordance as hover users.
 */
export function LinkCards({ items, columns = 3, level: Heading = "h3" }: LinkCardsProps) {
    return (
        <ul className={`grid list-none grid-cols-1 gap-6 p-0 ${COLUMNS[columns]}`}>
            {items.map((item, index) => (
                <Reveal as="li" key={item.href} delay={Math.min(index * 0.06, 0.3)}>
                    <Link
                        href={item.href}
                        className="group flex h-full flex-col overflow-clip rounded-panel border border-line bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-900/40 hover:shadow-card-hover"
                    >
                        {item.image && (
                            <span className="relative block aspect-[4/3] overflow-clip bg-surface-sunken">
                                <Image
                                    src={item.image}
                                    alt={item.imageAlt ?? ""}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </span>
                        )}
                        <span className="flex grow flex-col p-7">
                            <span className="mb-5 flex items-start justify-between gap-4">
                                {item.icon ? (
                                    <span className="flex h-12 w-12 items-center justify-center rounded-tile bg-brand-50 text-brand-900">
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                ) : (
                                    <span className="text-eyebrow uppercase text-accent-600">{item.meta}</span>
                                )}
                                <span
                                    aria-hidden="true"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-all duration-300 group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-accent-on-brand"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </span>
                            {item.icon && item.meta && (
                                <span className="mb-2 text-eyebrow uppercase text-accent-600">{item.meta}</span>
                            )}
                            <Heading className="text-xl font-medium tracking-tight leading-tight text-ink">{item.title}</Heading>
                            <span className="mt-3 block leading-relaxed text-ink-muted">{item.description}</span>
                        </span>
                    </Link>
                </Reveal>
            ))}
        </ul>
    );
}
