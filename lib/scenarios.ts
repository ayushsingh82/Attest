import { assessReserves, type ReserveReport, type RiskStatus } from "@/cre/reserve-guard/risk";

/** Fixed clock so the page renders the same every time. Mirrors cre/mock-server/server.mjs. */
const NOW = Math.floor(Date.parse("2026-10-28T12:00:00Z") / 1000);
const at = (hoursAgo: number) => new Date((NOW - hoursAgo * 3600) * 1000).toISOString();

const base = { accountName: "DemoUSD", totalToken: 1_000_000, ripcord: false };

export const SCENARIOS: { id: string; label: string; report: ReserveReport }[] = [
  { id: "healthy", label: "Fully backed", report: { ...base, totalTrust: 1_050_000, updatedAt: at(1) } },
  { id: "watch", label: "Slightly under 100%", report: { ...base, totalTrust: 995_000, updatedAt: at(1) } },
  { id: "under", label: "Undercollateralized", report: { ...base, totalTrust: 900_000, updatedAt: at(1) } },
  { id: "halted", label: "Issuer ripcord pulled", report: { ...base, totalTrust: 1_050_000, ripcord: true, updatedAt: at(1) } },
  { id: "stale", label: "Report 3 days old", report: { ...base, totalTrust: 1_050_000, updatedAt: at(72) } },
];

export const rows = SCENARIOS.map((s) => ({ ...s, result: assessReserves(s.report, NOW) }));

export const STATUS_TONE: Record<RiskStatus, string> = {
  HEALTHY: "border-emerald-400/30 text-emerald-300",
  WATCH: "border-amber-400/30 text-amber-300",
  UNDERCOLLATERALIZED: "border-red-400/30 text-red-300",
  HALTED: "border-red-400/30 text-red-300",
  STALE: "border-amber-400/30 text-amber-300",
};
