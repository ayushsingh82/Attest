import { DocsNav } from "@/components/features/docs-nav";
import { PageTitle } from "@/components/layout/page-title";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Cta } from "@/components/ui/cta";
import { CONFIG, CONFIG_FIELDS, CONSUME, DOC_SECTIONS, PAYLOAD_ROWS, QUICKSTART, STATUS_ROWS, TESTING } from "@/lib/content/docs";

export const metadata = { title: "Docs" };

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b pb-12 last:border-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Table({ head, rows, mono = [0] }: { head: string[]; rows: string[][]; mono?: number[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {head.map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => <td key={i} className={`px-4 py-3 align-top ${mono.includes(i) ? "font-mono text-xs text-foreground" : "text-muted"}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <PageTitle eyebrow="Documentation" title="Docs" description="Everything you need to run the workflow, tune the thresholds and read the status from your own contract." />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[210px_1fr]">
        <aside className="hidden lg:block"><DocsNav sections={DOC_SECTIONS} /></aside>
        <div className="min-w-0 space-y-12">
          <Section id="overview" title="Overview">
            <p>Attest is a Chainlink Runtime Environment (CRE) workflow. On a schedule it fetches a reserve report, lets independent nodes agree on the numbers, classifies the result into one of five statuses and writes it to a smart contract that anyone can read.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[["Input", "A reserve report from an HTTP API"], ["Process", "Median consensus, then a pure risk check"], ["Output", "A status code and ratio on-chain"]].map(([t, d]) => (
                <Card key={t}><p className="font-mono text-[10px] uppercase tracking-widest text-primary">{t}</p><p className="mt-2 text-foreground">{d}</p></Card>
              ))}
            </div>
          </Section>

          <Section id="architecture" title="Architecture">
            <p>Four capabilities do the work. Each step runs on every node, and nothing is written until the nodes agree.</p>
            <ol className="space-y-2">
              {[["Cron trigger", "Fires the handler on the schedule in config.json."], ["HTTP fetch", "Each node calls the reserve API. Numeric fields use median consensus."], ["Risk check", "risk.ts is a pure function, so every node reaches the same answer."], ["EVM write", "The result is ABI-encoded and delivered to DataFeedsCache on Sepolia."]].map(([t, d], i) => (
                <li key={t} className="flex gap-3"><span className="font-mono text-xs text-primary">0{i + 1}</span><span><span className="text-foreground">{t}.</span> {d}</span></li>
              ))}
            </ol>
          </Section>

          <Section id="quickstart" title="Quickstart">
            <p>You need Node 22+, Bun and the CRE CLI. The workflow runs against a local mock reserve API with five scenarios.</p>
            <CodeBlock title="terminal" code={QUICKSTART} />
          </Section>

          <Section id="configuration" title="Configuration">
            <p>Everything the workflow needs lives in <span className="font-mono text-foreground">cre/reserve-guard/config.json</span>.</p>
            <CodeBlock title="config.json" code={CONFIG} />
            <Table head={["Field", "Description"]} rows={CONFIG_FIELDS} />
          </Section>

          <Section id="statuses" title="Status codes">
            <p>Checks run in order: ripcord, then staleness, then coverage. The first match wins.</p>
            <Table head={["Status", "Code", "Condition"]} rows={STATUS_ROWS} mono={[0, 1]} />
          </Section>

          <Section id="payload" title="On-chain payload">
            <p>ABI-encoded and delivered through a DataFeedsCache <span className="font-mono text-foreground">writeReport</span> call on Ethereum Sepolia.</p>
            <Table head={["Field", "Type", "Description"]} rows={PAYLOAD_ROWS} mono={[0, 1]} />
          </Section>

          <Section id="consume" title="Read the status">
            <p>Any contract can branch on the status. Treat anything other than HEALTHY as a reason to pause or limit an action.</p>
            <CodeBlock title="Vault.sol" code={CONSUME} />
          </Section>

          <Section id="testing" title="Testing">
            <p>The risk logic is pure and deterministic, so it is unit tested without the CRE runtime.</p>
            <CodeBlock title="terminal" code={TESTING} />
          </Section>

          <Section id="notes" title="Notes">
            <ul className="list-disc space-y-2 pl-5">
              <li>Attest targets Ethereum Sepolia and reads a mock API. It is a demo, has not been audited and should not guard real funds.</li>
              <li>Median consensus assumes an honest majority of nodes. See the consensus demo to try breaking it.</li>
              <li>The contract used is the DataFeedsCache from Chainlink&apos;s official bring-your-own-data template.</li>
            </ul>
          </Section>
        </div>
      </div>
      <Cta title="Prefer to click?" body="The demo runs the same risk logic in your browser." href="/demo" label="Open the demo" />
    </>
  );
}
