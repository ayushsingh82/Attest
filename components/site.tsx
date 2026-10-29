import Link from "next/link";

export function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" className="fill-primary" />
      <polygon points="16,9 22,12.5 22,19.5 16,23 10,19.5 10,12.5" className="fill-background" />
    </svg>
  );
}

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workflow", label: "Workflow" },
  { href: "/simulation", label: "Simulation" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold tracking-tight">Reserve Guard</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-muted">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md px-3 py-2 transition-colors hover:text-foreground">{n.label}</Link>
          ))}
        </nav>
        <span className="hidden rounded-full border px-3 py-1 font-mono text-xs text-muted sm:inline">Sepolia testnet</span>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>Reserve Guard. Built for the Chainlink CRE bounty at the BLI Legal Tech Hackathon 2.</p>
        <p>Demo only. Not audited. Not financial advice.</p>
      </div>
    </footer>
  );
}

export function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-hex border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{description}</p>
      </div>
    </div>
  );
}
