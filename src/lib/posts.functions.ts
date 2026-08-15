import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const slugInput = z.object({ slug: z.string().min(1).max(200) });

export const POST_SELECT =
  "id,title,slug,excerpt,content,cover_image,status,featured,reading_time,view_count,published_at,created_at,category:categories(id,name,slug),author:authors(id,name,slug,role_title,bio,avatar_url)";

/** Public read for SSR/SEO of a single published article. */
export const fetchPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => slugInput.parse(data))
  .handler(async ({ data }) => {
    const { getPublicServerClient } = await import("./supabase-public.server");
    const supabase = getPublicServerClient();

    const { data: post, error } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!post) return null;

    const { data: related } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("status", "published")
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);

    return { post, related: related ?? [] };
  });
