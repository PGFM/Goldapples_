"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DuotonePhoto } from "@/components/ui/DuotonePhoto";
import { hero } from "@/content/home";

function AmbientHeroSignal({ className = "absolute -top-32 -left-32 w-[600px] h-[600px] text-gold-deep/10 pointer-events-none z-0" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.svg 
      viewBox="0 0 400 400" 
      fill="none" 
      aria-hidden="true"
      className={className}
      initial={reducedMotion ? "visible" : "hidden"}
      animate="visible"
    >
      <motion.path 
        d="M0 200 Q 100 50 200 200 T 400 200" 
        stroke="currentColor" 
        strokeWidth="1" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" as any } }
        }}
      />
      <motion.path 
        d="M0 200 Q 100 350 200 200 T 400 200" 
        stroke="currentColor" 
        strokeWidth="1" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.5, transition: { duration: 2.5, ease: "easeInOut" as any, delay: 0.2 } }
        }}
      />
      <motion.circle 
        cx="200" cy="200" r="150" 
        stroke="currentColor" 
        strokeWidth="0.5" 
        strokeDasharray="4 8"
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" as any } }
        }}
      />
    </motion.svg>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as any },
    }),
  };

  return (
    <section className="relative min-h-[85vh] bg-ink flex items-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left — Content */}
          <div className="lg:col-span-7 flex flex-col relative">
            {/* Lead / Epigraph */}
            <motion.div
              className="mb-8"
              custom={0}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              <div className="flex flex-col gap-3">
                <p className="font-serif text-[22px] leading-snug italic text-champagne/90">
                  {hero.lead}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-gold-deep/60" />
                </div>
              </div>
            </motion.div>

            {/* Main headline - Refined typographic treatment */}
            <motion.h1
              className="font-serif text-[2.5rem] leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[56px] mb-6 max-w-[18ch]"
              custom={1}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              Communication{" "}
              <span className="relative inline-block italic text-gold-deep pr-1">
                shapes
                <svg className="absolute -bottom-1 left-0 w-full h-[3px] text-gold-deep/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>{" "}
              what happens next.
            </motion.h1>

            {/* Supporting body */}
            <motion.p
              className="block max-w-[55ch] text-base sm:text-lg leading-relaxed text-champagne/80 mb-8 lg:mb-10"
              custom={2}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
              custom={3}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              <Button href={hero.primaryCta.href} variant="gold">
                {hero.primaryCta.label}
              </Button>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-1.5 border-b border-white/20 py-1.5 text-sm font-semibold text-champagne transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                {hero.secondaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Graphic Panel */}
          <div className="lg:col-span-5 w-full mt-12 lg:mt-0">
            <motion.div
              className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-[4/5] max-w-[440px] mx-auto lg:ml-auto lg:mx-0 rounded-[3px] overflow-hidden shadow-2xl border border-white/5"
              custom={2}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              <DuotonePhoto 
                src="/H_hero.jpg" 
                alt="Goldapples Communication Masterclass" 
                tone="ink-gold" 
                className="absolute inset-0 w-full h-full" 
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}