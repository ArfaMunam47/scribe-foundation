import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Eye, EyeOff, PenLine, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/site/SiteShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { allPostsQuery, type Post } from "@/lib/api";
import { formatShortDate } from "@/lib/format";

import { StatusPill } from "./index";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  head: () => ({
    meta: [
      { title: "Manage articles — Ivory Review admin" },
      { name: "description", content: "Create, edit, publish and delete articles." },
      { property: "og:title", content: "Manage articles — Ivory Review admin" },
      { property: "og:description", content: "Create, edit, publish and delete articles." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPosts,
});

function AdminPosts() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery(allPostsQuery());
  const [filter, setFilter] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Post | null>(null);

  const toggleStatus = useMutation({
    mutationFn: async (post: Post) => {
      const next = post.status === "published" ? "draft" : "published";
      const { error } = await supabase
        .from("posts")
        .update({
          status: next,
          published_at: next === "published" ? (post.published_at ?? new Date().toISOString()) : null,
        })
        .eq("id", post.id);
      if (error) throw new Error(error.message);
      return next;
    },
    onSuccess: (next) => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(next === "published" ? "Article published" : "Article unpublished");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (post: Post) => {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPendingDelete(null);
      toast.success("Article deleted");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const list = (posts ?? []).filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase().trim()),
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Articles</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Blog management
          </h1>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="size-4" /> New article
          </Link>
        </Button>
      </div>

      <div className="mt-8 max-w-sm">
        <Input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Filter by title…"
          aria-label="Filter articles"
        />
      </div>

      {isLoading && (
        <div className="mt-8 grid gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-14 animate-pulse border border-border bg-secondary" />
          ))}
        </div>
      )}

      {!isLoading && list.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="No articles found"
            description="Adjust your filter, or create the first article."
            action={
              <Button asChild>
                <Link to="/admin/posts/new">New article</Link>
              </Button>
            }
          />
        </div>
      )}

      {list.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left">
                {["Title", "Author", "Category", "Status", "Published", "Actions"].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="max-w-[280px] px-4 py-3">
                    <p className="truncate font-medium">{post.title}</p>
                    <p className="truncate text-xs text-muted-foreground">/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{post.author?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={post.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatShortDate(post.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label="Edit article">
                        <Link to="/admin/posts/$id/edit" params={{ id: post.id }}>
                          <PenLine className="size-4" />
                        </Link>
                      </Button>
                      {post.status === "published" && (
                        <Button asChild variant="ghost" size="icon" aria-label="Preview article">
                          <Link to="/post/$slug" params={{ slug: post.slug }} target="_blank">
                            <ExternalLink className="size-4" />
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={post.status === "published" ? "Unpublish" : "Publish"}
                        disabled={toggleStatus.isPending}
                        onClick={() => toggleStatus.mutate(post)}
                      >
                        {post.status === "published" ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete article"
                        onClick={() => setPendingDelete(post)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={() => setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.title}” will be permanently removed, along with its bookmarks. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingDelete && remove.mutate(pendingDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
