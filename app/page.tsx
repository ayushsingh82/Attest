import Link from "next/link";
import { ArrowRight, Boxes, Clock, Cpu, Database, Link2, Scale, ShieldCheck, Users } from "lucide-react";
import { STATUS_TONE, rows } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

const FLOW = [
  { icon: Clock, title: "Cron trigger", body: "Runs on a schedule" },
  { icon: Database, title: "Reserve API", body: "Nodes fetch and agree" },
  { icon: Cpu, title: "Risk check", body: "Coverage becomes a status" },
  { icon: Boxes, title: "Smart contract", body: "Status written on Sepolia" },
];

const WHY = [
  { icon: ShieldCheck, title: "Verifiable backing", body: "Anyone can read the latest reserve status from the chain instead of trusting a PDF or a dashboard." },
  { icon: Users, title: "Decentralized agreement", body: "Several nodes fetch the report and a median decides the numbers, so one bad source cannot move the result." },
  { icon: Scale, title: "Built for compliance", body: "Stale reports, pulled ripcords and thin coverage each produce a distinct, auditable status code." },
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
            Reserve Guard is a CRE workflow. It reads a reserve report from an external API, decides whether reserves cover supply, and writes the result to a smart contract.
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

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
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
    </>
  );
}
