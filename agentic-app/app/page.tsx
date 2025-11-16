"use client";

import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ScriptComposer } from "@/components/ScriptComposer";
import { ScheduleBoard } from "@/components/ScheduleBoard";
import { WorkflowPlaybook } from "@/components/WorkflowPlaybook";
import { AutomationStats } from "@/components/AutomationStats";
import { useProductStore } from "@/lib/product-store";

export default function HomePage() {
  const products = useProductStore((state) => state.products);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10">
      <Hero />
      <AutomationStats products={products} />
      <ProductGrid />
      <ScriptComposer />
      <ScheduleBoard />
      <WorkflowPlaybook />
      <footer className="py-10 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
        Agentic-f66e01cc · TikTok Shop Automation Suite
      </footer>
    </main>
  );
}
