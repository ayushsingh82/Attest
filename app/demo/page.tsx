import { ConsensusDemo } from "@/components/features/demo/consensus-demo";
import { PipelineDemo } from "@/components/features/demo/pipeline-demo";
import { VaultDemo } from "@/components/features/demo/vault-demo";
import { PageTitle } from "@/components/layout/page-title";
import { Cta } from "@/components/ui/cta";

export const metadata = { title: "Demo" };

const DEMOS = [
  { id: "pipeline", n: "01", title: "Watch a workflow run", body: "Pick a scenario and run the four steps: trigger, fetch, consensus and chain write. The log shows what each node saw.", node: <PipelineDemo /> },
  { id: "consensus", n: "02", title: "Break a node, keep the truth", body: "Make nodes faulty and compare the median with a single node and a plain average. This is why Attest runs on CRE.", node: <ConsensusDemo /> },
  { id: "vault", n: "03", title: "A contract that reacts", body: "A vault reads the Attest status and changes its rules. Switch scenarios and try to deposit.", node: <VaultDemo /> },
];

export default function DemoPage() {
  return (
    <>
      <PageTitle eyebrow="Interactive" title="Try Attest" description="Three short demos that run in your browser with the same risk logic as the workflow. Writes are simulated and no transaction is sent." />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {DEMOS.map((d) => (
          <section key={d.id} id={d.id} className="scroll-mt-24">
            <p className="font-mono text-xs text-primary">{d.n}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{d.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{d.body}</p>
            <div className="mt-6">{d.node}</div>
          </section>
        ))}
      </div>
      <Cta title="Want the details?" body="Read how the workflow, thresholds and on-chain payload fit together." href="/docs" label="Read the docs" />
    </>
  );
}
