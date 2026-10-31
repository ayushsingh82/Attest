import { Cta } from "@/components/cta";
import { PageTitle } from "@/components/site";

export const metadata = { title: "FAQ" };

const FAQ = [
  ["What does the workflow actually write on-chain?", "A bundle with the reserve amount, the coverage ratio in basis points, a status code from 0 to 4, and the report timestamp."],
  ["Why use Chainlink CRE for this?", "CRE runs the same code on a decentralized network and merges the results with consensus. A script on a single server would be one point of failure and one point of trust."],
  ["Is this running on mainnet?", "No. It targets Sepolia and reads a mock reserve API. It is a demo, it has not been audited, and it should not guard real funds."],
  ["What happens when reserves fall short?", "Coverage under 100% is a WATCH, and under 99% is UNDERCOLLATERALIZED. A pulled ripcord is HALTED, and a report older than 24 hours is STALE. Contracts reading the feed can pause or alert on any of these."],
];

export default function FaqPage() {
  return (
    <>
      <PageTitle eyebrow="FAQ" title="Frequently asked questions" description="Short answers about what Attest writes, why it uses CRE, and what it is not." />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="divide-y rounded-xl border bg-surface">
          {FAQ.map(([q, a]) => (
            <details key={q} className="px-5 py-4">
              <summary className="cursor-pointer list-none font-medium marker:hidden">{q}</summary>
              <p className="mt-2 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
      <Cta />
    </>
  );
}
