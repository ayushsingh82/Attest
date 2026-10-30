import Link from "next/link";
import { ArrowRight, Boxes, Clock, Cpu, Database, FileCheck2, Landmark, Link2, Scale, ShieldCheck, Users, Wallet } from "lucide-react";
import { STATUS_TONE, rows } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

const FLOW = [
  { icon: Clock, title: "Cron trigger", body: "Runs on a schedule" },
  { icon: Database, title: "Reserve API", body: "Nodes fetch and agree" },
  { icon: Cpu, title: "Risk check", body: "Coverage becomes a status" },
  { icon: Boxes, title: "Smart contract", body: "Status written on Sepolia" },
];

const ARCH = [
  { icon: Landmark, title: "Reserve source", body: "Issuer or custodian publishes a reserve report over HTTP." },
  { icon: Cpu, title: "CRE workflow", body: "Nodes fetch, reach median consensus, and classify coverage." },
  { icon: FileCheck2, title: "On-chain record", body: "Ratio, status code and reserves are written to DataFeedsCache on Sepolia." },
  { icon: Wallet, title: "Consumers", body: "Lending markets, exchanges and auditors read the status before they act." },
];

const FAQ = [
  ["What does the workflow actually write on-chain?", "A bundle with the reserve amount, the coverage ratio in basis points, a status code from 0 to 4, and the report timestamp."],
  ["Why use Chainlink CRE for this?", "CRE runs the same code on a decentralized network and merges the results with consensus. A script on a single server would be one point of failure and one point of trust."],
  ["Is this running on mainnet?", "No. It targets Sepolia and reads a mock reserve API. It is a demo, it has not been audited, and it should not guard real funds."],
  ["What happens when reserves fall short?", "Coverage under 100% is a WATCH, and under 99% is UNDERCOLLATERALIZED. A pulled ripcord is HALTED, and a report older than 24 hours is STALE. Contracts reading the feed can pause or alert on any of these."],
];

const WHY = [
  { icon: ShieldCheck, title: "Verifiable backing", body: "Counterparties read the latest reserve status from the chain instead of relying on a PDF, a press release or a dashboard they cannot verify." },
  { icon: Users, title: "Decentralized agreement", body: "Independent nodes fetch the report and a median decides each number, so a single faulty node cannot change what is published." },
  { icon: Scale, title: "Built for compliance", body: "Stale reports, an active issuer ripcord and thin coverage each produce a distinct status code, which gives auditors and regulators a clear trail." },
];

export default function Home() {
  return (
    <>
      <section className="bg-hex border-b">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border bg-surface px-3 py-1 text-xs text-muted">
            <Link2 className="size-3.5 text-primary" /> Built on Chainlink Runtime Environment
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Know if a token is still backed, on-chain.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Reserve Guard is a Chainlink Runtime Environment workflow for tokenized assets and stablecoins. It reads the issuer&apos;s reserve report, classifies backing into an auditable status, and publishes it to a smart contract that anyone can read.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium transition-colors hover:bg-primary-hover">
              Try the simulator <ArrowRight className="size-4" />
            </Link>
            <Link href="/workflow" className="rounded-lg border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface">How it works</Link>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 divide-x overflow-hidden rounded-xl border bg-surface">
            {[["5", "risk statuses"], ["4", "workflow steps"], ["1", "chain write"]].map(([v, l]) => (
              <div key={l} className="p-4">
                <dt className="text-2xl font-semibold">{v}</dt>
                <dd className="text-xs text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">From report to chain in four steps</h2>
        <div className="mt-8 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative rounded-xl border bg-surface p-5 transition-colors hover:border-primary/60">
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-primary" />
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <p className="mt-4 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
              {i < FLOW.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-background text-muted lg:block" />}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Why it matters</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-surface p-5">
              <Icon className="size-5 text-primary" />
              <p className="mt-4 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Architecture</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">Data moves left to right. Nothing is written until the nodes agree.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {ARCH.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative rounded-xl border bg-surface p-5">
              <Icon className="size-5 text-primary" />
              <p className="mt-4 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
              {i < ARCH.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-background text-primary md:block" />}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">What a report becomes</h2>
          <Link href="/dashboard" className="text-sm text-primary hover:underline">Open the simulator</Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border bg-surface p-4">
              <p className="text-sm font-medium">{r.label}</p>
              <p className="mt-2 text-2xl font-semibold">{(r.result.ratioBps / 100).toFixed(1)}%</p>
              <span className={cn("mt-3 inline-block rounded-full border px-2 py-0.5 font-mono text-[10px]", STATUS_TONE[r.result.status])}>{r.result.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-8 divide-y rounded-xl border bg-surface">
          {FAQ.map(([q, a]) => (
            <details key={q} className="px-5 py-4">
              <summary className="cursor-pointer list-none font-medium marker:hidden">{q}</summary>
              <p className="mt-2 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-hex border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">See the risk logic run.</h2>
            <p className="mt-1 text-muted">Move the reserves and supply and watch the status change.</p>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium transition-colors hover:bg-primary-hover">Open the dashboard <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </>
  );
}
