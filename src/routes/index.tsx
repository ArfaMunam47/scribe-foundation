import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

import { ArticleCard, ArticleCardSkeleton } from "@/components/site/ArticleCard";
import { CoverImage } from "@/components/site/CoverImage";
import { Newsletter } from "@/components/site/Newsletter";
import {
  Container,
  EmptyState,
  SectionHeading,
  SiteShell,
} from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { authorsQuery, categoriesQuery, publishedPostsQuery, type Post } from "@/lib/api";
import { formatCount, formatDate, initials } from "@/lib/format";

const HOME_TITLE = "Scrib Foundation — writing on community, education & social impact";
const HOME_DESCRIPTION =
  "Practical, independent writing on community programmes, education access, public awareness work and how such work is funded, run and sustained.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: "https://scribe-foundation.lovable.app/" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://scribe-foundation.lovable.app/images/scrib-hero.jpg",
      },
      {
        name: "twitter:image",
        content: "https://scribe-foundation.lovable.app/images/scrib-hero.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://scribe-foundation.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: posts, isLoading, isError } = useQuery(publishedPostsQuery());
  const { data: categories } = useQuery(categoriesQuery());
  const { data: authors } = useQuery(authorsQuery());

  const featured = posts?.find((post) => post.featured) ?? posts?.[0];
  const secondary = posts?.filter((post) => post.id !== featured?.id).slice(0, 2) ?? [];
  const latest = posts?.filter((post) => post.id !== featured?.id).slice(2, 8) ?? [];
  const trending = [...(posts ?? [])].sort((a, b) => b.view_count - a.view_count).slice(0, 5);

  return (
    <SiteShell>
      {/* ————— HERO ————— */}
      <section className="relative overflow-hidden border-b border-border">
        <Container className="grid gap-8 pt-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-16 lg:pb-16">
          <div>
            <p className="eyebrow">The Scrib Foundation journal</p>
            <h1 className="mt-4 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.02em] text-balance-tight sm:text-5xl lg:text-[3.6rem]">
              Practical writing about community work that lasts.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We publish how community, education and awareness programmes are actually designed,
              funded and kept running — written plainly, checked carefully, and free to read.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/explore">
                  Read the articles <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About the foundation</Link>
              </Button>
            </div>

            <ul className="mt-9 grid max-w-lg gap-3 border-t border-border pt-6 sm:grid-cols-3">
              {["Community programmes", "Education access", "Public awareness"].map((item) => (
                <li
                  key={item}
                  className="text-[11px] leading-relaxed tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="zoom-frame relative aspect-4/3 w-full overflow-hidden border border-border bg-secondary shadow-lift lg:aspect-4/3">
            <CoverImage
              src="/images/scrib-hero.jpg"
              alt="Residents seated in a semicircle during a community meeting in a bright hall"
              eager
            />
          </div>
        </Container>
      </section>

      {/* ————— FEATURED ————— */}
      <Container className="py-12 lg:py-16">
        <SectionHeading eyebrow="Featured" title="The lead article" />

        {isLoading && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <ArticleCardSkeleton />
            <div className="grid gap-8">
              <ArticleCardSkeleton />
            </div>
          </div>
        )}

        {isError && (
          <div className="mt-10">
            <EmptyState
              title="Articles could not be loaded"
              description="There was a problem reaching the newsroom archive. Please refresh the page."
            />
          </div>
        )}

        {!isLoading && !isError && !featured && (
          <div className="mt-10">
            <EmptyState
              title="Nothing published yet"
              description="The first issue is still being edited. Check back shortly."
            />
          </div>
        )}

        {featured && (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
            <FeaturedArticle post={featured} />
            <div className="grid content-start gap-10">
              {secondary.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* ————— LATEST + TRENDING ————— */}
      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Latest"
              title="Recently published"
              action={
                <Button asChild variant="editorial">
                  <Link to="/explore">
                    All articles <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              }
            />
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <ArticleCardSkeleton key={index} />)
                : latest.map((post) => <ArticleCard key={post.id} post={post} />)}
            </div>
            {!isLoading && latest.length === 0 && featured && (
              <p className="mt-10 text-sm text-muted-foreground">
                More articles are on the way this week.
              </p>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow border-b border-border pb-4">Most read</p>
            <ol className="mt-6 grid gap-6">
              {trending.map((post, index) => (
                <li key={post.id} className="group flex gap-4">
                  <span className="font-display text-2xl leading-none font-semibold text-brass/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base leading-snug font-medium">
                      <Link
                        to="/post/$slug"
                        params={{ slug: post.slug }}
                        className="transition-colors group-hover:text-brass"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {post.category?.name ?? "Essay"} · {formatCount(post.view_count)} reads
                    </p>
                  </div>
                </li>
              ))}
              {!isLoading && trending.length === 0 && (
                <li className="text-sm text-muted-foreground">No reading data yet.</li>
              )}
            </ol>

            <div className="mt-10 border border-border bg-secondary/40 p-6">
              <p className="eyebrow">Sections</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(categories ?? []).map((category) => (
                  <Link
                    key={category.id}
                    to="/explore"
                    search={{ category: category.slug }}
                    className="border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-brass hover:text-brass"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* ————— CATEGORIES BAND ————— */}
      <section className="border-y border-border bg-ink py-16 text-ink-foreground lg:py-24">
        <Container>
          <p className="eyebrow text-brass">Browse by section</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance-tight sm:text-4xl">
            Seven desks, one editorial standard.
          </h2>
          <div className="mt-12 grid gap-px border border-ink-foreground/15 bg-ink-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {(categories ?? []).map((category) => {
              const count = posts?.filter((post) => post.category?.slug === category.slug).length ?? 0;
              return (
                <Link
                  key={category.id}
                  to="/explore"
                  search={{ category: category.slug }}
                  className="group flex min-h-[168px] flex-col justify-between bg-ink p-6 transition-colors hover:bg-ink-foreground/[0.06]"
                >
                  <div>
                    <h3 className="font-display text-xl font-medium">{category.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-foreground/60">
                      {category.description}
                    </p>
                  </div>
                  <p className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.14em] text-brass uppercase">
                    {count} {count === 1 ? "article" : "articles"}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ————— AUTHORS ————— */}
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow="The masthead" title="Writers you'll read often" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(authors ?? []).map((author) => {
            const count = posts?.filter((post) => post.author?.id === author.id).length ?? 0;
            return (
              <div key={author.id} className="paper flex h-full flex-col p-6">
                <span className="flex size-12 items-center justify-center rounded-full border border-brass/40 bg-brass/10 font-display text-sm font-semibold text-brass">
                  {initials(author.name)}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{author.name}</h3>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-brass uppercase">
                  {author.role_title}
                </p>
                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {author.bio}
                </p>
                <p className="mt-5 text-xs text-muted-foreground">
                  {count} {count === 1 ? "article" : "articles"}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      <Container className="pb-24">
        <Newsletter variant="dark" />
      </Container>
    </SiteShell>
  );
}

function FeaturedArticle({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link
        to="/post/$slug"
        params={{ slug: post.slug }}
        className="zoom-frame relative block aspect-3/2 w-full overflow-hidden border border-border bg-secondary shadow-paper"
      >
        <CoverImage src={post.cover_image} alt={post.title} eager />
      </Link>
      <div className="pt-6">
        <p className="eyebrow text-brass">{post.category?.name ?? "Essay"}</p>
        <h3 className="mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-balance-tight sm:text-4xl">
          <Link
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="transition-colors group-hover:text-brass"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{post.author?.name ?? "Scrib Foundation"}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {post.reading_time} min read
          </span>
        </div>
      </div>
    </article>
  );
}
