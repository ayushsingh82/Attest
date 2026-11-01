import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FOOTER_COLS } from "@/lib/content/navigation";

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="size-6" />
              <span className="font-semibold tracking-tight">Attest</span>
            </Link>
            <p className="mt-3 text-sm text-muted">Proof of reserves, orchestrated by Chainlink CRE and published on-chain.</p>
          </div>
          <div className="grid grid-cols-3 gap-10 text-sm">
            {FOOTER_COLS.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{c.title}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-muted transition-colors hover:text-foreground">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>Attest. Built for the Chainlink CRE bounty at the BLI Legal Tech Hackathon 2.</p>
          <p>Demo only. Not audited. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
