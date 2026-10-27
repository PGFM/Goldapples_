import type { Metadata } from "next";
import Image from "next/image";
import { seo } from "@/content/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DarkSection } from "@/components/ui/DarkSection";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { MentorshipModalButton } from "@/components/mentorship/MentorshipModalButton";
import {
  eciHero,
  leadershipHappens,
  hiddenCost,
  beyondSkills,
  whoEciIsFor,
  eciPhilosophy,
  executiveExperience,
  eciEngagement,
  executiveAdvisor,
  privateInvitation,
} from "@/content/executiveCommunicationIntelligence";

export const metadata: Metadata = {
  title: { absolute: seo.executiveCommunicationIntelligence.title },
  description: seo.executiveCommunicationIntelligence.description,
};

function ImagePlaceholder({
  label,
  dark = false,
  className = "aspect-[4/3]",
}: {
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-sm border border-dashed ${
        dark
          ? "border-gold-deep/35 bg-white/[0.03] text-champagne/50"
          : "border-ink/20 bg-ink/[0.03] text-ink/45"
      } ${className}`}
    >
      <div
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full border ${
          dark
            ? "border-gold-deep/30 bg-gold-deep/10 text-gold"
            : "border-ink/15 bg-white text-gold-deep"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 text-center">
        {label}
      </span>
    </div>
  );
}

export default function ExecutiveCommunicationIntelligencePage() {
  return (
    <>
      {/* 1. Hero Section (with Placeholder Image on the side) */}
      <DarkSection className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
        <Container className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-gold-deep mb-6">
                {eciHero.eyebrow}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight">
                {eciHero.heading}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 font-serif italic text-gold text-xl lg:text-2xl leading-snug">
                {eciHero.lead}
              </p>
            </Reveal>

            <div className="mt-6 space-y-4">
              {eciHero.paragraphs.map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={0.15 + i * 0.08}
                  className="text-white/70 text-[15.5px] leading-[1.75] max-w-[64ch]"
                >
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-10">
              <MentorshipModalButton
                label={eciHero.cta.label}
                defaultInterest="Executive Communication Intelligence"
                className="px-8 h-13"
              />
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4.8] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={eciHero.heroImage}
                alt={eciHero.eyebrow}
                fill
                priority
                quality={100}
                unoptimized
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>

        <Container className="mt-16 lg:mt-20">
          <Reveal delay={0.1}>
            <SignalDivider
              tone="gold"
              className="w-full !max-w-none [&_svg]:!max-w-none [&_svg]:w-full"
            />
          </Reveal>
        </Container>
      </DarkSection>

      {/* 2. Communication Is How Leadership Happens (with Horizontal ECI Banner Image) */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Leadership &amp; Meaning</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-ink">
                {leadershipHappens.heading}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {leadershipHappens.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p
                    className={
                      i === 4
                        ? "font-serif italic text-xl text-ink border-l-2 border-gold-deep pl-5 py-1"
                        : "text-graphite text-[17px] leading-[1.75]"
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 w-full lg:sticky lg:top-28 self-start">
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-ink/10 bg-white shadow-lg">
                <Image
                  src={eciHero.image}
                  alt={eciHero.eyebrow}
                  fill
                  quality={100}
                  unoptimized
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. The Hidden Cost of Misunderstanding */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="max-w-[720px]">
            <Reveal>
              <Eyebrow>Organisational Impact</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-ink">
                {hiddenCost.heading}
              </h2>
              <div className="mt-6 space-y-3">
                {hiddenCost.intro.map((line, i) => (
                  <p key={i} className="text-graphite text-lg leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                {hiddenCost.emergeHeading}
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenCost.items.map((item, i) => {
              const styles = [
                {
                  wrapper: "bg-ink text-white",
                  heading: "text-gold",
                  body: "text-champagne/80",
                },
                {
                  wrapper: "bg-white text-ink border border-ink/10",
                  heading: "text-ink",
                  body: "text-graphite",
                },
                {
                  wrapper: "bg-[#F7EEDC] text-ink",
                  heading: "text-ink",
                  body: "text-ink/75",
                },
              ];
              const style = styles[i % styles.length];

              return (
                <Reveal
                  key={item.title}
                  delay={i * 0.08}
                  className={`p-8 lg:p-10 flex flex-col justify-between ${style.wrapper}`}
                >
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                      0{i + 1}
                    </span>
                    <h3
                      className={`mt-4 font-serif text-2xl font-semibold ${style.heading}`}
                    >
                      {item.title}
                    </h3>
                    <p className={`mt-3 text-[15.5px] leading-relaxed ${style.body}`}>
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#FAF8F5] border border-ink/10 p-8 lg:p-10 space-y-3 max-w-[880px]">
              {hiddenCost.closing.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === hiddenCost.closing.length - 1
                      ? "font-serif italic text-xl text-ink pt-2"
                      : "text-graphite text-[16.5px] leading-relaxed"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. Beyond Communication Skills. Towards Communication Intelligence. */}
      <DarkSection className="py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow tone="champagne">Four Dimensions</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl leading-[1.15] text-white">
                  {beyondSkills.heading}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {beyondSkills.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="text-champagne/75 text-[16.5px] leading-relaxed">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 pt-12 border-t border-white/10">
              <p className="font-serif italic text-2xl sm:text-3xl text-gold text-center mb-12">
                {beyondSkills.dimensionsHeading}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {beyondSkills.dimensions.map((dim) => (
                  <div
                    key={dim.title}
                    className="border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                        {dim.number}
                      </span>
                      <h3 className="mt-4 font-serif text-2xl text-white">
                        {dim.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-champagne/75">
                        {dim.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 text-center max-w-[680px] mx-auto border-t border-b border-gold-deep/30 py-6">
                <p className="font-serif italic text-xl lg:text-2xl text-white">
                  {beyondSkills.closing}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </DarkSection>

      {/* 5. Who ECI Is For & The ECI Philosophy */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container className="space-y-24">
          {/* Who ECI Is For */}
          <div>
            <Reveal>
              <Eyebrow>{whoEciIsFor.heading}</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ink">
                {whoEciIsFor.heading}
              </h2>
              <p className="mt-4 text-graphite text-lg max-w-[62ch] leading-relaxed">
                {whoEciIsFor.lead}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {whoEciIsFor.profiles.map((profile, i) => (
                <Reveal
                  key={profile.title}
                  delay={i * 0.08}
                  className="bg-white border border-ink/10 p-8 lg:p-10"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-ink">
                    {profile.title}
                  </h3>
                  <p className="mt-3 text-graphite text-[15.5px] leading-relaxed">
                    {profile.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* The ECI Philosophy */}
          <div className="bg-ink text-white p-8 sm:p-12 lg:p-16 rounded-sm">
            <Reveal>
              <Eyebrow tone="champagne">{eciPhilosophy.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                {eciPhilosophy.heading}
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {eciPhilosophy.pillars.map((pillar, i) => (
                  <div
                    key={pillar.title}
                    className="border border-white/10 bg-white/[0.03] p-7"
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl text-gold">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-champagne/80">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-10 pt-8 border-t border-white/10 font-serif italic text-xl text-champagne">
                {eciPhilosophy.closing}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. The Executive Experience & The Engagement */}
      <section className="bg-white py-24 lg:py-32">
        <Container className="space-y-20">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <Reveal>
                <Eyebrow>{executiveExperience.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ink leading-tight">
                  {executiveExperience.heading}
                </h2>
                <div className="mt-6 space-y-4">
                  {executiveExperience.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === executiveExperience.paragraphs.length - 1
                          ? "font-mono text-xs font-bold uppercase tracking-[0.16em] text-gold-deep pt-2"
                          : "text-graphite text-[16px] leading-relaxed"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-5">
              {executiveExperience.areas.map((area, i) => (
                <Reveal
                  key={area.number}
                  delay={i * 0.08}
                  className="flex flex-col sm:flex-row gap-6 items-start bg-[#FAF8F5] p-8 border border-ink/10"
                >
                  <div className="text-gold-deep font-mono font-bold text-xl mt-1 shrink-0">
                    {area.number}
                  </div>
                  <div>
                    <h3 className="text-ink font-serif text-2xl font-semibold mb-2">
                      {area.title}
                    </h3>
                    <p className="text-graphite text-[16.5px] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.4}>
                <p className="font-serif italic text-xl text-ink border-l-2 border-gold-deep pl-5 py-1 mt-2">
                  {executiveExperience.closing}
                </p>
              </Reveal>
            </div>
          </div>

          {/* The Engagement */}
          <Reveal>
            <div className="bg-champagne border border-ink/10 p-8 sm:p-12 lg:p-14">
              <Eyebrow>{eciEngagement.heading}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl text-ink mb-8">
                {eciEngagement.heading}
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                {eciEngagement.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white border border-ink/10 p-7"
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep block">
                      {spec.label}
                    </span>
                    <p className="mt-3 text-ink text-[16px] leading-relaxed">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-graphite text-[16px] italic">
                {eciEngagement.closing}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 7. The Executive Advisor */}
      <section className="bg-champagne/40 py-24 lg:py-32 border-t border-ink/10">
        <Container>
          <div className="grid lg:grid-cols-12 lg:items-stretch overflow-hidden rounded-sm border border-ink/10">
            <Reveal className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
              <Image
                src={executiveAdvisor.image}
                alt={executiveAdvisor.name}
                fill
                quality={100}
                unoptimized
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <div className="lg:col-span-7 bg-ink p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <Reveal>
                <Eyebrow tone="champagne" className="mb-4">
                  {executiveAdvisor.eyebrow}
                </Eyebrow>
                <h2 className="text-white font-serif text-3xl sm:text-4xl mb-2">
                  {executiveAdvisor.name}
                </h2>
                <p className="text-gold font-mono text-xs uppercase tracking-[0.15em] mb-8">
                  {executiveAdvisor.subtitle}
                </p>

                <div className="space-y-5">
                  {executiveAdvisor.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 2
                          ? "font-serif italic text-xl text-gold border-l-2 border-gold-deep pl-5 py-1"
                          : "text-champagne/80 text-[16px] leading-relaxed"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. A Private Invitation (Closing CTA) */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

        <Container className="relative z-10 py-28 lg:py-36 text-center flex flex-col items-center">
          <Reveal className="w-full max-w-[780px] mx-auto">
            <SignalDivider tone="gold" className="mb-12" />

            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-deep mb-4">
              {privateInvitation.eyebrow}
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white mb-6">
              {privateInvitation.heading}
            </h2>

            <div className="space-y-4 mb-10 max-w-[60ch] mx-auto">
              {privateInvitation.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-champagne/80 text-lg leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mb-10 inline-flex flex-col items-center border border-gold-deep/40 bg-white/[0.03] px-8 py-7 rounded-sm">
              <p className="font-serif text-2xl text-white">
                {privateInvitation.callout.title}
              </p>
              <p className="mt-1 font-serif italic text-gold text-lg">
                {privateInvitation.callout.subtitle}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-champagne/85">
                {privateInvitation.callout.withLine}
              </p>
              <p className="mt-3 text-sm text-champagne/65">
                {privateInvitation.callout.note}
              </p>
            </div>

            <div>
              <MentorshipModalButton
                label={privateInvitation.cta.label}
                defaultInterest="Executive Communication Intelligence"
                className="px-10 h-14 text-base"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
