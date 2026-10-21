import { MapPin, Phone, UtensilsCrossed } from "lucide-react";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { sections } from "@/lib/content";
import { directionsHref } from "@/lib/maps";

import { focusRing } from "./styles";

/** Thumb-reach Call / Menu / Directions bar on phones. */
export function MobileBar() {
  const directions = directionsHref(site);
  const hasMenu = sections(site).menu;
  if (!site.phone.tel) return null;
  const item = cn(
    "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em]",
    focusRing,
  );

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-1.5 rounded-[1.4rem] border border-white/10 bg-ink/90 p-1.5 text-white shadow-[0_20px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl lg:hidden"
    >
      <a href={site.phone.tel} className={cn(item, "flex-[1.4] bg-red")}>
        <Phone className="size-5" aria-hidden strokeWidth={2.5} />
        Call now
      </a>
      {hasMenu ? (
        <a href="#menu" className={cn(item, "text-white/85")}>
          <UtensilsCrossed className="size-5" aria-hidden />
          Menu
        </a>
      ) : null}
      {directions ? (
        <a href={directions} target="_blank" rel="noreferrer" className={cn(item, "text-white/85")}>
          <MapPin className="size-5" aria-hidden />
          Directions
        </a>
      ) : null}
    </nav>
  );
}
