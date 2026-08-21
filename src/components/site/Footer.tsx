import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { Logo } from "@/components/site/Logo";

const CONTACT_EMAIL = "nam01alpha@gmail.com";

const SECTIONS = [
  {
    title: "Publication",
    links: [
      { to: "/explore", label: "All articles" },
      { to: "/about", label: "About the foundation" },
      { to: "/faq", label: "Questions" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Readers",
    links: [
      { to: "/auth", label: "Create an account" },
      { to: "/dashboard", label: "Your reading list" },
      { to: "/explore", label: "Browse by section" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40 lg:mt-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The Scrib Foundation publishes practical writing on community, education, social
              impact and public awareness work — how it is designed, funded and sustained.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="eyebrow">{section.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow">Contact</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Corrections, questions about a programme, or offers of help all reach the same desk.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex items-center gap-2 rounded-sm text-sm font-medium underline decoration-brass decoration-1 underline-offset-4 transition-colors hover:text-brass"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              We read everything and reply to most enquiries within five working days.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Scrib Foundation. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">Independent · Non-profit publishing</p>
        </div>
      </div>
    </footer>
  );
}
