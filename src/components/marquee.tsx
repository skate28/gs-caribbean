import { site } from "@/content";
import { signatureDishes } from "@/lib/menu";

/** Red ribbon of dish names and Kreyòl greetings. Decorative; hidden from screen readers. */
export function Marquee() {
  const dishes = signatureDishes(site).map((d) => d.name);
  const words = [...dishes, "Bon gou", ...site.servesCuisine ?? [], "Manje lakay", site.address.neighborhood].filter(
    (w): w is string => Boolean(w && w.trim()),
  );
  if (words.length < 3) return null;
  const run = [...words, ...words];

  return (
    <div aria-hidden className="relative overflow-hidden bg-red py-4 text-white sm:py-5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {[...run, ...run].map((word, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {i % 3 === 1 ? <span className="font-serif font-normal italic">{word}</span> : word}
            <svg viewBox="0 0 24 24" className="size-5 text-gold" fill="currentColor">
              <path d="M12 0l2.9 8.1L24 9.2l-7 5.6 2.4 9.2L12 18.8 4.6 24 7 14.8 0 9.2l9.1-1.1z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
