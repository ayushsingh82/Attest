import { Boxes, Clock, Cpu, Database } from "lucide-react";

export const STEPS = [
  { icon: Clock, title: "Cron trigger", file: "workflow.ts: initWorkflow", body: "A CronCapability fires the handler on the schedule in config.json, every 5 minutes by default." },
  { icon: Database, title: "HTTP fetch with consensus", file: "workflow.ts: fetchReserves", body: "Each node calls the reserve API. Numeric fields are merged with median consensus, so one bad node cannot change the result." },
  { icon: Cpu, title: "Risk check", file: "risk.ts: assessReserves", body: "Pure function turns reserves, supply, ripcord and report age into a status and a coverage ratio in basis points." },
  { icon: Boxes, title: "EVM write", file: "workflow.ts: writeGuard", body: "The result is ABI-encoded and written to a DataFeedsCache contract on Sepolia through the EVM capability." },
];

export const STATUSES = [
  ["HEALTHY (0)", "Reserves cover 100% or more of supply"],
  ["WATCH (1)", "Coverage between 99% and 100%"],
  ["UNDERCOLLATERALIZED (2)", "Coverage below 99%, or supply missing"],
  ["HALTED (3)", "Issuer ripcord is active"],
  ["STALE (4)", "Report older than 24 hours, or date invalid"],
];
