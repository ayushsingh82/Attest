"use client";

import { useMemo, useState } from "react";
import { assessReserves, DEFAULT_THRESHOLDS, type RiskStatus } from "@/cre/reserve-guard/risk";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const NOW = Math.floor(Date.parse("2026-10-28T12:00:00Z") / 1000);
const GAUGE: Record<RiskStatus, string> = {
  HEALTHY: "#2fb37a",
  WATCH: "#e8a93a",
  STALE: "#e8a93a",
  UNDERCOLLATERALIZED: "#e5484d",
  HALTED: "#e5484d",
};

const PRESETS = [
  { label: "Healthy", trust: 1_050_000, token: 1_000_000, ripcord: false, age: 1 },
  { label: "Watch", trust: 995_000, token: 1_000_000, ripcord: false, age: 1 },
  { label: "Under", trust: 900_000, token: 1_000_000, ripcord: false, age: 1 },
  { label: "Halted", trust: 1_050_000, token: 1_000_000, ripcord: true, age: 1 },
  { label: "Stale", trust: 1_050_000, token: 1_000_000, ripcord: false, age: 72 },
];

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; format: (n: number) => string }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-mono">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-primary" />
    </label>
  );
}

export function Simulator() {
  const [trust, setTrust] = useState(1_050_000);
  const [token, setToken] = useState(1_000_000);
  const [ripcord, setRipcord] = useState(false);
  const [age, setAge] = useState(1);

  const result = useMemo(
    () => assessReserves({ accountName: "DemoUSD", totalTrust: trust, totalToken: token, ripcord, updatedAt: new Date((NOW - age * 3600) * 1000).toISOString() }, NOW),
    [trust, token, ripcord, age],
  );

  const coverage = result.ratioBps / 100;
  const angle = Math.min(coverage, 120) / 120; // 0..1 across the arc
  const arc = 251; // half-circle length for r=80
  const color = GAUGE[result.status];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-surface p-6">
        <h3 className="font-medium">Report inputs</h3>
        <p className="mt-1 text-sm text-muted">Change the report the API would return. The status updates live, using the same risk logic as the workflow.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => { setTrust(p.trust); setToken(p.token); setRipcord(p.ripcord); setAge(p.age); }}
              className={cn("rounded-lg border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-foreground", p.trust === trust && p.token === token && p.ripcord === ripcord && p.age === age ? "border-primary bg-primary/10 text-foreground" : "text-muted")}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-5">
          <Slider label="Reserves held" value={trust} min={0} max={1_500_000} step={5_000} onChange={setTrust} format={(n) => `$${n.toLocaleString("en-US")}`} />
          <Slider label="Token supply" value={token} min={0} max={1_500_000} step={5_000} onChange={setToken} format={(n) => `$${n.toLocaleString("en-US")}`} />
          <Slider label="Report age" value={age} min={0} max={96} step={1} onChange={setAge} format={(n) => `${n}h`} />
          <label className="flex items-center justify-between text-sm">
            <span className="text-muted">Issuer ripcord pulled</span>
            <input type="checkbox" checked={ripcord} onChange={(e) => setRipcord(e.target.checked)} className="size-4 accent-primary" />
          </label>
        </div>
        <p className="mt-6 border-t pt-4 text-xs text-muted">
          Thresholds: healthy at {DEFAULT_THRESHOLDS.healthyBps / 100}%, watch down to {DEFAULT_THRESHOLDS.watchBps / 100}%, stale after {DEFAULT_THRESHOLDS.maxAgeSeconds / 3600}h.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border bg-surface p-6">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-colors duration-500" style={{ background: color }} aria-hidden />
        <h3 className="relative font-medium">What gets written on-chain</h3>
        <div className="relative mt-4 flex flex-col items-center">
          <svg viewBox="0 0 200 120" className="w-64" role="img" aria-label={`Coverage ${coverage.toFixed(2)} percent`}>
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--color-border)" strokeWidth="14" strokeLinecap="round" />
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${arc * angle} ${arc}`} style={{ transition: "stroke-dasharray .4s ease, stroke .3s", filter: `drop-shadow(0 0 6px ${color})` }} />
            <text x="100" y="92" textAnchor="middle" className="fill-foreground text-[22px] font-semibold">{coverage.toFixed(2)}%</text>
            <text x="100" y="110" textAnchor="middle" className="fill-muted text-[9px]">coverage</text>
          </svg>
          <StatusBadge status={result.status} size="lg" className="mt-2" />
        </div>
        <dl className="mt-6 divide-y rounded-lg border text-sm">
          {[
            ["status", `${result.statusCode}`],
            ["ratioBps", `${result.ratioBps}`],
            ["totalReserve", `${trust.toLocaleString("en-US")}`],
            ["lastUpdated", new Date((NOW - age * 3600) * 1000).toISOString()],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="font-mono text-muted">{k}</dt>
              <dd className="truncate font-mono">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted">{result.reasons.join("; ")}</p>
      </div>
    </div>
  );
}
