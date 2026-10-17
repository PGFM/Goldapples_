import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SignalDivider } from "@/components/ui/SignalDivider";

export function ClosingCta({
  eyebrow,
  heading,
  body,
  cta,
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-ink ${className}`}>
      {/* Richer gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/40" />

      <Container className="relative z-10 py-32 lg:py-40 text-center flex flex-col items-center">
        <Reveal className="w-full">
          <SignalDivider tone="gold" className="mb-16" />

          {eyebrow && (
            <p className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-gold-deep mb-6">
              {eyebrow}
            </p>
          )}
          
          <h2 className="font-serif text-[2rem] leading-[1.15] text-white lg:text-[2.5rem] mb-10 max-w-[28ch] mx-auto">
            {heading}
          </h2>
          {body && (
            <p className="text-champagne/75 text-[17px] leading-relaxed mb-12 max-w-[45ch] mx-auto">
              {body}
            </p>
          )}
          {cta && (
            <Button href={cta.href} variant="gold" className="px-10 h-14 text-base mt-2">
              {cta.label}
            </Button>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
