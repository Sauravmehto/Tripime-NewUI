"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { clearAdminToken } from "@/lib/admin-auth";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="hidden w-56 flex-col border-r border-neutral-200 bg-white lg:flex">
        <div className="border-b border-neutral-100 px-4 py-4">
          <Logo className="h-7" />
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
            Admin panel
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 px-2 py-3">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-ink-muted hover:bg-neutral-50 hover:text-ink",
                )}
              >
                <link.icon className="size-4 shrink-0" aria-hidden />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-100 p-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-danger-700 hover:bg-danger-50"
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-neutral-200 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Logo className="h-7" />
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger-700"
            >
              <LogOut className="size-4" aria-hidden />
              Logout
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-2 py-2">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold",
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-ink-muted hover:bg-neutral-50",
                  )}
                >
                  <link.icon className="size-3.5" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main id="admin-main" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
