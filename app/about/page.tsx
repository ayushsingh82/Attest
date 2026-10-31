import { AlertTriangle, EyeOff, FileX, Lightbulb } from "lucide-react";
import { Cta } from "@/components/cta";
import { PageTitle } from "@/components/site";

export const metadata = { title: "About" };

const PROBLEMS = [
  { icon: FileX, title: "Reserves live in PDFs", body: "Issuers publish attestations monthly as documents. By the time you read one, it is already out of date." },
  { icon: EyeOff, title: "Nobody can check", body: "A dashboard run by the issuer is still the issuer talking. There is no neutral party in the loop." },
  { icon: AlertTriangle, title: "Contracts cannot react", body: "Lending markets and exchanges cannot read a PDF, so they cannot pause when backing slips." },
];

export default function AboutPage() {
  return (
    <>
      <PageTitle eyebrow="About" title="Why Attest exists" description="Tokenized assets are only as good as the reserves behind them. Attest makes that backing something a smart contract can read." />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROBLEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-primary/10"><Icon className="size-5 text-primary" /></span>
                <p className="mt-4 font-medium">{title}</p>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Our approach</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Replace the PDF with a status anyone can read.</h2>
            <p className="mt-4 text-muted">A Chainlink CRE workflow fetches the issuer&apos;s reserve report on a schedule. Independent nodes each make the call and agree on the numbers by median. The agreed result becomes a status code and a coverage ratio, written to a contract on-chain.</p>
            <p className="mt-3 text-muted">Any protocol can then read that status and act on it: pause minting, raise margin, or alert a human.</p>
          </div>
          <div className="rounded-xl border bg-surface p-6">
            <Lightbulb className="size-5 text-primary" />
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight">A financial system where trust in a token&apos;s backing is verified by code, not promised in a PDF.</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">Our vision</p>
          </div>
        </section>
        <section className="rounded-xl border bg-surface p-6">
          <h2 className="text-lg font-semibold">Built for the BLI Legal Tech Hackathon 2</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">Attest targets the Chainlink &quot;Best workflow with CRE&quot; bounty. It uses a CRE workflow as the orchestration layer, one blockchain (Sepolia), one external API, and a CLI simulation. It is a demo, has not been audited, and is not financial advice.</p>
        </section>
      </div>
      <Cta />
    </>
  );
}
