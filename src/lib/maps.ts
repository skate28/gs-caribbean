import type { SiteContent } from "@/content/types";
import { safeHref } from "@/lib/ordering";

/** Directions link. Uses `mapUrl` when set, otherwise a Google Maps directions URL. */
export function directionsHref(content: SiteContent): string | null {
  const explicit = safeHref(content.mapUrl);
  if (explicit) return explicit;
  const full = content.address.full.trim();
  if (!full) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${content.name}, ${full}`)}`;
}

function mapQuery(content: SiteContent): string {
  const explicit = content.mapQuery?.trim();
  if (explicit) return explicit;
  return [content.name.trim(), content.address.full.trim()].filter(Boolean).join(", ");
}

/** Keyless Google Maps embed (maps?q=). Coordinates when known, otherwise the map query. */
export function mapEmbedSrc(content: SiteContent): string | null {
  const { latitude, longitude } = content.geo;
  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=17&output=embed`;
  }
  const query = mapQuery(content);
  if (!query) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
