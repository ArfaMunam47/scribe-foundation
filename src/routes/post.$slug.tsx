import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  Eye,
  Link2,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ArticleCard } from "@/components/site/ArticleCard";
import { ArticleContents, ArticleContentsRail } from "@/components/site/ArticleContents";
import { CoverImage } from "@/components/site/CoverImage";
import { Markdown } from "@/components/site/Markdown";
import { Container, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatCount, formatDate, initials } from "@/lib/format";
import { fetchPublishedPost } from "@/lib/posts.functions";

export const Route = createFileRoute("/post/$slug")({
  loader: async ({ params }) => {
    const result = await fetchPublishedPost({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result as { post: Post; related: Post[] };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — Scrib Foundation" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const description = post.excerpt ?? `${post.title} — reporting from Scrib Foundation.`;
    return {
      meta: [
        { title: `${post.title} — Scrib Foundation` },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/post/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/post/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            datePublished: post.published_at,
            author: { "@type": "Person", name: post.author?.name ?? "Scrib Foundation" },
            publisher: { "@type": "Organization", name: "Scrib Foundation" },
          }),
        },
      ],
    };
  },
  component: PostPage,
  errorComponent: () => (
    <SiteShell>
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">This article didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Please refresh, or return to the archive.</p>
        <Button asChild className="mt-8">
          <Link to="/explore">Back to the archive</Link>
        </Button>
      </Container>
    </SiteShell>
  ),
  notFoundComponent: () => (
    <SiteShell>
      <Container className="py-24 text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">This article isn't published</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          It may have been unpublished or moved to the archive.
        </p>
        <Button asChild className="mt-8">
          <Link to="/explore">Browse published articles</Link>
        </Button>
      </Container>
    </SiteShell>
  ),
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    void supabase
      .from("posts")
      .update({ view_count: post.view_count + 1 })
      .eq("id", post.id)
      .then(() => undefined);
  }, [post.id, post.view_count]);

  return (
    <SiteShell>
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-brass transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <article>
        <Container className="pt-10 lg:pt-14">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> The archive
          </Link>

          <header className="mx-auto mt-10 max-w-3xl text-center">
            {post.category && (
              <Link
                to="/explore"
                search={{ category: post.category.slug }}
                className="eyebrow text-brass transition-opacity hover:opacity-70"
              >
                {post.category.name}
              </Link>
            )}
            <h1 className="mt-5 font-display text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.02em] text-balance-tight sm:text-5xl lg:text-[3.4rem]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {post.author?.name ?? "Scrib Foundation"}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" /> {post.reading_time} min read
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3" /> {formatCount(post.view_count)} reads
              </span>
            </div>
          </header>
        </Container>

        <Container className="mt-12">
          <div className="relative mx-auto aspect-16/9 max-w-5xl overflow-hidden border border-border bg-secondary shadow-lift">
            <CoverImage src={post.cover_image} alt={post.title} eager />
          </div>
        </Container>

        <Container className="py-14 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[auto_minmax(0,42rem)_auto] lg:gap-14">
            <ShareRail post={post} />
            <div>
              <ArticleContents content={post.content} />
              <Markdown content={post.content} />
              <AuthorCard post={post} />
            </div>
            <ArticleContentsRail content={post.content} />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
          <Container>
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Related from the desk
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} post={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </SiteShell>
  );
}

function ShareRail({ post }: { post: Post }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookmark } = useQuery({
    queryKey: ["bookmark", post.id, user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("post_id", post.id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const toggleBookmark = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Sign in to save articles");
      if (bookmark) {
        const { error } = await supabase.from("bookmarks").delete().eq("id", bookmark.id);
        if (error) throw new Error(error.message);
        return "removed" as const;
      }
      const { error } = await supabase
        .from("bookmarks")
        .insert({ post_id: post.id, user_id: user.id });
      if (error) throw new Error(error.message);
      return "saved" as const;
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ["bookmark", post.id, user?.id] });
      void queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success(result === "saved" ? "Saved to your library" : "Removed from your library");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function copyLink() {
    void navigator.clipboard.writeText(window.location.href).then(
      () => toast.success("Link copied to clipboard"),
      () => toast.error("Could not copy the link"),
    );
  }

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  return (
    <div className="flex gap-2 lg:sticky lg:top-28 lg:h-fit lg:flex-col">
      <Button variant="outline" size="icon" aria-label="Copy article link" onClick={copyLink}>
        <Link2 className="size-4" />
      </Button>
      <Button variant="outline" size="icon" asChild aria-label="Share on X">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Twitter className="size-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild aria-label="Share on LinkedIn">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Linkedin className="size-4" />
        </a>
      </Button>

      {user ? (
        <Button
          variant={bookmark ? "brass" : "outline"}
          size="icon"
          aria-label={bookmark ? "Remove bookmark" : "Save article"}
          disabled={toggleBookmark.isPending}
          onClick={() => toggleBookmark.mutate()}
        >
          {bookmark ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </Button>
      ) : (
        <Button variant="outline" size="icon" asChild aria-label="Sign in to save this article">
          <Link to="/auth" search={{ mode: "login" }}>
            <Bookmark className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function AuthorCard({ post }: { post: Post }) {
  if (!post.author) return null;

  return (
    <aside className="mt-16 border-t border-border pt-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-brass/10 font-display text-base font-semibold text-brass">
          {initials(post.author.name)}
        </span>
        <div>
          <p className="eyebrow">Written by</p>
          <h2 className="mt-2 font-display text-xl font-semibold">{post.author.name}</h2>
          <p className="mt-1 text-[11px] tracking-[0.14em] text-brass uppercase">
            {post.author.role_title}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {post.author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}
