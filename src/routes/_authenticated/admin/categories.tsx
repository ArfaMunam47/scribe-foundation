import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { allPostsQuery, categoriesQuery } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Ivory Review admin" },
      { name: "description", content: "Editorial sections and how many stories sit in each." },
      { property: "og:title", content: "Categories — Ivory Review admin" },
      { property: "og:description", content: "Editorial sections and story counts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories, isLoading } = useQuery(categoriesQuery());
  const { data: posts } = useQuery(allPostsQuery());

  return (
    <div>
      <p className="eyebrow">Taxonomy</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Categories</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Sections used to organise the archive. Each story is filed under one category.
      </p>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading categories…</p>
      ) : (
        <div className="mt-10 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-[0.14em] text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Articles</th>
              </tr>
            </thead>
            <tbody>
              {(categories ?? []).map((category) => (
                <tr key={category.id} className="border-b border-border/70 last:border-0">
                  <td className="px-5 py-4 font-medium">{category.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{category.slug}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {posts?.filter((post) => post.category_id === category.id).length ?? 0}
                  </td>
                </tr>
              ))}
              {(categories ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
