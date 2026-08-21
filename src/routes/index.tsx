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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scrib Foundation — Considered writing on technology, design & business" },
      {
        name: "description",
        content:
          "Independent long-form reporting and essays on technology, artificial intelligence, design, and the craft of building companies.",
      },
      {
        property: "og:title",
        content: "Scrib Foundation — Considered writing on technology, design & business",
      },
      {
        property: "og:description",
        content:
          "Independent long-form reporting and essays on technology, artificial intelligence, design, and the craft of building companies.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
        <Container className="grid gap-10 pt-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
          <div className="reveal">
            <p className="eyebrow">Issue 41 · Independent since 2016</p>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.02em] text-balance-tight sm:text-6xl lg:text-[4.4rem]">
              Considered writing for people who build things carefully.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Scrib Foundation publishes long-form reporting on technology, machine intelligence, design
              and the business of company building — researched slowly and edited properly.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/explore">
                  Start reading <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Our editorial philosophy</Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { value: "24k", label: "Subscribers" },
                { value: "1.2m", label: "Annual readers" },
                { value: "41", label: "Issues published" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-semibold sm:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="zoom-frame relative aspect-4/5 w-full overflow-hidden border border-border bg-secondary shadow-lift sm:aspect-3/2 lg:aspect-4/5">
              <CoverImage src="/images/hero-editorial.jpg" alt="The Scrib Foundation desk" eager />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden max-w-[220px] border border-border bg-card p-5 shadow-paper sm:block lg:-left-10">
              <p className="eyebrow">This week</p>
              <p className="mt-2 font-display text-base leading-snug">
                The quiet return of institutional patience.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ————— FEATURED ————— */}
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow="Featured" title="The lead story" />

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
