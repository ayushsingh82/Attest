import { Cta } from "@/components/ui/cta";
import { PageTitle } from "@/components/layout/page-title";
import { CASES } from "@/lib/content/use-cases";

export const metadata = { title: "Use cases" };


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
