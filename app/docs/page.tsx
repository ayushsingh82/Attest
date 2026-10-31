import { Cta } from "@/components/cta";
import { PageTitle } from "@/components/site";

export const metadata = { title: "Docs" };

const RUN = `# 1. Start the mock reserve API (leave running)
node mock-server/server.mjs

# 2. Log in to the CRE CLI (one time, opens a browser)
cre login

# 3. Simulate the workflow
cd cre
cre workflow simulate reserve-guard --non-interactive --trigger-index 0`;

const READ = `// Solidity: gate an action on Attest status
interface IDataFeedsCache {
  function latestReport(bytes32 id) external view returns (bytes memory);
}

// status: 0 HEALTHY, 1 WATCH, 2 UNDERCOLLATERALIZED, 3 HALTED, 4 STALE
require(status == 0, "reserves not healthy");`;

const SECTIONS = [
  ["quickstart", "Quickstart"],
  ["thresholds", "Thresholds"],
  ["consume", "Read the status"],
  ["layout", "Project layout"],
];

export default function DocsPage() {
  return (
    <>
      <PageTitle eyebrow="Documentation" title="Docs" description="Run the workflow, understand the thresholds, and read the status from your own contract." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l text-sm">
            {SECTIONS.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="-ml-px block border-l border-transparent px-4 py-1.5 text-muted transition-colors hover:border-primary hover:text-foreground">{label}</a></li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 space-y-14">
          <section id="quickstart" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">Quickstart</h2>
            <p className="mt-2 text-sm text-muted">You need the CRE CLI and Node. The workflow runs against a local mock reserve API.</p>
            <pre className="mt-4 overflow-auto rounded-xl border bg-surface p-5 font-mono text-xs leading-relaxed text-muted">{RUN}</pre>
          </section>
          <section id="thresholds" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">Thresholds</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border bg-surface">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{["Status", "Code", "Condition"].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr></thead>
                <tbody className="divide-y">
                  {[["HEALTHY", "0", "Coverage 100% or more"], ["WATCH", "1", "Coverage 99% to under 100%"], ["UNDERCOLLATERALIZED", "2", "Coverage under 99%, or supply missing"], ["HALTED", "3", "Issuer ripcord active"], ["STALE", "4", "Report older than 24h or date invalid"]].map((r) => (
                    <tr key={r[0]}><td className="px-4 py-3 font-mono">{r[0]}</td><td className="px-4 py-3 font-mono text-primary">{r[1]}</td><td className="px-4 py-3 text-muted">{r[2]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="consume" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">Read the status</h2>
            <p className="mt-2 text-sm text-muted">The workflow writes to a DataFeedsCache contract. Decode the report and branch on the status code. Illustrative sketch, not production code.</p>
            <pre className="mt-4 overflow-auto rounded-xl border bg-surface p-5 font-mono text-xs leading-relaxed text-muted">{READ}</pre>
          </section>
          <section id="layout" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">Project layout</h2>
            <div className="mt-4 divide-y rounded-xl border bg-surface text-sm">
              {[["cre/reserve-guard/workflow.ts", "Workflow: fetch, consensus, risk, chain write"], ["cre/reserve-guard/risk.ts", "Pure risk logic, unit tested"], ["cre/reserve-guard/config.json", "Schedule, API URL, thresholds, contract"], ["cre/mock-server/server.mjs", "Mock reserve API with five scenarios"]].map(([f, d]) => (
                <div key={f} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:justify-between"><span className="font-mono text-xs">{f}</span><span className="text-muted">{d}</span></div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Cta title="Prefer to click?" body="The simulator runs the same risk logic in your browser." />
    </>
  );
}
