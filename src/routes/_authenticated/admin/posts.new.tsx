import { createFileRoute } from "@tanstack/react-router";

import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/_authenticated/admin/posts/new")({
  head: () => ({
    meta: [
      { title: "New article — Ivory Review admin" },
      { name: "description", content: "Write and publish a new article." },
      { property: "og:title", content: "New article — Ivory Review admin" },
      { property: "og:description", content: "Write and publish a new article." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewPostPage,
});

function NewPostPage() {
  return (
    <div>
      <p className="eyebrow">Articles</p>
      <h1 className="mt-2 mb-8 font-display text-3xl font-semibold tracking-tight">
        Write a new article
      </h1>
      <PostEditor />
    </div>
  );
}
