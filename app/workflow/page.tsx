import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Boxes, Clock, Cpu, Database } from "lucide-react";
import { PageTitle } from "@/components/site";

export const metadata = { title: "Workflow" };

const STEPS = [
  { icon: Clock, title: "Cron trigger", file: "workflow.ts: initWorkflow", body: "A CronCapability fires the handler on the schedule in config.json, every 5 minutes by default." },
  { icon: Database, title: "HTTP fetch with consensus", file: "workflow.ts: fetchReserves", body: "Each node calls the reserve API. Numeric fields are merged with median consensus, so one bad node cannot change the result." },
  { icon: Cpu, title: "Risk check", file: "risk.ts: assessReserves", body: "Pure function turns reserves, supply, ripcord and report age into a status and a coverage ratio in basis points." },
  { icon: Boxes, title: "EVM write", file: "workflow.ts: writeGuard", body: "The result is ABI-encoded and written to a DataFeedsCache contract on Sepolia through the EVM capability." },
];

const STATUSES = [
  ["HEALTHY (0)", "Reserves cover 100% or more of supply"],
  ["WATCH (1)", "Coverage between 99% and 100%"],
  ["UNDERCOLLATERALIZED (2)", "Coverage below 99%, or supply missing"],
  ["HALTED (3)", "Issuer ripcord is active"],
  ["STALE (4)", "Report older than 24 hours, or date invalid"],
];

export default function WorkflowPage() {
  const config = readFileSync(join(process.cwd(), "cre", "reserve-guard", "config.json"), "utf8");
  return (
    <>
      <PageTitle title="Workflow" description="A Chainlink Runtime Environment workflow that connects an external reserve API to a smart contract." />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Steps</h2>
          <ol className="mt-6 space-y-4">
            {STEPS.map(({ icon: Icon, title, file, body }, i) => (
              <li key={title} className="flex gap-4 rounded-xl border bg-surface p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border text-primary"><Icon className="size-5" /></div>
                <div>
                  <p className="font-medium"><span className="mr-2 font-mono text-xs text-muted">0{i + 1}</span>{title}</p>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                  <p className="mt-2 font-mono text-xs text-primary">{file}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">On-chain payload</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">ABI-encoded and delivered through a DataFeedsCache <span className="font-mono text-foreground">writeReport</span> call.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="divide-y rounded-xl border bg-surface text-sm">
              {[["lastUpdated", "uint32", "Report timestamp from the issuer"], ["totalReserve", "uint256", "Reserves held, in whole units"], ["ratioBps", "uint32", "Reserves divided by supply, 10000 = 100%"], ["status", "uint8", "0 healthy to 4 stale"]].map(([n, t, d]) => (
                <div key={n} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-mono">{n} <span className="text-primary">{t}</span></span>
                  <span className="text-muted">{d}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-surface p-5 text-sm">
              <p className="font-medium">Target contract</p>
              <p className="mt-1 text-muted">DataFeedsCache on Ethereum Sepolia</p>
              <p className="mt-3 break-all font-mono text-xs">0x92bc132002694088c8afE4f09EEA87c46fF5902f</p>
              <a href="https://sepolia.etherscan.io/address/0x92bc132002694088c8afE4f09EEA87c46fF5902f" target="_blank" rel="noreferrer" className="mt-4 inline-block text-primary hover:underline">View on Etherscan</a>
              <p className="mt-4 text-xs text-muted">This is the contract from Chainlink&apos;s official bring-your-own-data template.</p>
            </div>
          </div>
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Status codes</h2>
            <div className="mt-6 divide-y rounded-xl border bg-surface text-sm">
              {STATUSES.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:justify-between">
                  <span className="font-mono">{k}</span>
                  <span className="text-muted">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">config.json</h2>
            <pre className="mt-6 overflow-auto rounded-xl border bg-surface p-5 font-mono text-xs leading-relaxed text-muted">{config}</pre>
          </div>
        </section>
      </div>
    </>
  );
}
