"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-hex bg-glow">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Error</p>
        <h1 className="text-gradient mt-2 text-4xl font-semibold tracking-tight">Something went wrong.</h1>
        <p className="mt-3 text-muted">The page failed to load. You can try again or go back to the dashboard.</p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => retry()} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium transition-colors hover:bg-primary-hover">Try again</button>
          <ButtonLink href="/dashboard" variant="secondary">Dashboard</ButtonLink>
        </div>
      </div>
    </section>
  );
}
