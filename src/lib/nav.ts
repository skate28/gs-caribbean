import { site } from "@/content";
import { sections } from "@/lib/content";

export type NavLink = { href: string; label: string };

export function primaryNav(): NavLink[] {
  const s = sections(site);
  const links: Array<NavLink | false> = [
    s.signature && { href: "#signatures", label: "Signatures" },
    s.menu && { href: "#menu", label: "Menu" },
    s.reviews && { href: "#reviews", label: "Reviews" },
    s.about && { href: "#about", label: "Our story" },
    s.visit && { href: "#visit", label: "Visit" },
  ];
  return links.filter((l): l is NavLink => Boolean(l));
}
