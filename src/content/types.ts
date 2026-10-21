/**
 * Content contract for GS Caribbean Cuisine.
 *
 * `src/content/site.ts` is data only:
 *
 *   import type { SiteContent } from "./types";
 *   export const site: SiteContent = { ... };
 *
 * Rules:
 *  - Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI.
 *  - Never invent prices, hours, reviews, ordering links, or social URLs.
 *  - No owner/staff personal names, no reviewer names, no photo-source URLs anywhere in here.
 *    This file's values ship to the browser.
 *  - Images: real files only, in `public/images/`, referenced as `/images/<file>`.
 *    No AI-generated or stock photos of the food or the restaurant.
 *  - No pitch features (text pre-orders, AI phone answering, catering, waitlists, "coming soon").
 *    The types carry no fields for them.
 */

/** A real photo or logo file in `public/images/`. */
export type SiteImage = {
  /** Public path, e.g. "/images/griot-plate.jpg". */
  src: string;
  /** Describes what is in the picture, e.g. "Griot with pikliz and fried plantains". */
  alt: string;
  /** Intrinsic pixel size, when known. Helps layout; optional. */
  width?: number;
  height?: number;
};

export type PhoneNumber = {
  /** Shown to people, e.g. "(904) 243-8910". */
  display: string;
  /** `tel:` href, e.g. "tel:+19042438910". */
  tel: string;
  /** E.164, e.g. "+19042438910". */
  e164: string;
};

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DayHours = {
  /** 24-hour "HH:MM", or null when that edge is still unknown. */
  openTime: string | null;
  closeTime: string | null;
  /** True closes the restaurant for the whole day. */
  closed?: boolean;
};

export type Hours = {
  /** IANA zone used to decide open vs closed. "America/New_York". */
  timezone: string;
  /** Short public line, e.g. "Mon–Sat 9 AM–8 PM". Empty = built from `byDay`. */
  summary: string;
  /** Fallback window for a weekday missing from `byDay`. Null = unknown, don't assume. */
  openTime: string | null;
  closeTime: string | null;
  /** Per-day hours. This is the schedule the open/closed pill reads. Empty/absent = hours hidden. */
  byDay?: Partial<Record<Weekday, DayHours>>;
};

/** Free-form tags. "signature" features the item in the Signature Dishes section. */
export type MenuTag = "signature" | "popular" | "new" | "spicy" | "vegetarian";

/**
 * A price as printed on the menu board.
 *  - number: dollars, e.g. 17.5 renders "$17.50".
 *  - string: e.g. "$15.99", "15.99" (rendered as dollars) or a word like "Variable"
 *    (rendered as a small badge showing that word).
 * Leave unset until a real price is confirmed. Never invent one.
 */
export type MenuPrice = number | string;

export type MenuItem = {
  /** Stable slug, e.g. "griot-pork-platter". */
  id: string;
  name: string;
  /** Sub-line, e.g. "Rice + bean sauce" or "Diri blan or diri kole". */
  description?: string;
  price?: MenuPrice;
  tags?: MenuTag[];
  /** Optional photo of this dish (real photo only). Used on the Signature card. */
  image?: SiteImage;
};

/** A titled sub-list inside a category, e.g. a day-of-week lunch special. */
export type MenuGroup = {
  /** e.g. "Monday to Thursday", "Every Saturday", "Every Sunday". */
  label: string;
  /** e.g. "11 AM to 2 PM". */
  note?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  /** Stable slug, e.g. "breakfast", "lunch-dinner", "lunch-specials", "beverages", "natural-juices". */
  id: string;
  /** Tab label, e.g. "Breakfast", "Lunch & Dinner". */
  name: string;
  /** Short intro line under the category heading. */
  description?: string;
  /** Small print for the category, e.g. "Served until 11 AM". */
  note?: string;
  /** Plain list of items. May be empty when the category uses `groups`. */
  items: MenuItem[];
  /** Grouped items rendered after `items`, e.g. Lunch Specials by day of week. */
  groups?: MenuGroup[];
};

/**
 * A verbatim review quote. There is deliberately NO author/name field.
 * Rendered as: quote, star rating (when set), and `sourceLabel` (linked when `sourceUrl` is http(s)).
 */
export type Testimonial = {
  /** Verbatim text, trimmed only. Use "…" for cuts. */
  quote: string;
  /** Stars the reviewer gave, 1–5. Omit when unknown. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Platform label, e.g. "Google" or "Yelp". Required; quotes without it are skipped. */
  sourceLabel: string;
  /** Optional http(s) link to the listing. Never a photo URL. */
  sourceUrl?: string;
};

/** Aggregate score for a platform, e.g. 4.8 on Google from 120 reviews. */
export type Rating = {
  value: number;
  count: number;
  /** e.g. "Google". */
  source: string;
  sourceUrl?: string;
};

export type OrderingPlatform = "doordash" | "ubereats" | "grubhub" | "postmates" | "online" | "phone" | "other";

export type OrderingLink = {
  /** Button text, e.g. "DoorDash", "Uber Eats". Only services the restaurant really uses. */
  label: string;
  /** https:// URL (or tel: for platform "phone"). */
  url: string;
  platform: OrderingPlatform;
};

export type SocialLink = {
  /** e.g. "Facebook", "Instagram". */
  label: string;
  href: string;
};

export type SiteContent = {
  name: string;
  /** e.g. "Haitian & Caribbean kitchen". Empty hides it. */
  tagline: string;
  /** Meta description fallback and JSON-LD. */
  description: string;
  /** Short line above the hero title, e.g. "Westside · Jacksonville". Empty/absent hides it. */
  heroKicker?: string;
  /** Real logo file. Absent/null = typographic wordmark. */
  logo?: SiteImage | null;
  address: {
    street: string;
    suite: string;
    neighborhood: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    /** Single line used for display, directions, and footer. */
    full: string;
  };
  /** Text used for the Google Maps embed (`maps?q=`). Empty = name + `address.full`. */
  mapQuery: string;
  /** Google Maps place link for "Directions". Empty = a directions link built from `address.full`. */
  mapUrl: string;
  /** Null coordinates keep the map on `mapQuery`. Do not guess. */
  geo: {
    latitude: number | null;
    longitude: number | null;
  };
  /** Short wayfinding line under the address. Empty hides it. */
  locationHint: string;
  phone: PhoneNumber;
  hours: Hours;
  /** Shown on the hours card only while closed. Empty hides it. */
  closedNotice: string;
  /** e.g. "$$". Empty hides it. */
  priceRange: string;
  /** e.g. "Cash & cards". Empty hides it. */
  paymentNote: string;
  /** Existing ordering services only. Empty array = only tap-to-call is shown. */
  orderingLinks: OrderingLink[];
  /** e.g. "Delivery available through DoorDash." Shown near the order CTA and location. Empty/absent hides it. */
  deliveryNote?: string;
  socials: SocialLink[];
  /** Aggregate score. Null hides it. */
  rating: Rating | null;
  /** More platform scores, shown after `rating`. */
  extraRatings?: Rating[];
  testimonials: Testimonial[];
  /** Line under the menu heading, e.g. "Prices subject to change." Empty hides it. */
  menuNote: string;
  menu: MenuCategory[];
  /** Hero photos (first is primary; up to 3 crossfade). Empty = typographic hero. */
  heroImages: SiteImage[];
  /** Photo strip. Empty hides the section. */
  gallery: SiteImage[];
  about: {
    /** e.g. "Haitian cooking, made with heart". */
    heading: string;
    /** Section hides when there are no non-empty paragraphs. */
    paragraphs: string[];
    /** Optional real photo beside the story. */
    image?: SiteImage;
  };
  /** JSON-LD servesCuisine. Absent = ["Haitian", "Caribbean"]. */
  servesCuisine?: string[];
  seo: {
    title: string;
    description: string;
  };
  /** Footer credit text. Always linked to https://nicklopacki.com and always the last footer line. */
  footerCredit: string;
};
