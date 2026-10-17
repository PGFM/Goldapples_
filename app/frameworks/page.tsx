import type { Metadata } from "next";
import Link from "next/link";
import { seo } from "@/content/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { FrameworksShowcase } from "@/components/sections/FrameworksShowcase";
import {
  frameworksIntro,
  communicationIntelligence,
  awarenessPrinciples,
  frameworks,
  howWeKnowItWorks,
  frameworksCta,
} from "@/content/frameworks";

export const metadata: Metadata = {
  title: { absolute: seo.frameworks.title },
  description: seo.frameworks.description,
};

export default function FrameworksPage() {
  return (
    <>
      {/* 1. HERO: Uniform PageHero */}
      <PageHero
        eyebrow={frameworksIntro.eyebrow}
        heading={frameworksIntro.heading}
        body={frameworksIntro.body}
        lead={frameworksIntro.lead}
      />

      {/* 2. Human Communication Intelligence (Champagne band) */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{communicationIntelligence.eyebrow}</Eyebrow>
                <h2 className="text-ink mt-4 font-serif text-3xl leading-tight lg:text-[2.5rem]">
                  {communicationIntelligence.heading}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-5">
              {communicationIntelligence.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-graphite text-[17px] leading-relaxed">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <p className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-gold-deep mb-6">
              {communicationIntelligence.questionsIntro}
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communicationIntelligence.questions.map((item, i) => (
              <Reveal
                key={item.number}
                delay={0.25 + i * 0.06}
                className="bg-white border border-ink/10 p-6 lg:p-8 flex flex-col gap-3"
              >
                <span className="text-gold-deep border-gold-deep border-l-2 pl-2 font-mono text-sm font-bold">
                  {item.number}
                </span>
                <h3 className="text-ink font-serif text-xl leading-snug">
                  {item.question}
                </h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. From Awareness to Better Outcomes (Dark layout) */}
      <section className="bg-ink py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="champagne">{awarenessPrinciples.eyebrow}</Eyebrow>
              <h2 className="text-white mt-4 max-w-[20ch] font-serif text-3xl leading-tight lg:text-[2.5rem]">
                {awarenessPrinciples.heading}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-8">
            <div className="space-y-5 border-l border-gold-deep/40 pl-6">
              {awarenessPrinciples.items.map((item, i) => (
                <Reveal key={item.title} delay={0.15 + i * 0.08}>
                  <p className="text-[16.5px] leading-relaxed text-white/75">
                    <span className="font-serif text-gold font-medium mr-2">
                      {item.title}:
                    </span>
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <p className="text-champagne/65 text-[15px] italic leading-relaxed max-w-[52ch]">
                {awarenessPrinciples.closing}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. Tools That Put Thinking to Work (Interactive Showcase with Diagrams) */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <Reveal className="mb-14">
            <Eyebrow>Tools &amp; Frameworks</Eyebrow>
            <h2 className="text-ink mt-4 font-serif text-3xl leading-tight lg:text-[2.5rem]">
              Tools That Put Thinking to Work
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FrameworksShowcase frameworks={frameworks} />
          </Reveal>
        </Container>
      </section>

      {/* 5. How Do We Know Communication Is Working? (Champagne band) */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container>
          <div className="max-w-[760px] mb-12">
            <Reveal>
              <Eyebrow>{howWeKnowItWorks.eyebrow}</Eyebrow>
              <h2 className="text-ink mt-4 font-serif text-3xl leading-tight lg:text-[2.5rem] mb-4">
                {howWeKnowItWorks.heading}
              </h2>
              <p className="text-graphite text-[17px] leading-relaxed">
                {howWeKnowItWorks.intro}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {howWeKnowItWorks.questions.map((q, i) => (
              <Reveal
                key={q}
                delay={0.1 + i * 0.06}
                className="bg-white border border-ink/10 p-6 lg:p-8 flex flex-col justify-between"
              >
                <span className="font-mono text-xs font-bold text-gold-deep mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-ink font-serif text-xl leading-snug">
                  {q}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="text-graphite text-[17px] leading-relaxed max-w-[65ch]">
              {howWeKnowItWorks.closing}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 6. One Principle We Hold Close (Closing CTA) */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

        <Container className="relative z-10 py-32 lg:py-40 text-center flex flex-col items-center">
          <Reveal className="w-full">
            <SignalDivider tone="gold" className="mb-16" />

            <p className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-gold-deep mb-6">
              {frameworksCta.eyebrow}
            </p>

            <h2 className="font-serif text-[2rem] leading-[1.15] text-white lg:text-[2.5rem] mb-6 max-w-[28ch] mx-auto">
              {frameworksCta.heading}
            </h2>

            <p className="text-champagne/75 text-[17px] leading-relaxed mb-12 max-w-[52ch] mx-auto">
              {frameworksCta.body}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button href={frameworksCta.primaryCta.href} variant="gold" className="px-10 h-14 text-base">
                {frameworksCta.primaryCta.label}
              </Button>
              <Link
                href={frameworksCta.secondaryCta.href}
                className="inline-flex items-center gap-1.5 border-b border-white/20 py-1.5 text-sm font-semibold text-champagne transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                {frameworksCta.secondaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
