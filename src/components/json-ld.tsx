import { site } from "@/content";
import type { Weekday } from "@/content/types";
import { heroImages, logo } from "@/lib/content";
import { directionsHref } from "@/lib/maps";
import { allItems, getMenu, priceView } from "@/lib/menu";
import { httpHref, orderingLinks } from "@/lib/ordering";
import { getSiteUrl } from "@/lib/site-url";

const DAY_URLS: Array<[Weekday, string]> = [
  ["sun", "https://schema.org/Sunday"],
  ["mon", "https://schema.org/Monday"],
  ["tue", "https://schema.org/Tuesday"],
  ["wed", "https://schema.org/Wednesday"],
  ["thu", "https://schema.org/Thursday"],
  ["fri", "https://schema.org/Friday"],
  ["sat", "https://schema.org/Saturday"],
];

function openingHours() {
  const { hours } = site;
  const specs = DAY_URLS.flatMap(([key, dayOfWeek]) => {
    const day = hours.byDay?.[key];
    if (day?.closed) return [];
    const opens = day?.openTime ?? (day ? null : hours.openTime);
    const closes = day?.closeTime ?? (day ? null : hours.closeTime);
    if (!opens || !closes) return [];
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes }];
  });
  return specs.length > 0 ? specs : undefined;
}

function restaurantMenu(url: string) {
  const sections = getMenu(site).map((category) => ({
    "@type": "MenuSection",
    name: category.name,
    description: category.description?.trim() || undefined,
    hasMenuItem: allItems(category).map((item) => {
      const entry: Record<string, unknown> = { "@type": "MenuItem", name: item.name.trim() };
      if (item.description?.trim()) entry.description = item.description.trim();
      const price = priceView(item.price);
      if (price?.kind === "money") {
        entry.offers = { "@type": "Offer", price: price.value.toFixed(2), priceCurrency: "USD" };
      }
      return entry;
    }),
  }));
  if (sections.length === 0) return undefined;
  return { "@type": "Menu", name: `${site.name} menu`, url: `${url}/#menu`, hasMenuSection: sections };
}

function absolute(url: string, src: string) {
  return `${url}${src.startsWith("/") ? src : `/${src}`}`;
}

export function JsonLd() {
  const url = getSiteUrl();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url,
    servesCuisine: site.servesCuisine?.length ? site.servesCuisine : ["Haitian", "Caribbean"],
    description: site.seo.description.trim() || site.description,
  };

  const images = heroImages(site);
  if (images.length > 0) data.image = images.map((img) => absolute(url, img.src));
  const mark = logo(site);
  if (mark) data.logo = absolute(url, mark.src);
  if (site.phone.e164.trim()) data.telephone = site.phone.e164.trim();
  if (site.priceRange.trim()) data.priceRange = site.priceRange.trim();

  const street = [site.address.street, site.address.suite].map((p) => p.trim()).filter(Boolean).join(", ");
  if (street || site.address.city.trim()) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: street || undefined,
      addressLocality: site.address.city.trim() || undefined,
      addressRegion: site.address.region.trim() || undefined,
      postalCode: site.address.postalCode.trim() || undefined,
      addressCountry: site.address.country.trim() || undefined,
    };
  }
  if (site.geo.latitude != null && site.geo.longitude != null) {
    data.geo = { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude };
  }
  const map = directionsHref(site);
  if (map) data.hasMap = map;
  const hours = openingHours();
  if (hours) data.openingHoursSpecification = hours;
  const menu = restaurantMenu(url);
  if (menu) data.hasMenu = menu;
  const order = orderingLinks(site).find((l) => /^https?:/i.test(l.url));
  if (order) data.potentialAction = { "@type": "OrderAction", target: order.url };
  const sameAs = site.socials.map((s) => httpHref(s.href)).filter((h): h is string => Boolean(h));
  if (sameAs.length > 0) data.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
