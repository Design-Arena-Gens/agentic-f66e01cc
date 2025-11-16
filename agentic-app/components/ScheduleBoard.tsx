"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductWithStatus } from "@/lib/product-store";
import { useProductStore } from "@/lib/product-store";
import { buildSchedule, formatScheduleHuman, type ScheduleSlot } from "@/lib/scheduler";
import dayjs from "dayjs";

dayjs.locale("fr");

export function ScheduleBoard() {
  const products = useProductStore((state) => state.products);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    if (products.length === 0) {
      setSchedule([]);
      return;
    }
    setSchedule(buildSchedule(products, selectedDate));
  }, [products, selectedDate]);

  const groupedByDay = useMemo(() => {
    return schedule.reduce<Record<string, ScheduleSlot[]>>((accumulator, slot) => {
      const dayLabel = dayjs(slot.scheduledAt).locale("fr").format("dddd D MMM");
      if (!accumulator[dayLabel]) {
        accumulator[dayLabel] = [];
      }
      accumulator[dayLabel]?.push(slot);
      return accumulator;
    }, {});
  }, [schedule]);

  if (products.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-900 bg-slate-950/60 p-6">
        <h2 className="text-lg font-semibold text-white">Planning de publication</h2>
        <p className="mt-2 text-sm text-slate-400">
          Dès que vos produits sont importés, nous générons automatiquement la séquence idéale pour
          les 7 prochains jours.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Calendrier smart TikTok Shop</h2>
          <p className="text-sm text-slate-300">
            Créneaux optimisés selon les heures de conversion friandises sur TikTok Live & Vitrine.
          </p>
        </div>
        <label className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          Semaine à partir du
          <input
            type="date"
            className="bg-transparent text-sm font-medium text-white outline-none"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>
      </header>

      <div className="grid gap-4">
        {Object.entries(groupedByDay).map(([day, slots]) => (
          <article key={day} className="rounded-2xl border border-slate-900 bg-slate-950/80 p-5">
            <header className="flex items-center justify-between pb-4">
              <h3 className="text-lg font-semibold text-white">{day}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-brand-300">
                {slots.length} spot(s)
              </span>
            </header>
            <div className="grid gap-3 md:grid-cols-2">
              {slots.map((slot) => (
                <ScheduleRow key={slot.id} slot={slot} products={products} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ScheduleRow({ slot, products }: { slot: ScheduleSlot; products: ProductWithStatus[] }) {
  const product = products.find((item) => item.id === slot.productId);
  const badge =
    product?.priority === "hot"
      ? "bg-rose-500/20 text-rose-200"
      : product?.priority === "cold"
        ? "bg-slate-700/50 text-slate-200"
        : "bg-amber-400/20 text-amber-200";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-900 bg-slate-900/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">
          {formatScheduleHuman(slot.scheduledAt)}
        </p>
        <span className={`rounded-full px-3 py-1 text-xs uppercase ${badge}`}>
          {product?.priority ?? "cold"}
        </span>
      </div>
      <p className="text-sm text-brand-100">{slot.productName}</p>
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Angle : {slot.angle}</p>
      <footer className="flex items-center justify-between text-xs text-slate-500">
        <p>
          Statut :{" "}
          <span className="text-slate-200">
            {product?.status ?? "à filmer"}
          </span>
        </p>
        <a
          href="#script"
          className="font-semibold uppercase tracking-[0.25em] text-brand-200 hover:text-brand-100"
        >
          Générer script
        </a>
      </footer>
    </div>
  );
}
