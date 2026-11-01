import { Banknote, Building2, Gavel, Landmark, Repeat, ShieldAlert } from "lucide-react";

export const CASES = [
  { icon: Banknote, who: "Stablecoin issuers", title: "Prove backing continuously", body: "Publish coverage on-chain every few minutes instead of a monthly attestation. Holders and partners see the same number you do." },
  { icon: Landmark, who: "Lending markets", title: "Gate collateral by status", body: "Accept a stablecoin as collateral only while its status is HEALTHY. Cut its loan-to-value when it moves to WATCH." },
  { icon: Repeat, who: "Exchanges and DEXs", title: "Pause risky pairs", body: "Read the status before listing or routing. Halt a pair automatically when a token is UNDERCOLLATERALIZED or HALTED." },
  { icon: Gavel, who: "Auditors and regulators", title: "A clear, timestamped trail", body: "Each status change is an on-chain event with a ratio and a report time, so there is a record of what was known and when." },
  { icon: Building2, who: "Tokenized RWA platforms", title: "Show asset backing", body: "Tokenized funds and treasuries can expose reserve coverage to investors and integrators in a standard shape." },
  { icon: ShieldAlert, who: "Risk teams", title: "Alert on stale data", body: "A report older than 24 hours becomes STALE, which is itself a risk signal worth a page." },
];
