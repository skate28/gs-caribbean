import { site } from "@/content";
import { getMenu } from "@/lib/menu";

import { MenuTabs } from "./menu-tabs";
import { SectionHeading } from "./section-heading";
import { container } from "./styles";

export function MenuSection() {
  const categories = getMenu(site);
  if (categories.length === 0) return null;
  const note = site.menuNote.trim();

  return (
    <section id="menu" aria-labelledby="menu-title" className="grain relative isolate bg-ink py-20 text-white sm:py-28">
      <div aria-hidden className="bg-weave absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10 h-96 w-[40rem] max-w-full bg-[radial-gradient(closest-side,rgb(225_38_45/0.28),transparent)] blur-2xl"
      />
      <div className={container}>
        <SectionHeading id="menu-title" tone="light" eyebrow="The menu" title="Straight from" accent="the kitchen." intro={note || undefined} />
        <div className="mt-10 sm:mt-14">
          <MenuTabs categories={categories} />
        </div>
      </div>
    </section>
  );
}
