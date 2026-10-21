import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { galleryImages } from "@/lib/content";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { container } from "./styles";

export function Gallery() {
  const images = galleryImages(site).slice(0, 8);
  if (images.length === 0) return null;

  return (
    <section id="photos" aria-labelledby="photos-title" className="bg-cream py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="photos-title" eyebrow="From the kitchen" title="Made fresh," accent="served big." />
        <ul className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:mt-16 sm:auto-rows-[15rem] sm:gap-4 lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal
              as="li"
              key={img.src}
              delay={(i % 4) * 0.06}
              className={cn("group relative overflow-hidden rounded-[1.5rem] bg-char", i % 5 === 0 && "row-span-2", i === 3 && "lg:col-span-2")}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
