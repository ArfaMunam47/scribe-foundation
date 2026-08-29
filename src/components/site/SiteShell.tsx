import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
