import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Container, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Ivory Review desk" },
      {
        name: "description",
        content:
          "Reach the Ivory Review editorial desk with a story tip, a correction, a pitch or a partnership enquiry.",
      },
      { property: "og:title", content: "Contact the Ivory Review desk" },
      {
        property: "og:description",
        content: "Story tips, corrections, pitches and partnership enquiries.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Add a short subject").max(150),
  message: z.string().trim().min(20, "Please write at least 20 characters").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;

const EMPTY: ContactForm = { name: "", email: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const submit = useMutation({
    mutationFn: async (values: ContactForm) => {
      const { error } = await supabase.from("contact_messages").insert(values);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setSent(true);
      setForm(EMPTY);
      toast.success("Message sent", { description: "The desk replies within two working days." });
    },
    onError: (error: Error) =>
      toast.error("Message not sent", { description: error.message }),
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    submit.mutate(parsed.data);
  }

  function field<K extends keyof ContactForm>(key: K) {
    return {
      value: form[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [key]: event.target.value })),
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `${key}-error` : undefined,
    };
  }

  return (
    <SiteShell>
      <Container className="pt-12 pb-20 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-balance-tight sm:text-5xl">
              Tips, corrections and correspondence.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              We read everything. Story tips and corrections are prioritised; pitches receive a
              reply within two working days.
            </p>

            <dl className="mt-12 grid gap-8">
              {[
                { icon: Mail, label: "Editorial desk", value: "desk@ivoryreview.com" },
                { icon: Phone, label: "Telephone", value: "+44 20 7946 0912" },
                { icon: MapPin, label: "Studio", value: "12 Wardour Mews, London W1F 8AN" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center border border-border bg-secondary text-brass">
                    <item.icon className="size-4" />
                  </span>
                  <div>
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="mt-1.5 text-sm">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="paper p-6 sm:p-10">
            {sent ? (
              <div className="flex flex-col items-start">
                <span className="flex size-11 items-center justify-center rounded-full bg-brass/15 text-brass">
                  <Check className="size-5" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold">Thank you — received.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your message is with the editorial desk. If it's a time-sensitive tip, call the
                  number listed and mention the subject line you used.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" autoComplete="name" {...field("name")} />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" {...field("email")} />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...field("subject")} />
                  {errors.subject && (
                    <p id="subject-error" className="text-xs text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={7} maxLength={2000} {...field("message")} />
                  <div className="flex items-center justify-between">
                    {errors.message ? (
                      <p id="message-error" className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
                  </div>
                </div>

                <Button type="submit" size="lg" disabled={submit.isPending} className="mt-2">
                  {submit.isPending && <Loader2 className="size-4 animate-spin" />}
                  Send message
                </Button>
                <p className="text-xs text-muted-foreground">
                  We never share your details. Messages are stored securely and read only by
                  editors.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
