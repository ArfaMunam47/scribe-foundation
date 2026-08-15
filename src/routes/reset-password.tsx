import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Choose a new password — Ivory Review" },
      { name: "description", content: "Set a new password for your Ivory Review account." },
      { property: "og:title", content: "Choose a new password — Ivory Review" },
      { property: "og:description", content: "Set a new password for your account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

const rules = z
  .string()
  .min(8, "Use at least 8 characters")
  .regex(/[A-Z]/, "Include one uppercase letter")
  .regex(/[a-z]/, "Include one lowercase letter")
  .regex(/\d/, "Include one number");

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = rules.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Weak password");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    setPending(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      toast.error("Could not update password", { description: updateError.message });
      setError(updateError.message);
      return;
    }
    toast.success("Password updated");
    void navigate({ to: "/dashboard", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight">
          Choose a new password
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Open this page from the link in your reset email, then set a new password below.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm new password</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" size="lg" disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" />}
            Update password
          </Button>
        </form>

        <Link
          to="/auth"
          search={{ mode: "login" }}
          className="mt-6 inline-block text-sm text-muted-foreground underline decoration-brass underline-offset-4 hover:text-foreground"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
