import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { galleryImages } from "@/lib/content";

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
        <SectionHeading id="photos-title" tone="light" eyebrow="From the kitchen" title="Made fresh," accent="served big." />
        <ul className="mt-12 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:mt-16 sm:auto-rows-[14rem] sm:gap-4 lg:auto-rows-[16rem] lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal
              as="li"
              key={img.src}
              delay={(i % 3) * 0.08}
              className={cn("group relative overflow-hidden rounded-[1.75rem] bg-char", tileClass(i, images.length))}
            >
              <figure className="absolute inset-0 m-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-red/30 via-transparent to-gold/20 mix-blend-soft-light" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
                <figcaption
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-4 text-sm font-semibold leading-snug text-white/90 sm:p-6",
                    i === 0 ? "sm:text-lg" : "hidden sm:block",
                  )}
                >
                  {img.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
