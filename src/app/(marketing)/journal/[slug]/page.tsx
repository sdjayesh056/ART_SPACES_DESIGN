import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactList } from "@/components/sections/FactList";
import { AsideLinks } from "@/components/sections/HeroAsides";
import { Heading, Tiles } from "@/components/sections/kit";
import { LongForm } from "@/components/sections/Prose";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ARTICLES, findArticle } from "@/data/journal";
import { articleJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Not found" };

  return {
    // The article's own title is long; the template suffix would push it past a sensible length.
    title: { absolute: article.title },
    description: article.metaDescription,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      url: `/journal/${article.slug}`,
      publishedTime: article.datePublished,
      // An openGraph object replaces the root one, so the image must be restated.
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const published = DATE.format(new Date(article.datePublished));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.metaDescription,
          path: `/journal/${article.slug}`,
          datePublished: article.datePublished,
          image: article.image,
        })}
      />

      <PageHero
        image={article.image}
        imageAlt={article.imageAlt}
        eyebrow={`${article.category} · ${article.readingTime}`}
        title={article.title}
        lede={article.excerpt}
        aside={
          <AsideLinks
            title="In this article"
            items={article.sections.map((section) => ({ label: section.heading, href: `#${section.id}` }))}
          />
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.category },
        ]}
      />

      <Section labelledBy={article.sections[0].id}>
        <Container size="wide">
          <article>
            <LongForm
              sections={article.sections}
              indexLabel="In this article"
              aside={
                <FactList
                  className="mt-6 rounded-card border border-line bg-surface px-6 shadow-card"
                  facts={[
                    { label: "Published", value: published },
                    { label: "Topic", value: article.category },
                    { label: "By", value: "ArtSpaces Design" },
                  ]}
                />
              }
            />
          </article>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="article-related-heading">
        <Container size="wide">
          <Heading id="article-related-heading" eyebrow="Related" title="Where this" highlight="leads" className="mb-14" />
          <Tiles
            items={article.related.map((link) => ({
              title: link.label,
              description: "Read how the studio approaches it, and what is included.",
              href: link.href,
              meta: "From the studio",
            }))}
          />
        </Container>
      </Section>

      <CtaBand id="article-cta-heading" variant="brand" title="Planning something" highlight="like this?" secondary={{ label: "Back to the journal", href: "/journal" }} />
    </>
  );
}
