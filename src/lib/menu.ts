import type { MenuCategory, MenuItem, MenuPrice, SiteContent } from "@/content/types";

export type PriceView = { kind: "money"; text: string; value: number } | { kind: "word"; text: string };

/** Normalize a menu price. Null = nothing to show. */
export function priceView(price: MenuPrice | undefined): PriceView | null {
  if (price == null) return null;
  if (typeof price === "number") {
    if (!Number.isFinite(price) || price <= 0) return null;
    return { kind: "money", text: formatMoney(price), value: price };
  }
  const raw = price.trim();
  if (!raw) return null;
  const numeric = /^\$?\s*(\d+(?:\.\d{1,2})?)$/.exec(raw);
  if (numeric) {
    const value = Number(numeric[1]);
    if (value <= 0) return null;
    return { kind: "money", text: formatMoney(value), value };
  }
  const word = raw.replace(/^\$\s*/, "");
  return { kind: "word", text: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() };
}

export function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function visibleItem(item: MenuItem): boolean {
  return Boolean(item?.name?.trim());
}

export type CleanCategory = MenuCategory & { groups: NonNullable<MenuCategory["groups"]> };

/** Categories with at least one named item. Empty groups and blank items are dropped. */
export function getMenu(content: SiteContent): CleanCategory[] {
  return (content.menu ?? []).flatMap((category) => {
    const name = category.name?.trim();
    if (!name) return [];
    const items = (category.items ?? []).filter(visibleItem);
    const groups = (category.groups ?? [])
      .map((group) => ({ ...group, label: group.label.trim(), items: (group.items ?? []).filter(visibleItem) }))
      .filter((group) => group.items.length > 0);
    if (items.length === 0 && groups.length === 0) return [];
    return [{ ...category, name, items, groups }];
  });
}

export function allItems(category: CleanCategory): MenuItem[] {
  return [...category.items, ...category.groups.flatMap((group) => group.items)];
}

export type SignatureDish = MenuItem & { category: string };

/** Items tagged "signature", in menu order, de-duplicated by name. */
export function signatureDishes(content: SiteContent): SignatureDish[] {
  const seen = new Set<string>();
  return getMenu(content).flatMap((category) =>
    allItems(category).flatMap((item) => {
      if (!item.tags?.includes("signature")) return [];
      const key = item.name.trim().toLowerCase();
      if (seen.has(key)) return [];
      seen.add(key);
      return [{ ...item, category: category.name }];
    }),
  );
}
