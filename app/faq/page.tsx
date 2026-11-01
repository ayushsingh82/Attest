import { Cta } from "@/components/ui/cta";
import { PageTitle } from "@/components/layout/page-title";
import { FAQ } from "@/lib/content/faq";

export const metadata = { title: "FAQ" };


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
