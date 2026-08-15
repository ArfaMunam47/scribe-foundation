import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);

export function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const subscribe = useMutation({
    mutationFn: async (value: string) => {
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: value });
      if (insertError && insertError.code !== "23505") throw new Error(insertError.message);
    },
    onSuccess: () => {
      setDone(true);
      setEmail("");
      toast.success("You're on the list", {
        description: "Expect the next dispatch on Thursday morning.",
      });
    },
    onError: (mutationError: Error) => {
      toast.error("Subscription failed", { description: mutationError.message });
    },
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    subscribe.mutate(parsed.data);
  }

  const dark = variant === "dark";

  return (
    <section
      className={`${dark ? "bg-ink text-ink-foreground" : "border border-border bg-secondary/50"} px-6 py-14 sm:px-10 lg:px-16 lg:py-20`}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className={`eyebrow ${dark ? "text-brass" : ""}`}>The Thursday Dispatch</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance-tight sm:text-4xl">
            One considered essay each week. Nothing else.
          </h2>
          <p
            className={`mt-4 max-w-md text-sm leading-relaxed ${dark ? "text-ink-foreground/70" : "text-muted-foreground"}`}
          >
            Join 24,000 readers who receive our long-form reporting before it appears on the site. No
            trackers, no sponsored placements, no noise.
          </p>
        </div>

        {done ? (
          <div
            className={`flex items-center gap-3 border p-6 ${dark ? "border-ink-foreground/20" : "border-border bg-card"}`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
              <Check className="size-4" />
            </span>
            <p className="text-sm">
              Subscription confirmed. Look for the next issue on Thursday morning.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="w-full" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className={dark ? "border-ink-foreground/25 bg-transparent" : "bg-card"}
                />
              </div>
              <Button
                type="submit"
                variant={dark ? "brass" : "default"}
                disabled={subscribe.isPending}
                className="sm:w-auto"
              >
                {subscribe.isPending && <Loader2 className="size-4 animate-spin" />}
                Subscribe
              </Button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-xs text-destructive">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
