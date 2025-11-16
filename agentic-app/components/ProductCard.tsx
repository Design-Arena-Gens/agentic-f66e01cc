/* eslint-disable @next/next/no-img-element */
"use client";

import type { ProductWithStatus } from "@/lib/product-store";
import { useProductStore } from "@/lib/product-store";
import { memo } from "react";

type Props = {
  product: ProductWithStatus;
};

const statusOptions: ProductWithStatus["status"][] = [
  "à filmer",
  "en montage",
  "programmé",
  "publié"
];

const priorityOptions: ProductWithStatus["priority"][] = ["hot", "warm", "cold"];

export const ProductCard = memo(function ProductCard({ product }: Props) {
  const updateStatus = useProductStore((state) => state.updateStatus);
  const updatePriority = useProductStore((state) => state.updatePriority);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-xl shadow-slate-950/60 transition hover:border-brand-500/60 hover:shadow-brand-900/30">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{product.description}</p>
        </div>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase text-brand-200">
          {product.category}
        </span>
      </header>

      <div className="grid gap-3 text-sm text-slate-300">
        <p className="flex items-center justify-between">
          <span className="text-slate-400">Positionnement</span>
          <span className="font-medium text-slate-100">{product.usp}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-slate-400">Bénéfice clé</span>
          <span className="font-medium text-emerald-200">{product.mainBenefit}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-slate-400">Stock actuel</span>
          <span className="font-semibold text-white">{product.inventory} unités</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-300"
          >
            #{tag.replace(/\s+/g, "")}
          </span>
        ))}
      </div>

      <div className="grid gap-3">
        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Statut production
          <select
            className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            value={product.status}
            onChange={(event) => updateStatus(product.id, event.target.value as typeof product.status)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Priorité
          <select
            className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            value={product.priority}
            onChange={(event) =>
              updatePriority(product.id, event.target.value as typeof product.priority)
            }
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>

      <footer className="flex flex-col gap-2 text-xs text-slate-400">
        <p>Angles performants:</p>
        <ul className="grid gap-1">
          {product.tikTokAngles.map((angle) => (
            <li key={angle} className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              {angle}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
});
