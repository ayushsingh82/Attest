import { assessReserves, type ReserveReport } from "@/cre/reserve-guard/risk";
import { SCENARIOS } from "@/lib/scenarios";

/** Same fixed clock as lib/scenarios so demos are deterministic. */
export const DEMO_NOW = Math.floor(Date.parse("2026-10-28T12:00:00Z") / 1000);

export const getScenario = (id: string) => SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];

export const assess = (report: ReserveReport) => assessReserves(report, DEMO_NOW);

export const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.floor((s[mid - 1] + s[mid]) / 2);
};

export const mean = (values: number[]) => Math.floor(values.reduce((a, b) => a + b, 0) / values.length);

/** Small fixed offsets so each node sees a slightly different reading, like real network jitter. */
export const NODE_JITTER = [0, 0.0012, -0.0009, 0.0021, -0.0017, 0.0006, -0.0004];

/** Deterministic fake hash. Used only to label simulated writes, never presented as a real transaction. */
export function fakeHash(seed: string) {
  let h = 2166136261;
  let out = "";
  for (let i = 0; out.length < 64; i++) {
    h ^= seed.charCodeAt(i % seed.length) + i;
    h = Math.imul(h, 16777619) >>> 0;
    out += h.toString(16).padStart(8, "0");
  }
  return `0x${out.slice(0, 64)}`;
}
