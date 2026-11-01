import { ButtonLink } from "@/components/ui/button-link";

export function Cta({ title = "See the risk logic run.", body = "Move the reserves and supply and watch the status change.", href = "/dashboard", label = "Open the dashboard" }: { title?: string; body?: string; href?: string; label?: string }) {
  return (
    <section className="bg-hex border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-muted">{body}</p>
        </div>
        <ButtonLink href={href} arrow>{label}</ButtonLink>
      </div>
    </section>
  );
}
