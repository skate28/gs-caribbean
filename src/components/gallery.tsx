import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { galleryImages, shortCaption } from "@/lib/content";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { container } from "./styles";

/** Bento layout: the first photo leads big, the rest stack beside it. */
function tileClass(index: number, count: number): string {
  if (count === 1) return "col-span-2 row-span-2 lg:col-span-3";
  if (index === 0) return "col-span-2 row-span-2";
  if (count === 2) return "col-span-2 row-span-2 lg:col-span-1";
  if (count === 4 && index === 3) return "col-span-2 lg:col-span-3";
  return "";
}

export function Gallery() {
  const images = galleryImages(site).slice(0, 7);
  if (images.length === 0) return null;

  return (
    <section id="photos" aria-labelledby="photos-title" className="grain relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div aria-hidden className="bg-weave absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_106_31/0.3),transparent)] blur-2xl"
      />
      <div className={container}>
        <SectionHeading id="photos-title" tone="light" eyebrow="From the kitchen" title="Plated" accent="generous." />
        <ul className="mt-12 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:mt-16 sm:auto-rows-[14rem] sm:gap-4 lg:auto-rows-[16rem] lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal
              as="li"
              key={img.src}
              delay={(i % 3) * 0.08}
              className={cn("group relative overflow-hidden rounded-[1.75rem] bg-char ring-1 ring-white/15", tileClass(i, images.length))}
            >
              <figure className="absolute inset-0 m-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover brightness-[1.06] contrast-[1.06] saturate-[1.15] transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-red/30 via-transparent to-gold/20 mix-blend-soft-light" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <figcaption
                  className={cn(
                    "absolute bottom-0 left-0 p-4 font-display font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.6)] sm:p-6",
                    i === 0 ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl",
                  )}
                >
                  <span aria-hidden className="mb-2 block h-1 w-8 rounded-full bg-red" />
                  {shortCaption(img)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
