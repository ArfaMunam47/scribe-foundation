import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/site/Logo";

const SECTIONS = [
  {
    title: "Publication",
    links: [
      { to: "/explore", label: "Explore" },
      { to: "/about", label: "About us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Readers",
    links: [
      { to: "/auth", label: "Subscribe" },
      { to: "/dashboard", label: "Your dashboard" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Ivory Review is an independent publication on technology, design and the business of
              building things worth keeping. Considered reporting, published slowly.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="eyebrow">{section.title}</h3>
              <ul className="mt-4 grid gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow">Offices</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              12 Wardour Mews
              <br />
              London W1F 8AN
              <br />
              United Kingdom
            </p>
            <a
              href="mailto:desk@ivoryreview.com"
              className="mt-4 inline-block text-sm underline decoration-brass underline-offset-4 transition-colors hover:text-foreground"
            >
              desk@ivoryreview.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ivory Review. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">Published in London</p>
        </div>
      </div>
    </footer>
  );
}
