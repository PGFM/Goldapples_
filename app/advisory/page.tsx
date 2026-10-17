import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DarkSection } from "@/components/ui/DarkSection";
import { Button } from "@/components/ui/Button";
import { SignalDivider } from "@/components/ui/SignalDivider";

import Image from "next/image";

import {
  advisoryIntro,
  advisoryAreas,
  advisoryHowWeWork,
  advisoryCta,
} from "@/content/advisory";

export const metadata: Metadata = {
  title: { absolute: seo.advisory.title },
  description: seo.advisory.description,
};

export default function AdvisoryPage() {
  return (
    <>
      {/* 1. Intro (Dark solid hero header) */}
      <DarkSection className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <Container className="relative z-10 lg:flex lg:flex-col lg:items-center lg:text-center">
          <div className="max-w-[700px] lg:mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-gold-deep mb-6">
                {advisoryIntro.eyebrow}
              </p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-white lg:text-6xl tracking-tight">
                {advisoryIntro.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 mb-8 font-serif text-gold text-xl lg:text-2xl tracking-wide">
                {advisoryIntro.lead}
              </p>
            </Reveal>
            <div className="flex flex-col gap-6">
              {advisoryIntro.paragraphs.map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={0.2 + i * 0.1}
                  className="text-white/60 text-[15px] leading-[1.7] max-w-[65ch] font-sans lg:text-justify lg:mx-auto"
                >
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
        {/* Deliberate Signal Motif Divider */}
        <Container className="mt-16 mb-6 lg:mt-20 lg:mb-10">
          <Reveal delay={0.1}>
            <SignalDivider tone="gold" className="w-full !max-w-none [&_svg]:!max-w-none [&_svg]:w-full" />
          </Reveal>
        </Container>
      </DarkSection>

      {/* 2. Where We Help (Grid of colored boxes) */}
      <section className="bg-white py-24 lg:py-32">
        <Container className="relative z-10 lg:flex lg:flex-col lg:items-center lg:text-center">
          <Reveal>
            <Eyebrow>Where We Help</Eyebrow>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {advisoryAreas.map((area, i) => {
              const styles = [
                {
                  wrapper: "bg-ink text-white",
                  heading: "text-white",
                  paragraph: "text-white/70",
                },
                {
                  wrapper: "bg-white text-ink border border-ink/10",
                  heading: "text-ink",
                  paragraph: "text-ink/60",
                },
                {
                  wrapper: "bg-[#F7EEDC] text-ink",
                  heading: "text-ink",
                  paragraph: "text-ink/70",
                },
                {
                  wrapper: "bg-white text-ink border border-ink/10",
                  heading: "text-ink",
                  paragraph: "text-ink/60",
                }
              ];
              const style = styles[i % styles.length];

              return (
                <Reveal 
                  key={area.id} 
                  delay={i * 0.1} 
                  className={`group flex flex-col overflow-hidden h-full ${style.wrapper}`}
                >
                  {/* Top part: Image */}
                  {area.image && (
                    <div className="relative h-56 w-full shrink-0 overflow-hidden bg-ink/5">
                      <Image 
                        src={area.image} 
                        fill 
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                        alt={area.title} 
                      />
                    </div>
                  )}
                  {/* Bottom part: Title and Description */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className={`font-sans text-[22px] font-semibold leading-snug ${style.heading}`}>
                      {area.title}
                    </h3>
                    <div className={`mt-4 text-[15px] leading-relaxed ${style.paragraph}`}>
                      {area.body}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. How We Work (Timeline on a Champagne band) */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>How We Work</Eyebrow>
              <h2 className="text-ink mt-4 max-w-[24ch] font-serif text-3xl leading-tight lg:text-4xl">
                A five-step process, from diagnosis to review.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-8 lg:col-start-5">
            {advisoryHowWeWork.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.1}
                className="flex flex-col sm:flex-row gap-6 items-start bg-white p-8 border border-ink/10"
              >
                <div className="text-gold-deep font-mono font-bold text-xl mt-1 shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-ink font-serif text-2xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ink/80 text-[18px] leading-relaxed max-w-[60ch]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. CTA (Dark gradient layout with SignalDivider) */}
      <section className="relative overflow-hidden bg-ink">
        {/* Richer gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

        <Container className="relative z-10 py-32 lg:py-40 text-center flex flex-col items-center">
          <Reveal className="w-full">
            <SignalDivider tone="gold" className="mb-16" />
            
            <h2 className="font-serif text-[2rem] leading-[1.15] text-white lg:text-[2.5rem] mb-6 max-w-[28ch] mx-auto">
              {advisoryCta.heading}
            </h2>
            <p className="text-champagne/75 text-[18px] leading-relaxed mb-10 max-w-[45ch] mx-auto">
              {advisoryCta.body}
            </p>
            <Button href={advisoryCta.cta.href} variant="gold" className="px-10 h-14 text-base">
              {advisoryCta.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
