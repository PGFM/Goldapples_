import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  workImpactIntro,
  caseStudies,
  howWeAssessImpact,
  workImpactCta,
} from "@/content/workImpact";

export const metadata: Metadata = {
  title: { absolute: seo.workAndImpact.title },
  description: seo.workAndImpact.description,
};

export default function WorkAndImpactPage() {
  return (
    <>
      {/* ── HERO: Uniform PageHero ── */}
      <PageHero
        eyebrow={workImpactIntro.eyebrow}
        heading={workImpactIntro.heading}
        body={workImpactIntro.body}
        lead={workImpactIntro.lead}
      />

      {/* ── SELECTED WORK AND EXPERIENCE: Structured Editorial Showcase ── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal className="mb-14">
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
              Selected Work and Experience
            </h2>
          </Reveal>

          <div className="space-y-8 lg:space-y-10">
            {caseStudies.map((study, i) => (
              <Reveal
                key={study.title}
                delay={i * 0.06}
                className="overflow-hidden border border-ink/10 bg-white shadow-[0_8px_30px_rgb(18,16,13,0.03)] transition-all duration-300 hover:border-gold-deep/40"
              >
                {/* Header Bar: Index, Tags, and Title */}
                <div className="border-b border-ink/8 bg-[#FAF8F5] px-6 py-6 sm:px-10 lg:py-8">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-3">
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink/20" aria-hidden="true">
                      —
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
                      {study.tags.map((tag, tagIdx) => (
                        <span key={tag} className="inline-flex items-center gap-2.5">
                          {tagIdx > 0 && (
                            <span className="text-gold-deep/60" aria-hidden="true">
                              |
                            </span>
                          )}
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl leading-snug text-ink lg:text-[28px]">
                    {study.title}
                  </h3>
                </div>

                {/* 3-Column Narrative Body: Need -> Work/Experience -> Why It Matters */}
                <div className="grid divide-y divide-ink/8 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                  {/* 1. The communication need */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <span className="inline-block border-l-2 border-gold-deep pl-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70">
                      The communication need
                    </span>
                    <p className="mt-4 text-[15px] leading-[1.75] text-graphite">
                      {study.challenge}
                    </p>
                  </div>

                  {/* 2. The work / Relevant experience */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <span className="inline-block border-l-2 border-gold-deep pl-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70">
                      {study.workLabel}
                    </span>
                    <p className="mt-4 text-[15px] leading-[1.75] text-graphite">
                      {study.approach}
                    </p>
                  </div>

                  {/* 3. Why it matters */}
                  <div className="bg-champagne/35 p-6 sm:p-8 lg:p-10">
                    <span className="inline-block border-l-2 border-gold-deep pl-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                      Why it matters
                    </span>
                    <p className="mt-4 font-serif text-[17px] leading-[1.65] text-ink">
                      {study.keyInsight}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── HOW WE ASSESS IMPACT: Champagne Editorial Band ── */}
      <section className="border-y border-graphite/8 bg-champagne/40 py-20 lg:py-28">
        <Container className="max-w-[900px]">
          <Reveal>
            <div className="relative pl-6 py-2 sm:pl-12 border-l-2 border-gold-deep">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep mb-4">
                {howWeAssessImpact.eyebrow}
              </p>
              <h2 className="font-serif text-3xl text-ink sm:text-4xl mb-6">
                {howWeAssessImpact.heading}
              </h2>
              <div className="space-y-4">
                <p className="text-graphite text-[18px] leading-relaxed">
                  {howWeAssessImpact.paragraphs[0]}
                </p>
                <p className="text-steel text-[15px] italic leading-relaxed">
                  {howWeAssessImpact.paragraphs[1]}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CLOSING CTA: Ink ── */}
      <ClosingCta
        heading={workImpactCta.heading}
        cta={workImpactCta.cta}
      />
    </>
  );
}
