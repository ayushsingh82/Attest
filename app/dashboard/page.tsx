import { Simulator } from "@/components/simulator";
import { PageTitle } from "@/components/site";
import { STATUS_TONE, rows } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const pct = (bps: number) => `${(bps / 100).toFixed(2)}%`;

export default function DashboardPage() {
  const tally = rows.reduce<Record<string, number>>((m, r) => ({ ...m, [r.result.status]: (m[r.result.status] ?? 0) + 1 }), {});
  return (
    <>
      <PageTitle eyebrow="Overview" title="Dashboard" description="Try the risk logic, then see how each of the five mock reports is classified. The workflow runs this exact code on every node." />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <section>
          <div className="grid grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border bg-surface sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {[
              ["Scenarios", String(rows.length)],
              ["Statuses", String(Object.keys(tally).length)],
              ["Healthy", String(tally.HEALTHY ?? 0)],
              ["Needs attention", String(rows.length - (tally.HEALTHY ?? 0))],
              ["Target chain", "Sepolia"],
            ].map(([k, v]) => (
              <div key={k} className="p-4 transition-colors hover:bg-background/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{k}</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">{v}</p>
              </div>
            ))}
          </div>
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
                    <td className="px-4 py-3"><span className={cn("rounded-full border px-2 py-0.5 font-mono text-[11px]", STATUS_TONE[r.result.status])}>{r.result.status}</span></td>
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
