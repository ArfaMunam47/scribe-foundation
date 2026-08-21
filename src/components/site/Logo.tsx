import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 rounded-sm"
      aria-label="Scrib Foundation — home"
    >
      <span className="flex size-9 shrink-0 items-center justify-center border border-brass/60 bg-brass/10">
        <span className="font-display text-[15px] leading-none font-semibold text-brass">S</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight">Scrib</span>
          <span className="mt-0.5 text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            Foundation
          </span>
        </span>
      )}
    </Link>
  );
}
