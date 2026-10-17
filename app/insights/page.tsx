import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DarkSection } from "@/components/ui/DarkSection";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { Button } from "@/components/ui/Button";
import {
  insightsIntro,
  ssrnPapers,
  originalFrameworks,
  perspectives,
  insightsCta,
} from "@/content/insights";

export const metadata: Metadata = {
  title: { absolute: seo.insights.title },
  description: seo.insights.description,
};

export default function InsightsPage() {
  return (
    <>
      {/* 1. HERO: Dark Section */}
      <DarkSection className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <Container className="relative z-10 lg:flex lg:flex-col lg:items-center lg:text-center">
          <div className="max-w-[76ch] lg:mx-auto">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep mb-6">
                {insightsIntro.eyebrow}
              </p>
              <h1 className="font-serif text-4xl leading-[1.1] text-white md:text-5xl lg:text-6xl">
                {insightsIntro.heading}
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 font-serif text-xl lg:text-2xl text-gold-deep leading-snug">
                {insightsIntro.lead}
              </p>
            </Reveal>

            <div className="mt-6 space-y-5">
              {insightsIntro.paragraphs.map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={0.14 + i * 0.08}
                  className="text-[17px] sm:text-lg leading-relaxed text-champagne/80 lg:text-center"
                >
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.24} className="w-full mt-16 mb-6 lg:mt-20 lg:mb-10">
            <SignalDivider
              tone="gold"
              className="w-full !max-w-none [&_svg]:!max-w-none [&_svg]:w-full"
            />
          </Reveal>
        </Container>
      </DarkSection>

      {/* 2. PAPERS AVAILABLE ON SSRN: White Editorial Section */}
      <section id="ssrn-papers" className="bg-white py-20 lg:py-28 scroll-mt-24">
        <Container>
          <Reveal className="mb-14">
            <Eyebrow>{ssrnPapers.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
              {ssrnPapers.heading}
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {ssrnPapers.items.map((paper, i) => (
              <Reveal
                key={paper.title}
                delay={i * 0.08}
                className="group flex flex-col justify-between border border-ink/12 bg-[#FAF8F5] p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-gold-deep/50 hover:shadow-[0_16px_40px_rgba(18,16,13,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      SSRN Paper {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
                      {paper.author}
                    </span>
                  </div>

                  <h3 className="mt-7 font-serif text-2xl leading-snug text-ink lg:text-[28px]">
                    {paper.title}
                  </h3>

                  {paper.subtitle && (
                    <p className="mt-2 font-serif text-[18px] italic leading-snug text-ink/75">
                      {paper.subtitle}
                    </p>
                  )}

                  <p className="mt-5 text-[15.5px] leading-[1.75] text-graphite">
                    {paper.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/8 flex items-center justify-between">
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-gold-deep"
                  >
                    <span>Read Paper on SSRN</span>
                    <span aria-hidden="true" className="text-gold-deep transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. ORIGINAL FRAMEWORKS AND TOOLS: Champagne Band */}
      <section className="border-y border-ink/8 bg-champagne/40 py-20 lg:py-28">
        <Container>
          <Reveal className="mb-14">
            <Eyebrow>{originalFrameworks.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
              {originalFrameworks.heading}
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {originalFrameworks.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="flex flex-col justify-between border border-ink/10 border-t-2 border-t-gold-deep bg-white p-8 lg:p-10 shadow-[0_8px_24px_rgba(18,16,13,0.03)]"
              >
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.16em] text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.75] text-graphite">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <p className="border-l-2 border-gold-deep pl-5 py-1 text-[15px] italic leading-relaxed text-steel">
              {originalFrameworks.note}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 4. PERSPECTIVES WORTH EXPLORING: White Editorial Grid */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal className="mb-14">
            <Eyebrow>{perspectives.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
              {perspectives.heading}
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {perspectives.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.07}
                className="flex flex-col justify-between border border-ink/10 bg-white p-8 sm:p-10 transition-colors duration-300 hover:border-gold-deep/40 hover:bg-[#FAF8F5]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs font-bold tracking-[0.16em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-[1px] w-8 bg-gold-deep/40" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.75] text-graphite">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. CLOSING CTA: Dual Action Band */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

        <Container className="relative z-10 py-28 lg:py-36 text-center flex flex-col items-center">
          <Reveal className="w-full">
            <SignalDivider tone="gold" className="mb-14" />

            <h2 className="font-serif text-[2rem] leading-[1.15] text-white lg:text-[2.5rem] mb-10 max-w-[28ch] mx-auto">
              {insightsCta.heading}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Button
                href={insightsCta.primaryCta.href}
                variant="gold"
                className="px-8 h-14 text-base"
              >
                {insightsCta.primaryCta.label}
              </Button>
              <Button
                href={insightsCta.secondaryCta.href}
                variant="secondaryOnDark"
                className="px-8 h-14 text-base"
              >
                {insightsCta.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
