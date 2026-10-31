import Link from "next/link";
import { NavLinks } from "@/components/nav-links";

export function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <mask id="attest-m">
        <rect width="32" height="32" fill="#fff" />
        <g fill="none" stroke="#000">
          <path d="M9.6 22.8 16 8.6l6.4 14.2" strokeWidth="3.1" strokeLinejoin="miter" strokeLinecap="butt" />
          <path d="M12.3 18.6h7.4" strokeWidth="2.3" />
        </g>
      </mask>
      <path d="M16 1.6 29.4 9.3v13.4L16 30.4 2.6 22.7V9.3z" fill="none" className="stroke-primary" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M16 5.2 26.3 11.1v9.8L16 26.8 5.7 20.9v-9.8z" className="fill-primary stroke-primary" strokeWidth="1.6" strokeLinejoin="round" mask="url(#attest-m)" />
    </svg>
  );
}

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workflow", label: "Workflow" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

const FOOTER_COLS = [
  { title: "Product", links: [["/dashboard", "Dashboard"], ["/workflow", "Workflow"], ["/simulation", "Simulation"]] },
  { title: "Learn", links: [["/use-cases", "Use cases"], ["/docs", "Docs"], ["/faq", "FAQ"]] },
  { title: "Project", links: [["/about", "About"], ["/roadmap", "Roadmap"]] },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">Attest</span>
        </Link>
        <NavLinks items={NAV} />
        <span className="hidden items-center gap-2 rounded-full border bg-surface px-3 py-1 font-mono text-xs text-muted sm:inline-flex"><span className="size-1.5 rounded-full bg-emerald-400" />Sepolia testnet</span>
      </div>
    </header>
  );
}

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

export function PageTitle({ title, description, eyebrow = "Attest" }: { title: string; description: string; eyebrow?: string }) {
  return (
    <div className="bg-hex bg-glow relative border-b">
      <div className="animate-fade-up mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="text-gradient mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-muted">{description}</p>
      </div>
    </div>
  );
}
