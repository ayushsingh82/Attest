import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { WalletButton } from "@/components/layout/wallet-button";
import { NAV } from "@/lib/content/navigation";
import { SITE } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
        </Link>
        <div className="flex items-center gap-3">
          <NavLinks items={NAV} />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
