import { supabase } from "@/integrations/supabase/client";

export const POST_SELECT =
  "id,title,slug,excerpt,content,cover_image,status,featured,reading_time,view_count,published_at,created_at,updated_at,author_id,category_id,category:categories(id,name,slug),author:authors(id,name,slug,role_title,bio,avatar_url)";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  role_title: string | null;
  bio: string | null;
  avatar_url: string | null;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: string;
  featured: boolean;
  reading_time: number;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
  author_id?: string | null;
  category_id?: string | null;
  category: Pick<Category, "id" | "name" | "slug"> | null;
  author: Author | null;
};

function unwrap<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data as T;
}

/* ————— public reads ————— */

export const publishedPostsQuery = () => ({
  queryKey: ["posts", "published"],
  queryFn: async (): Promise<Post[]> =>
    unwrap(
      await supabase
        .from("posts")
        .select(POST_SELECT)
        .eq("status", "published")
        .order("published_at", { ascending: false }),
    ) as unknown as Post[],
});

export const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: async (): Promise<Category[]> =>
    unwrap(await supabase.from("categories").select("*").order("name")) as Category[],
});

export const authorsQuery = () => ({
  queryKey: ["authors"],
  queryFn: async (): Promise<Author[]> =>
    unwrap(await supabase.from("authors").select("*").order("name")) as Author[],
});

export const tagsQuery = () => ({
  queryKey: ["tags"],
  queryFn: async () =>
    unwrap(await supabase.from("tags").select("id,name,slug").order("name")) as {
      id: string;
      name: string;
      slug: string;
    }[],
});

/* ————— admin reads ————— */

export const allPostsQuery = () => ({
  queryKey: ["posts", "all"],
  queryFn: async (): Promise<Post[]> =>
    unwrap(
      await supabase.from("posts").select(POST_SELECT).order("created_at", { ascending: false }),
    ) as unknown as Post[],
});

export const adminUsersQuery = () => ({
  queryKey: ["admin", "users"],
  queryFn: async () => {
    const profiles = unwrap(
      await supabase
        .from("profiles")
        .select("id,full_name,avatar_url,created_at")
        .order("created_at", { ascending: false }),
    ) as { id: string; full_name: string | null; avatar_url: string | null; created_at: string }[];

    const roles = unwrap(await supabase.from("user_roles").select("user_id,role")) as {
      user_id: string;
      role: string;
    }[];

    return profiles.map((p) => ({
      ...p,
      role: roles.find((r) => r.user_id === p.id)?.role ?? "user",
    }));
  },
});

export const bookmarksQuery = (userId: string | undefined) => ({
  queryKey: ["bookmarks", userId],
  enabled: Boolean(userId),
  queryFn: async () =>
    unwrap(
      await supabase
        .from("bookmarks")
        .select(`id,post_id,created_at,post:posts(${POST_SELECT})`)
        .order("created_at", { ascending: false }),
    ) as unknown as { id: string; post_id: string; created_at: string; post: Post | null }[],
});

/* ————— helpers ————— */

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
