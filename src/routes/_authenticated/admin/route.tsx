import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { FileText, FolderTree, LayoutDashboard, LogOut, Users } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { useAuth, useSignOut } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const LINKS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Articles", icon: FileText, exact: false },
  { to: "/admin/categories", label: "Categories", icon: FolderTree, exact: false },
  { to: "/admin/users", label: "Readers", icon: Users, exact: false },
] as const;

function AdminLayout() {
  const { isAdmin, roleLoading, user } = useAuth();
  const signOut = useSignOut();

  if (roleLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking your permissions…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="eyebrow">Restricted</p>
          <h1 className="mt-4 font-display text-3xl font-semibold">Admin access required</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account doesn't have editorial permissions. If this is unexpected, contact an
            administrator.
          </p>
          <Button asChild className="mt-8">
            <Link to="/dashboard">Back to your dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="border-b border-sidebar-border bg-sidebar lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <Logo />
          <p className="hidden pt-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase lg:block">
            Editorial console
          </p>
        </div>
        <nav
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6"
          aria-label="Admin"
        >
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              className="flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground"
            >
              <link.icon className="size-4" /> {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden border-t border-sidebar-border p-3 lg:block">
          <Button variant="ghost" className="w-full justify-start" onClick={() => void signOut()}>
            <LogOut className="size-4" /> Sign out
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/">View public site</Link>
          </Button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-background">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
