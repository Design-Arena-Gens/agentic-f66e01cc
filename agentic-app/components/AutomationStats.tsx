import type { ProductWithStatus } from "@/lib/product-store";

type Props = {
  products: ProductWithStatus[];
};

export function AutomationStats({ products }: Props) {
  const total = products.length;
  const published = products.filter((product) => product.status === "publié").length;
  const inProgress = products.filter((product) => product.status === "en montage").length;
  const hot = products.filter((product) => product.priority === "hot").length;

  const rate = total > 0 ? Math.round((published / total) * 100) : 0;

  return (
    <section className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-900 bg-slate-950/80 p-6 md:grid-cols-4">
      <StatCard label="Produits suivis" value={total} accent="text-brand-200" />
      <StatCard label="Scripts à filmer" value={hot} accent="text-rose-200" />
      <StatCard label="En montage" value={inProgress} accent="text-amber-200" />
      <StatCard label="Pipeline complété" value={`${rate}%`} accent="text-emerald-200" />
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: number | string;
  accent: string;
};

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-slate-900 bg-slate-900/40 p-4 shadow-lg shadow-black/30">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
    </article>
  );
}
