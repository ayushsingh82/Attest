"use client";

import { ChevronDown, LogOut, Wallet } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Eip1193 = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, cb: (...args: never[]) => void) => void;
  removeListener?: (event: string, cb: (...args: never[]) => void) => void;
};

const SEPOLIA = "0xaa36a7";
const NETWORKS: Record<string, string> = {
  "0x1": "Ethereum",
  [SEPOLIA]: "Sepolia",
  "0x89": "Polygon",
  "0xa": "Optimism",
  "0xa4b1": "Arbitrum",
  "0x2105": "Base",
  "0x38": "BNB Chain",
};

const getProvider = () => (typeof window === "undefined" ? undefined : (window as unknown as { ethereum?: Eip1193 }).ethereum);
const short = (a: string) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Restore an existing authorization without prompting.
  useEffect(() => {
    const eth = getProvider();
    if (!eth) return;
    const onAccounts = (accts: string[]) => setAccount(accts[0] ?? null);
    const onChain = (id: string) => setChainId(id.toLowerCase());
    eth.request({ method: "eth_accounts" }).then((a) => { onAccounts(a as string[]); return eth.request({ method: "eth_chainId" }); }).then((c) => onChain(c as string)).catch(() => {});
    eth.on?.("accountsChanged", onAccounts as never);
    eth.on?.("chainChanged", onChain as never);
    return () => {
      eth.removeListener?.("accountsChanged", onAccounts as never);
      eth.removeListener?.("chainChanged", onChain as never);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const connect = useCallback(async () => {
    const eth = getProvider();
    if (!eth) return setError("No wallet found. Install MetaMask or another EVM wallet.");
    try {
      setError(null);
      const accts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      setAccount(accts[0] ?? null);
      setChainId(((await eth.request({ method: "eth_chainId" })) as string).toLowerCase());
    } catch {
      setError("Connection was rejected.");
    }
  }, []);

  const switchToSepolia = async () => {
    try {
      await getProvider()?.request({ method: "wallet_switchEthereumChain", params: [{ chainId: SEPOLIA }] });
      setOpen(false);
    } catch {
      setError("Could not switch network.");
    }
  };

  if (!account) {
    return (
      <div className="relative">
        <button type="button" onClick={connect} className="inline-flex items-center gap-2 rounded-full border bg-surface px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-primary">
          <Wallet className="size-3.5 text-primary" /> Connect<span className="hidden sm:inline"> wallet</span>
        </button>
        {error && <p role="alert" className="absolute right-0 top-full mt-2 w-60 rounded-lg border bg-surface p-3 text-xs text-muted shadow-xl">{error}</p>}
      </div>
    );
  }

  const onSepolia = chainId === SEPOLIA;
  const network = (chainId && NETWORKS[chainId]) ?? "Unknown network";

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-full border bg-surface px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-primary">
        <span className="relative flex size-2">
          <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", onSepolia ? "bg-emerald-400" : "bg-amber-400")} />
          <span className={cn("relative inline-flex size-2 rounded-full", onSepolia ? "bg-emerald-400" : "bg-amber-400")} />
        </span>
        {network}
        <ChevronDown className="size-3 text-muted" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-lg border bg-surface p-3 text-xs shadow-xl">
          <p className="font-mono text-muted">{short(account)}</p>
          {!onSepolia && <button type="button" onClick={switchToSepolia} className="mt-3 w-full rounded-md bg-primary px-3 py-2 font-medium transition-colors hover:bg-primary-hover">Switch to Sepolia</button>}
          {error && <p role="alert" className="mt-2 text-red-300">{error}</p>}
          <button type="button" onClick={() => { setAccount(null); setOpen(false); }} className="mt-3 flex w-full items-center gap-2 rounded-md px-1 py-1 text-muted transition-colors hover:text-foreground"><LogOut className="size-3.5" />Disconnect</button>
        </div>
      )}
    </div>
  );
}
