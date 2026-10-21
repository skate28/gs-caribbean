import { Clock, MapPin, Navigation, Phone, Truck } from "lucide-react";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { hoursConfirmed, scheduleRows } from "@/lib/hours";
import { directionsHref, mapEmbedSrc } from "@/lib/maps";
import { deliveryNote } from "@/lib/ordering";

import { ClosedNotice, OpenStatus } from "./open-status";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { buttonInk, buttonRed, container } from "./styles";

export function Visit() {
  const full = site.address.full.trim();
  if (!full) return null;
  const directions = directionsHref(site);
  const map = mapEmbedSrc(site);
  const showHours = hoursConfirmed(site.hours);
  const rows = showHours ? scheduleRows(site.hours) : [];
  const summary = site.hours.summary.trim();
  const delivery = deliveryNote(site);
  const extras = [site.priceRange.trim() ? `Price range: ${site.priceRange.trim()}` : "", site.paymentNote.trim()].filter(Boolean);
  const [streetLine, ...restLine] = full.split(",");

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-cream py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="visit-title" eyebrow="Visit us" title="Pull up a chair" accent={site.address.neighborhood.trim() ? `on the ${site.address.neighborhood.trim()}.` : "with us."} />

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-5">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-9">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue via-red to-gold" />
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.28em] text-gold">
                <MapPin className="size-4" aria-hidden /> Location
              </p>
              <address className="mt-4 not-italic">
                <span className="block font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{streetLine}</span>
                {restLine.length > 0 ? <span className="mt-1 block text-lg text-white/70">{restLine.join(",").trim()}</span> : null}
              </address>
              {site.locationHint.trim() ? <p className="mt-4 text-white/70">{site.locationHint}</p> : null}
              {extras.length > 0 ? <p className="mt-4 text-sm font-semibold text-white/60">{extras.join(" · ")}</p> : null}
              <div className="mt-7 flex flex-wrap gap-3">
                {directions ? (
                  <a href={directions} target="_blank" rel="noreferrer" className={buttonRed}>
                    <Navigation className="size-4" aria-hidden strokeWidth={2.5} />
                    Get directions
                  </a>
                ) : null}
                {site.phone.tel ? (
                  <a href={site.phone.tel} className={cn(buttonInk, "border border-white/20")}>
                    <Phone className="size-4" aria-hidden strokeWidth={2.5} />
                    {site.phone.display}
                  </a>
                ) : null}
              </div>
              {delivery ? (
                <p className="mt-6 flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm font-medium text-white/80">
                  <Truck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  {delivery}
                </p>
              ) : null}
            </Reveal>

            {showHours && (rows.length > 0 || summary) ? (
              <Reveal delay={0.08} className="rounded-[2rem] bg-white p-7 shadow-[0_24px_50px_-36px_rgb(0_0_0/0.5)] sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.28em] text-red">
                    <Clock className="size-4" aria-hidden /> Hours
                  </p>
                  <OpenStatus
                    input={{ hours: site.hours, closedNotice: site.closedNotice, phone: site.phone }}
                    surface="light"
                    hideNeutral
                  />
                </div>
                {rows.length > 0 ? (
                  <dl className="mt-5 divide-y divide-ink/10">
                    {rows.map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="font-display text-lg font-bold tracking-tight">{row.label}</dt>
                        <dd className={cn("font-semibold tabular-nums", row.value === "Closed" ? "text-red" : "text-ink/75")}>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-5 font-display text-xl font-bold">{summary}</p>
                )}
                <ClosedNotice
                  input={{ hours: site.hours, closedNotice: site.closedNotice, phone: site.phone }}
                  className="mt-5 rounded-2xl bg-red/5 p-4 text-sm font-medium text-ink/75"
                />
              </Reveal>
            ) : null}
          </div>

          {map ? (
            <Reveal delay={0.12} className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-ink/10 bg-char lg:min-h-full">
              <iframe
                title={`Map to ${site.name}`}
                src={map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full grayscale-[0.25]"
                allowFullScreen
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
