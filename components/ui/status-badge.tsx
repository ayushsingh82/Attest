import type { RiskStatus } from "@/cre/reserve-guard/risk";
import { STATUS_TONE } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

const SIZE = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-[11px]",
  lg: "bg-background/40 px-3 py-1 text-xs",
} as const;

export function StatusBadge({ status, size = "md", className }: { status: RiskStatus; size?: keyof typeof SIZE; className?: string }) {
  return <span className={cn("inline-block rounded-full border font-mono", SIZE[size], STATUS_TONE[status], className)}>{status}</span>;
}
