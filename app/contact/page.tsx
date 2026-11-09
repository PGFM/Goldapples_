import { Metadata } from "next";
import { seo } from "@/content/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { SignalMotif } from "@/components/ui/SignalMotif";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactContent } from "@/content/contact";

export const metadata: Metadata = {
  title: { absolute: seo.contact.title },
  description: seo.contact.description,
};

export default function ContactPage() {
  return (
    <>
      {/* Type-Led Editorial Hero */}
      <section className="bg-ink pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden relative">
        <Container className="relative z-10 lg:flex lg:flex-col lg:items-center lg:text-center">
          <Reveal>
            <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-gold-deep mb-6">
              {contactContent.eyebrow}
            </p>
            <h1 className="text-white font-serif text-4xl leading-[1.1] md:text-5xl lg:text-6xl max-w-[20ch] lg:mx-auto">
              {contactContent.heading}
            </h1>
            <div className="mt-8 max-w-[62ch] lg:mx-auto">
              <p className="text-champagne/80 text-[17px] md:text-lg leading-relaxed lg:text-center lg:mx-auto">
                {contactContent.paragraphs[0]}
              </p>
              <p className="text-gold-deep font-serif text-xl md:text-2xl mt-6 lg:text-center">
                {contactContent.paragraphs[1]}
              </p>
            </div>
          </Reveal>

          {/* Deliberate Signal Motif Divider */}
          <Reveal delay={0.1} className="w-full mt-16 mb-6 lg:mt-20">
            <SignalDivider
              tone="gold"
              className="w-full !max-w-none [&_svg]:!max-w-none [&_svg]:w-full"
            />
          </Reveal>
        </Container>
      </section>

      {/* Two-Column Form Section */}
      <section className="bg-champagne py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 lg:shadow-sm lg:rounded-xl overflow-hidden border border-graphite/5 lg:border-graphite/10">
            {/* Left: Info Panel (Ink) */}
            <div className="lg:col-span-4 bg-ink p-6 sm:p-10 lg:p-14 flex flex-col relative">
              <Reveal>
                <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-gold-deep mb-8 sm:mb-10">
                  Get In Touch
                </p>
                <h2 className="font-serif text-[1.75rem] leading-snug text-white mb-10 sm:mb-12">
                  {contactContent.formHeading}
                </h2>

                <div className="flex flex-col gap-8 sm:gap-10">
                  <div>
                    <p className="font-mono text-xs font-bold tracking-widest text-white/40 mb-3">
                      EMAIL
                    </p>
                    <a
                      href={`mailto:${contactContent.email}`}
                      className="text-champagne hover:text-gold-deep transition-colors text-[17px]"
                    >
                      {contactContent.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold tracking-widest text-white/40 mb-3">
                      LOCATION
                    </p>
                    <p className="text-champagne text-[17px]">
                      {contactContent.location}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Subtle signal motif accent */}
              <div className="absolute bottom-0 right-0 w-64 text-gold-deep opacity-10 pointer-events-none translate-x-[20%] translate-y-[20%]">
                <SignalMotif />
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 lg:p-16">
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
