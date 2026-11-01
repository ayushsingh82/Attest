import { Boxes, Clock, Cpu, Database, FileCheck2, Landmark, Scale, ShieldCheck, Users, Wallet } from "lucide-react";

export const FLOW = [
  { icon: Clock, title: "Cron trigger", body: "Runs on a schedule" },
  { icon: Database, title: "Reserve API", body: "Nodes fetch and agree" },
  { icon: Cpu, title: "Risk check", body: "Coverage becomes a status" },
  { icon: Boxes, title: "Smart contract", body: "Status written on Sepolia" },
];

export const ARCH = [
  { icon: Landmark, title: "Reserve source", body: "Issuer or custodian publishes a reserve report over HTTP." },
  { icon: Cpu, title: "CRE workflow", body: "Nodes fetch, reach median consensus, and classify coverage." },
  { icon: FileCheck2, title: "On-chain record", body: "Ratio, status code and reserves are written to DataFeedsCache on Sepolia." },
  { icon: Wallet, title: "Consumers", body: "Lending markets, exchanges and auditors read the status before they act." },
];

export const WHY = [
  { icon: ShieldCheck, title: "Verifiable backing", body: "Counterparties read the latest reserve status from the chain instead of relying on a PDF, a press release or a dashboard they cannot verify." },
  { icon: Users, title: "Decentralized agreement", body: "Independent nodes fetch the report and a median decides each number, so a single faulty node cannot change what is published." },
  { icon: Scale, title: "Built for compliance", body: "Stale reports, an active issuer ripcord and thin coverage each produce a distinct status code, which gives auditors and regulators a clear trail." },
];
