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
  mentorshipHero,
  mentorshipPromise,
  mentorshipTracks,
  mentorshipPhilosophy,
  mentorshipExperience,
  developmentJourney,
  privateMentorship,
  selectionAndParticipation,
  mentorshipInvitation,
} from "@/content/communicationIntelligenceMentorship";

export const metadata: Metadata = {
  title: { absolute: seo.communicationIntelligenceMentorship.title },
  description: seo.communicationIntelligenceMentorship.description,
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

export default function CommunicationIntelligenceMentorshipPage() {
  return (
    <>
      {/* 1. Hero Section (with Placeholder Image on the side) */}
      <DarkSection className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
        <Container className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-gold-deep mb-6">
                {mentorshipHero.eyebrow}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight">
                {mentorshipHero.heading}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 font-serif italic text-gold text-2xl lg:text-3xl leading-snug">
                {mentorshipHero.lead}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
              <MentorshipModalButton
                label={mentorshipInvitation.cta.label}
                defaultInterest="Communication Intelligence Mentorship"
              />
              <a
                href="#mentorship-tracks"
                className="inline-flex items-center gap-2 border-b border-white/20 py-1.5 text-sm font-semibold text-champagne transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                Explore the Two Tracks <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4.5] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={mentorshipHero.heroImage}
                alt={mentorshipHero.heading}
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

      {/* 2. The Promise (with Horizontal Banner Image displayed in full horizontal format) */}
      <section className="bg-champagne py-24 lg:py-32 border-b border-graphite/10">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{mentorshipPromise.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-ink">
                {mentorshipPromise.heading}
              </h2>
              <div className="mt-8 h-px w-16 bg-gold-deep" />

              {/* Horizontal Programme Lockup Image */}
              <div className="mt-10 rounded-sm border border-ink/10 bg-white p-6 sm:p-8 shadow-sm">
                <div className="relative w-full aspect-[2.5/1]">
                  <Image
                    src={mentorshipHero.image}
                    alt="The Communication Intelligence Mentorship"
                    fill
                    quality={100}
                    unoptimized
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {mentorshipPromise.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === mentorshipPromise.paragraphs.length - 1
                      ? "font-serif italic text-xl lg:text-2xl text-ink leading-relaxed pt-2 border-l-2 border-gold-deep pl-6"
                      : "text-graphite text-[17px] leading-[1.75]"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.35}>
              <p className="pt-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                {mentorshipPromise.tracksIntro}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. Two Tracks */}
      <div id="mentorship-tracks" className="relative">
        {mentorshipTracks.map((track, idx) => {
          const isInk = idx % 2 !== 0;
          const isImageRight = idx % 2 === 0;

          return (
            <section
              key={track.id}
              className={`py-24 lg:py-32 ${isInk ? "bg-ink text-white" : "bg-white text-ink"}`}
            >
              <Container>
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isImageRight ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Reveal>
                      <div className="inline-flex items-center gap-3 mb-5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-deep font-mono text-sm font-bold text-gold-deep">
                          {track.number}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                          {track.label}
                        </span>
                      </div>

                      <h2
                        className={`font-serif text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.15] ${
                          isInk ? "text-white" : "text-ink"
                        }`}
                      >
                        {track.title}
                      </h2>

                      <p className="mt-3 font-serif italic text-xl lg:text-2xl text-gold-deep">
                        {track.subtitle}
                      </p>

                      <div
                        className={`mt-6 p-5 rounded-sm border ${
                          isInk
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-ink/10 bg-[#FAF8F5]"
                        }`}
                      >
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep block mb-1.5">
                          Who it&apos;s for:
                        </span>
                        <p
                          className={`text-[15px] leading-relaxed ${
                            isInk ? "text-champagne/90" : "text-ink/85"
                          }`}
                        >
                          {track.whoItsFor}
                        </p>
                      </div>

                      <div className="mt-6 space-y-4">
                        {track.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className={`text-[16.5px] leading-relaxed ${
                              isInk ? "text-champagne/75" : "text-graphite"
                            }`}
                          >
                            {p}
                          </p>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h3
                          className={`font-mono text-xs font-bold uppercase tracking-[0.18em] mb-4 ${
                            isInk ? "text-gold" : "text-gold-deep"
                          }`}
                        >
                          {track.exploreHeading}
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {track.exploreItems.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className={`flex items-start gap-3 p-3.5 rounded-sm border ${
                                isInk
                                  ? "border-white/10 bg-white/[0.02] text-champagne/85"
                                  : "border-ink/10 bg-white text-ink/85"
                              } text-[14.5px] leading-snug`}
                            >
                              <span className="text-gold-deep font-mono text-xs mt-0.5 shrink-0">
                                ◆
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className={`mt-8 p-6 border-l-2 border-gold-deep ${
                          isInk ? "bg-white/[0.03]" : "bg-champagne/50"
                        }`}
                      >
                        <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep mb-2">
                          {track.outcomeHeading}
                        </h4>
                        <p
                          className={`font-serif text-lg leading-relaxed ${
                            isInk ? "text-white" : "text-ink"
                          }`}
                        >
                          {track.outcomeBody}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Track Image Column */}
                  <div
                    className={`lg:col-span-5 w-full lg:sticky lg:top-28 self-start ${
                      isImageRight ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Reveal delay={0.15}>
                      <div
                        className={`relative aspect-[4/3] lg:aspect-[4/4.8] w-full rounded-sm overflow-hidden border shadow-xl ${
                          isInk ? "border-white/10" : "border-ink/10"
                        }`}
                      >
                        <Image
                          src={track.image}
                          alt={track.title}
                          fill
                          quality={100}
                          unoptimized
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* 4. Our Mentorship Philosophy */}
      <DarkSection className="py-24 lg:py-32 border-t border-white/10">
        <Container>
          <div className="max-w-[760px] mx-auto text-center">
            <Reveal>
              <Eyebrow tone="champagne">{mentorshipPhilosophy.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">
                {mentorshipPhilosophy.heading}
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {mentorshipPhilosophy.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 0.1}
                className="flex flex-col justify-between p-8 lg:p-10 border border-white/10 bg-white/[0.03] rounded-sm"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-gold">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-champagne/75">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14 max-w-[680px] mx-auto text-center border-t border-b border-gold-deep/30 py-6">
              <p className="font-serif italic text-xl lg:text-2xl text-champagne">
                {mentorshipPhilosophy.conviction}
              </p>
            </div>
          </Reveal>
        </Container>
      </DarkSection>

      {/* 5. The Mentorship Experience & Each Participant Receives */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container>
          <Reveal>
            <Eyebrow>{mentorshipExperience.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ink max-w-[24ch]">
              {mentorshipExperience.eyebrow}
            </h2>
          </Reveal>

          {/* 3 Specs Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mentorshipExperience.specs.map((spec, i) => (
              <Reveal
                key={spec.label}
                delay={i * 0.1}
                className="bg-white border border-ink/10 p-7"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep block">
                  {spec.label}
                </span>
                <p className="mt-3 font-serif text-2xl text-ink leading-snug">
                  {spec.value}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-ink/85 text-lg lg:text-xl max-w-[65ch] leading-relaxed">
              {mentorshipExperience.body}
            </p>
          </Reveal>

          {/* Each Participant Receives */}
          <Reveal delay={0.25}>
            <div className="mt-14 bg-white border border-ink/10 p-8 lg:p-12">
              <h3 className="font-serif text-2xl lg:text-3xl text-ink mb-8">
                {mentorshipExperience.receivesHeading}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mentorshipExperience.receivesItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 border border-ink/10 bg-[#FAF8F5]"
                  >
                    <span className="font-mono text-sm font-bold text-gold-deep shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-[15px] text-ink/85 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. The Development Journey */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <Reveal>
            <Eyebrow>{developmentJourney.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ink">
              {developmentJourney.eyebrow}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {developmentJourney.steps.map((step, i) => {
              const isDark = i === 0;
              const isChampagne = i === 2;
              return (
                <Reveal
                  key={step.title}
                  delay={i * 0.1}
                  className={`flex flex-col justify-between p-8 border ${
                    isDark
                      ? "bg-ink text-white border-ink"
                      : isChampagne
                        ? "bg-[#F7EEDC] text-ink border-ink/10"
                        : "bg-white text-ink border-ink/10"
                  }`}
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-gold-deep">
                      {step.number}
                    </span>
                    <h3
                      className={`mt-4 font-serif text-2xl font-semibold ${
                        isDark ? "text-white" : "text-ink"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-4 text-[15px] leading-relaxed ${
                        isDark ? "text-champagne/75" : "text-ink/75"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 7. Private Mentorship & Selection and Participation */}
      <section className="bg-champagne/60 py-24 lg:py-32 border-t border-ink/10">
        <Container className="space-y-20">
          {/* Private Mentorship */}
          <div className="grid lg:grid-cols-12 gap-12 items-center bg-ink text-white p-8 sm:p-12 lg:p-16 rounded-sm">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="champagne">{privateMentorship.eyebrow}</Eyebrow>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                  {privateMentorship.heading}
                </h2>
                <p className="mt-6 text-champagne/85 text-lg leading-relaxed">
                  {privateMentorship.intro}
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {privateMentorship.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="border border-white/15 bg-white/[0.04] p-5"
                    >
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep block">
                        {spec.label}
                      </span>
                      <p className="mt-2 font-serif text-lg text-white">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  {privateMentorship.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-champagne/75 text-[15.5px] leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 w-full">
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-white/15 shadow-xl">
                  <Image
                    src={privateMentorship.image}
                    alt={privateMentorship.heading}
                    fill
                    quality={100}
                    unoptimized
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Selection and Participation */}
          <div className="max-w-[820px] mx-auto bg-white border border-ink/10 p-8 sm:p-12 lg:p-14">
            <Reveal>
              <Eyebrow>{selectionAndParticipation.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl text-ink mb-6">
                {selectionAndParticipation.eyebrow}
              </h2>
              <div className="space-y-4">
                {selectionAndParticipation.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === selectionAndParticipation.paragraphs.length - 1
                        ? "text-ink/70 text-[15px] italic border-t border-ink/10 pt-4 mt-6"
                        : "text-graphite text-[16.5px] leading-relaxed"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 8. The Invitation (Closing CTA) */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

        <Container className="relative z-10 py-28 lg:py-36 text-center flex flex-col items-center">
          <Reveal className="w-full max-w-[760px] mx-auto">
            <SignalDivider tone="gold" className="mb-12" />

            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-deep mb-4">
              {mentorshipInvitation.eyebrow}
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white mb-6">
              {mentorshipInvitation.heading}
            </h2>

            <p className="text-champagne/80 text-lg leading-relaxed mb-10 max-w-[56ch] mx-auto">
              {mentorshipInvitation.body}
            </p>

            <div className="mb-10 inline-flex flex-col items-center border border-gold-deep/40 bg-white/[0.03] px-8 py-6 rounded-sm">
              <p className="font-serif text-2xl text-white">
                {mentorshipInvitation.programmeTitle}
              </p>
              <p className="mt-1 font-serif italic text-gold text-lg">
                {mentorshipInvitation.tagline}
              </p>
              <span className="mt-4 inline-block bg-gold-deep/20 border border-gold-deep/50 px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                {mentorshipInvitation.statusBadge}
              </span>
            </div>

            <div>
              <MentorshipModalButton
                label={mentorshipInvitation.cta.label}
                defaultInterest="Communication Intelligence Mentorship"
                className="px-10 h-14 text-base"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
