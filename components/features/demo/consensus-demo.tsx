"use client";

import { useState } from "react";
import { ScenarioPicker } from "@/components/features/demo/scenario-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { assess, getScenario, mean, median, NODE_JITTER } from "@/lib/demo";
import { cn } from "@/lib/utils";

const NODES = NODE_JITTER.length;
/** What a faulty node reports: wildly wrong in alternating directions. */
const faulty = (honest: number, i: number) => (i % 2 ? Math.round(honest * 0.3) : Math.round(honest * 2.2));

export function ConsensusDemo() {
  const [scenario, setScenario] = useState("healthy");
  const [bad, setBad] = useState<Set<number>>(new Set());
  const s = getScenario(scenario);

  const readings = NODE_JITTER.map((j, i) => {
    const honest = Math.round(s.report.totalTrust * (1 + j));
    return bad.has(i) ? faulty(honest, i) : honest;
  });
  const max = Math.max(...readings, s.report.totalToken);
  const viaMedian = assess({ ...s.report, totalTrust: median(readings) });
  const viaMean = assess({ ...s.report, totalTrust: mean(readings) });
  const viaSingle = assess({ ...s.report, totalTrust: readings[0] });
  const truth = assess(s.report);
  const toggle = (i: number) => setBad((b) => { const n = new Set(b); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const majorityBad = bad.size > Math.floor(NODES / 2);

  return (
    <div className="rounded-xl border bg-surface p-6">
      <ScenarioPicker value={scenario} onChange={setScenario} />
      <p className="mt-5 text-sm text-muted">Click a node to make it faulty. It will report a wildly wrong number. Watch what the median does compared with trusting one node or the average.</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <ul className="space-y-2">
          {readings.map((r, i) => (
            <li key={i}>
              <button type="button" onClick={() => toggle(i)} aria-pressed={bad.has(i)} className={cn("flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors", bad.has(i) ? "border-red-400/40 bg-red-400/5" : "hover:border-primary/60")}>
                <span className="w-16 font-mono text-xs text-muted">node-{i + 1}</span>
                <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-500", bad.has(i) ? "bg-red-400" : "bg-primary")} style={{ width: `${(r / max) * 100}%` }} />
                </span>
                <span className="w-24 text-right font-mono text-xs">{r.toLocaleString("en-US")}</span>
              </button>
            </li>
          ))}
          <li className="pt-1 font-mono text-[11px] text-muted">Token supply: {s.report.totalToken.toLocaleString("en-US")}. Bars scale to the largest value.</li>
        </ul>
        <div className="space-y-3">
          {[
            ["Median of all nodes (what CRE does)", viaMedian, true],
            ["Average of all nodes", viaMean, false],
            ["Trust node-1 only", viaSingle, false],
          ].map(([label, a, primary]) => {
            const res = a as ReturnType<typeof assess>;
            const correct = res.status === truth.status;
            return (
              <div key={label as string} className={cn("rounded-lg border p-4", primary && "border-primary/50")}>
                <p className="text-xs text-muted">{label as string}</p>
                <div className="mt-2 flex items-center justify-between">
                  <StatusBadge status={res.status} size="lg" />
                  <span className="font-mono text-xs">{(res.ratioBps / 100).toFixed(1)}%</span>
                </div>
                <p className={cn("mt-2 text-xs", correct ? "text-emerald-300" : "text-red-300")}>{correct ? "Matches the true status" : `Wrong. True status is ${truth.status}`}</p>
              </div>
            );
          })}
          <p className="text-xs text-muted">{majorityBad ? "More than half the nodes are faulty. Median consensus assumes an honest majority, so it can be fooled here too." : "With an honest majority, the median stays correct. A single node or the average does not."}</p>
        </div>
      </div>
    </div>
  );
}
