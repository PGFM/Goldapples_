import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { openingBelief } from "@/content/home";

export function OpeningBelief() {
  const firstScenario = openingBelief.scenarios[0];

  return (
    <section className="bg-champagne py-32 lg:py-40 text-center">
      <Container>
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <h2 className="font-serif text-[2rem] leading-[1.15] text-ink lg:text-[2.75rem] mb-12 max-w-[25ch] mx-auto">
              The message was clear. <span className="italic">Or was it?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <SignalDivider tone="gold" className="mb-12" />
          </Reveal>

          <div className="space-y-6 text-left max-w-[65ch] mx-auto">
            <Reveal as="div" delay={0.2} className="relative">
              <p className="text-graphite text-[19px] leading-relaxed">
                {/* Drop cap for editorial feel */}
                <span className="float-left text-6xl font-serif text-gold-deep leading-[0.8] pr-3 pt-2 pb-1">
                  {firstScenario.charAt(0)}
                </span>
                <span className="sr-only">{firstScenario.charAt(0)}</span>
                {firstScenario.slice(1)} {openingBelief.scenarios[1]}{" "}
                {openingBelief.scenarios[2]}
              </p>
            </Reveal>

            <Reveal
              as="p"
              delay={0.3}
              className="font-serif italic text-ink text-[21px] leading-relaxed pt-2"
            >
              {openingBelief.turn}
            </Reveal>

            <Reveal
              as="p"
              delay={0.35}
              className="text-graphite text-[19px] leading-relaxed"
            >
              {openingBelief.closing}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}