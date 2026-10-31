"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="hidden items-center gap-1 text-sm md:flex">
        {items.map((n) => {
          const active = path === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={cn("relative rounded-md px-3 py-2 transition-colors", active ? "text-foreground" : "text-muted hover:text-foreground")}
            >
              {n.label}
              {active && <span className="absolute inset-x-3 -bottom-[17px] h-px bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
            </Link>
          );
        })}
      </nav>
      <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="rounded-md border p-2 text-muted md:hidden">
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-16 border-b bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {items.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={cn("block rounded-md px-3 py-3 text-sm", path === n.href ? "bg-surface text-foreground" : "text-muted")}>{n.label}</Link>
          ))}
        </nav>
      )}
    </>
  );
}
