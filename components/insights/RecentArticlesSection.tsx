"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { BlogPost } from "@/lib/insights-types";

const ARTICLES_PER_PAGE = 6;

export function RecentArticlesSection({ posts }: { posts: BlogPost[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!posts || posts.length === 0) {
    return null;
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ARTICLES_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  function goToPage(page: number) {
    setCurrentPage(page);
    const el = document.getElementById("recent-articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section
      id="recent-articles"
      className="border-b border-ink/8 bg-white py-20 lg:py-28 scroll-mt-24"
    >
      <Container>
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Articles &amp; Blog</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
              Recent Articles
            </h2>
          </div>

          {totalPages > 1 && (
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-steel">
              Page {safePage} of {totalPages}
            </span>
          )}
        </Reveal>

        {/* 3-Column Editorial Grid (max 6 per page) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post, i) => (
            <Reveal
              key={post.id}
              delay={i * 0.06}
              className="group flex flex-col justify-between overflow-hidden border border-ink/10 bg-white transition-all duration-300 hover:border-gold-deep/50 hover:shadow-[0_14px_34px_rgba(18,16,13,0.06)]"
            >
              <div className="flex flex-col flex-1">
                {post.featuredImage && (
                  <Link
                    href={`/insights/${post.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-champagne/30 border-b border-ink/8 block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>
                )}

                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                        {post.category || "Article"}
                      </span>
                      {post.readTime && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    <Link href={`/insights/${post.slug}`}>
                      <h3 className="font-serif text-xl sm:text-[22px] leading-snug text-ink transition-colors group-hover:text-gold-deep">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 text-[15px] leading-[1.7] text-graphite line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-ink/8 flex items-center justify-between">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-gold-deep"
                    >
                      <span>Read Article</span>
                      <span
                        aria-hidden="true"
                        className="text-gold-deep transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                    {post.author && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
                        {post.author}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pagination Controls (shown when > 6 articles, or if > 1 page) */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="min-h-10 px-4 rounded-[3px] border border-ink/15 bg-white font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-gold-deep disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => goToPage(pageNum)}
                  className={`min-h-10 w-10 rounded-[3px] border font-mono text-xs font-bold transition-colors cursor-pointer ${
                    pageNum === safePage
                      ? "border-gold-deep bg-ink text-gold"
                      : "border-ink/15 bg-white text-graphite hover:border-gold-deep hover:text-ink"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="min-h-10 px-4 rounded-[3px] border border-ink/15 bg-white font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-gold-deep disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
