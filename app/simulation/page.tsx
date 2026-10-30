import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PageTitle } from "@/components/site";

export const metadata = { title: "Simulation" };

function readLog() {
  const file = join(process.cwd(), "cre", "simulation-log.txt");
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

const COMMANDS = `cre login
cd cre
node mock-server/server.mjs &
cre workflow simulate reserve-guard --non-interactive --trigger-index 0 | tee simulation-log.txt`;

export default function SimulationPage() {
  const log = readLog();
  return (
    <>
      <PageTitle title="Simulation" description="Proof that the workflow runs in the CRE runtime. The log is read from cre/simulation-log.txt." />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        {log ? (
          <pre className="max-h-[32rem] overflow-auto rounded-xl border bg-surface p-5 font-mono text-xs leading-relaxed text-muted">{log}</pre>
        ) : (
          <div className="rounded-xl border bg-surface p-6 text-sm text-muted">
            <p className="font-medium text-foreground">No simulation log yet</p>
            <p className="mt-2">The CRE CLI needs a one-time login before it can simulate. Run these from the project root:</p>
            <pre className="mt-4 overflow-auto rounded-lg border bg-background p-4 font-mono text-xs text-foreground">{COMMANDS}</pre>
            <p className="mt-4">When <code className="font-mono text-foreground">cre/simulation-log.txt</code> exists, this page shows it.</p>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Checked locally", "Risk logic, mock API, bundling and these pages"],
            ["Needs CRE login", "The simulation itself"],
            ["Optional", "Broadcast to Sepolia with a funded key"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-surface p-5">
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
