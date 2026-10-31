import { Banknote, Building2, Gavel, Landmark, Repeat, ShieldAlert } from "lucide-react";
import { Cta } from "@/components/cta";
import { PageTitle } from "@/components/site";

export const metadata = { title: "Use cases" };

const CASES = [
  { icon: Banknote, who: "Stablecoin issuers", title: "Prove backing continuously", body: "Publish coverage on-chain every few minutes instead of a monthly attestation. Holders and partners see the same number you do." },
  { icon: Landmark, who: "Lending markets", title: "Gate collateral by status", body: "Accept a stablecoin as collateral only while its status is HEALTHY. Cut its loan-to-value when it moves to WATCH." },
  { icon: Repeat, who: "Exchanges and DEXs", title: "Pause risky pairs", body: "Read the status before listing or routing. Halt a pair automatically when a token is UNDERCOLLATERALIZED or HALTED." },
  { icon: Gavel, who: "Auditors and regulators", title: "A clear, timestamped trail", body: "Each status change is an on-chain event with a ratio and a report time, so there is a record of what was known and when." },
  { icon: Building2, who: "Tokenized RWA platforms", title: "Show asset backing", body: "Tokenized funds and treasuries can expose reserve coverage to investors and integrators in a standard shape." },
  { icon: ShieldAlert, who: "Risk teams", title: "Alert on stale data", body: "A report older than 24 hours becomes STALE, which is itself a risk signal worth a page." },
];

export default function UseCasesPage() {
  return (
    <>
      <PageTitle eyebrow="Use cases" title="Who reads the status" description="Anyone who needs to know if a token is still backed, and acts on it without a human in the loop." />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map(({ icon: Icon, who, title, body }) => (
            <div key={title} className="rounded-xl border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-primary/10"><Icon className="size-5 text-primary" /></span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{who}</span>
              </div>
              <p className="mt-4 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
      <Cta title="Try a scenario." body="Pick a preset and see which status your protocol would read." />
    </>
  );
}
