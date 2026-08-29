import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

import { ArticleCard, ArticleCardSkeleton } from "@/components/site/ArticleCard";
import { CoverImage } from "@/components/site/CoverImage";
import { fetchListings } from "@/lib/listings.functions";
import { Container, EmptyState, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesQuery, publishedPostsQuery } from "@/lib/api";
import { formatDate } from "@/lib/format";

const PAGE_SIZE = 6;

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "oldest", "popular"]).optional(),
});

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  loader: () => fetchListings(),
  head: () => ({
    meta: [
      { title: "Explore every article — Scrib Foundation" },
      {
        name: "description",
        content:
          "Search and filter the complete Scrib Foundation archive: essays, interviews and reporting across technology, AI, design, business and startups.",
      },
      { property: "og:title", content: "Explore every article — Scrib Foundation" },
      {
        property: "og:description",
        content: "Search and filter the complete Scrib Foundation archive by section, date and interest.",
      },
      { property: "og:url", content: "/explore" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/explore" }],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(search.q ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const initial = Route.useLoaderData();
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({ ...publishedPostsQuery(), initialData: initial.posts as never });
  const { data: categories } = useQuery({
    ...categoriesQuery(),
    initialData: initial.categories as never,
  });

  const activeCategory = search.category ?? "all";
  const sort = search.sort ?? "newest";
  const query = (search.q ?? "").toLowerCase().trim();

  const filtered = useMemo(() => {
    let list = posts ?? [];
    if (activeCategory !== "all") {
      list = list.filter((post) => post.category?.slug === activeCategory);
    }
    if (query) {
      list = list.filter((post) =>
        [post.title, post.excerpt, post.author?.name, post.category?.name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }
    const sorted = [...list];
    if (sort === "oldest") {
      sorted.sort(
        (a, b) => new Date(a.published_at ?? 0).getTime() - new Date(b.published_at ?? 0).getTime(),
      );
    } else if (sort === "popular") {
      sorted.sort((a, b) => b.view_count - a.view_count);
    } else {
      sorted.sort(
        (a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime(),
      );
    }
    return sorted;
  }, [posts, activeCategory, query, sort]);

  const spotlight = query || activeCategory !== "all" ? null : filtered[0];
  const grid = spotlight ? filtered.slice(1) : filtered;
  const shown = grid.slice(0, visible);

  function updateSearch(next: Partial<z.infer<typeof searchSchema>>) {
    setVisible(PAGE_SIZE);
    void navigate({ to: "/explore", search: (prev) => ({ ...prev, ...next }) });
  }

  return (
    <SiteShell>
      <Container className="pt-12 pb-10 lg:pt-16">
        <p className="eyebrow">The archive</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-balance-tight sm:text-5xl lg:text-6xl">
          Explore every essay, interview and report we've published.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {posts ? `${posts.length} articles` : "The full archive"} across seven desks. Search by
          keyword, narrow by section, or sort by what readers return to most.
        </p>
      </Container>

      {/* ————— CONTROLS ————— */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/92 backdrop-blur-xl lg:top-20">
        <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            className="flex w-full items-center gap-2 lg:max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              updateSearch({ q: term.trim() || undefined });
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search the archive…"
                aria-label="Search the archive"
                className="pl-9"
              />
              {term && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setTerm("");
                    updateSearch({ q: undefined });
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 text-xs text-muted-foreground xl:flex">
              <SlidersHorizontal className="size-3.5" /> Sort
            </div>
            <Select value={sort} onValueChange={(value) => updateSearch({ sort: value as never })}>
              <SelectTrigger className="w-[168px]" aria-label="Sort articles">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="popular">Most read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Container>

        <Container className="pb-4">
          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
            <FilterChip
              label="All sections"
              active={activeCategory === "all"}
              onClick={() => updateSearch({ category: undefined })}
            />
            {(categories ?? []).map((category) => (
              <FilterChip
                key={category.id}
                label={category.name}
                active={activeCategory === category.slug}
                onClick={() => updateSearch({ category: category.slug })}
              />
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:py-16">
        {isError && (
          <EmptyState
            title="The archive is unavailable"
            description="We couldn't reach the archive. Please refresh and try again."
          />
        )}

        {isLoading && (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            title="No articles match your search"
            description={
              query
                ? `We couldn't find anything for "${search.q}". Try a broader term or a different section.`
                : "This section has no published articles yet."
            }
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setTerm("");
                  void navigate({ to: "/explore", search: {} });
                }}
              >
                Clear all filters
              </Button>
            }
          />
        )}

        {spotlight && (
          <article className="group mb-16 grid gap-8 border-b border-border pb-16 lg:grid-cols-2 lg:items-center lg:gap-12">
            <Link
              to="/post/$slug"
              params={{ slug: spotlight.slug }}
              className="zoom-frame relative block aspect-3/2 overflow-hidden border border-border bg-secondary shadow-paper"
            >
              <CoverImage src={spotlight.cover_image} alt={spotlight.title} eager />
            </Link>
            <div>
              <p className="eyebrow text-brass">Editor's pick · {spotlight.category?.name}</p>
              <h2 className="mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-balance-tight lg:text-4xl">
                <Link
                  to="/post/$slug"
                  params={{ slug: spotlight.slug }}
                  className="transition-colors group-hover:text-brass"
                >
                  {spotlight.title}
                </Link>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {spotlight.excerpt}
              </p>
              <p className="mt-6 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{spotlight.author?.name}</span> ·{" "}
                {formatDate(spotlight.published_at)} · {spotlight.reading_time} min read
              </p>
            </div>
          </article>
        )}

        {shown.length > 0 && (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {grid.length > visible && (
          <div className="mt-16 flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              Showing {shown.length} of {grid.length} articles
            </p>
            <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more articles
            </Button>
          </div>
        )}
      </Container>
    </SiteShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 snap-start border px-3.5 py-2 text-xs whitespace-nowrap transition-colors ${
        active
          ? "border-foreground bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-brass hover:text-brass"
      }`}
    >
      {label}
    </button>
  );
}
