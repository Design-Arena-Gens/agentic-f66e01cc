const steps = [
  {
    title: "1. Tag tes produits automatiquement",
    details:
      "Importe la fiche produit depuis Shopify/TikTok Shop. Nous enrichissons avec angles, audiences et assets existants."
  },
  {
    title: "2. Génère trois scripts différenciés",
    details:
      "Hook disruptif, preuve sociale et CTA calibré pour la vitrine. Chaque script inclut B-roll et prompts de captions."
  },
  {
    title: "3. Planifie & pousse en vitrine",
    details:
      "Calendrier auto-optimisé sur les meilleurs slots d'achat TikTok Shop. Export direct en CSV / Notion / Zapier."
  }
];

export function WorkflowPlaybook() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-900 bg-slate-950/60 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-white">Playbook automatisé</h2>
        <p className="text-sm text-slate-300">
          Trois étapes, zéro friction. L&apos;agent transforme vos données produits en vidéos prêtes
          pour la vitrine TikTok Shop.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.title}
            className="rounded-2xl border border-slate-900 bg-slate-900/70 p-6 shadow-lg shadow-black/20"
          >
            <h3 className="text-lg font-semibold text-brand-100">{step.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{step.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
