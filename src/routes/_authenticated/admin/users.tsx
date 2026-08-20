import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { adminUsersQuery } from "@/lib/api";
import { formatShortDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "Readers — Ivory Review admin" },
      { name: "description", content: "Registered readers and their editorial permissions." },
      { property: "og:title", content: "Readers — Ivory Review admin" },
      { property: "og:description", content: "Registered readers and permissions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const { data: users, isLoading } = useQuery(adminUsersQuery());

  return (
    <div>
      <p className="eyebrow">Community</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Readers</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Everyone with an Ivory Review account, newest first.
      </p>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading readers…</p>
      ) : (
        <div className="mt-10 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-[0.14em] text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {(users ?? []).map((user) => (
                <tr key={user.id} className="border-b border-border/70 last:border-0">
                  <td className="px-5 py-4 font-medium">{user.full_name ?? "Unnamed reader"}</td>
                  <td className="px-5 py-4">
                    <span className="border border-border px-2 py-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {formatShortDate(user.created_at)}
                  </td>
                </tr>
              ))}
              {(users ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                    No readers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
