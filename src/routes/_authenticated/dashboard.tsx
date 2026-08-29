import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Loader2, LogOut, Settings, Shield, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { CoverImage } from "@/components/site/CoverImage";
import { Container, EmptyState, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { bookmarksQuery } from "@/lib/api";
import { useAuth, useSignOut } from "@/lib/auth";
import { formatDate, initials } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Scrib Foundation" },
      {
        name: "description",
        content: "Your Scrib Foundation library, profile and account settings.",
      },
      { property: "og:title", content: "Your dashboard — Scrib Foundation" },
      { property: "og:description", content: "Your library, profile and account settings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type Tab = "library" | "profile";

function DashboardPage() {
  const { user, profile, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("library");
  const signOut = useSignOut();
  const queryClient = useQueryClient();

  const { data: bookmarks, isLoading } = useQuery(bookmarksQuery(user?.id));

  const removeBookmark = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Removed from your library");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <SiteShell>
      <Container className="py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full border border-brass/40 bg-brass/10 font-display text-base font-semibold text-brass">
              {initials(profile?.full_name ?? user?.email)}
            </span>
            <div>
              <p className="eyebrow">Reader account</p>
              <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight">
                {profile?.full_name ?? "Your dashboard"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {isAdmin && (
              <Button asChild variant="outline">
                <Link to="/admin">
                  <Shield className="size-4" /> Admin panel
                </Link>
              </Button>
            )}
            <Button variant="secondary" onClick={() => void signOut()}>
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" aria-label="Dashboard">
            {(
              [
                { key: "library", label: "Saved articles", icon: Bookmark },
                { key: "profile", label: "Profile & settings", icon: Settings },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                aria-current={tab === item.key}
                className={`flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                  tab === item.key
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" /> {item.label}
              </button>
            ))}
          </nav>

          <div>
            {tab === "library" && (
              <section>
                <h2 className="font-display text-xl font-semibold">Your library</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Articles you've saved while reading.
                </p>

                {isLoading && (
                  <div className="mt-8 grid gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-24 animate-pulse border border-border bg-secondary"
                      />
                    ))}
                  </div>
                )}

                {!isLoading && (bookmarks ?? []).length === 0 && (
                  <div className="mt-8">
                    <EmptyState
                      title="Nothing saved yet"
                      description="Use the bookmark button on any article to keep it here."
                      action={
                        <Button asChild>
                          <Link to="/explore">Browse articles</Link>
                        </Button>
                      }
                    />
                  </div>
                )}

                <div className="mt-8 grid gap-4">
                  {(bookmarks ?? []).map((item) =>
                    item.post ? (
                      <article
                        key={item.id}
                        className="flex flex-col gap-4 border border-border bg-card p-4 sm:flex-row sm:items-center"
                      >
                        <div className="h-24 w-full shrink-0 overflow-hidden border border-border bg-secondary sm:w-36">
                          <CoverImage src={item.post.cover_image} alt={item.post.title} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="eyebrow">{item.post.category?.name}</p>
                          <h3 className="mt-1.5 font-display text-lg leading-snug font-medium">
                            <Link
                              to="/post/$slug"
                              params={{ slug: item.post.slug }}
                              className="hover:text-brass"
                            >
                              {item.post.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Saved {formatDate(item.created_at)} · {item.post.reading_time} min read
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Remove from library"
                          disabled={removeBookmark.isPending}
                          onClick={() => removeBookmark.mutate(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </article>
                    ) : null,
                  )}
                </div>
              </section>
            )}

            {tab === "profile" && <ProfileForm />}
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}

function ProfileForm() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setBio(profile?.bio ?? "");
  }, [profile?.full_name, profile?.bio]);

  const save = useMutation({
    mutationFn: async () => {
      const parsed = z
        .object({
          full_name: z.string().trim().min(2, "Enter your full name").max(100),
          bio: z.string().trim().max(400).optional(),
        })
        .safeParse({ full_name: fullName, bio });
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid details");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: parsed.data.full_name, bio: parsed.data.bio ?? null })
        .eq("id", user!.id);
      if (updateError) throw new Error(updateError.message);
    },
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated");
    },
    onError: (mutationError: Error) => {
      setError(mutationError.message);
      toast.error("Could not save", { description: mutationError.message });
    },
  });

  return (
    <section className="max-w-xl">
      <h2 className="font-display text-xl font-semibold">Profile & settings</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        This information appears on your reader account only.
      </p>

      <form
        className="mt-8 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          save.mutate();
        }}
        noValidate
      >
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" value={user?.email ?? ""} disabled readOnly />
          <p className="text-xs text-muted-foreground">
            Contact the desk to change the email on your account.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Short bio</Label>
          <Textarea
            id="bio"
            rows={4}
            maxLength={400}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="size-4 animate-spin" />}
            Save changes
          </Button>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="size-3.5" /> Member since {formatDate(profile?.created_at)}
          </span>
        </div>
      </form>
    </section>
  );
}
