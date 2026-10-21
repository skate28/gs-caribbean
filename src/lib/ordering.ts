import type { OrderingLink, SiteContent } from "@/content/types";

const PLATFORMS = new Set(["doordash", "ubereats", "grubhub", "postmates", "online", "phone", "other"]);

export function safeHref(href: string | null | undefined): string | null {
  const value = href?.trim() ?? "";
  if (!value) return null;
  if (/^(https?:|tel:|mailto:|\/)/i.test(value)) return value;
  return null;
}

export function httpHref(href: string | null | undefined): string | null {
  const value = safeHref(href);
  return value && /^https?:/i.test(value) ? value : null;
}

/** Valid ordering links from content. Blank or malformed URLs are dropped. */
export function orderingLinks(content: SiteContent): OrderingLink[] {
  return (content.orderingLinks ?? []).flatMap((link) => {
    if (!link || typeof link.label !== "string" || typeof link.url !== "string") return [];
    const label = link.label.trim();
    const url = safeHref(link.url);
    const platform = PLATFORMS.has(link.platform) ? link.platform : "other";
    if (!label || !url) return [];
    if (platform === "phone" ? !/^tel:/i.test(url) : !/^https?:/i.test(url)) return [];
    return [{ label, url, platform }];
  });
}

export function deliveryNote(content: SiteContent): string {
  return content.deliveryNote?.trim() ?? "";
}
