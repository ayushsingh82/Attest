import { Activity, AlertTriangle, CheckCircle2, Layers, Link2 } from "lucide-react";
import { Simulator } from "@/components/features/simulator";
import { PageTitle } from "@/components/layout/page-title";
import { StatusBadge } from "@/components/ui/status-badge";
import type { RiskStatus } from "@/cre/reserve-guard/risk";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/site-config";
import { rows } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const BAR: Record<RiskStatus, string> = {
  HEALTHY: "bg-emerald-400",
  WATCH: "bg-amber-400",
  STALE: "bg-amber-400",
  UNDERCOLLATERALIZED: "bg-red-400",
  HALTED: "bg-red-400",
};

const pct = (bps: number) => `${(bps / 100).toFixed(2)}%`;

export default function DashboardPage() {
  const tally = rows.reduce<Record<string, number>>((m, r) => ({ ...m, [r.result.status]: (m[r.result.status] ?? 0) + 1 }), {});
  return (
    <>
      <PageTitle eyebrow="Overview" title="Dashboard" description="Try the risk logic, then see how each of the five mock reports is classified. The workflow runs this exact code on every node." />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            { icon: Layers, k: "Scenarios", v: String(rows.length) },
            { icon: Activity, k: "Statuses", v: String(Object.keys(tally).length) },
            { icon: CheckCircle2, k: "Healthy", v: String(tally.HEALTHY ?? 0), tone: "text-emerald-400" },
            { icon: AlertTriangle, k: "Needs attention", v: String(rows.length - (tally.HEALTHY ?? 0)), tone: "text-amber-400" },
            { icon: Link2, k: "Target chain", v: "Sepolia" },
          ].map(({ icon: Icon, k, v, tone }) => (
            <Card key={k} interactive className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{k}</p>
                <Icon className={cn("size-4", tone ?? "text-primary")} />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{v}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="p-6">
            <h2 className="font-medium">Coverage by scenario</h2>
            <p className="mt-1 text-sm text-muted">Reserves divided by supply. The line marks 100%.</p>
            <ul className="mt-6 space-y-4">
              {rows.map((r) => {
                const pctVal = r.result.ratioBps / 100;
                return (
                  <li key={r.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{r.label}</span>
                      <span className="font-mono text-xs text-muted">{pctVal.toFixed(1)}%</span>
                    </div>
                    <div className="relative mt-2 h-2.5 rounded-full bg-border">
                      <div className={cn("h-full rounded-full", BAR[r.result.status])} style={{ width: `${Math.min(pctVal, 110) / 110 * 100}%` }} />
                      <span className="absolute -top-1 bottom-[-4px] w-px bg-foreground/60" style={{ left: `${100 / 110 * 100}%` }} aria-hidden />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="font-medium">Status distribution</h2>
            <p className="mt-1 text-sm text-muted">How the five mock reports are classified.</p>
            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-border">
              {rows.map((r) => <span key={r.id} className={cn("h-full flex-1 border-r border-background last:border-0", BAR[r.result.status])} title={r.result.status} />)}
            </div>
            <ul className="mt-6 space-y-3">
              {Object.entries(tally).map(([status, n]) => (
                <li key={status} className="flex items-center justify-between text-sm">
                  <StatusBadge status={status as RiskStatus} />
                  <span className="font-mono text-xs text-muted">{n} of {rows.length}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t pt-4 text-xs">
              <div className="flex justify-between gap-4"><dt className="text-muted">Contract</dt><dd className="truncate font-mono">{SITE.contract.slice(0, 10)}...{SITE.contract.slice(-6)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Schedule</dt><dd className="font-mono">every 5 min</dd></div>
            </dl>
            <a href={SITE.explorer} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-primary hover:underline">View contract on Etherscan</a>
          </Card>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Live simulator</h2>
          <Simulator />
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">The five mock reports</h2>
          <p className="mt-2 text-sm text-muted">Served by the mock reserve API. Status code is what the workflow writes on-chain.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  {["Scenario", "Reserves", "Supply", "Coverage", "Status", "Code", "Why"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-background/40">
                    <td className="px-4 py-3 font-medium">{r.label}</td>
                    <td className="px-4 py-3">${r.report.totalTrust.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3">${r.report.totalToken.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3">{pct(r.result.ratioBps)}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.result.status} /></td>
                    <td className="px-4 py-3 font-mono">{r.result.statusCode}</td>
                    <td className="min-w-56 px-4 py-3 text-muted">{r.result.reasons.join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
