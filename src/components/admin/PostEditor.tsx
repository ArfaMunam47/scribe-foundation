import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Eye, Loader2, PenLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { CoverImage } from "@/components/site/CoverImage";
import { Markdown } from "@/components/site/Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { authorsQuery, categoriesQuery, estimateReadingTime, slugify, type Post } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const schema = z.object({
  title: z.string().trim().min(4, "Give the article a title").max(180),
  slug: z
    .string()
    .trim()
    .min(3, "A slug is required")
    .max(90)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  excerpt: z.string().trim().max(400).optional(),
  content: z.string().trim().min(40, "Write at least a few sentences"),
  cover_image: z.string().trim().max(500).optional(),
  status: z.enum(["draft", "published"]),
});

const COVER_OPTIONS = [
  { label: "Editorial desk", value: "/images/hero-editorial.jpg" },
  { label: "Machine intelligence", value: "/images/cover-ai.jpg" },
  { label: "Business interior", value: "/images/cover-business.jpg" },
  { label: "Design craft", value: "/images/cover-design.jpg" },
];

export function PostEditor({ existing }: { existing?: Post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: categories } = useQuery(categoriesQuery());
  const { data: authors } = useQuery(authorsQuery());

  const [title, setTitle] = useState(existing?.title ?? "");
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [cover, setCover] = useState(existing?.cover_image ?? COVER_OPTIONS[0]!.value);
  const [categoryId, setCategoryId] = useState(existing?.category?.id ?? "");
  const [authorId, setAuthorId] = useState(existing?.author?.id ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    (existing?.status as "draft" | "published") ?? "draft",
  );
  const [featured, setFeatured] = useState(existing?.featured ?? false);
  const [publishDate, setPublishDate] = useState(
    existing?.published_at ? existing.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const save = useMutation({
    mutationFn: async () => {
      const parsed = schema.safeParse({
        title,
        slug: slug || slugify(title),
        excerpt,
        content,
        cover_image: cover,
        status,
      });
      if (!parsed.success) {
        const next: Record<string, string | undefined> = {};
        for (const issue of parsed.error.issues) {
          next[String(issue.path[0])] = issue.message;
        }
        setErrors(next);
        throw new Error("Please fix the highlighted fields");
      }
      setErrors({});

      const payload = {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt ?? null,
        content: parsed.data.content,
        cover_image: parsed.data.cover_image ?? null,
        category_id: categoryId || null,
        author_id: authorId || null,
        status: parsed.data.status,
        featured,
        reading_time: estimateReadingTime(parsed.data.content),
        published_at:
          parsed.data.status === "published"
            ? new Date(`${publishDate}T09:00:00Z`).toISOString()
            : null,
        created_by: user?.id ?? null,
      };

      if (existing) {
        const { error } = await supabase.from("posts").update(payload).eq("id", existing.id);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("posts").insert(payload);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(existing ? "Article updated" : "Article created");
      void navigate({ to: "/admin/posts" });
    },
    onError: (error: Error) => toast.error("Could not save", { description: error.message }),
  });

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_320px]"
      onSubmit={(event) => {
        event.preventDefault();
        save.mutate();
      }}
      noValidate
    >
      <div className="grid gap-5">
        <div className="flex gap-2">
          {(
            [
              { key: "write", label: "Write", icon: PenLine },
              { key: "preview", label: "Preview", icon: Eye },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              aria-pressed={tab === item.key}
              className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs tracking-[0.12em] uppercase transition-colors ${
                tab === item.key
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-brass hover:text-brass"
              }`}
            >
              <item.icon className="size-3.5" /> {item.label}
            </button>
          ))}
        </div>

        {tab === "write" ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!existing) setSlug(slugify(event.target.value));
                }}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">URL slug</Label>
              <Input id="slug" value={slug} onChange={(event) => setSlug(event.target.value)} />
              <p className="text-xs text-muted-foreground">/post/{slug || "your-article"}</p>
              {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                rows={3}
                maxLength={400}
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Article body (Markdown)</Label>
              <Textarea
                id="content"
                rows={22}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="font-mono text-[13px] leading-relaxed"
              />
              <p className="text-xs text-muted-foreground">
                Supports ## headings, &gt; quotes, - lists, **bold** and [links](url). Estimated{" "}
                {estimateReadingTime(content)} min read.
              </p>
              {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
            </div>
          </>
        ) : (
          <div className="border border-border bg-card p-6 sm:p-10">
            <div className="aspect-16/9 overflow-hidden border border-border bg-secondary">
              <CoverImage src={cover} alt={title} />
            </div>
            <h1 className="mt-8 font-display text-3xl leading-tight font-semibold tracking-tight">
              {title || "Untitled article"}
            </h1>
            {excerpt && <p className="mt-4 text-base text-muted-foreground">{excerpt}</p>}
            <div className="mt-8">
              <Markdown content={content || "_Nothing written yet._"} />
            </div>
          </div>
        )}
      </div>

      <aside className="grid content-start gap-5">
        <div className="paper grid gap-5 p-5">
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as never)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="publishDate">Publication date</Label>
            <Input
              id="publishDate"
              type="date"
              value={publishDate}
              onChange={(event) => setPublishDate(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a section" />
              </SelectTrigger>
              <SelectContent>
                {(categories ?? []).map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Author</Label>
            <Select value={authorId} onValueChange={setAuthorId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a byline" />
              </SelectTrigger>
              <SelectContent>
                {(authors ?? []).map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Cover image</Label>
            <Select value={cover} onValueChange={setCover}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COVER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-1 aspect-16/9 overflow-hidden border border-border bg-secondary">
              <CoverImage src={cover} alt="Selected cover" />
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="size-4 accent-[var(--brass)]"
            />
            Feature on the front page
          </label>
        </div>

        <Button type="submit" size="lg" disabled={save.isPending}>
          {save.isPending && <Loader2 className="size-4 animate-spin" />}
          {existing ? "Save changes" : "Create article"}
        </Button>
        <Button type="button" variant="outline" onClick={() => void navigate({ to: "/admin/posts" })}>
          Cancel
        </Button>
      </aside>
    </form>
  );
}
