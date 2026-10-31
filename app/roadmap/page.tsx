import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { Cta } from "@/components/cta";
import { PageTitle } from "@/components/site";

export const metadata = { title: "Roadmap" };

const PHASES = [
  { name: "Now", state: "done", items: ["CRE workflow with HTTP fetch, median consensus and EVM write", "Risk logic with five statuses and unit tests", "Mock reserve API with five scenarios", "Dashboard, live simulator and docs"] },
  { name: "Next", state: "active", items: ["Run `cre workflow simulate` and publish the log", "Broadcast a real write to Sepolia", "Record the demo video and submit"] },
  { name: "Later", state: "todo", items: ["Real custodian and attestation API adapters", "Multi-asset support with per-token thresholds", "Alerting webhooks and a status-change event feed", "Audit and mainnet deployment"] },
];

const ICON = { done: CheckCircle2, active: Loader2, todo: CircleDashed } as const;

export default function RoadmapPage() {
  return (
    <>
      <PageTitle eyebrow="Roadmap" title="Where Attest is going" description="What is built, what is next for the hackathon, and what would come after." />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <ol className="space-y-5">
          {PHASES.map((p) => {
            const Icon = ICON[p.state as keyof typeof ICON];
            return (
              <li key={p.name} className="rounded-xl border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <Icon className={p.state === "done" ? "size-5 text-emerald-400" : p.state === "active" ? "size-5 text-primary" : "size-5 text-muted"} />
                  <h2 className="text-xl font-semibold tracking-tight">{p.name}</h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {p.items.map((i) => <li key={i} className="flex gap-3"><span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />{i}</li>)}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      <Cta />
    </>
  );
}
