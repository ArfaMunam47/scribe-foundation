import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { Container, SectionHeading, SiteShell } from "@/components/site/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Faq = { question: string; answer: string };

const GROUPS: { title: string; eyebrow: string; items: Faq[] }[] = [
  {
    eyebrow: "The publication",
    title: "About Ivory Review",
    items: [
      {
        question: "What does Ivory Review actually cover?",
        answer:
          "We publish considered, long-form reporting and essays on technology, design, and the business of building durable things. Every piece is commissioned around a specific argument rather than a news cycle, which is why we publish weekly instead of hourly.",
      },
      {
        question: "How often are new articles published?",
        answer:
          "Two to three pieces a week, plus one longer investigative feature each month. New work appears first on the homepage and in the Explore archive, and subscribers receive it by email the same morning.",
      },
      {
        question: "Who writes for the publication?",
        answer:
          "A small permanent desk of editors and a rotating group of contributing writers — practitioners, researchers, and operators drawn from the fields they cover. Every contributor is named, with a full biography on their byline.",
      },
    ],
  },
  {
    eyebrow: "Accounts",
    title: "Reading and subscriptions",
    items: [
      {
        question: "Do I need an account to read?",
        answer:
          "No. Every published article is free to read in full without an account. Creating a free account adds bookmarks, a personal reading library, and the weekly email edition.",
      },
      {
        question: "How do bookmarks work?",
        answer:
          "Sign in, then use the bookmark control on any article. Saved pieces appear in your dashboard library and stay synced across every device you sign in on.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Choose \"Forgot password\" on the login screen and we will email you a secure, single-use reset link. The link expires after one hour; requesting a new one invalidates the previous link immediately.",
      },
      {
        question: "Can I unsubscribe from the newsletter?",
        answer:
          "Yes, at any time. Every edition carries a one-click unsubscribe link at the foot of the email, and you can also toggle email preferences from your dashboard without deleting your account.",
      },
    ],
  },
  {
    eyebrow: "Editorial",
    title: "Standards and contributions",
    items: [
      {
        question: "How do I pitch a story?",
        answer:
          "Send a short outline — the argument, why now, and who you have spoken to — through the contact page. We read every pitch and reply to the ones we can commission, usually within ten working days.",
      },
      {
        question: "What is your corrections policy?",
        answer:
          "Factual errors are corrected promptly and disclosed at the foot of the article with the date and nature of the change. We do not silently edit published claims.",
      },
      {
        question: "Do you accept sponsored articles?",
        answer:
          "No. Commercial partnerships are limited to clearly labelled display placements and never influence editorial commissioning, framing, or conclusions.",
      },
      {
        question: "Can I republish or quote your work?",
        answer:
          "Short quotations with a link and attribution are always welcome. Full republication requires written permission — write to the desk and we will usually say yes for non-commercial use.",
      },
    ],
  },
];

const ALL = GROUPS.flatMap((group) => group.items);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Ivory Review" },
      {
        name: "description",
        content:
          "Answers about Ivory Review subscriptions, accounts, bookmarks, editorial standards, pitching, corrections and republication.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Ivory Review" },
      {
        property: "og:description",
        content:
          "Everything readers and contributors ask about subscriptions, accounts and our editorial standards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <Container className="py-14 lg:py-20">
        <header className="max-w-3xl">
          <p className="eyebrow">Reader help</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Everything readers and contributors ask most often — about access, accounts, and how the
            desk works. If your question is not here, the editorial desk answers email personally.
          </p>
        </header>

        <div className="mt-16 grid gap-14">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <SectionHeading eyebrow={group.eyebrow} title={group.title} />
              <Accordion type="single" collapsible className="mt-2">
                {group.items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="text-left font-display text-base font-medium sm:text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-6 border border-border bg-secondary/40 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Still have a question?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Write to the desk and a member of the editorial team will reply — usually within two
              working days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/contact">
                <Mail className="size-4" /> Contact the desk
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/explore">Browse the archive</Link>
            </Button>
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
