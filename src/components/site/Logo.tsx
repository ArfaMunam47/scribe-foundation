import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Ivory — home">
      <span className="flex size-8 shrink-0 items-center justify-center border border-brass/60 bg-brass/10">
        <span className="font-display text-[15px] leading-none font-semibold text-brass">I</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight">Ivory</span>
          <span className="mt-0.5 text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            Review
          </span>
        </span>
      )}
    </Link>
  );
}
