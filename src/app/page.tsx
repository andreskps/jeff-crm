export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <section className="w-full max-w-md rounded-[14px] border border-border bg-surface p-8">
        <p className="text-xs font-semibold tracking-[0.08em] text-muted">JEFF CRM</p>
        <h1 className="mt-2 text-2xl font-semibold">Andamiaje listo</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          La web y el worker están corriendo. Las pantallas de Inicio y Bandeja llegan en la fase
          12.
        </p>
        <a
          href="/api/health"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
        >
          Ver estado del servicio
        </a>
      </section>
    </main>
  );
}
