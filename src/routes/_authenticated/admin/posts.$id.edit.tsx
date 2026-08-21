import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PostEditor } from "@/components/admin/PostEditor";
import { EmptyState } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { allPostsQuery } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/admin/posts/$id/edit")({
  head: () => ({
    meta: [
      { title: "Edit article — Scrib Foundation admin" },
      { name: "description", content: "Edit an existing article." },
      { property: "og:title", content: "Edit article — Scrib Foundation admin" },
      { property: "og:description", content: "Edit an existing article." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const { data: posts, isLoading } = useQuery(allPostsQuery());
  const post = posts?.find((item) => item.id === id);

  return (
    <div>
      <p className="eyebrow">Articles</p>
      <h1 className="mt-2 mb-8 font-display text-3xl font-semibold tracking-tight">Edit article</h1>

      {isLoading && <div className="h-96 animate-pulse border border-border bg-secondary" />}

      {!isLoading && !post && (
        <EmptyState
          title="Article not found"
          description="It may have been deleted by another editor."
          action={
            <Button asChild>
              <Link to="/admin/posts">Back to articles</Link>
            </Button>
          }
        />
      )}

      {post && <PostEditor existing={post} />}
    </div>
  );
}
