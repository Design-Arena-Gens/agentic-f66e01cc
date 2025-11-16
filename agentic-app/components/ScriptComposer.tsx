"use client";

import { useMemo, useState } from "react";
import { initialProducts } from "@/data/products";
import type { Script, ScriptInput } from "@/lib/script-generator";
import { generateScript } from "@/lib/script-generator";
import { useProductStore } from "@/lib/product-store";

type FormState = Pick<ScriptInput, "tone" | "callToAction" | "duration" | "hookVariant"> & {
  productId: string;
  angle: string;
};

const defaultState: FormState = {
  productId: initialProducts[0]!.id,
  angle: initialProducts[0]!.tikTokAngles[0]!,
  tone: "énergique",
  callToAction: "vitrine",
  duration: 30,
  hookVariant: 0
};

export function ScriptComposer() {
  const products = useProductStore((state) => state.products);
  const hasProducts = products.length > 0;

  const [formState, setFormState] = useState<FormState>(defaultState);
  const [script, setScript] = useState<Script | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === formState.productId) ?? products[0],
    [products, formState.productId]
  );

  const angles = useMemo(() => selectedProduct?.tikTokAngles ?? [], [selectedProduct]);

  const handleGenerate = async () => {
    if (!selectedProduct) {
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 350)); // smooth UI feedback

    const result = generateScript({
      product: selectedProduct,
      angle: formState.angle,
      tone: formState.tone,
      callToAction: formState.callToAction,
      duration: formState.duration,
      hookVariant: formState.hookVariant
    });

    setScript(result);
    setIsGenerating(false);
  };

  if (!hasProducts) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Générateur de scripts vidéos</h2>
        <p className="mt-2 text-sm text-slate-400">
          Ajoutez d&apos;abord vos produits pour activer le générateur.
        </p>
      </section>
    );
  }

  return (
    <section
      id="script"
      className="flex flex-col gap-6 rounded-3xl border border-brand-500/20 bg-slate-900/40 p-6 shadow-2xl shadow-brand-900/30"
    >
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-brand-300">Automation</p>
        <h2 className="text-2xl font-semibold text-white">
          Générateur de scripts TikTok Shop
        </h2>
        <p className="text-sm text-slate-300">
          Choisissez un produit, un angle, un ton et obtenez le script shot-by-shot ainsi que la
          captation B-roll à prévoir.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Produit
          <select
            value={formState.productId}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) => {
              const nextProduct = products.find((p) => p.id === event.target.value);
              setFormState((state) => ({
                ...state,
                productId: event.target.value,
                angle: nextProduct?.tikTokAngles[0] ?? ""
              }));
            }}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Angle TikTok
          <select
            value={formState.angle}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) =>
              setFormState((state) => ({
                ...state,
                angle: event.target.value
              }))
            }
          >
            {angles.map((angle) => (
              <option key={angle} value={angle}>
                {angle}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Ton de la vidéo
          <select
            value={formState.tone}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) =>
              setFormState((state) => ({
                ...state,
                tone: event.target.value as ScriptInput["tone"]
              }))
            }
          >
            <option value="énergique">Énergique</option>
            <option value="pédagogique">Pédagogique</option>
            <option value="storytelling">Storytelling</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Call-to-action
          <select
            value={formState.callToAction}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) =>
              setFormState((state) => ({
                ...state,
                callToAction: event.target.value as ScriptInput["callToAction"]
              }))
            }
          >
            <option value="vitrine">Vitrine shop</option>
            <option value="live">Basculer en live</option>
            <option value="promotion">Code promo</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Durée cible
          <select
            value={formState.duration}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) =>
              setFormState((state) => ({
                ...state,
                duration: Number(event.target.value) as ScriptInput["duration"]
              }))
            }
          >
            <option value={30}>30 secondes</option>
            <option value={45}>45 secondes</option>
            <option value={60}>60 secondes</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase text-slate-400">
          Hook variant
          <select
            value={formState.hookVariant}
            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            onChange={(event) =>
              setFormState((state) => ({
                ...state,
                hookVariant: Number(event.target.value) as ScriptInput["hookVariant"]
              }))
            }
          >
            <option value={0}>Pattern disruptif</option>
            <option value={1}>Solution orientée besoin</option>
            <option value={2}>Social proof / test</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 disabled:cursor-progress disabled:bg-brand-500/50"
          onClick={handleGenerate}
          disabled={isGenerating}
          type="button"
        >
          {isGenerating ? "Génération..." : "Générer le script optimisé"}
        </button>
        {script && (
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Script mis à jour
          </span>
        )}
      </div>

      {script && (
        <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold text-white">Hook</h3>
            <p className="text-sm text-brand-200">{script.hook}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold text-white">Structure</h3>
            <ol className="grid gap-2 text-sm text-slate-200">
              {script.body.map((block, index) => (
                <li
                  key={block}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3"
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
                    {index + 1}
                  </span>
                  {block}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold text-white">Captation à prévoir</h3>
            <ul className="grid gap-2 text-xs text-slate-300 md:grid-cols-2">
              {script.bRoll.map((asset) => (
                <li key={asset} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  {asset}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold text-white">CTA</h3>
            <p className="rounded-xl border border-brand-500/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
              {script.cta}
            </p>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold text-white">Captions TikTok</h3>
            <div className="flex flex-wrap gap-2">
              {script.captions.map((caption) => (
                <span
                  key={caption}
                  className="rounded-full bg-slate-800 px-4 py-1 text-xs font-medium text-slate-200"
                >
                  {caption}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
