import Link from "next/link";
import { ArrowRight, Boxes, Check, X, Clock, Cpu, Database, FileCheck2, Landmark, Link2, Scale, ShieldCheck, Users, Wallet } from "lucide-react";
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


const WHY = [
  { icon: ShieldCheck, title: "Verifiable backing", body: "Counterparties read the latest reserve status from the chain instead of relying on a PDF, a press release or a dashboard they cannot verify." },
  { icon: Users, title: "Decentralized agreement", body: "Independent nodes fetch the report and a median decides each number, so a single faulty node cannot change what is published." },
  { icon: Scale, title: "Built for compliance", body: "Stale reports, an active issuer ripcord and thin coverage each produce a distinct status code, which gives auditors and regulators a clear trail." },
];

export default function Home() {
  return (
    <>
      <section className="bg-hex bg-glow relative overflow-hidden border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border bg-surface/80 px-3 py-1 text-xs text-muted backdrop-blur">
              <Link2 className="size-3.5 text-primary" /> Built on Chainlink Runtime Environment
            </span>
            <h1 className="text-gradient mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">Proof of reserves, on-chain.</h1>
            <p className="mt-4 max-w-xl text-xl font-medium leading-snug text-foreground/90">Chainlink nodes check reserves against supply and publish the result on-chain.</p>
            <p className="mt-5 max-w-xl text-muted">
              Attest is a Chainlink Runtime Environment workflow for tokenized assets and stablecoins. It reads the issuer&apos;s reserve report, classifies backing into an auditable status, and publishes it to a smart contract that anyone can read.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover">
                Try the simulator <ArrowRight className="size-4" />
              </Link>
              <Link href="/workflow" className="rounded-lg border bg-surface/60 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-surface">How it works</Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 divide-x overflow-hidden rounded-xl border bg-surface/70 backdrop-blur">
              {[["5", "risk statuses"], ["4", "workflow steps"], ["1", "chain write"]].map(([v, l]) => (
                <div key={l} className="p-4">
                  <dt className="text-2xl font-semibold">{v}</dt>
                  <dd className="text-xs text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-float relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden />
            <div className="relative rounded-2xl border bg-surface/90 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-mono">DemoUSD / Sepolia</span>
                <span className="inline-flex items-center gap-2 text-emerald-300">
                  <span className="pulse-dot relative size-2 rounded-full bg-emerald-400 text-emerald-400" /> Live
                </span>
              </div>
              <p className="mt-6 text-xs uppercase tracking-widest text-muted">Coverage ratio</p>
              <p className="mt-1 text-6xl font-semibold tracking-tight">105.0<span className="text-3xl text-muted">%</span></p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-primary to-emerald-400" />
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-xs text-muted">Reserves</dt><dd className="font-mono">1,050,000</dd></div>
                <div><dt className="text-xs text-muted">Supply</dt><dd className="font-mono">1,000,000</dd></div>
              </dl>
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="rounded-full border border-emerald-400/30 px-2.5 py-0.5 font-mono text-xs text-emerald-300">HEALTHY</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted"><ShieldCheck className="size-3.5 text-primary" /> Median of DON nodes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
          <p className="text-xs uppercase tracking-widest text-primary">Our vision</p>
          <p className="mx-auto mt-3 max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl">A financial system where trust in a token&apos;s backing is verified by code, not promised in a PDF.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted">
          {["Chainlink CRE", "Median consensus", "Ethereum Sepolia", "DataFeedsCache", "Open source"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2"><span className="size-1 rounded-full bg-primary" />{t}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">The old way versus Attest</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Today</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {["A PDF attestation, published monthly", "Issued by the party being checked", "Unreadable by smart contracts", "No signal when a report goes stale"].map((t) => (
                <li key={t} className="flex gap-3"><X className="mt-0.5 size-4 shrink-0 text-red-400" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/50 bg-surface p-6 shadow-lg shadow-primary/10">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">With Attest</p>
            <ul className="mt-4 space-y-3 text-sm">
              {["A status refreshed on a schedule, every 5 minutes", "Independent nodes agree by median", "A status code any contract can read and act on", "STALE and HALTED are first-class states"].map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">For builders</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Gate any action on a token&apos;s backing.</h2>
            <p className="mt-3 text-muted">Read one status code from the chain. Allow, limit or pause based on it, with no off-chain trust required.</p>
            <Link href="/docs" className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">Read the docs <ArrowRight className="size-4" /></Link>
          </div>
          <div className="overflow-hidden rounded-xl border bg-[#070b14] shadow-2xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <span className="size-3 rounded-full bg-red-400/70" /><span className="size-3 rounded-full bg-amber-400/70" /><span className="size-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-xs text-muted">Vault.sol</span>
            </div>
            <pre className="overflow-auto p-5 font-mono text-xs leading-relaxed text-muted">{`function deposit(uint256 amt) external {
  // 0 HEALTHY  1 WATCH  2 UNDER  3 HALTED  4 STALE
  require(attest.status() == 0, "not fully backed");
  _mint(msg.sender, amt);
}`}</pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">From report to chain in four steps</h2>
        <div className="mt-8 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative group rounded-xl border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
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
            <div key={title} className="rounded-xl border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
              <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-primary/10"><Icon className="size-5 text-primary" /></span>
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
              <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-primary/10"><Icon className="size-5 text-primary" /></span>
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

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[["/use-cases", "Use cases", "Who reads the status and what they do with it."], ["/docs", "Docs", "Run the workflow and read the status from a contract."], ["/faq", "FAQ", "What gets written, why CRE, and what this is not."]].map(([href, t, d]) => (
            <Link key={href} href={href} className="group rounded-xl border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
              <p className="flex items-center justify-between font-medium">{t} <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" /></p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </Link>
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
