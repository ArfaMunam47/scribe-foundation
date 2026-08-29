import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Records one read for a published article. Runs server-side only. */
export const recordPostView = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: post } = await supabaseAdmin
      .from("posts")
      .select("id,view_count,status")
      .eq("slug", data.slug)
      .maybeSingle();

    if (!post || post.status !== "published") return { ok: false };

    await supabaseAdmin
      .from("posts")
      .update({ view_count: (post.view_count ?? 0) + 1 })
      .eq("id", post.id);

    return { ok: true };
  });
