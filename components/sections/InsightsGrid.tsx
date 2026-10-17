"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import {
  categories,
  articles,
  type InsightCategory,
  type InsightArticle,
} from "@/content/insights";

export function InsightsGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a: InsightArticle) => a.category === activeCategory)
    : articles;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter by category"
      >
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`min-h-11 rounded-[3px] border px-4 text-sm transition-colors duration-150 ${
            activeCategory === null
              ? "border-gold-deep bg-gold-deep text-ink"
              : "border-graphite/15 text-graphite hover:border-ink"
          }`}
        >
          All
        </button>
        {categories.map((cat: InsightCategory) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            title={cat.description}
            className={`min-h-11 rounded-[3px] border px-4 text-sm transition-colors duration-150 ${
              activeCategory === cat.id
                ? "border-gold-deep bg-gold-deep text-ink"
                : "border-graphite/15 text-graphite hover:border-ink"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article: InsightArticle, i: number) => {
          const category = categories.find(
            (c: InsightCategory) => c.id === article.category,
          );
          return (
            <Reveal
              key={article.title}
              delay={Math.min(i * 0.03, 0.3)}
              className="border-graphite/12 flex h-full flex-col justify-between border bg-white p-7"
            >
              <div>
                <span className="text-steel text-xs font-semibold tracking-[0.08em] uppercase">
                  {category?.label}
                </span>
                <h2 className="text-ink mt-3 font-serif text-xl leading-snug">
                  {article.title}
                </h2>
              </div>
              <span className="text-graphite border-gold-deep mt-6 border-l-2 pl-2 text-xs font-semibold tracking-[0.08em] uppercase">
                Coming soon — placeholder entry
              </span>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-steel mt-12 text-sm">
          No placeholder entries in this category yet.
        </p>
      )}
    </div>
  );
}
