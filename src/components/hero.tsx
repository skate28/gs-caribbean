import Image from "next/image";
import { ArrowDown, MapPin, Phone } from "lucide-react";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { heroImages, logo, sections } from "@/lib/content";
import { hoursConfirmed } from "@/lib/hours";
import { directionsHref } from "@/lib/maps";
import { signatureDishes } from "@/lib/menu";
import { orderButtons } from "@/lib/ordering";

import { FlagStripe } from "./flag-stripe";
import { HeroArt } from "./hero-art";
import { HeroPhotos } from "./hero-photos";
import { OpenStatus } from "./open-status";
import { OrderButton } from "./order-button";
import { Reveal } from "./reveal";
import { SpinBadge } from "./spin-badge";
import { buttonGhost, buttonRed, container, kicker } from "./styles";

function titleParts(name: string): { lead: string; tail: string } {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return { lead: name, tail: "" };
  return { lead: words.slice(0, -1).join(" "), tail: words[words.length - 1] };
}

export function Hero() {
  const photos = heroImages(site);
  const links = orderButtons(site);
  const dishes = signatureDishes(site).slice(0, 4);
  const { lead, tail } = titleParts(site.name);
  const directions = directionsHref(site);
  const kickerText = site.heroKicker?.trim();
  const tagline = site.tagline.trim();
  const hasPhotos = photos.length > 0;
  const hasMenu = sections(site).menu;
  const logoImage = logo(site);

  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-weave absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_106_31/0.45),rgb(225_38_45/0.18)_55%,transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-56 -left-40 -z-10 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(18_57_181/0.5),transparent)] blur-2xl"
      />

      <div
        className={cn(
          container,
          "grid items-center pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24 lg:pt-36",
          hasPhotos ? "gap-10 pt-24 sm:pt-28" : "gap-12 pt-28 sm:pt-32",
        )}
      >
        <div className="relative">
          {kickerText ? (
            <Reveal>
              <p className={cn(kicker, "rounded-full border border-white/15 bg-white/5 py-2 pl-2 pr-4 text-white/85 backdrop-blur")}>
                <span aria-hidden className="flex h-4 w-6 flex-col overflow-hidden rounded-[3px]">
                  <span className="h-1/2 bg-blue" />
                  <span className="h-1/2 bg-red" />
                </span>
                {kickerText}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,13.5vw,8.6rem)] font-extrabold leading-[0.84] tracking-[-0.05em]">
              <span className="block">{lead}</span>
              {tail ? (
                <span className="block bg-gradient-to-r from-gold via-sunset to-red bg-clip-text pb-[0.08em] pr-[0.06em] font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-transparent">
                  {tail}
                </span>
              ) : null}
            </h1>
          </Reveal>

          {tagline ? (
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl">{tagline}</p>
            </Reveal>
          ) : null}

          {dishes.length > 0 ? (
            <Reveal delay={0.22}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Signature dishes">
                {dishes.map((dish) => (
                  <li
                    key={dish.id}
                    className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-bold text-gold"
                  >
                    {dish.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {site.phone.tel ? (
                <a href={site.phone.tel} className={cn(buttonRed, "min-h-14 px-7 text-base sm:text-lg")}>
                  <Phone className="size-5 transition group-hover:rotate-12" aria-hidden strokeWidth={2.5} />
                  Call {site.phone.display}
                </a>
              ) : null}
              {links.slice(0, 2).map((link) => (
                <OrderButton key={link.url} link={link} variant="white" />
              ))}
              {hasMenu ? (
                <a href="#menu" className={buttonGhost}>
                  See the menu
                  <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/70">
              {site.address.full.trim() ? (
                directions ? (
                  <a
                    href={directions}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    <MapPin className="size-4 text-red" aria-hidden />
                    {site.address.full}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-red" aria-hidden />
                    {site.address.full}
                  </span>
                )
              ) : null}
              {hoursConfirmed(site.hours) ? (
                <OpenStatus input={{ hours: site.hours, closedNotice: site.closedNotice, phone: site.phone }} />
              ) : null}
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.05}
          className={cn(
            "relative mx-auto w-full lg:max-w-none",
            hasPhotos ? "order-first max-w-xl lg:order-none" : "max-w-[26rem] sm:max-w-md",
          )}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-gold/40 via-red/30 to-blue/40 blur-2xl"
            />
            <div
              className={cn(
                "relative overflow-hidden border border-white/15 bg-char shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]",
                hasPhotos
                  ? "aspect-[4/3.4] rounded-t-[11rem] rounded-b-[2rem] sm:aspect-[1/1] sm:rounded-t-[16rem] lg:aspect-[5/6] lg:rounded-t-[999px] lg:rounded-b-[2.5rem]"
                  : "aspect-[4/5] rounded-t-[999px] rounded-b-[2.25rem]",
              )}
            >
              {hasPhotos ? (
                <>
                  <HeroPhotos images={photos} />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-red/40 via-sunset/10 to-gold/35 mix-blend-soft-light" />
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(255_200_120/0.22),transparent_60%)] mix-blend-screen" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                </>
              ) : (
                <HeroArt className="absolute inset-0 size-full" />
              )}
            </div>
            {logoImage ? (
              <div className="absolute -bottom-7 -left-2 size-28 rounded-full bg-ink p-1.5 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)] sm:-left-6 sm:size-36 lg:size-40">
                <Image
                  src={logoImage.src}
                  alt={logoImage.alt}
                  width={logoImage.width ?? 800}
                  height={logoImage.height ?? 800}
                  sizes="160px"
                  quality={90}
                  className="size-full rounded-full object-contain ring-2 ring-gold/70"
                />
              </div>
            ) : (
              <SpinBadge className="absolute -bottom-6 -left-4 size-28 sm:-left-8 sm:size-32" />
            )}
            {logoImage ? <SpinBadge className="absolute -right-2 -top-4 hidden size-24 sm:block lg:-right-5 lg:size-28" /> : null}
          </div>
        </Reveal>
      </div>
      <FlagStripe />
    </section>
  );
}
