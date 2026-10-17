import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { DuotonePhoto } from "@/components/ui/DuotonePhoto";
import { familiarChallenges } from "@/content/home";

function ConceptIcon({ index }: { index: number }) {
  const icons = [
    <path key="0" d="M12 4 L12 20 M4 12 L20 12 M7 7 L17 17 M7 17 L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
    <path key="1" d="M4 12 C8 12, 12 8, 12 4 C12 8, 16 12, 20 12 C16 12, 12 16, 12 20 C12 16, 8 12, 4 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
    <path key="2" d="M3 12h5l2.5-4 5 8 2.5-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
    <path key="3" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gold-deep mb-5 shrink-0">
      {icons[index % icons.length]}
    </svg>
  );
}

export function WhyGoldapples() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        {/* Top — Headline & Intro */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-10">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-deep mb-6">
                {familiarChallenges.eyebrow}
              </p>
              <h2 className="font-serif text-[2rem] leading-[1.12] text-ink lg:text-[2.5rem] max-w-[24ch]">
                {familiarChallenges.heading}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Bottom — Mixed Grid of 4 challenge cards and tall image */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          
          {/* Cards 1 & 2 */}
          {familiarChallenges.items.slice(0, 2).map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="h-full">
              <div className="bg-champagne/40 border border-graphite/5 rounded-[3px] p-8 h-full flex flex-col justify-between min-h-[260px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div>
                  <ConceptIcon index={i} />
                  <h3 className="font-serif text-[21px] leading-snug text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-graphite text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Portrait Image spanning 2 rows vertically on desktop */}
          <Reveal delay={0.2} className="md:col-span-2 lg:col-span-1 lg:row-span-2 h-full">
            <div className="relative w-full h-[400px] lg:h-full min-h-[500px] rounded-[3px] overflow-hidden group">
              <DuotonePhoto
                src="/What_we_do.jpg"
                alt="Goldapples advisory and leadership communication session"
                tone="ink-gold"
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* Cards 3 & 4 */}
          {familiarChallenges.items.slice(2, 4).map((item, i) => (
            <Reveal key={item.title} delay={0.3 + i * 0.1} className="h-full">
              <div className="bg-graphite text-white rounded-[3px] p-8 h-full flex flex-col justify-between min-h-[260px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-ink/20">
                <div>
                  <ConceptIcon index={i + 2} />
                  <h3 className="font-serif text-[21px] leading-snug text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-champagne/80 text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          
        </div>
      </Container>
    </section>
  );
}