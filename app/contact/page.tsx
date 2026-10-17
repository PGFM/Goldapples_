import { Metadata } from "next";
import { seo } from "@/content/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SignalDivider } from "@/components/ui/SignalDivider";
import { SignalMotif } from "@/components/ui/SignalMotif";
import {
  contactContent,
  supportOptions,
  responseMethods,
} from "@/content/contact";

const formFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your full name",
    type: "text",
    required: true,
  },
  {
    name: "organisation",
    label: "Organisation",
    placeholder: "Your organisation or institution",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "Your email address",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number (optional)",
    placeholder: "Phone number",
    type: "tel",
    required: false,
  },
  {
    name: "interest",
    label: "Area of interest",
    type: "select",
    options: supportOptions,
    required: true,
  },
  {
    name: "challenge",
    label: "What is the communication challenge?",
    placeholder: "Describe what is happening...",
    type: "textarea",
    required: true,
  },
  {
    name: "outcome",
    label: "What would a better outcome look like?",
    placeholder: "Describe what you need to achieve...",
    type: "textarea",
    required: true,
  },
  {
    name: "method",
    label: "Preferred response",
    type: "radio",
    options: responseMethods,
    required: true,
  },
];

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
                <form className="flex flex-col gap-10">
                  {formFields.map((field) => {
                    if (field.type === "textarea") {
                      return (
                        <div key={field.name} className="flex flex-col gap-3">
                          <label
                            htmlFor={field.name}
                            className="text-ink font-semibold text-[15px]"
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-gold-deep">*</span>
                            )}
                          </label>
                          <textarea
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            rows={3}
                            className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors resize-y"
                            placeholder={field.placeholder}
                          />
                        </div>
                      );
                    }

                    if (field.type === "select") {
                      return (
                        <div key={field.name} className="flex flex-col gap-3">
                          <label
                            htmlFor={field.name}
                            className="text-ink font-semibold text-[15px]"
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-gold-deep">*</span>
                            )}
                          </label>
                          <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            defaultValue=""
                            className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
                          >
                            <option value="" disabled>
                              Select an area of interest
                            </option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    if (field.type === "radio") {
                      return (
                        <div key={field.name} className="flex flex-col gap-4">
                          <span className="text-ink font-semibold text-[15px]">
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-gold-deep">*</span>
                            )}
                          </span>
                          <div className="flex flex-wrap gap-8">
                            {field.options?.map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={opt}
                                  required={field.required}
                                  className="w-4 h-4 text-gold-deep accent-gold-deep border-graphite/20 focus:ring-gold-deep"
                                />
                                <span className="text-[16px] text-graphite group-hover:text-ink transition-colors">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (field.type === "tel") {
                      return (
                        <div key={field.name} className="flex flex-col gap-3">
                          <label
                            htmlFor={field.name}
                            className="text-ink font-semibold text-[15px]"
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-gold-deep">*</span>
                            )}
                          </label>
                          <div className="flex gap-4">
                            <select
                              name={`${field.name}Code`}
                              className="w-[110px] shrink-0 bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
                              defaultValue="+234"
                            >
                              <option value="+234">NG (+234)</option>
                              <option value="+1">US (+1)</option>
                              <option value="+44">UK (+44)</option>
                              <option value="+27">ZA (+27)</option>
                              <option value="+254">KE (+254)</option>
                              <option value="+233">GH (+233)</option>
                            </select>
                            <input
                              type="tel"
                              id={field.name}
                              name={field.name}
                              required={field.required}
                              className="flex-1 bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors"
                              placeholder={field.placeholder}
                            />
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={field.name} className="flex flex-col gap-3">
                        <label
                          htmlFor={field.name}
                          className="text-ink font-semibold text-[15px]"
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-gold-deep">*</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors"
                          placeholder={field.placeholder}
                        />
                      </div>
                    );
                  })}

                  <div className="pt-6">
                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full sm:w-auto px-10 h-14 text-base"
                    >
                      {contactContent.cta}
                    </Button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
