import { Quote } from "lucide-react";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { ratings, testimonials } from "@/lib/content";
import { httpHref } from "@/lib/ordering";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";
import { container } from "./styles";

export function Reviews() {
  const quotes = testimonials(site);
  const scores = ratings(site);
  if (quotes.length === 0 && scores.length === 0) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title="What the Westside" accent="is saying." />
          {scores.length > 0 ? (
            <Reveal className="flex flex-wrap gap-3">
              {scores.map((r) => {
                const href = httpHref(r.sourceUrl);
                const body = (
                  <>
                    <span className="font-display text-4xl font-extrabold tracking-tight">{r.value.toFixed(1)}</span>
                    <span className="flex flex-col gap-1">
                      <Stars value={r.value} className="text-ink" />
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                        {r.count > 0 ? `${r.count.toLocaleString("en-US")} ${r.source} reviews` : r.source}
                      </span>
                    </span>
                  </>
                );
                const cls = "flex items-center gap-4 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-[0_14px_30px_-22px_rgb(0_0_0/0.5)]";
                return href ? (
                  <a key={r.source} href={href} target="_blank" rel="noreferrer" className={cn(cls, "transition hover:-translate-y-0.5")}>
                    {body}
                  </a>
                ) : (
                  <div key={r.source} className={cls}>
                    {body}
                  </div>
                );
              })}
            </Reveal>
          ) : null}
        </div>

        {quotes.length > 0 ? (
          <ul className="mt-12 columns-1 gap-5 sm:mt-16 md:columns-2 lg:columns-3">
            {quotes.map((t, i) => {
              const href = httpHref(t.sourceUrl);
              const dark = i % 4 === 1;
              return (
                <Reveal as="li" key={i} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
                  <figure
                    className={cn(
                      "relative rounded-[1.75rem] p-7 transition duration-300 hover:-translate-y-1 sm:p-8",
                      dark ? "bg-blue-deep text-white" : "bg-white text-ink shadow-[0_20px_40px_-30px_rgb(0_0_0/0.45)]",
                    )}
                  >
                    <Quote aria-hidden className={cn("size-8", dark ? "text-gold" : "text-red")} strokeWidth={2.5} />
                    {t.rating ? <Stars value={t.rating} className={cn("mt-4", dark ? "text-white" : "text-ink")} /> : null}
                    <blockquote className="mt-4 text-lg font-medium leading-relaxed">&ldquo;{t.quote.trim()}&rdquo;</blockquote>
                    <figcaption className={cn("mt-5 text-xs font-extrabold uppercase tracking-[0.2em]", dark ? "text-gold" : "text-red")}>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                          via {t.sourceLabel.trim()}
                        </a>
                      ) : (
                        <>via {t.sourceLabel.trim()}</>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
