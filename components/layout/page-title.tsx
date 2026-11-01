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
