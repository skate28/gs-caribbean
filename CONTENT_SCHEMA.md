# Content schema — GS Caribbean Cuisine

Leads owns `src/content/site.ts` and `public/images/`. Replace `site.ts` wholesale; components never hard-code
business copy, prices, hours, or photos.

```ts
import type { SiteContent } from "./types";
export const site: SiteContent = { ... };
```

Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI. Nothing renders "coming soon".

## Rules

- Do not invent prices, hours, reviews, ordering links, or social URLs.
- No owner or staff personal names, reviewer names, or photo-source URLs (this file ships to the browser).
- Real photos only, in `public/images/`, referenced as `/images/<file>`. No AI-generated or stock photos.
- Reviews: verbatim `quote`, `sourceLabel` ("Google", "Yelp"), optional `rating` (1–5) and `sourceUrl`. No author field.

## Fields

| Field | Renders as | Empty → |
| --- | --- | --- |
| `name` | Wordmark, hero title (last word in gold italic), footer, JSON-LD | — |
| `tagline` | Hero line, footer | hidden |
| `heroKicker` | Pill above the hero title | hidden |
| `logo` `{src, alt}` | Header/footer logo | typographic wordmark |
| `heroImages[]` | Hero arch (first = primary, up to 3 crossfade) | illustrated sunset |
| `address.*` | Hero, Visit card, footer, JSON-LD | Visit hidden |
| `mapQuery` | Map embed `maps?q=` | name + `address.full` |
| `mapUrl` | Directions buttons | directions URL from `address.full` |
| `geo` | Map pin + JSON-LD | `mapQuery` |
| `phone` | Header pill, hero, Visit, Order CTA, mobile bar | — |
| `hours.byDay` | Hours card, open/closed pill, footer, JSON-LD | hidden |
| `closedNotice`, `priceRange`, `paymentNote`, `locationHint` | Visit card | hidden |
| `orderingLinks[]` `{label, url, platform}` | Hero + Order CTA buttons | only tap-to-call |
| `deliveryNote` | Visit card + Order CTA | hidden |
| `rating`, `extraRatings[]` | Reviews score badges | hidden |
| `testimonials[]` | Reviews quotes | section hidden |
| `menu[]` | Tabs. `items[]` and/or `groups[]` (`{label, note, items}` e.g. lunch specials by day). `note` = category small print | section hidden |
| `menu[].items[].price` | number → `$17.50`; `"15.99"` → `$15.99`; a word like `"Variable"` → small badge | hidden |
| `menu[].items[].tags` | `"signature"` → Signature dishes section + badge | — |
| `menu[].items[].image` | Photo on the Signature card | colored card |
| `about.heading/paragraphs/image` | About (needs ≥1 paragraph) | hidden |
| `gallery[]` | Photos section | hidden |
| `servesCuisine` | Ribbon, JSON-LD | Haitian, Caribbean |
| `seo.title/description` | Title, meta, Open Graph | name / description |
| `footerCredit` | LAST footer line, linked to https://nicklopacki.com | "Built by nicklopacki.com" |
