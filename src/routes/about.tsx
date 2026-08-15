import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CoverImage } from "@/components/site/CoverImage";
import { Newsletter } from "@/components/site/Newsletter";
import { Container, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { authorsQuery } from "@/lib/api";
import { initials } from "@/lib/format";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ivory Review — our mission and editorial philosophy" },
      {
        name: "description",
        content:
          "Why Ivory Review exists: an independent, reader-funded publication built on slow reporting, plain language and editorial independence.",
      },
      { property: "og:title", content: "About Ivory Review" },
      {
        property: "og:description",
        content: "An independent, reader-funded publication built on slow reporting and editorial independence.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Reporting before opinion",
    body: "Every argument we publish is built on primary sources: interviews, documents, and time spent with the people involved.",
  },
  {
    title: "Plain language, always",
    body: "Jargon is usually a way of avoiding a claim. We write sentences that can be disagreed with.",
  },
  {
    title: "Independence by structure",
    body: "We are funded by readers, not placements. No sponsored articles have ever appeared on this site.",
  },
  {
    title: "Slow by design",
    body: "We publish when a piece is finished. Being second and correct has always been the better trade.",
  },
];

function AboutPage() {
  const { data: authors } = useQuery(authorsQuery());

  return (
    <SiteShell>
      <Container className="pt-12 pb-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">About the publication</p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance-tight sm:text-5xl lg:text-6xl">
              An independent review for people who take their work seriously.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ivory Review was founded in 2016 by three journalists who wanted to write about
              technology without the pressure to publish first. A decade later, the standard has not
              changed.
            </p>
          </div>
          <div className="zoom-frame aspect-4/3 overflow-hidden border border-border bg-secondary shadow-lift">
            <CoverImage src="/images/cover-business.jpg" alt="The Ivory Review newsroom" eager />
          </div>
        </div>
      </Container>

      <section className="border-y border-border bg-secondary/40 py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          {[
            {
              label: "Our mission",
              body: "To document how modern technology is actually built and governed — carefully, with the people involved named and the evidence shown.",
            },
            {
              label: "Our vision",
              body: "A publication that a practitioner keeps for a decade, because what it published in 2019 still reads accurately today.",
            },
            {
              label: "Why we exist",
              body: "Because the incentives of the attention economy reward speed and certainty, and almost nothing important is either fast or certain.",
            },
          ].map((block) => (
            <div key={block.label}>
              <h2 className="eyebrow rule-brass inline-block">{block.label}</h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">{block.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Editorial philosophy</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance-tight sm:text-4xl">
              Four rules we have never broken.
            </h2>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.title} className="bg-card p-7">
                <span className="font-display text-sm font-semibold text-brass">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="border-y border-border bg-ink py-16 text-ink-foreground lg:py-20">
        <Container>
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "2016", label: "Founded in London" },
              { value: "24,000", label: "Paying subscribers" },
              { value: "1.2m", label: "Annual readers" },
              { value: "0", label: "Sponsored articles" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-4xl font-semibold text-brass">{stat.value}</dt>
                <dd className="mt-2 text-xs tracking-[0.14em] text-ink-foreground/60 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <p className="eyebrow">The team</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Who writes for Ivory
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {(authors ?? []).map((author) => (
            <div key={author.id}>
              <span className="flex size-16 items-center justify-center rounded-full border border-brass/40 bg-brass/10 font-display text-lg font-semibold text-brass">
                {initials(author.name)}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{author.name}</h3>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-brass uppercase">
                {author.role_title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/explore">Read our reporting</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact the desk</Link>
          </Button>
        </div>
      </Container>

      <Container className="pb-24">
        <Newsletter />
      </Container>
    </SiteShell>
  );
}
