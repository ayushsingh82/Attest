"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DocsNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">On this page</p>
      <ul className="space-y-1 border-l text-sm">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined} className={cn("-ml-px block border-l px-4 py-1.5 transition-colors", active === s.id ? "border-primary text-foreground" : "border-transparent text-muted hover:text-foreground")}>{s.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
