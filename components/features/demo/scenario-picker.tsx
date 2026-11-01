"use client";

import { SCENARIOS } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

export function ScenarioPicker({ value, onChange, disabled }: { value: string; onChange: (id: string) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Scenario">
      {SCENARIOS.map((s) => (
        <button
          key={s.id}
          type="button"
          role="radio"
          aria-checked={value === s.id}
          disabled={disabled}
          onClick={() => onChange(s.id)}
          className={cn("rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-50", value === s.id ? "border-primary bg-primary/10 text-foreground" : "text-muted hover:border-primary hover:text-foreground")}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
