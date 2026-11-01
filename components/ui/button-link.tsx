import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANT = {
  primary: "bg-primary shadow-lg shadow-primary/30 hover:bg-primary-hover",
  secondary: "border bg-surface/60 backdrop-blur hover:bg-surface",
} as const;

export function ButtonLink({ href, variant = "primary", arrow = false, className, children }: { href: string; variant?: keyof typeof VARIANT; arrow?: boolean; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors", VARIANT[variant], className)}>
      {children}
      {arrow && <ArrowRight className="size-4" />}
    </Link>
  );
}
