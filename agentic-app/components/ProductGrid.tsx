"use client";

import { useEffect } from "react";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useProductStore } from "@/lib/product-store";

export function ProductGrid() {
  const { products, reset } = useProductStore((state) => ({
    products: state.products,
    reset: state.reset
  }));

  useEffect(() => {
    if (products.length === 0) {
      reset(initialProducts);
    }
  }, [products.length, reset]);

  if (products.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-900 bg-slate-950/80 p-6 text-slate-200">
        Chargement des produits...
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-white">Catalogue vitrines</h2>
        <p className="text-sm text-slate-300">
          Chaque fiche contient les angles gagnants, les assets B-roll nécessaires et l&apos;état
          d&apos;avancement du contenu TikTok.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
