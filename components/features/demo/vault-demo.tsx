"use client";

import { Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { ScenarioPicker } from "@/components/features/demo/scenario-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { assess, getScenario } from "@/lib/demo";
import type { RiskStatus } from "@/cre/reserve-guard/risk";

const CAP = 1_000;
/** Deposit cap as a share of normal, per status. Mirrors how a real consumer might react. */
const LIMIT: Record<RiskStatus, number> = { HEALTHY: 1, WATCH: 0.1, UNDERCOLLATERALIZED: 0, HALTED: 0, STALE: 0 };
const REASON: Record<RiskStatus, string> = {
  HEALTHY: "Fully backed. Deposits open up to the normal cap.",
  WATCH: "Slightly under 100%. Deposits limited to 10% of the cap.",
  UNDERCOLLATERALIZED: "Backing below 99%. Deposits paused.",
  HALTED: "Issuer ripcord pulled. Deposits paused.",
  STALE: "Report is too old to trust. Deposits paused.",
};

export function VaultDemo() {
  const [scenario, setScenario] = useState("healthy");
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState<string[]>([]);

  const status = assess(getScenario(scenario).report).status;
  const limit = CAP * LIMIT[status];
  const open = limit > 0;
  const Icon = status === "HEALTHY" ? ShieldCheck : open ? TriangleAlert : Lock;
  const push = (e: string) => setEvents((l) => [e, ...l].slice(0, 6));

  const deposit = (amt: number) => {
    if (!open) return push(`Reverted: status is ${status}`);
    if (balance + amt > limit) return push(`Reverted: ${amt} would exceed the ${limit} limit`);
    setBalance((b) => b + amt);
    push(`Deposited ${amt} (status ${status})`);
  };

  return (
    <div className="rounded-xl border bg-surface p-6">
      <ScenarioPicker value={scenario} onChange={(id) => { setScenario(id); push(`Attest status changed`); }} />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-5">
          <div className="flex items-center justify-between">
            <p className="font-medium">DemoVault</p>
            <StatusBadge status={status} size="lg" />
          </div>
          <div className="mt-4 flex items-start gap-3 text-sm text-muted"><Icon className="mt-0.5 size-4 shrink-0 text-primary" />{REASON[status]}</div>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-xs text-muted">Your balance</dt><dd className="font-mono text-lg">{balance}</dd></div>
            <div><dt className="text-xs text-muted">Current limit</dt><dd className="font-mono text-lg">{limit}</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {[50, 100, 500].map((n) => (
              <button key={n} type="button" onClick={() => deposit(n)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-hover">Deposit {n}</button>
            ))}
            <button type="button" onClick={() => { setBalance(0); push("Withdrew all"); }} className="rounded-lg border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground">Withdraw all</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border bg-[#070b14]">
          <div className="border-b px-4 py-2.5 font-mono text-xs text-muted">Vault.sol</div>
          <pre className="overflow-auto p-4 font-mono text-xs leading-relaxed text-muted">{`function deposit(uint256 amt) external {
  uint8 s = attest.status();
  require(s == 0 || s == 1, "paused");
  uint256 limit = s == 0 ? CAP : CAP / 10;
  require(balance[msg.sender] + amt <= limit);
  balance[msg.sender] += amt;
}`}</pre>
          <div className="border-t px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Events</p>
            <ul aria-live="polite" className="mt-2 space-y-1 font-mono text-xs text-emerald-200/90">
              {events.length ? events.map((e, i) => <li key={`${e}-${i}`}>{e}</li>) : <li className="text-muted">No events yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
