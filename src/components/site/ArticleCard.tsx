import { Link } from "@tanstack/react-router";
import { Clock, Eye } from "lucide-react";

import { CoverImage } from "@/components/site/CoverImage";
import type { Post } from "@/lib/api";
import { formatCount, formatDate } from "@/lib/format";

export function ArticleCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/post/$slug"
        params={{ slug: post.slug }}
        className="zoom-frame relative block aspect-16/10 w-full overflow-hidden border border-border bg-secondary"
      >
        <CoverImage src={post.cover_image} alt={post.title} eager={priority} />
        {post.category && (
          <span className="absolute top-3 left-3 bg-background/92 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase backdrop-blur">
            {post.category.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-xl leading-snug font-semibold tracking-tight">
          <Link
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="transition-colors group-hover:text-brass"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-4 text-xs text-muted-foreground hairline">
          <span className="font-medium text-foreground">{post.author?.name ?? "Scrib Foundation"}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {post.reading_time} min
          </span>
          {post.view_count > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3" /> {formatCount(post.view_count)}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="aspect-16/10 w-full animate-pulse border border-border bg-secondary" />
      <div className="pt-5">
        <div className="h-5 w-4/5 animate-pulse rounded bg-secondary" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="mt-6 h-3 w-1/2 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}
