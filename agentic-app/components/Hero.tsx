export function Hero() {
  return (
    <section className="space-y-6 rounded-3xl border border-brand-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-900/20 p-10 text-white shadow-2xl shadow-brand-950/40">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-200">TikTok Shop autopilot</p>
      <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
        Automatisez vos vidéos vitrine, synchronisez vos produits et sortez un script prêt à tourner
        en moins de 60 secondes.
      </h1>
      <p className="max-w-2xl text-base text-slate-200">
        Agentic-f66e01cc connecte vos datas produits, génère les hooks adaptés pour TikTok Shop,
        distribue les postes sur la semaine selon la conversion horaire et vous livre les plans
        tournage + captions optimisés.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <span className="rounded-full bg-brand-500/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-brand-100">
          Ciblage dynamique
        </span>
        <span className="rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-200">
          Scripts multi-angles
        </span>
        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-200">
          Prêt pour Vercel
        </span>
      </div>
    </section>
  );
}
