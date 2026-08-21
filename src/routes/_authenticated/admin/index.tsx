import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, FolderTree, PenLine, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { adminUsersQuery, allPostsQuery, categoriesQuery } from "@/lib/api";
import { formatShortDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin overview — Scrib Foundation" },
      { name: "description", content: "Editorial statistics and recent activity." },
      { property: "og:title", content: "Admin overview — Scrib Foundation" },
      { property: "og:description", content: "Editorial statistics and recent activity." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOverview,
});

function AdminOverview() {
  const { data: posts, isLoading } = useQuery(allPostsQuery());
  const { data: categories } = useQuery(categoriesQuery());
  const { data: users } = useQuery(adminUsersQuery());

  const published = posts?.filter((post) => post.status === "published") ?? [];
  const drafts = posts?.filter((post) => post.status === "draft") ?? [];

  const stats = [
    { label: "Total articles", value: posts?.length ?? 0, icon: FileText },
    { label: "Published", value: published.length, icon: FileText },
    { label: "Drafts", value: drafts.length, icon: PenLine },
    { label: "Categories", value: categories?.length ?? 0, icon: FolderTree },
    { label: "Readers", value: users?.length ?? 0, icon: Users },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Console</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Overview</h1>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new">
            <PenLine className="size-4" /> New article
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="paper p-5">
            <stat.icon className="size-4 text-brass" />
            <p className="mt-4 font-display text-3xl font-semibold">
              {isLoading ? "—" : stat.value}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-semibold">Recent articles</h2>
          <ul className="mt-5 grid gap-3">
            {(posts ?? []).slice(0, 6).map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between gap-4 border border-border bg-card px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{post.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.category?.name ?? "Uncategorised"} ·{" "}
                    {formatShortDate(post.published_at ?? post.created_at)}
                  </p>
                </div>
                <StatusPill status={post.status} />
              </li>
            ))}
            {!isLoading && (posts ?? []).length === 0 && (
              <li className="text-sm text-muted-foreground">No articles yet.</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Newest readers</h2>
          <ul className="mt-5 grid gap-3">
            {(users ?? []).slice(0, 6).map((reader) => (
              <li
                key={reader.id}
                className="flex items-center justify-between gap-4 border border-border bg-card px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{reader.full_name ?? "Reader"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {formatShortDate(reader.created_at)}
                  </p>
                </div>
                <span className="text-[10px] tracking-[0.14em] text-brass uppercase">
                  {reader.role}
                </span>
              </li>
            ))}
            {(users ?? []).length === 0 && (
              <li className="text-sm text-muted-foreground">No registered readers yet.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className={`shrink-0 border px-2 py-1 text-[10px] tracking-[0.14em] uppercase ${
        published ? "border-brass/50 bg-brass/10 text-brass" : "border-border bg-secondary text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
