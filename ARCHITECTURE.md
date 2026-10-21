# GS Caribbean Cuisine — architecture

Next.js App Router · React · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react.

Folder layout and content workflow mirror `skate28/stars-caribbean`. The design is its own: menu-board red on
charcoal and white, Haitian blue and gold accents, a sunset orange from the sign, green only in small touches.
Bricolage Grotesque (display), Instrument Serif italic (accent words), Manrope (body).

## Files

| Owner | Files |
| --- | --- |
| **Leads** | `src/content/site.ts` (data only), `public/images/` |
| **Code** | `src/app/`, `src/components/`, `src/lib/`, `src/content/types.ts`, `src/content/index.ts`, config, docs |

```
src/
  app/          layout (metadata, robots), page, robots.ts, sitemap.ts, icon, OG/Twitter images, not-found
  components/   one file per section + small client islands (header, hero-photos, menu-tabs, open-status, reveal)
  content/      types.ts (contract), index.ts (the single import point), site.ts (data)
  lib/          pure helpers: content (visibility), menu (prices, signatures), hours, maps, ordering, nav, indexing, site-url
public/images/  real photos only
```

Components import content only via `import { site } from "@/content"`.

## Page order

Header (wordmark or logo, section links, red call pill) → Hero (arch frame: real photos crossfade, else an
illustrated sunset; Call + ordering buttons + menu link; address; live open/closed pill when hours exist) →
red ribbon → Signature dishes (items tagged `signature`) → Menu (segmented tabs, day-grouped specials) → Reviews →
About → Photos → Visit (location, hours, map embed via `maps?q=`, directions) → Order CTA (tap-to-call + ordering
links + delivery note) → Footer (last line: credit linked to https://nicklopacki.com). Phones get a Call / Menu /
Directions bar.

Every content section returns `null` when its content is empty, and its header link disappears with it.

## Indexing

Off. Only `ALLOW_INDEXING=true` enables it (owner sign-off). Otherwise robots.txt disallows `/`, metadata robots
is `noindex, nofollow`, and every response sends `X-Robots-Tag: noindex, nofollow`.

## Deploy

Vercel project `gs-caribbean` (team skate28s-projects), Next.js preset, repo root, connected to GitHub (`main`
deploys production). No env vars required.
