import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { KICKER } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ARTICLES, type Article } from "@/data/journal";

export const metadata: Metadata = {
  title: "Interior Design Journal: Ideas and Guides",
  description:
    "Practical interior design guides from ArtSpaces Design, Mumbai: planning a home interior, monsoon-proof materials, lighting, budgets and timelines.",
  alternates: { canonical: "/journal" },
};

const DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

function Meta({ article }: { article: Article }) {
  return (
    <p className={`${KICKER} text-accent-600`}>
      {article.category} · <time dateTime={article.datePublished}>{DATE.format(new Date(article.datePublished))}</time> · {article.readingTime}
    </p>
  );
}

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from"
        highlight="the studio"
        lede="Practical writing on planning, materials, light and budgets — the things we explain to clients most often, written down."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      />

      <Section labelledBy="journal-list-heading">
        <Container size="wide">
          <h2 id="journal-list-heading" className="sr-only">
            Articles
          </h2>

          <Reveal>
            <article>
              <Link href={`/journal/${lead.slug}`} className="group grid overflow-clip rounded-panel border border-line bg-surface shadow-card lg:grid-cols-[1.3fr_1fr]">
                <span className="relative block aspect-[16/10] overflow-clip bg-surface-sunken lg:aspect-auto lg:min-h-[28rem]">
                  <Image src={lead.image} alt={lead.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 760px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-col justify-center p-8 md:p-12">
                  <Meta article={lead} />
                  <h3 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-balance text-ink md:text-4xl">{lead.title}</h3>
                  <span className="mt-4 block text-lg leading-relaxed text-ink-muted">{lead.excerpt}</span>
                  <span className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900">
                    Read the article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </article>
          </Reveal>

          <ul className="mt-8 grid list-none gap-8 p-0 md:grid-cols-2">
            {rest.map((article, index) => (
              <Reveal as="li" key={article.slug} delay={index * 0.08}>
                <article className="h-full">
                  <Link href={`/journal/${article.slug}`} className="group flex h-full flex-col overflow-clip rounded-panel border border-line bg-surface shadow-card">
                    <span className="relative block aspect-[16/9] overflow-clip bg-surface-sunken">
                      <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 768px) 100vw, 620px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </span>
                    <span className="flex grow flex-col p-8">
                      <Meta article={article} />
                      <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight text-balance text-ink">{article.title}</h3>
                      <span className="mt-3 block grow leading-relaxed text-ink-muted">{article.excerpt}</span>
                      <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900">
                        Read the article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand id="journal-cta-heading" variant="brand" title="Rather talk it" highlight="through?" />
    </>
  );
}
