import { Phone, Truck } from "lucide-react";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { deliveryNote, orderingLinks } from "@/lib/ordering";

import { OrderButton } from "./order-button";
import { Reveal } from "./reveal";
import { container, kicker } from "./styles";

export function OrderCta() {
  if (!site.phone.tel) return null;
  const links = orderingLinks(site);
  const delivery = deliveryNote(site);

  return (
    <section id="order" aria-labelledby="order-title" className="grain relative isolate overflow-hidden bg-red py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(255_106_31/0.75),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgb(18_57_181/0.55),transparent_60%)]" />
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-24 -top-24 -z-10 size-[28rem] animate-rays text-white/10" fill="currentColor">
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d="M100 100 L96 0 L104 0 Z" transform={`rotate(${i * 15} 100 100)`} />
        ))}
      </svg>
      <div className={cn(container, "text-center")}>
        <Reveal>
          <p className={cn(kicker, "justify-center text-white/85")}>
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-gold" />
            {links.length > 0 ? "Call or order online" : "Call ahead"}
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-gold" />
          </p>
          <h2 id="order-title" className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.6rem,9vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-balance">
            Hungry? <span className="font-serif font-normal italic text-gold">Call it in.</span>
          </h2>
          <a
            href={site.phone.tel}
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-white py-3 pl-3 pr-8 text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] transition hover:-translate-y-1 focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="grid size-14 place-items-center rounded-full bg-ink text-white transition group-hover:bg-blue sm:size-16">
              <Phone className="size-6 transition group-hover:rotate-12" aria-hidden strokeWidth={2.5} />
            </span>
            <span className="font-display text-[clamp(1.6rem,6vw,2.75rem)] font-extrabold tabular-nums tracking-tight">{site.phone.display}</span>
          </a>
          {links.length > 0 ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {links.map((link) => (
                <OrderButton key={link.url} link={link} variant="ink" />
              ))}
            </div>
          ) : null}
          {delivery ? (
            <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-base font-semibold text-white/90">
              <Truck className="size-5 shrink-0 text-gold" aria-hidden />
              {delivery}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
