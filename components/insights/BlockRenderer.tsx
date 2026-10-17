import type { ContentBlock } from "@/lib/insights-types";
import { SignalDivider } from "@/components/ui/SignalDivider";

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-7">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const level = block.level || 2;
            if (level === 3) {
              return (
                <h3
                  key={block.id}
                  className="pt-4 font-serif text-2xl leading-snug text-ink lg:text-[26px]"
                >
                  {block.content}
                </h3>
              );
            }
            if (level === 4) {
              return (
                <h4
                  key={block.id}
                  className="pt-3 font-sans text-lg font-semibold leading-snug text-ink"
                >
                  {block.content}
                </h4>
              );
            }
            return (
              <h2
                key={block.id}
                className="pt-6 font-serif text-3xl leading-snug text-ink lg:text-[34px]"
              >
                {block.content}
              </h2>
            );
          }

          case "paragraph":
            return (
              <p
                key={block.id}
                className="whitespace-pre-line text-[17.5px] leading-[1.85] text-graphite"
              >
                {block.content}
              </p>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="my-8 border-l-2 border-gold-deep bg-[#FAF8F5] py-6 pr-6 pl-6 sm:pl-8"
              >
                <p className="font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                  &ldquo;{block.content}&rdquo;
                </p>
                {block.attribution && (
                  <footer className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "list": {
            const items = (block.items || []).filter((item) => item.trim().length > 0);
            if (items.length === 0) return null;
            if (block.listStyle === "ordered") {
              return (
                <ol
                  key={block.id}
                  className="list-decimal space-y-2.5 pl-6 text-[17px] leading-[1.8] text-graphite marker:font-mono marker:font-bold marker:text-gold-deep"
                >
                  {items.map((item, idx) => (
                    <li key={idx} className="pl-1.5">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={block.id}
                className="list-disc space-y-2.5 pl-6 text-[17px] leading-[1.8] text-graphite marker:text-gold-deep"
              >
                {items.map((item, idx) => (
                  <li key={idx} className="pl-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          case "image": {
            if (!block.imageUrl) return null;
            const widthClass =
              block.width === "full"
                ? "w-full -mx-4 sm:mx-0"
                : block.width === "wide"
                  ? "w-full"
                  : "max-w-2xl mx-auto";
            return (
              <figure key={block.id} className={`my-8 ${widthClass}`}>
                <div className="overflow-hidden rounded-[3px] border border-ink/10 bg-[#FAF8F5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.imageUrl}
                    alt={block.alt || block.caption || "Article visual"}
                    className="h-auto w-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center font-sans text-xs italic text-steel">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "callout":
            return (
              <div
                key={block.id}
                className="my-8 border border-gold-deep/30 border-l-4 border-l-gold-deep bg-champagne/40 p-6 sm:p-8"
              >
                {block.calloutTitle && (
                  <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
                    {block.calloutTitle}
                  </p>
                )}
                <p className="whitespace-pre-line font-serif text-[18px] leading-relaxed text-ink">
                  {block.content}
                </p>
              </div>
            );

          case "divider":
            return (
              <div key={block.id} className="py-6">
                <SignalDivider tone="gold" />
              </div>
            );

          case "html":
            return (
              <div
                key={block.id}
                className="prose max-w-none text-graphite [&_a]:text-gold-deep [&_a]:underline [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-ink [&_p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.content || "" }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
