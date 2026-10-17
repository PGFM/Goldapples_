import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { DuotonePhoto } from "@/components/ui/DuotonePhoto";
import { IconSwatch } from "@/components/ui/IconSwatch";
import {
  IconAdvisory,
  IconAcademy,
  IconDevelopment,
} from "@/components/icons";
import { corePracticeAreas } from "@/content/home";

const cards = [
  {
    icon: IconAdvisory,
    src: "/Communication Advisory.jpg",
    iconTone: "gold" as const,
    tone: "ink-gold" as const,
    imgAlt: "Advisory session with executive leaders",
    cardBg: "bg-ink",
    textColor: "text-white",
    mutedColor: "text-champagne/75",
    linkColor: "text-gold border-gold/40 hover:border-gold",
    hoverBorder: "hover:border-gold/30",
  },
  {
    icon: IconAcademy,
    src: "/Executive Communication Academy.jpg",
    iconTone: "ink" as const,
    tone: "gold" as const,
    imgAlt: "Executive communication training workshop",
    cardBg: "bg-white border border-graphite/10",
    textColor: "text-ink",
    mutedColor: "text-steel",
    linkColor: "text-ink border-ink/25 hover:border-ink",
    hoverBorder: "hover:border-gold-deep/40 hover:shadow-lg hover:shadow-gold-deep/5",
  },
  {
    icon: IconDevelopment,
    src: "/Development Communication Practice.jpg",
    iconTone: "gold" as const,
    tone: "ink" as const,
    imgAlt: "Development communication programme delivery",
    cardBg: "bg-graphite",
    textColor: "text-white",
    mutedColor: "text-champagne/70",
    linkColor: "text-gold border-gold/40 hover:border-gold",
    hoverBorder: "hover:border-gold/30",
  },
];

export function CorePracticeAreas() {
  return (
    <section className="bg-champagne py-24 lg:py-32">
      <Container>
        <Reveal className="mb-14 max-w-[600px]">
          <p className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-deep mb-4">
            Our Core Practice Areas
          </p>
          <h2 className="text-ink font-serif text-3xl leading-tight lg:text-[2.5rem]">
            Three practices. One purpose.
          </h2>
        </Reveal>

        {/* 3-column equal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corePracticeAreas.map((area, i) => {
            const card = cards[i % cards.length];
            return (
              <Reveal key={area.title} delay={i * 0.08} className="h-full">
                <div 
                  className={`
                    ${card.cardBg} ${card.hoverBorder} 
                    rounded-[3px] overflow-hidden group h-full flex flex-col 
                    transition-all duration-300 ease-out hover:-translate-y-1
                  `}
                >
                  {/* Image area */}
                  <div className="relative h-56 lg:h-60 overflow-hidden">
                    <DuotonePhoto
                      src={card.src}
                      alt={card.imgAlt}
                      tone={card.tone}
                      className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content area */}
                  <div className="flex flex-col flex-1 p-8">
                    <IconSwatch icon={card.icon} tone={card.iconTone} className="mb-5" />
                    <h3 className={`font-serif text-[22px] leading-snug ${card.textColor} mb-3`}>
                      {area.title}
                    </h3>
                    <p className={`text-[15px] leading-relaxed ${card.mutedColor} mb-6 flex-1`}>
                      {area.description}
                    </p>
                    <Link
                      href={area.cta.href}
                      className={`inline-flex items-center gap-1.5 self-start border-b py-1 text-sm font-semibold transition-colors ${card.linkColor}`}
                    >
                      {area.cta.label} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}