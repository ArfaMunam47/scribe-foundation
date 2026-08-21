import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    mode: z.enum(["login", "signup", "forgot"]).optional(),
  }),
  head: () => ({
    meta: [
      { title: "Sign in or subscribe — Scrib Foundation" },
      {
        name: "description",
        content:
          "Sign in to your Scrib Foundation account, or create one to save articles and manage your reading.",
      },
      { property: "og:title", content: "Sign in or subscribe — Scrib Foundation" },
      {
        property: "og:description",
        content: "Access your Scrib Foundation reader account.",
      },
      { property: "og:url", content: "/auth" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

type AuthErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirm?: string;
  form?: string;
};

const passwordRules = z
  .string()
  .min(8, "Use at least 8 characters")
  .regex(/[A-Z]/, "Include one uppercase letter")
  .regex(/[a-z]/, "Include one lowercase letter")
  .regex(/\d/, "Include one number");

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const view = mode ?? "login";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [pending, setPending] = useState(false);
  const [emailSent, setEmailSent] = useState<null | "confirm" | "reset">(null);

  useEffect(() => {
    if (user) void navigate({ to: "/dashboard", replace: true });
  }, [user, navigate]);

  function setView(next: "login" | "signup" | "forgot") {
    setErrors({});
    setEmailSent(null);
    void navigate({ to: "/auth", search: { mode: next } });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: AuthErrors = {};

    const emailParsed = z.string().trim().email().max(255).safeParse(email);
    if (!emailParsed.success) nextErrors.email = "Enter a valid email address";

    if (view === "signup") {
      if (fullName.trim().length < 2) nextErrors.fullName = "Enter your full name";
      const pw = passwordRules.safeParse(password);
      if (!pw.success) nextErrors.password = pw.error.issues[0]?.message ?? "Weak password";
      if (password !== confirm) nextErrors.confirm = "Passwords do not match";
    }
    if (view === "login" && password.length < 6) {
      nextErrors.password = "Enter your password";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setPending(true);
    try {
      if (view === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: emailParsed.data!,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim() },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome to Scrib Foundation");
          void navigate({ to: "/dashboard", replace: true });
        } else {
          setEmailSent("confirm");
          toast.success("Check your inbox to confirm your email");
        }
      } else if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailParsed.data!,
          password,
        });
        if (error) throw error;
        toast.success("Signed in");
        void navigate({ to: "/dashboard", replace: true });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(emailParsed.data!, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setEmailSent("reset");
        toast.success("Password reset link sent");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error("Authentication failed", { description: message });
      setErrors({ form: message });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <aside className="relative hidden flex-col justify-between bg-ink p-12 text-ink-foreground lg:flex">
        <Logo />
        <div>
          <p className="eyebrow text-brass">Reader account</p>
          <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.1] font-semibold tracking-tight">
            Save the pieces you'll want to reread.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            An Scrib Foundation account keeps your library, your reading history and the Thursday
            Dispatch in one place.
          </p>
        </div>
        <p className="text-xs text-ink-foreground/50">Independent since 2016 · London</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between lg:hidden">
            <Logo />
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:mt-0"
          >
            <ArrowLeft className="size-3.5" /> Back to the site
          </Link>

          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight">
            {view === "signup"
              ? "Create your account"
              : view === "forgot"
                ? "Reset your password"
                : "Welcome back"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {view === "signup"
              ? "Free to join. No card required."
              : view === "forgot"
                ? "We'll email you a secure link to choose a new password."
                : "Sign in to your reader account."}
          </p>

          {emailSent ? (
            <div className="mt-8 border border-border bg-secondary/40 p-6">
              <p className="text-sm leading-relaxed">
                {emailSent === "confirm"
                  ? `We've sent a confirmation link to ${email}. Click it to activate your account, then sign in.`
                  : `We've sent a reset link to ${email}. Follow it to choose a new password.`}
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setView("login")}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
              {view === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              {view !== "forgot" && (
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {view === "login" && (
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-xs text-muted-foreground underline decoration-brass underline-offset-4 hover:text-foreground"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={show ? "text" : "password"}
                      autoComplete={view === "signup" ? "new-password" : "current-password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      aria-invalid={Boolean(errors.password)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
                      onClick={() => setShow((value) => !value)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  {view === "signup" && !errors.password && (
                    <p className="text-xs text-muted-foreground">
                      Minimum 8 characters with an uppercase letter, a lowercase letter and a number.
                    </p>
                  )}
                </div>
              )}

              {view === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type={show ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    aria-invalid={Boolean(errors.confirm)}
                  />
                  {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
                </div>
              )}

              {view === "login" && (
                <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(value) => setRemember(Boolean(value))}
                  />
                  Keep me signed in on this device
                </label>
              )}

              <Button type="submit" size="lg" disabled={pending}>
                {pending && <Loader2 className="size-4 animate-spin" />}
                {view === "signup"
                  ? "Create account"
                  : view === "forgot"
                    ? "Send reset link"
                    : "Sign in"}
              </Button>

              <p className="text-sm text-muted-foreground">
                {view === "signup" ? "Already have an account? " : "New to Scrib Foundation? "}
                <button
                  type="button"
                  onClick={() => setView(view === "signup" ? "login" : "signup")}
                  className="font-medium text-foreground underline decoration-brass underline-offset-4"
                >
                  {view === "signup" ? "Sign in" : "Create an account"}
                </button>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
