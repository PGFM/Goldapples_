import Link from "next/link";
import Image from "next/image";
import { footerContent, siteMeta } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-champagne" data-dark-section>
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/assets/logo/goldapples-icon.png"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="mb-6 h-10 w-10 opacity-90"
            />
            <p className="text-champagne/80 max-w-[42ch] text-[15px] leading-relaxed">
              {footerContent.blurb}
            </p>
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:col-span-4" aria-label="Footer">
            {/* Column 1: About */}
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href={footerContent.aboutColumn.heading.href}
                className="text-gold hover:text-champagne text-xs font-semibold tracking-[0.08em] uppercase transition-colors"
              >
                {footerContent.aboutColumn.heading.label}
              </Link>
              <ul className="flex flex-col gap-3">
                {footerContent.aboutColumn.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-champagne/70 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-gold text-xs font-semibold tracking-[0.08em] uppercase">
                {footerContent.servicesColumn.heading}
              </span>
              <ul className="flex flex-col gap-3">
                {footerContent.servicesColumn.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-champagne/70 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-3 text-sm lg:col-span-3">
            <span className="text-gold text-xs font-semibold tracking-[0.08em] uppercase">
              Contact
            </span>
            <a
              href={`mailto:${footerContent.email}`}
              className="text-champagne/80 hover:text-gold transition-colors"
            >
              {footerContent.email}
            </a>
            <span className="text-champagne/60">{footerContent.location}</span>
          </div>
        </div>

        <div className="border-champagne/10 text-champagne/50 mt-16 flex flex-col gap-3 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footerContent.copyright} Designed By{" "}
            <a
              href={footerContent.designer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne/80 hover:text-gold underline underline-offset-4 transition-colors"
            >
              {footerContent.designer.label}
            </a>
          </p>
          <p className="italic">
            &ldquo;{siteMeta.positioningLine}&rdquo; — {siteMeta.positioningAuthor}
          </p>
        </div>
      </div>
    </footer>
  );
}
