import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { signatureDishes } from "@/lib/menu";

import { Price } from "./price";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { container } from "./styles";

const THEMES = [
  { card: "bg-red text-white", glow: "from-red-deep/80", num: "text-white/[0.12]", sub: "text-white" },
  { card: "bg-blue text-white", glow: "from-[#3b6bff]/60", num: "text-white/[0.12]", sub: "text-white" },
  { card: "bg-gold text-ink", glow: "from-white/60", num: "text-ink/[0.12]", sub: "text-ink" },
  { card: "bg-ink text-white", glow: "from-red/50", num: "text-white/[0.12]", sub: "text-white/85" },
];

export function Signatures() {
  const dishes = signatureDishes(site).slice(0, 6);
  if (dishes.length === 0) return null;

  return (
    <section id="signatures" aria-labelledby="signatures-title" className="relative bg-cream py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="signatures-title"
          eyebrow="Signature dishes"
          title="The plates people"
          accent="come back for."
        />
        <ul className={cn("mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2", dishes.length % 3 === 0 && "lg:grid-cols-3")}>
          {dishes.map((dish, i) => {
            const theme = THEMES[i % THEMES.length];
            const photo = dish.image?.src?.startsWith("/") && dish.image.alt?.trim() ? dish.image : null;
            return (
              <Reveal as="li" key={dish.id} delay={i * 0.08}>
                <article
                  className={cn(
                    "group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-8",
                    theme.card,
                  )}
                >
                  {photo ? (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover brightness-[1.06] contrast-[1.06] saturate-[1.15] transition duration-700 group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/0" />
                    </>
                  ) : (
                    <div
                      aria-hidden
                      className={cn(
                        "absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-from),transparent)] opacity-70 transition duration-700 group-hover:scale-125",
                        theme.glow,
                      )}
                    />
                  )}
                  {photo ? null : (
                    <span
                      aria-hidden
                      className={cn("absolute right-6 top-4 font-display text-[6.5rem] font-extrabold leading-none tracking-tighter", theme.num)}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div className={cn("relative", photo && "text-white")}>
                    <p
                      className={cn(
                        "text-xs font-extrabold uppercase tracking-[0.28em]",
                        photo ? "inline-block rounded-full bg-ink/85 px-3 py-1.5 text-gold backdrop-blur-sm" : theme.sub,
                      )}
                    >
                      {dish.category}
                    </p>
                    <h3 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-[2.6rem]">
                      {dish.name}
                    </h3>
                    {dish.description?.trim() ? (
                      <p className={cn("mt-3 text-base font-medium leading-snug", photo ? "text-white" : theme.sub)}>
                        {dish.description}
                      </p>
                    ) : null}
                    <Price
                      price={dish.price}
                      tone={photo || theme.card.includes("text-white") ? "light" : "dark"}
                      className="mt-5 inline-block text-2xl"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
