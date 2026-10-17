import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DarkSection } from "@/components/ui/DarkSection";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { Button } from "@/components/ui/Button";
import { BlockRenderer } from "@/components/insights/BlockRenderer";
import { getPostBySlug, getPublishedPosts } from "@/lib/insights-cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found | Goldapples" };
  }
  return {
    title: `${post.title} | Goldapples Insights`,
    description: post.excerpt,
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const relatedPosts = getPublishedPosts()
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* 1. Article Hero */}
      <DarkSection className="pt-28 pb-12 lg:pt-36 lg:pb-16">
        <Container className="max-w-[900px]">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-champagne/70 transition-colors hover:text-gold mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
              {post.category}
            </span>
            <span className="text-white/20" aria-hidden="true">
              |
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-champagne/60">
              {formattedDate}
            </span>
            {post.readTime && (
              <>
                <span className="text-white/20" aria-hidden="true">
                  |
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-champagne/60">
                  {post.readTime}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-white">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 font-serif text-xl lg:text-2xl italic text-gold-deep leading-snug">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-champagne/80">
              By {post.author}
            </span>
          </div>
        </Container>
      </DarkSection>

      {/* 2. Article Body */}
      <article className="bg-white py-16 lg:py-24">
        <Container className="max-w-[780px]">
          {post.featuredImage && (
            <figure className="mb-12 overflow-hidden rounded-[3px] border border-ink/10 bg-[#FAF8F5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full max-h-[480px] object-cover"
              />
            </figure>
          )}

          {post.blocks && post.blocks.length > 0 ? (
            <BlockRenderer blocks={post.blocks} />
          ) : (
            <p className="text-[18px] leading-[1.85] text-graphite">
              {post.excerpt}
            </p>
          )}
        </Container>
      </article>

      {/* 3. More Recent Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-ink/10 bg-[#FAF8F5] py-16 lg:py-24">
          <Container className="max-w-[960px]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink">
                More Recent Articles
              </h2>
              <Link
                href="/insights"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/insights/${item.slug}`}
                  className="group flex flex-col justify-between border border-ink/10 bg-white p-8 transition-all duration-300 hover:border-gold-deep/50"
                >
                  <div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-ink group-hover:text-gold-deep transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-gold-deep">
                    Read Article <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Closing CTA */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />
        <Container className="relative z-10 py-24 lg:py-32 text-center flex flex-col items-center">
          <SignalDivider tone="gold" className="mb-12" />
          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-8 max-w-[26ch] mx-auto">
            Have a Communication Challenge Worth Solving?
          </h2>
          <Button href="/contact" variant="gold" className="px-8 h-14 text-base">
            Start a Conversation
          </Button>
        </Container>
      </section>
    </>
  );
}
