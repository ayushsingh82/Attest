import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <section className="bg-hex bg-glow">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
        <Logo className="size-14" />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">404</p>
        <h1 className="text-gradient mt-2 text-4xl font-semibold tracking-tight">Nothing attested here.</h1>
        <p className="mt-3 text-muted">That page does not exist. Head back and run the simulator instead.</p>
        <ButtonLink href="/dashboard" arrow className="mt-8">Open the dashboard</ButtonLink>
      </div>
    </section>
  );
}
