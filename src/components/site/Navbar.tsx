import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Menu, Search, Shield, User as UserIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth, useSignOut } from "@/lib/auth";
import { initials } from "@/lib/format";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Articles" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { user, profile, isAdmin } = useAuth();
  const signOut = useSignOut();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = term.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate({ to: "/explore", search: q ? { q } : {} });
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search articles"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search className="size-[18px]" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold transition-colors hover:border-brass"
                  aria-label="Account menu"
                >
                  {initials(profile?.full_name ?? user.email)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate font-normal">
                  <span className="block text-sm font-medium">
                    {profile?.full_name ?? "Reader"}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <Shield className="size-4" /> Admin panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => void signOut()}>
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" search={{ mode: "login" }}>
                  Log in
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Subscribe
                </Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <form
            onSubmit={submitSearch}
            className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-10"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <Input
              autoFocus
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search essays, interviews, reporting…"
              className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              aria-label="Search articles"
            />
            <Button type="submit" size="sm" variant="secondary">
              Search
            </Button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto grid w-full max-w-[1400px] gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-sm px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-3 grid gap-2 border-t border-border pt-4 sm:hidden">
                <Button asChild variant="outline">
                  <Link to="/auth" search={{ mode: "login" }} onClick={() => setMobileOpen(false)}>
                    <UserIcon className="size-4" /> Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth" search={{ mode: "signup" }} onClick={() => setMobileOpen(false)}>
                    Subscribe
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
