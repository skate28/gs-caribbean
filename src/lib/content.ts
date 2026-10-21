import type { Rating, SiteContent, SiteImage, Testimonial } from "@/content/types";
import { hoursConfirmed } from "@/lib/hours";
import { getMenu, signatureDishes } from "@/lib/menu";

export function validImage(image: SiteImage | null | undefined): image is SiteImage {
  return Boolean(image && typeof image.src === "string" && image.src.trim().startsWith("/") && image.alt?.trim());
}

/** Photos of a printed menu board are reference material, not dish photography. */
function isMenuBoard(image: SiteImage): boolean {
  return /menu-board/i.test(image.src);
}

export function heroImages(content: SiteContent): SiteImage[] {
  return (content.heroImages ?? []).filter(validImage).filter((img) => !isMenuBoard(img)).slice(0, 3);
}

/** Gallery photos minus menu boards and the photo already shown in About. */
export function galleryImages(content: SiteContent): SiteImage[] {
  const aboutSrc = validImage(content.about?.image) ? content.about.image.src : null;
  const seen = new Set<string>();
  return (content.gallery ?? []).filter(validImage).filter((img) => {
    if (isMenuBoard(img) || img.src === aboutSrc || seen.has(img.src)) return false;
    seen.add(img.src);
    return true;
  });
}

export function logo(content: SiteContent): SiteImage | null {
  return validImage(content.logo) ? content.logo : null;
}

export function testimonials(content: SiteContent): Testimonial[] {
  return (content.testimonials ?? []).filter((t) => t?.quote?.trim() && t.sourceLabel?.trim());
}

export function ratings(content: SiteContent): Rating[] {
  return [content.rating, ...(content.extraRatings ?? [])].filter(
    (r): r is Rating => Boolean(r && r.value > 0 && r.value <= 5 && r.source?.trim()),
  );
}

export function aboutParagraphs(content: SiteContent): string[] {
  return (content.about?.paragraphs ?? []).map((p) => p.trim()).filter(Boolean);
}

/** Which sections have real content to show. Empty sections (and their nav links) disappear. */
export function sections(content: SiteContent) {
  return {
    signature: signatureDishes(content).length > 0,
    menu: getMenu(content).length > 0,
    reviews: testimonials(content).length > 0 || ratings(content).length > 0,
    about: aboutParagraphs(content).length > 0,
    gallery: galleryImages(content).length > 0,
    hours: hoursConfirmed(content.hours),
    visit: Boolean(content.address.full.trim()),
  };
}
