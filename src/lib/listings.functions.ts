import { createServerFn } from "@tanstack/react-start";

import { POST_SELECT } from "./posts.functions";

/** Public server-side read of everything the homepage and archive need (SSR + SEO). */
export const fetchListings = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicServerClient } = await import("./supabase-public.server");
  const supabase = getPublicServerClient();

  const [posts, categories, authors] = await Promise.all([
    supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase.from("categories").select("*").order("name"),
    supabase.from("authors").select("*").order("name"),
  ]);

  if (posts.error) throw new Error(posts.error.message);

  return {
    posts: posts.data ?? [],
    categories: categories.data ?? [],
    authors: authors.data ?? [],
  };
});
