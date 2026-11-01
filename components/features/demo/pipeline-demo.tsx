"use client";

import { Boxes, Check, Clock, Cpu, Database, Loader2, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScenarioPicker } from "@/components/features/demo/scenario-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { assess, fakeHash, getScenario, median, NODE_JITTER } from "@/lib/demo";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: Clock, title: "Cron trigger", ms: 700 },
  { icon: Database, title: "Fetch from reserve API", ms: 1100 },
  { icon: Cpu, title: "Median consensus and risk check", ms: 1100 },
  { icon: Boxes, title: "Write to DataFeedsCache", ms: 1800 },
] as const;

export function PipelineDemo() {
  const [scenario, setScenario] = useState("healthy");
  const [step, setStep] = useState(-1); // -1 idle, 0..3 running, 4 done
  const [log, setLog] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const s = getScenario(scenario);
  const readings = NODE_JITTER.slice(0, 5).map((j) => Math.round(s.report.totalTrust * (1 + j)));
  const agreed = median(readings);
  const result = assess({ ...s.report, totalTrust: agreed });
  const running = step >= 0 && step < STEPS.length;
  const hash = fakeHash(s.id + agreed);
  const seed = parseInt(hash.slice(2, 8), 16);
  const block = 7_400_000 + (seed % 100_000);
  const gas = 78_000 + (seed % 21_000);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const lines = (i: number): string[] => [
    ["cron: schedule fired (every 5 minutes)"],
    [`http: 5 nodes GET /reserves/${s.id}`, ...readings.map((r, n) => `  node-${n + 1} -> totalTrust ${r.toLocaleString("en-US")}`)],
    [`consensus: median totalTrust = ${agreed.toLocaleString("en-US")}`, `risk: ${result.status} (code ${result.statusCode}), ratio ${result.ratioBps} bps`],
    [`evm: writeReport -> DataFeedsCache (Sepolia)`, `tx: ${hash.slice(0, 18)}... pending (simulated)`, `confirmed: block ${block.toLocaleString("en-US")}, gas ${gas.toLocaleString("en-US")} (simulated)`],
  ][i];

  const run = () => {
    if (timer.current) clearTimeout(timer.current);
    setLog([]);
    const go = (i: number) => {
      setStep(i);
      if (i >= STEPS.length) return;
      timer.current = setTimeout(() => {
        setLog((l) => [...l, ...lines(i)]);
        go(i + 1);
      }, STEPS[i].ms);
    };
    go(0);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setStep(-1);
    setLog([]);
  };

  return (
    <div className="rounded-xl border bg-surface p-6">
      <ScenarioPicker value={scenario} onChange={(id) => { reset(); setScenario(id); }} disabled={running} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ol className="space-y-3">
          {STEPS.map(({ icon: Icon, title }, i) => {
            const state = step > i || step === STEPS.length ? "done" : step === i ? "active" : "idle";
            return (
              <li key={title} className={cn("flex items-center gap-3 rounded-lg border p-3 transition-colors", state === "active" && "border-primary bg-primary/10", state === "done" && "border-emerald-400/30")}>
                <span className="flex size-9 items-center justify-center rounded-md border bg-background text-primary">
                  {state === "done" ? <Check className="size-4 text-emerald-400" /> : state === "active" ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4 text-muted" />}
                </span>
                <span className={cn("text-sm", state === "idle" ? "text-muted" : "text-foreground")}>{title}</span>
              </li>
            );
          })}
          <li className={cn("rounded-lg border p-4 text-xs transition-colors", step === 3 && "border-amber-400/40", step === STEPS.length && "border-emerald-400/40")}>
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-widest text-muted">Transaction</span>
              <span className={cn("inline-flex items-center gap-1.5 font-mono", step === STEPS.length ? "text-emerald-300" : step === 3 ? "text-amber-300" : "text-muted")}>
                {step === STEPS.length ? <><Check className="size-3.5" />Confirmed</> : step === 3 ? <><Loader2 className="size-3.5 animate-spin" />Pending</> : "Not sent"}
              </span>
            </div>
            {step >= 3 ? (
              <dl className="mt-3 space-y-1.5 font-mono">
                <div className="flex justify-between gap-4"><dt className="text-muted">Hash</dt><dd className="truncate">{hash.slice(0, 14)}...{hash.slice(-6)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Network</dt><dd>Sepolia</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Block</dt><dd>{step === STEPS.length ? block.toLocaleString("en-US") : "waiting"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Gas used</dt><dd>{step === STEPS.length ? gas.toLocaleString("en-US") : "waiting"}</dd></div>
              </dl>
            ) : <p className="mt-3 text-muted">The write happens in step 4.</p>}
            <p className="mt-3 text-[10px] text-muted">Simulated in your browser. No transaction is sent.</p>
          </li>
        </ol>
        <div className="flex min-h-64 flex-col overflow-hidden rounded-lg border bg-[#070b14]">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/70" /><span className="size-2.5 rounded-full bg-amber-400/70" /><span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-xs text-muted">CRE workflow: reserve-guard (simulated in browser)</span>
          </div>
          <pre aria-live="polite" className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-emerald-200/90">{log.length ? log.join("\n") : "Press Run to start the workflow."}</pre>
          {step === STEPS.length && (
            <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted">
              <span>On-chain status</span>
              <StatusBadge status={result.status} size="lg" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={run} disabled={running} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary-hover disabled:opacity-50"><Play className="size-4" />{step === STEPS.length ? "Run again" : "Run workflow"}</button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"><RotateCcw className="size-4" />Reset</button>
      </div>
    </div>
  );
}
