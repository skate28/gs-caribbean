import { site } from "@/content";
import { cn } from "@/lib/cn";
import { hoursFallback, hoursConfirmed } from "@/lib/hours";
import { directionsHref } from "@/lib/maps";
import type { NavLink } from "@/lib/nav";
import { httpHref } from "@/lib/ordering";

import { FlagStripe } from "./flag-stripe";
import { container, focusRing } from "./styles";
import { Wordmark } from "./wordmark";

export function Footer({ links }: { links: NavLink[] }) {
  const directions = directionsHref(site);
  const hours = hoursConfirmed(site.hours) ? hoursFallback(site.hours) : "";
  const socials = site.socials.flatMap((s) => {
    const href = httpHref(s.href);
    return href && s.label.trim() ? [{ label: s.label.trim(), href }] : [];
  });
  const credit = site.footerCredit.trim() || "Built by nicklopacki.com";
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pb-28 text-white lg:pb-10">
      <FlagStripe />
      <div className={cn(container, "grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]")}>
        <div>
          <Wordmark />
          {site.tagline.trim() ? <p className="mt-5 max-w-sm text-white/65">{site.tagline}</p> : null}
        </div>
        <div className="space-y-2 text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold">Find us</p>
          {directions ? (
            <a href={directions} target="_blank" rel="noreferrer" className={cn("block rounded hover:text-white", focusRing)}>
              {site.address.full}
            </a>
          ) : (
            <p>{site.address.full}</p>
          )}
          {site.phone.tel ? (
            <a href={site.phone.tel} className={cn("block rounded font-display text-xl font-bold text-white hover:text-gold", focusRing)}>
              {site.phone.display}
            </a>
          ) : null}
          {hours ? <p className="text-sm">{hours}</p> : null}
        </div>
        {links.length > 0 || socials.length > 0 ? (
          <nav aria-label="Footer" className="space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold">Explore</p>
            <ul className="grid grid-cols-2 gap-2 text-white/75">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={cn("rounded hover:text-white", focusRing)}>
                    {l.label}
                  </a>
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={cn("rounded hover:text-white", focusRing)}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
      <div className={cn(container, "mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50")}>
        <p>
          © {year} {site.name}
        </p>
        <p>
          <a
            href="https://nicklopacki.com"
            target="_blank"
            rel="noreferrer"
            className={cn("rounded font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline", focusRing)}
          >
            {credit}
          </a>
        </p>
      </div>
    </footer>
  );
}
