import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { aboutParagraphs, validImage } from "@/lib/content";
import { signatureDishes } from "@/lib/menu";

import { Reveal } from "./reveal";
import { kicker } from "./styles";
import { container } from "./styles";

export function About() {
  const paragraphs = aboutParagraphs(site);
  if (paragraphs.length === 0) return null;
  const heading = site.about.heading.trim();
  const image = validImage(site.about.image) ? site.about.image : null;
  const dishes = signatureDishes(site).slice(0, 3);
  const [lead, ...rest] = paragraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="grain relative isolate overflow-hidden bg-blue-deep py-20 text-white sm:py-28">
      <div aria-hidden className="bg-lattice absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -left-32 top-10 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(225_38_45/0.35),transparent)] blur-2xl" />
      <div className={cn(container, "grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20")}>
        <Reveal>
          <p className={cn(kicker, "text-gold")}>
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-current" />
            Our story
          </p>
          <h2 id="about-title" className="mt-4 font-display text-[clamp(2.3rem,6.5vw,4.6rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-balance">
            {heading || site.name}
          </h2>
          <p className="mt-8 font-serif text-2xl leading-snug text-white sm:text-[2rem]">{lead}</p>
          {rest.map((p, i) => (
            <p key={i} className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          {image ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-white/15">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/5 p-8 backdrop-blur sm:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 flex h-2">
                <span className="flex-1 bg-blue" />
                <span className="flex-1 bg-red" />
              </span>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.3em] text-gold">Manje lakay</p>
              <p className="mt-3 font-serif text-3xl italic leading-tight text-white/90">Home cooking, Haitian style.</p>
              {dishes.length > 0 ? (
                <ol className="mt-8 space-y-4">
                  {dishes.map((d, i) => (
                    <li key={d.id} className="flex items-baseline gap-4 border-t border-white/10 pt-4">
                      <span className="font-display text-sm font-extrabold text-red">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-2xl font-extrabold tracking-tight">{d.name}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
