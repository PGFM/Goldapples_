"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ourThinking } from "@/content/home";

function FrameworkNode({ index, name, total }: { index: number; name: string; total: number }) {
  const isLast = index === total - 1;
  
  return (
    <div className="relative flex flex-col items-center gap-4 text-center group">
      {/* Node / Marker */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink border border-gold-deep text-gold-deep transition-colors group-hover:bg-gold-deep group-hover:text-ink">
        <span className="font-mono text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Connecting Line (Desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-px bg-white/15 group-hover:bg-gold-deep/40 transition-colors" />
      )}
      
      {/* Connecting Line (Mobile) */}
      {!isLast && (
        <div className="md:hidden absolute top-12 left-1/2 -translate-x-1/2 w-px h-8 bg-white/15 group-hover:bg-gold-deep/40 transition-colors" />
      )}

      {/* Content */}
      <div className="pt-1 w-full">
        <h3 className="font-serif text-lg leading-snug text-white/90 group-hover:text-white transition-colors">
          {name}
        </h3>
      </div>
    </div>
  );
}

export function OurThinking() {
  return (
    <section className="bg-ink py-24 lg:py-32 overflow-hidden">
      <Container>
        {/* Header section */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-8 lg:col-start-3 text-center">
            <Reveal>
              <p className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-gold-deep mb-6">
                Our Approach
              </p>
              <h2 className="font-serif text-[2rem] leading-[1.15] text-white lg:text-[2.5rem] mb-6">
                {ourThinking.heading}
              </h2>
              <p className="text-champagne/80 text-lg leading-relaxed max-w-[55ch] mx-auto">
                {ourThinking.body}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Visual System for 5-step process */}
        <Reveal delay={0.2} className="relative z-10 w-full mb-16 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-x-4 relative">
            {ourThinking.frameworks.map((name, i) => (
              <Reveal key={name} delay={0.2 + i * 0.1}>
                <FrameworkNode index={i} name={name} total={ourThinking.frameworks.length} />
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Footer section */}
        <div className="flex justify-center border-t border-white/10 pt-12 max-w-[1000px] mx-auto">
          <Reveal delay={0.5}>
            <Button href={ourThinking.cta.href} variant="gold">
              {ourThinking.cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}