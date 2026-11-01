import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ interactive = false, className, ...props }: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn("rounded-xl border bg-surface p-5", interactive && "transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10", className)}
      {...props}
    />
  );
}

export function IconTile({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-primary/10 text-primary">{children}</span>;
}
